// Пререндер: прогоняем каждый адрес из sitemap.xml через headless-браузер
// и сохраняем готовый HTML рядом с dist/index.html.
//
// Зачем: сайт рисуется на клиенте, и робот получает пустой <div id="root">.
// Google такое дорисовывает сам, Яндекс — плохо. После пререндера оба
// получают полноценную страницу с текстом, ценами и мета-тегами.
//
// Цена решения: HTML содержит снимок данных на момент сборки. Новые товары
// и новые цены попадают в поиск только после пересборки и перезаливки.

import { createServer } from "node:http"
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs"
import { resolve, dirname, extname, join } from "node:path"
import { fileURLToPath } from "node:url"
import puppeteer from "puppeteer"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const DIST = resolve(ROOT, "dist")
const PORT = 4179
const CONCURRENCY = 6

const MIME = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".xml": "application/xml",
    ".txt": "text/plain; charset=utf-8",
}

// Статика с SPA-фоллбэком — то же поведение, что даёт .htaccess на хостинге
const startServer = () =>
    new Promise((done) => {
        const server = createServer((req, res) => {
            const url = decodeURIComponent((req.url || "/").split("?")[0])
            const candidate = join(DIST, url)

            const file =
                existsSync(candidate) && extname(candidate)
                    ? candidate
                    : join(DIST, "index.html")

            res.writeHead(200, {
                "Content-Type": MIME[extname(file)] ?? "application/octet-stream",
            })
            res.end(readFileSync(file))
        })

        server.listen(PORT, () => done(server))
    })

const readRoutes = () => {
    const xml = readFileSync(resolve(DIST, "sitemap.xml"), "utf8")

    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map((match) => match[1].replace(/^https?:\/\/[^/]+/, ""))
        .map((path) => (path === "" ? "/" : path))
}

const savePage = (route, html) => {
    const target =
        route === "/"
            ? resolve(DIST, "index.html")
            : resolve(DIST, `${route.replace(/^\//, "")}/index.html`)

    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, html)
}

const renderRoute = async (browser, route, attempt = 1) => {
    const page = await browser.newPage()

    try {
        await page.setViewport({ width: 1366, height: 900 })

        await page.goto(`http://localhost:${PORT}${route}`, {
            waitUntil: "networkidle0",
            timeout: 45000,
        })

        // Заголовок страницы проставляет useSeo уже после загрузки данных —
        // ждём его как признак того, что рендерить больше нечего.
        await page
            .waitForFunction(() => document.title.length > 0, { timeout: 15000 })
            .catch(() => {})

        const html = await page.content()

        if (!html.includes('id="root"') || html.includes('<div id="root"></div>')) {
            throw new Error("пустой #root")
        }

        savePage(route, html)
        return { route, ok: true }
    } catch (error) {
        // Сетевые таймауты на общей машине случайны — один повтор
        // дешевле, чем дырка в индексе на весь срок до следующей сборки.
        if (attempt < 2) {
            await page.close()
            return renderRoute(browser, route, attempt + 1)
        }

        return { route, ok: false, error: error.message }
    } finally {
        if (!page.isClosed()) await page.close()
    }
}

const main = async () => {
    const only = process.argv.slice(2)
    const routes = only.length ? only : readRoutes()
    const server = await startServer()
    const browser = await puppeteer.launch({ headless: true })

    console.log(`Пререндер: ${routes.length} адресов, по ${CONCURRENCY} за раз`)

    const queue = [...routes]
    const failed = []
    let done = 0

    const worker = async () => {
        while (queue.length) {
            const route = queue.shift()
            const result = await renderRoute(browser, route)

            done += 1
            if (!result.ok) failed.push(result)

            if (done % 50 === 0 || done === routes.length) {
                console.log(`  ${done}/${routes.length}`)
            }
        }
    }

    await Promise.all(Array.from({ length: CONCURRENCY }, worker))

    await browser.close()
    server.close()

    if (failed.length) {
        console.log(`\nНе отрендерилось: ${failed.length}`)
        failed.slice(0, 10).forEach((f) => console.log(`  ${f.route} — ${f.error}`))
    }

    console.log(`\nГотово: ${routes.length - failed.length} из ${routes.length}`)

    // Если развалилась половина — сборка бракованная, лучше упасть
    if (failed.length > routes.length / 2) process.exit(1)
}

main().catch((error) => {
    console.error("Пререндер упал:", error)
    process.exit(1)
})
