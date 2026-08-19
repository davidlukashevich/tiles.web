export type SaleItem = {
  id: string
  // Ссылка на товар по slug названия — как в каталоге (см. helpers/slug)
  href: string
  title: string
  subtitle: string
  description: string
  image: string

  price: string
  oldPrice?: string

  isSale?: boolean
}

export type SaleProduct = {
  id: number
  title: string
  size: string
  category: string
  oldPrice: number
  price: number
  image: string
}