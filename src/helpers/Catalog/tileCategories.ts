import type { Category } from "../../types/response/Category.type"

// Слаги «главных» размеров — показываем сразу, остальные прячем в «Остальные»
export const MAIN_TILE_SLUGS = [
  "plitka-60x60",
  "plitka-120x60",
  "plitka-80h80",
  "plitka-160h80",
  "plitka-20x190",
]

export const splitTileCategories = (categories: Category[] = []) => {
  const main = MAIN_TILE_SLUGS.map((slug) =>
    categories.find((category) => category.slug === slug),
  ).filter((category): category is Category => Boolean(category))

  const rest = categories.filter(
    (category) => !MAIN_TILE_SLUGS.includes(category.slug),
  )

  return { main, rest }
}
