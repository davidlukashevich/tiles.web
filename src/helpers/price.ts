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
