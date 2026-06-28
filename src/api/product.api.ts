import { supabase } from "../lib/supabase";
import type { Product, ProductImage } from "../types/response/Product.type";

export type ProductQueryParams = {
    categorySlug?: string
    collectionName?: string
    priceFrom?: number
    priceTo?: number
    manufacturers?: string[]
    formats?: string[]
    surfaceTypes?: string[]
}

export const getProducts = async (
    params: ProductQueryParams = {},
): Promise<Product[]> => {
    try {
        // Поверхность есть только у вариантов, поэтому сначала находим id
        // товаров, у которых есть вариант с нужной поверхностью.
        let productIds: string[] | null = null

        if (params.surfaceTypes?.length) {
            const { data: variantRows, error: variantsError } = await supabase
                .from("public_product_variants_view")
                .select("product_id")
                .in("surface_name", params.surfaceTypes)

            if (variantsError) {
                throw variantsError
            }

            productIds = [
                ...new Set(
                    (variantRows ?? []).map(
                        (row) => row.product_id as string,
                    ),
                ),
            ]

            // Под выбранную поверхность нет ни одного товара.
            if (productIds.length === 0) {
                return []
            }
        }

        let query = supabase
            .from("public_products_view")
            .select("*")

        if (productIds) {
            query = query.in("id", productIds)
        }

        if (params.categorySlug) {
            query = query.eq("category_slug", params.categorySlug)
        }

        if (params.collectionName) {
            query = query.eq("collection_name", params.collectionName)
        }

        if (params.manufacturers?.length) {
            query = query.in("brand_name", params.manufacturers)
        }

        if (params.formats?.length) {
            query = query.in("category_name", params.formats)
        }

        if (params.priceFrom != null) {
            query = query.gte("price_from", params.priceFrom)
        }

        if (params.priceTo != null) {
            query = query.lte("price_from", params.priceTo)
        }

        const { data, error } = await query.order("name")

        if (error) {
            throw error
        }

        return data
    } catch (error) {
        console.error("Failed to fetch products:", error)
        throw error
    }
}

export const getProductImagesByProductIds = async (
    productIds: string[],
): Promise<ProductImage[]> => {
    if (productIds.length === 0) return []

    const { data, error } = await supabase
        .from("public_product_images_view")
        .select("id, product_id, image_url, image_path, sort_order")
        .in("product_id", productIds)
        .order("sort_order")
        .order("id")

    if (error) {
        throw new Error(error.message)
    }

    return data
}
