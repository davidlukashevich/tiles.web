import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import CatalogView from "../../ui/catalog/CatalogView"

import type { CatalogFilters } from "../../../types/ui/Catalog.type"
import type { ProductWithImage } from "../../../types/response/Product.type"

import {
  getFavorites,
  toggleFavorite,
} from "../../../helpers/Favorite/favorite"

import { useCategories } from "../../../hooks/useCategories"
import { useProductImages, useProducts } from "../../../hooks/useProducts"
import type { ProductQueryParams } from "../../../api/product.api"

import { buildCatalogGroups } from "../../../helpers/Catalog/buildCatalogGroups"
import { collectionMap } from "../../../helpers/Catalog/collectionMap"
import { buildSelectionGroups } from "../../../helpers/Catalog/buildSelectionGroups"

const initialFilters: CatalogFilters = {
  priceFrom: "",
  priceTo: "",
  manufacturers: [],
  formats: [],
  surfaceTypes: [],
}

const PRODUCT_PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"

const CatalogContainer = () => {
  const { type, section, slug } = useParams()

  const isSelectionPage = type === "selections"

  const selectionSlug = isSelectionPage ? slug ?? section ?? "" : ""

  const activeCategory = isSelectionPage
    ? selectionSlug
    : slug ?? section ?? type ?? "tiles"

  const collectionName = collectionMap[selectionSlug] ?? ""

  const categorySlug =
    !isSelectionPage &&
      activeCategory !== "tiles" &&
      activeCategory !== "accessories" &&
      activeCategory !== "sale"
      ? activeCategory
      : ""

  const { data: categories = [] } = useCategories()

  const [filters, setFilters] = useState<CatalogFilters>(initialFilters)
  const [appliedFilters, setAppliedFilters] =
    useState<CatalogFilters>(initialFilters)

  const productParams = useMemo<ProductQueryParams>(() => {
    const priceFrom = Number(appliedFilters.priceFrom)
    const priceTo = Number(appliedFilters.priceTo)

    return {
      categorySlug: isSelectionPage ? undefined : categorySlug,
      collectionName: isSelectionPage ? collectionName : undefined,
      manufacturers: appliedFilters.manufacturers,
      formats: appliedFilters.formats,
      surfaceTypes: appliedFilters.surfaceTypes,
      priceFrom:
        appliedFilters.priceFrom && Number.isFinite(priceFrom)
          ? priceFrom
          : undefined,
      priceTo:
        appliedFilters.priceTo && Number.isFinite(priceTo)
          ? priceTo
          : undefined,
    }
  }, [isSelectionPage, categorySlug, collectionName, appliedFilters])

  const { data: products = [] } = useProducts(productParams)

  const productIds = useMemo(() => {
    return products.map((product) => product.id)
  }, [products])

  const { data: productImages = [] } = useProductImages(productIds)

  const imagesMap = useMemo(() => {
    const map = new Map<string, string>()

    productImages.forEach((image) => {
      if (!map.has(image.product_id)) {
        map.set(image.product_id, image.image_url)
      }
    })

    return map
  }, [productImages])

  const productsWithImages = useMemo<ProductWithImage[]>(() => {
    return products.map((product) => ({
      ...product,
      image_url: imagesMap.get(product.id) ?? null,
    }))
  }, [products, imagesMap])

  const catalogGroups = useMemo(() => {
    return isSelectionPage
      ? buildSelectionGroups()
      : buildCatalogGroups(categories)
  }, [isSelectionPage, categories])

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSectionsOpen, setIsSectionsOpen] = useState(false)
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

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

  const activeItem = useMemo(() => {
    return catalogGroups
      .flatMap((group) => group.items)
      .find((item) => item.value === activeCategory)
  }, [activeCategory, catalogGroups])

  const activeGroup = useMemo(() => {
    return catalogGroups.find((group) => {
      return (
        group.value === activeCategory ||
        group.items.some((item) => item.value === activeCategory)
      )
    })
  }, [activeCategory, catalogGroups])

  const handleToggleFavorite = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: ProductWithImage,
  ) => {
    event.preventDefault()
    event.stopPropagation()

    toggleFavorite({
      id: product.id,
      title: product.name,
      category: product.category_name,
      image: product.image_url ?? PRODUCT_PLACEHOLDER_IMAGE,
      price: product.price_from ?? 0,
      oldPrice: undefined,
      href: `/product/${product.sku}`,
    })

    setFavoriteIds(getFavorites().map((item) => item.id))
  }

  const title = isSelectionPage
    ? collectionName || activeItem?.label || "Подборка"
    : activeItem?.label ?? activeGroup?.title ?? "Каталог"

  const description = isSelectionPage
    ? "Подборка плитки с выразительным дизайном для современных интерьеров. Здесь собраны товары, которые помогают быстро подобрать подходящее решение по стилю, цвету и фактуре."
    : activeCategory === "sale"
      ? "Товары со скидками и выгодными предложениями. Используйте фильтр, чтобы быстрее найти подходящий вариант."
      : activeGroup?.value === "tiles"
        ? "Выберите плитку нужного формата. Используйте фильтр, чтобы быстрее найти подходящий вариант."
        : activeGroup?.value === "accessories"
          ? "Сопутствующие товары для укладки и ухода за плиткой."
          : "Выберите нужный товар из каталога."

  return (
    <CatalogView
      groups={catalogGroups}
      products={productsWithImages}
      favoriteIds={favoriteIds}
      activeCategory={activeCategory}
      title={title}
      description={description}
      filters={filters}
      isFilterOpen={isFilterOpen}
      isSectionsOpen={isSectionsOpen}
      onOpenFilter={() => setIsFilterOpen(true)}
      onCloseFilter={() => setIsFilterOpen(false)}
      onOpenSections={() => setIsSectionsOpen(true)}
      onCloseSections={() => setIsSectionsOpen(false)}
      onChangeFilters={setFilters}
      onResetFilters={() => {
        setFilters(initialFilters)
        setAppliedFilters(initialFilters)
      }}
      onApplyFilters={() => {
        setAppliedFilters(filters)
        setIsFilterOpen(false)
      }}
      onToggleFavorite={handleToggleFavorite}
    />
  )
}

export default CatalogContainer