import { useQuery } from "@tanstack/react-query"
import {
  getProductImagesByProductIds,
  getProducts,
  getProductVariantsByProductIds,
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

export const useProductVariants = (productIds: string[]) => {
  return useQuery({
    queryKey: ["product-variants", productIds],
    queryFn: () => getProductVariantsByProductIds(productIds),
    enabled: productIds.length > 0,
  })
}
