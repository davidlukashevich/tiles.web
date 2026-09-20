// Генерация sitemap.xml из Supabase. Запускается после vite build и кладёт
// файл прямо в dist/, потому что dist пересобирается на каждой сборке.
//
// Новые товары попадают в карту сайта только после пересборки и повторной
// заливки — это плата за статический хостинг.

import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const SITE_URL = "https://kvadratnymetr.by"

// Транслитерация продублирована из src/helpers/slug.ts:
// адреса товаров обязаны совпадать с теми, что строит фронтенд.
const TRANSLIT = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
  ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
  я: "ya",
}

const slugify = (value) =>
  value
    .toLowerCase()
    .split("")
    .map((char) => TRANSLIT[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

const readEnv = () => {
  const path = resolve(ROOT, ".env")

  if (!existsSync(path)) {
    throw new Error("Не найден .env — без ключей Supabase карту не собрать")
  }

  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const index = line.indexOf("=")
        return [
          line.slice(0, index).trim(),
          line.slice(index + 1).trim().replace(/^["']|["']$/g, ""),
        ]
      }),
  )
}

const fetchRows = async (env, view, select) => {
  const url = `${env.VITE_API_SUPABASE_URL}/rest/v1/${view}?select=${select}`

  const response = await fetch(url, {
    headers: {
      apikey: env.VITE_API_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${env.VITE_API_SUPABASE_ANON_KEY}`,
    },
  })

  if (!response.ok) {
    throw new Error(`${view}: ${response.status} ${await response.text()}`)
  }

  return response.json()
}

const urlEntry = (path, priority, changefreq) =>
  `  <url>\n` +
  `    <loc>${SITE_URL}${path}</loc>\n` +
  `    <changefreq>${changefreq}</changefreq>\n` +
  `    <priority>${priority}</priority>\n` +
  `  </url>`

const main = async () => {
  const env = readEnv()

  const [categories, products] = await Promise.all([
    fetchRows(env, "public_categories_view", "slug,parent_id"),
    fetchRows(env, "public_products_view", "id,name,sku"),
  ])

  const paths = [
    ["/", "1.0", "daily"],
    ["/catalog/tiles", "0.9", "daily"],
    ["/catalog/accessories", "0.7", "weekly"],
    ["/catalog/accessories/mixes", "0.5", "monthly"],
    ["/catalog/accessories/grout", "0.5", "monthly"],
    ["/catalog/accessories/silicone", "0.5", "monthly"],
    ["/catalog/sale", "0.8", "daily"],
    ["/about", "0.5", "monthly"],
    ["/how-to-buy", "0.5", "monthly"],
    ["/privacy", "0.2", "yearly"],
    ["/terms", "0.2", "yearly"],
  ]

  // Подборки по фактуре: /catalog/selections/wood и прочие. Ловят запросы
  // вида «плитка под дерево» — одни из самых ходовых в нише, поэтому в
  // карту попадают обязательно.
  //
  // Слаги продублированы из src/helpers/Catalog/collectionMap.ts: адреса
  // обязаны совпадать с теми, что строит меню.
  const SELECTION_SLUGS = [
    "marble",
    "concrete",
    "stone",
    "onyx",
    "wood",
    "terrazzo",
    "patchwork",
    "travertine",
    "brick",
    "rust",
    "monocolor",
    "decor",
  ]

  for (const slug of SELECTION_SLUGS) {
    paths.push([`/catalog/selections/${slug}`, "0.8", "weekly"])
  }

  // Размеры плитки — это категории верхнего уровня, именно они
  // и выведены в сайдбаре каталога.
  for (const category of categories) {
    if (!category.slug || category.parent_id !== null) continue
    paths.push([`/catalog/tiles/${category.slug}`, "0.8", "weekly"])
  }

  // Те же правила, что и на фронтенде (src/helpers/slug.ts): уникальное
  // название — короткий адрес, совпадающие названия — с артикулом.
  // Расхождение здесь означало бы карту сайта с несуществующими адресами.
  const bySlug = new Map()

  for (const product of products) {
    if (!product.name) continue

    const slug = slugify(product.name)
    if (!slug) continue

    const bucket = bySlug.get(slug)
    if (bucket) bucket.push(product)
    else bySlug.set(slug, [product])
  }

  let collisions = 0

  for (const [slug, items] of bySlug) {
    if (items.length === 1) {
      paths.push([`/product/${slug}`, "0.6", "weekly"])
      continue
    }

    collisions += items.length

    for (const item of items) {
      const suffix = item.sku ? slugify(item.sku) : String(item.id).slice(0, 8)
      paths.push([`/product/${slug}-${suffix}`, "0.6", "weekly"])
    }
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths.map(([path, priority, freq]) => urlEntry(path, priority, freq)).join("\n") +
    `\n</urlset>\n`

  writeFileSync(resolve(ROOT, "dist/sitemap.xml"), xml)
  console.log(
    `sitemap.xml: ${paths.length} адресов ` +
      `(одноимённых товаров с артикулом в адресе: ${collisions})`,
  )
}

main().catch((error) => {
  console.error("Не удалось собрать sitemap:", error.message)
  process.exit(1)
})
