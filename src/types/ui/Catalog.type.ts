export type CatalogGroupItem = {
  label: string
  href: string
  value: string
}

export type CatalogGroup = {
  title: string
  href: string
  value: string
  items: CatalogGroupItem[]
}

export type CatalogProduct = {
  id: string
  title: string
  category: string
  categoryValue: string
  image: string
  price: number
  oldPrice?: number
  href: string

  manufacturer?: string
  formats?: string[]
  surfaceTypes?: string[]

  isNew?: boolean
  isSale?: boolean
}

export type CatalogFilters = {
  priceFrom: string
  priceTo: string
  manufacturers: string[]
  formats: string[]
  surfaceTypes: string[]
}