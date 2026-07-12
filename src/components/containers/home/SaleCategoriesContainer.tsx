import { useEffect, useMemo, useState } from "react"
import {
  getFavorites,
  toggleFavorite,
} from "../../../helpers/Favorite/favorite"
import type { SaleItem } from "../../../types/ui/Sale.type"
import SaleCategories from "../../ui/home/SaleCategories"
import {
  useProductImages,
  useProducts,
  useProductVariants,
} from "../../../hooks/useProducts"
import { useImagesReady } from "../../../hooks/useImagesReady"
import { productHrefBySlug } from "../../../helpers/slug"
import { computeDisplayPrice } from "../../../helpers/price"

const SALE_LIMIT = 4

const formatPrice = (value: number) => `${value} BYN`

const SaleCategoriesContainer = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  const { data: products = [], isLoading: isProductsLoading } = useProducts(
    { onSale: true },
    { enabled: true },
  )

  const topProducts = useMemo(
    () => products.slice(0, SALE_LIMIT),
    [products],
  )

  const productIds = useMemo(
    () => topProducts.map((product) => product.id),
    [topProducts],
  )

  const { data: productImages = [], isLoading: isImagesLoading } =
    useProductImages(productIds)
  const { data: productVariants = [], isLoading: isVariantsLoading } =
    useProductVariants(productIds)

  const imagesMap = useMemo(() => {
    const map = new Map<string, string>()
    productImages.forEach((image) => {
      if (!map.has(image.product_id)) {
        map.set(image.product_id, image.image_url)
      }
    })
    return map
  }, [productImages])

  const saleItems = useMemo<SaleItem[]>(() => {
    return topProducts.map((product) => {
      const variants = productVariants.filter(
        (variant) => variant.product_id === product.id,
      )

      const surfaces = [
        ...new Set(
          variants
            .map((variant) => variant.surface_name)
            .filter((surface): surface is string => Boolean(surface)),
        ),
      ]

      // Минимальная цена со скидкой + перечёркнутая исходная
      const display = computeDisplayPrice(variants)
      const priceValue = display.price ?? product.price_from
      const price =
        priceValue != null
          ? `${display.isFrom ? "от " : ""}${formatPrice(priceValue)}`
          : "Цена по запросу"
      const oldPrice = display.oldPrice
        ? formatPrice(display.oldPrice)
        : undefined

      const subtitle = product.category_name
      const description = [surfaces.join(", "), product.brand_name]
        .filter(Boolean)
        .join(" · ")

      return {
        id: product.id,
        title: product.name,
        subtitle,
        description,
        image: imagesMap.get(product.id) ?? "",
        price,
        oldPrice,
        isSale: true,
        href: productHrefBySlug(product.name),
      }
    })
  }, [topProducts, productVariants, imagesMap])

  const imageUrls = useMemo(
    () => saleItems.map((item) => item.image).filter(Boolean),
    [saleItems],
  )

  const imagesReady = useImagesReady(imageUrls)

  const isLoading =
    isProductsLoading ||
    (productIds.length > 0 && (isImagesLoading || isVariantsLoading)) ||
    (imageUrls.length > 0 && !imagesReady)

  useEffect(() => {
    const syncFavorites = () => {
      setFavoriteIds(getFavorites().map((item) => item.id))
    }

    syncFavorites()

    window.addEventListener("favorites:changed", syncFavorites)
    window.addEventListener("storage", syncFavorites)

    return () => {
      window.removeEventListener("favorites:changed", syncFavorites)
      window.removeEventListener("storage", syncFavorites)
    }
  }, [])

  const handleToggleFavorite = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: SaleItem,
  ) => {
    event.preventDefault()
    event.stopPropagation()

    toggleFavorite({
      id: item.id,
      title: item.title,
      category: item.subtitle,
      image: item.image,
      price: Number(item.price.replace(/[^\d.]/g, "")),
      oldPrice: item.oldPrice
        ? Number(item.oldPrice.replace(/[^\d.]/g, ""))
        : undefined,
      href: item.href ?? `/product/${item.id}`,
    })

    setFavoriteIds(getFavorites().map((item) => item.id))
  }

  return (
    <SaleCategories
      saleItems={saleItems}
      isLoading={isLoading}
      favoriteIds={favoriteIds}
      onToggleFavorite={handleToggleFavorite}
    />
  )
}

export default SaleCategoriesContainer
