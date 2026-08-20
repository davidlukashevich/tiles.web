import { useQuery } from "@tanstack/react-query"
import {
  getProductById,
  getProductImagesByProductIds,
  getProductIndex,
  getVariantIndex,
  getProducts,
  getProductVariantsByProductIds,
  resolveProductId,
  type ProductQueryParams,
} from "../api/product.api"

export const useProducts = (
  params: ProductQueryParams,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    enabled:
      options?.enabled ??
      Boolean(params.categorySlug || params.collectionName),
  })
}

export const useProductImages = (productIds: string[]) => {
  return useQuery({
    queryKey: ["product-images", productIds],
    queryFn: () => getProductImagesByProductIds(productIds),
    enabled: productIds.length > 0,
  })
}

// Лёгкий индекс товаров (id + name + sku) — кэшируется на сессию
export const useProductIndex = (enabled = true) => {
  return useQuery({
    queryKey: ["product-index"],
    queryFn: getProductIndex,
    enabled,
    staleTime: Infinity,
  })
}

// Товар по slug/sku/id из URL: сперва резолвим id по индексу,
// затем тянем полный товар ТОЧЕЧНО по id.
export const useProduct = (identifier: string) => {
  const { data: index = [], isLoading: isIndexLoading } = useProductIndex(
    Boolean(identifier),
  )

  const id = identifier ? resolveProductId(identifier, index) : undefined

  const query = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id as string),
    enabled: Boolean(id),
  })

  return {
    ...query,
    // пока грузится индекс — считаем это загрузкой товара
    isLoading: isIndexLoading || (Boolean(id) && query.isLoading),
  }
}

// Индекс вариантов по всему каталогу — меняется редко, держим в кэше
// на сессию. Заменяет в каталоге запрос вариантов списком id.
export const useVariantIndex = () => {
  return useQuery({
    queryKey: ["variant-index"],
    queryFn: getVariantIndex,
    staleTime: Infinity,
  })
}

export const useProductVariants = (productIds: string[]) => {
  return useQuery({
    queryKey: ["product-variants", productIds],
    queryFn: () => getProductVariantsByProductIds(productIds),
    enabled: productIds.length > 0,
  })
}
