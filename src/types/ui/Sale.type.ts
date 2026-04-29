export type SaleItem = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
}

export type SaleProduct = {
  id: number
  title: string
  size: string
  category: string
  oldPrice: number
  price: number
  discount: string
  image: string
}