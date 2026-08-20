import { supabase } from "../lib/supabase";
import { slugify } from "../helpers/slug";
import type {
    Product,
    ProductImage,
    ProductVariant,
} from "../types/response/Product.type";

export type ProductQueryParams = {
    categorySlug?: string
    collectionName?: string
    priceFrom?: number
    priceTo?: number
    manufacturers?: string[]
    formats?: string[]
    surfaceTypes?: string[]
    onSale?: boolean
}

export const getProducts = async (
    params: ProductQueryParams = {},
): Promise<Product[]> => {
    try {
        // Поверхность и распродажа — свойства вариантов, а не товара.
        // Поэтому сначала находим id товаров, у которых есть подходящий вариант.
        let productIds: string[] | null = null

        if (params.surfaceTypes?.length || params.onSale) {
            let variantsQuery = supabase
                .from("public_product_variants_view")
                .select("product_id")

            if (params.surfaceTypes?.length) {
                variantsQuery = variantsQuery.in(
                    "surface_name",
                    params.surfaceTypes,
                )
            }

            if (params.onSale) {
                variantsQuery = variantsQuery.eq("is_on_sale", true)
            }

            const { data: variantRows, error: variantsError } =
                await variantsQuery

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

            // Под условие нет ни одного товара.
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

const UUID_RE =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export type ProductIndexItem = {
    id: string
    name: string
    sku: string
}

// Лёгкий индекс для резолва slug -> id (кэшируется на сессию)
export const getProductIndex = async (): Promise<ProductIndexItem[]> => {
    const { data, error } = await supabase
        .from("public_products_view")
        .select("id, name, sku")

    if (error) throw new Error(error.message)
    return (data ?? []) as ProductIndexItem[]
}

// Полный товар точечно по id
export const getProductById = async (
    id: string,
): Promise<Product | null> => {
    const { data, error } = await supabase
        .from("public_products_view")
        .select("*")
        .eq("id", id)
        .maybeSingle()

    if (error) throw new Error(error.message)
    return data
}

// slug/sku/id -> id товара по индексу
export const resolveProductId = (
    identifier: string,
    index: ProductIndexItem[],
): string | undefined => {
    if (UUID_RE.test(identifier)) return identifier

    const bySlug = index.find((item) => slugify(item.name) === identifier)
    if (bySlug) return bySlug.id

    const bySku = index.find((item) => item.sku === identifier)
    return bySku?.id
}

export type VariantIndexItem = {
    product_id: string
    size_name: string | null
    surface_name: string | null
    price: number | null
    discount_percent: number | null
    is_on_sale: boolean
    is_recommended: boolean
}

// Индекс вариантов по всему каталогу (около 600 строк) одним запросом
// БЕЗ фильтра по id.
//
// Так каталогу не нужен .in("id", [...]) на все товары выборки: такой URL
// на 476 товарах занимает 18,5 КБ, а с 700 товаров Supabase отвечает 400.
// Из индекса берём цену для сортировки, размеры, поверхности и флаги.
//
// Порядок (sort_order, id) обязателен: в нём перечисляются размеры
// и поверхности на карточке товара.
export const getVariantIndex = async (): Promise<VariantIndexItem[]> => {
    const { data, error } = await supabase
        .from("public_product_variants_view")
        .select(
            "product_id, size_name, surface_name, price, discount_percent, is_on_sale, is_recommended",
        )
        .order("sort_order")
        .order("id")

    if (error) throw new Error(error.message)
    return (data ?? []) as VariantIndexItem[]
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

export const getProductVariantsByProductIds = async (
    productIds: string[],
): Promise<ProductVariant[]> => {
    if (productIds.length === 0) return []

    const { data, error } = await supabase
        .from("public_product_variants_view")
        .select(
            "id, product_id, size_name, surface_name, price, discount_percent, is_on_sale, is_recommended, sort_order",
        )
        .in("product_id", productIds)
        .order("sort_order")
        .order("id")

    if (error) {
        throw new Error(error.message)
    }

    return data
}
