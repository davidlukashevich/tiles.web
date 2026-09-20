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
const CONCURRENCY = 4
const RESTART_EVERY = 150

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

// Закрытие страницы не должно ронять прогон: если браузер уже умер,
// любой вызов к нему бросает ConnectionClosedError.
const safeClose = async (page) => {
    if (!page) return

    try {
        if (!page.isClosed()) await page.close()
    } catch {
        // браузера уже нет — закрывать нечего
    }
}

let browser = null

const launchBrowser = () =>
    puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-dev-shm-usage"],
    })

const closeBrowser = async () => {
    if (!browser) return

    try {
        await browser.close()
    } catch {
        // уже мёртв
    }

    browser = null
}

// Chrome может уйти по памяти на длинном прогоне. Тогда поднимаем новый
// и продолжаем с того же места, вместо падения всей сборки.
const ensureBrowser = async () => {
    if (browser && browser.connected) return browser

    if (browser) {
        await closeBrowser()
        console.log("  браузер отвалился — поднимаю заново")
    }

    browser = await launchBrowser()
    return browser
}

const renderRoute = async (route, attempt = 1) => {
    let page = null

    try {
        // newPage внутри try: браузер может умереть и на этом шаге
        const active = await ensureBrowser()
        page = await active.newPage()

        // Метрика не должна срабатывать на сборке: иначе в отчёты уйдут
        // сотни визитов с машины разработчика. Режем запросы к счётчику —
        // сам его код при этом остаётся в готовом HTML.
        await page.setRequestInterception(true)
        page.on("request", (request) => {
            if (request.url().includes("mc.yandex.")) {
                request.abort().catch(() => {})
                return
            }

            request.continue().catch(() => {})
        })

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
        // Таймауты и падения браузера на длинном прогоне случайны —
        // повтор дешевле, чем дырка в индексе до следующей сборки.
        if (attempt < 3) {
            await safeClose(page)
            return renderRoute(route, attempt + 1)
        }

        return { route, ok: false, error: error.message }
    } finally {
        await safeClose(page)
    }
}

const main = async () => {
    const only = process.argv.slice(2)
    const routes = only.length ? only : readRoutes()
    const server = await startServer()

    await ensureBrowser()

    console.log(`Пререндер: ${routes.length} адресов, по ${CONCURRENCY} за раз`)

    const queue = [...routes]
    const failed = []
    let done = 0
    let sinceRestart = 0

    // Идём пачками, а не бесконечными воркерами: на границе пачки открытых
    // страниц нет, и браузер можно безопасно перезапустить. Перезапуск на
    // ходу убивал страницы соседних воркеров.
    while (queue.length) {
        const batch = queue.splice(0, CONCURRENCY)
        const results = await Promise.all(batch.map((route) => renderRoute(route)))

        for (const result of results) {
            done += 1
            if (!result.ok) failed.push(result)
        }

        if (done % 50 < CONCURRENCY || !queue.length) {
            console.log(`  ${done}/${routes.length}`)
        }

        sinceRestart += batch.length

        // Профилактика: Chrome копит память на сотнях страниц.
        if (sinceRestart >= RESTART_EVERY && queue.length) {
            sinceRestart = 0
            await closeBrowser()
            await ensureBrowser()
        }
    }

    await closeBrowser()
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
