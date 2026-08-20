// Цена со скидкой (как в админке)
export const priceWithDiscount = (
  price: number | null,
  discountPercent: number | null,
): number | null => {
  if (price == null) return null
  const p = Number(price)
  const d = Number(discountPercent)
  if (!Number.isFinite(p)) return null
  if (!Number.isFinite(d) || d <= 0 || d > 100) return p
  return Math.round(p * (1 - d / 100) * 100) / 100
}

type PricedVariant = {
  price: number | null
  discount_percent: number | null
}

export type DisplayPrice = {
  // минимальная цена со скидкой среди вариантов
  price: number | null
  // исходная (перечёркнутая) цена того же варианта, если есть скидка
  oldPrice?: number
  // true, если у вариантов разные итоговые цены -> показываем «от»
  isFrom: boolean
}

export const computeDisplayPrice = (
  variants: PricedVariant[],
): DisplayPrice => {
  const priced = variants.filter((variant) => variant.price != null)

  if (priced.length === 0) {
    return { price: null, isFrom: false }
  }

  const items = priced.map((variant) => {
    const base = Number(variant.price)
    const final = priceWithDiscount(variant.price, variant.discount_percent) ?? base
    return { base, final }
  })

  const cheapest = items.reduce((min, item) =>
    item.final < min.final ? item : min,
  )

  const distinctFinals = new Set(items.map((item) => item.final))

  return {
    price: cheapest.final,
    oldPrice: cheapest.final < cheapest.base ? cheapest.base : undefined,
    isFrom: distinctFinals.size > 1,
  }
}

type PricedProduct = {
  displayPrice?: number | null
  name: string
}

// Сортировка списка товаров по показанной цене, от дешёвой к дорогой.
//
// Сортируем именно по displayPrice (минимальная цена со скидкой среди
// вариантов), потому что это то число, которое пользователь видит на карточке.
// Товары без цены («Цена по запросу») уходят в конец: иначе null встал бы
// перед самыми дешёвыми.
export const byDisplayPriceAsc = (
  a: PricedProduct,
  b: PricedProduct,
): number => {
  const left = a.displayPrice ?? null
  const right = b.displayPrice ?? null

  if (left === null || right === null) {
    if (left === right) return a.name.localeCompare(b.name)
    return left === null ? 1 : -1
  }

  if (left !== right) return left - right

  // Одинаковая цена — по названию, чтобы порядок не «прыгал» между рендерами
  return a.name.localeCompare(b.name)
}
