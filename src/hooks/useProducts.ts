import { useQuery } from "@tanstack/react-query"
import {
  getProductImagesByProductIds,
  getProducts,
  type ProductQueryParams,
} from "../api/product.api"

export const useProducts = (params: ProductQueryParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    enabled: Boolean(params.categorySlug || params.collectionName),
  })
}

export const useProductImages = (productIds: string[]) => {
  return useQuery({
    queryKey: ["product-images", productIds],
    queryFn: () => getProductImagesByProductIds(productIds),
    enabled: productIds.length > 0,
  })
}
