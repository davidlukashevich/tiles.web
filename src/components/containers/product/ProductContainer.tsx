import { useEffect, useMemo, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import ProductView from "../../ui/product/Product"
import {
  isFavorite,
  toggleFavorite,
} from "../../../helpers/Favorite/favorite"
import {
  useProduct,
  useProductImages,
  useProductVariants,
} from "../../../hooks/useProducts"
import { productHrefBySlug } from "../../../helpers/slug"
import { computeDisplayPrice, priceWithDiscount } from "../../../helpers/price"

const ProductContainer = () => {
  const [isRequestOpen, setIsRequestOpen] = useState(false)
  const [favorite, setFavorite] = useState(false)

  const { id } = useParams()
  const identifier = id ?? ""

  // Куда ведёт «В каталог» — на страницу, с которой пришли (с ?page), иначе в общий каталог
  const location = useLocation()
  const backHref =
    (location.state as { from?: string } | null)?.from ?? "/catalog/tiles"

  const { data: product = null, isLoading: isProductLoading } =
    useProduct(identifier)

  const productIds = useMemo(
    () => (product ? [product.id] : []),
    [product],
  )

  const { data: images = [], isLoading: isImagesLoading } =
    useProductImages(productIds)
  const { data: variants = [], isLoading: isVariantsLoading } =
    useProductVariants(productIds)

  const viewProduct = useMemo(() => {
    if (!product) return undefined

    const sizes = [
      ...new Set(
        variants
          .map((variant) => variant.size_name)
          .filter((size): size is string => Boolean(size)),
      ),
    ]
    const surfaces = [
      ...new Set(
        variants
          .map((variant) => variant.surface_name)
          .filter((surface): surface is string => Boolean(surface)),
      ),
    ]

    // Минимальная цена со скидкой + перечёркнутая исходная
    const display = computeDisplayPrice(variants)
    const price = display.price ?? product.price_from ?? 0
    const oldPrice = display.oldPrice

    const gallery = images.map((image) => image.image_url)

    const characteristics: { label: string; value: string }[] = []
    if (sizes.length)
      characteristics.push({ label: "Размер", value: sizes.join(", ") })
    if (surfaces.length)
      characteristics.push({
        label: "Поверхность",
        value: surfaces.join(", "),
      })
    if (product.brand_name)
      characteristics.push({
        label: "Производитель",
        value: product.brand_name,
      })
    if (product.country_name)
      characteristics.push({ label: "Страна", value: product.country_name })
    if (product.collection_name)
      characteristics.push({
        label: "Коллекция",
        value: product.collection_name,
      })
    if (product.sort_name)
      characteristics.push({ label: "Сорт", value: product.sort_name })
    if (product.sku)
      characteristics.push({ label: "Артикул", value: product.sku })

    // Список вариантов: у каждого своя цена и флаги
    const viewVariants = variants.map((variant) => {
      const finalPrice = priceWithDiscount(
        variant.price,
        variant.discount_percent,
      )
      const hasDiscount =
        variant.price != null &&
        variant.discount_percent != null &&
        Number(variant.discount_percent) > 0

      return {
        id: variant.id,
        size: variant.size_name ?? "—",
        surface: variant.surface_name ?? "—",
        price: finalPrice,
        oldPrice: hasDiscount ? Number(variant.price) : undefined,
        discountPercent: hasDiscount ? Number(variant.discount_percent) : undefined,
        isOnSale: variant.is_on_sale,
        isRecommended: variant.is_recommended,
      }
    })

    return {
      id: product.id,
      sku: product.sku,
      title: product.name,
      category: product.category_name,
      collection: product.collection_name ?? "",
      manufacturer: product.brand_name ?? undefined,
      country: product.country_name ?? undefined,
      price,
      oldPrice,
      priceIsFrom: display.isFrom,
      image: gallery[0] ?? "",
      images: gallery,
      characteristics,
      variants: viewVariants,
      youtubeUrl: product.youtube_url,
    }
  }, [product, images, variants])

  const isLoading =
    isProductLoading ||
    (productIds.length > 0 && (isImagesLoading || isVariantsLoading))

  useEffect(() => {
    if (!product) return

    setFavorite(isFavorite(product.id))

    const handleFavoritesChanged = () => {
      setFavorite(isFavorite(product.id))
    }

    window.addEventListener("favorites:changed", handleFavoritesChanged)
    window.addEventListener("storage", handleFavoritesChanged)

    return () => {
      window.removeEventListener("favorites:changed", handleFavoritesChanged)
      window.removeEventListener("storage", handleFavoritesChanged)
    }
  }, [product])

  const handleToggleFavorite = () => {
    if (!viewProduct) return

    const nextState = toggleFavorite({
      id: viewProduct.id,
      title: viewProduct.title,
      category: viewProduct.category,
      image: viewProduct.image,
      price: viewProduct.price,
      oldPrice: viewProduct.oldPrice,
      href: productHrefBySlug(viewProduct.title),
    })

    setFavorite(nextState)
  }

  return (
    <ProductView
      product={viewProduct}
      isLoading={isLoading}
      backHref={backHref}
      isRequestOpen={isRequestOpen}
      isFavorite={favorite}
      onOpenRequest={() => setIsRequestOpen(true)}
      onCloseRequest={() => setIsRequestOpen(false)}
      onToggleFavorite={handleToggleFavorite}
    />
  )
}

export default ProductContainer
