import { useEffect, useMemo, useRef, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"

import CatalogView from "../../ui/catalog/CatalogView"

import type { CatalogFilters } from "../../../types/ui/Catalog.type"
import type {
  CatalogCardProduct,
  ProductWithImage,
} from "../../../types/response/Product.type"

import {
  getFavorites,
  toggleFavorite,
} from "../../../helpers/Favorite/favorite"

import { useCategories } from "../../../hooks/useCategories"
import {
  useProductImages,
  useProducts,
  useProductVariants,
} from "../../../hooks/useProducts"
import { useImagesReady } from "../../../hooks/useImagesReady"
import { productHrefBySlug } from "../../../helpers/slug"
import { computeDisplayPrice } from "../../../helpers/price"
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

const PRODUCTS_PER_PAGE = 9

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

  // Корень «Керамогранит» — показываем все товары (без фильтра категории)
  const isTilesRoot = !isSelectionPage && activeCategory === "tiles"

  // Распродажа — товары, у которых есть вариант с is_on_sale = true
  const isSalePage = !isSelectionPage && activeCategory === "sale"

  const productsEnabled = isSelectionPage
    ? Boolean(collectionName)
    : isTilesRoot || isSalePage
      ? true
      : Boolean(categorySlug)

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
      onSale: isSalePage ? true : undefined,
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
  }, [isSelectionPage, isSalePage, categorySlug, collectionName, appliedFilters])

  const { data: productsData = [], isLoading: isProductsLoading } =
    useProducts(productParams, { enabled: productsEnabled })

  // Если запрос выключен (например, корень «Сопутствующие товары»),
  // не показываем данные, даже если они лежат в кэше по такому же ключу.
  const products = productsEnabled ? productsData : []

  const productIds = useMemo(() => {
    return products.map((product) => product.id)
  }, [products])

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

  // product_id -> варианты (для размеров/поверхностей/флагов/цены)
  const variantsByProduct = useMemo(() => {
    const map = new Map<string, typeof productVariants>()
    productVariants.forEach((variant) => {
      const list = map.get(variant.product_id) ?? []
      list.push(variant)
      map.set(variant.product_id, list)
    })
    return map
  }, [productVariants])

  const productsWithImages = useMemo<CatalogCardProduct[]>(() => {
    return products.map((product) => {
      const variants = variantsByProduct.get(product.id) ?? []

      const sizes = [
        ...new Set(
          variants
            .map((v) => v.size_name)
            .filter((s): s is string => Boolean(s)),
        ),
      ]
      const surfaces = [
        ...new Set(
          variants
            .map((v) => v.surface_name)
            .filter((s): s is string => Boolean(s)),
        ),
      ]

      const display = computeDisplayPrice(variants)

      return {
        ...product,
        image_url: imagesMap.get(product.id) ?? null,
        sizes,
        surfaces,
        isOnSale: variants.some((v) => v.is_on_sale),
        isRecommended: variants.some((v) => v.is_recommended),
        displayPrice: display.price ?? product.price_from,
        displayOldPrice: display.oldPrice,
        priceIsFrom: display.isFrom,
      }
    })
  }, [products, imagesMap, variantsByProduct])

  // Пагинация — 9 карточек на страницу. Страница хранится в URL (?page=N),
  // чтобы «назад» из карточки товара возвращал на ту же страницу.
  const [searchParams, setSearchParams] = useSearchParams()

  const pageParam = Number(searchParams.get("page"))
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1

  const setPageParam = (next: number, replace: boolean) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev)
        if (next <= 1) params.delete("page")
        else params.set("page", String(next))
        return params
      },
      { replace },
    )
  }

  const pageCount = Math.max(
    1,
    Math.ceil(productsWithImages.length / PRODUCTS_PER_PAGE),
  )

  // Не остаёмся на несуществующей странице (список сократился) — но не трогаем,
  // пока товары ещё грузятся, иначе собьём восстановление ?page при заходе.
  useEffect(() => {
    if (!isProductsLoading && page > pageCount) {
      setPageParam(pageCount, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProductsLoading, page, pageCount])

  const pagedProducts = useMemo(() => {
    const start = (page - 1) * PRODUCTS_PER_PAGE
    return productsWithImages.slice(start, start + PRODUCTS_PER_PAGE)
  }, [productsWithImages, page])

  // Предзагружаем картинки только текущей страницы
  const imageUrls = useMemo(() => {
    return pagedProducts
      .map((product) => product.image_url)
      .filter((url): url is string => Boolean(url))
  }, [pagedProducts])

  const imagesReady = useImagesReady(imageUrls)

  // Пока грузятся товары, их картинки (запрос) или пока картинки
  // физически не догрузились в браузере — показываем состояние загрузки.
  const isLoading =
    isProductsLoading ||
    (productIds.length > 0 && (isImagesLoading || isVariantsLoading)) ||
    (imageUrls.length > 0 && !imagesReady)

  // Плавный скролл вверх — но ТОЛЬКО после того, как новая страница догрузилась
  // (вёрстка стабильна), иначе перерисовка в скелетон гасит анимацию.
  const scrollPendingRef = useRef(false)

  const handlePageChange = (next: number) => {
    scrollPendingRef.current = true
    setPageParam(next, true)
  }

  useEffect(() => {
    if (scrollPendingRef.current && !isLoading) {
      scrollPendingRef.current = false
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [isLoading, page])

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
      href: productHrefBySlug(product.name),
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
      products={pagedProducts}
      isLoading={isLoading}
      page={page}
      pageCount={pageCount}
      onPageChange={handlePageChange}
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
        setPageParam(1, true)
      }}
      onApplyFilters={() => {
        setAppliedFilters(filters)
        setPageParam(1, true)
        setIsFilterOpen(false)
      }}
      onToggleFavorite={handleToggleFavorite}
    />
  )
}

export default CatalogContainer