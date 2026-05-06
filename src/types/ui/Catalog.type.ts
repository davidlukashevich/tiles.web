export type CatalogItem = {
  label: string
  href: string
  value: string
}

export type CatalogGroup = {
  title: string
  items: CatalogItem[]
}

export type CatalogProduct = {
  id: string
  title: string
  category: string
  image: string
  price: number
  oldPrice?: number
  badge?: string
  href: string

  categoryValue: string
  format?: string
  manufacturer?: string
  surfaceType?: string
}

export type CatalogFilters = {
  priceFrom: string
  priceTo: string
  manufacturers: string[]
  formats: string[]
  surfaceTypes: string[]
}