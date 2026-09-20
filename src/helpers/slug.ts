const TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
  ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
  я: "ya",
}

// Название товара -> url-безопасный slug (латиница)
export const slugify = (value: string): string => {
  return value
    .toLowerCase()
    .split("")
    .map((char) => TRANSLIT[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export const productSlug = (name: string): string => slugify(name)

export const productHrefBySlug = (name: string): string =>
  `/product/${slugify(name)}`

export type SluggableProduct = {
  id: string
  name: string
  sku: string
}

// В каталоге встречаются разные товары с одинаковыми названиями («Bliss
// White» в 60x60 и в 120x60). Адрес из одного названия у них совпадал бы,
// и открывался бы всегда первый — второй становился недоступен.
//
// Поэтому: пока название уникально, адрес остаётся коротким. Как только
// названий несколько — к каждому добавляется артикул. Короткий адрес в
// таком случае не отдаётся никому, чтобы он не «прилипал» к случайной
// записи и не менялся при правках в базе.
export const buildProductHrefs = (
  products: SluggableProduct[],
): Map<string, string> => {
  const bySlug = new Map<string, SluggableProduct[]>()

  for (const product of products) {
    const slug = slugify(product.name)
    const bucket = bySlug.get(slug)

    if (bucket) {
      bucket.push(product)
    } else {
      bySlug.set(slug, [product])
    }
  }

  const hrefs = new Map<string, string>()

  for (const [slug, items] of bySlug) {
    if (items.length === 1) {
      hrefs.set(items[0].id, `/product/${slug}`)
      continue
    }

    for (const item of items) {
      const suffix = item.sku ? slugify(item.sku) : item.id.slice(0, 8)
      hrefs.set(item.id, `/product/${slug}-${suffix}`)
    }
  }

  return hrefs
}
