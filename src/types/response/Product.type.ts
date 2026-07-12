export type Product = {
  id: string
  name: string
  sku: string

  category_id: string
  category_name: string
  category_slug: string

  youtube_url: string | null

  brand_name: string | null
  country_name: string | null
  collection_name: string | null
  sort_name: string | null

  brand_option_id: string | null

  price_from: number | null
  price_to: number | null

  variants_count: number

  created_at: string
  updated_at: string
}

export type ProductImage = {
  id: string
  product_id: string
  image_url: string
  image_path: string | null
  sort_order: number
}

export type ProductVariant = {
  id: string
  product_id: string
  size_name: string | null
  surface_name: string | null
  price: number | null
  discount_percent: number | null
  is_on_sale: boolean
  is_recommended: boolean
  sort_order: number
}

export type ProductWithImage = Product & {
  image_url: string | null
}

// То, что реально показывает карточка каталога: товар + картинка + размеры + флаги
export type CatalogCardProduct = ProductWithImage & {
  sizes: string[]
  surfaces: string[]
  isOnSale: boolean
  isRecommended: boolean
  displayPrice: number | null
  displayOldPrice?: number
  priceIsFrom: boolean
}