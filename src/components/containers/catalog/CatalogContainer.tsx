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
  useProductHrefs,
  useProductImages,
  useProducts,
  useVariantIndex,
} from "../../../hooks/useProducts"
import { useImagesReady } from "../../../hooks/useImagesReady"
import { productHrefBySlug } from "../../../helpers/slug"
import { byDisplayPriceAsc, computeDisplayPrice } from "../../../helpers/price"
import { matchesSearch } from "../../../helpers/Catalog/matchesSearch"
import {
  normalizeSize,
  sizeFromCategoryName,
} from "../../../helpers/Catalog/sizeMatch"
import type { ProductQueryParams } from "../../../api/product.api"

import { buildCatalogGroups } from "../../../helpers/Catalog/buildCatalogGroups"
import {
  collectionMap,
  collectionSeoPhrase,
} from "../../../helpers/Catalog/collectionMap"
import { buildSelectionGroups } from "../../../helpers/Catalog/buildSelectionGroups"
import { useSeo } from "../../../hooks/useSeo"
import { buildTitle } from "../../../helpers/seo/site"

const initialFilters: CatalogFilters = {
  priceFrom: "",
  priceTo: "",
  manufacturers: [],
  formats: [],
  surfaceTypes: [],
}

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
      // categorySlug тут не передаём: товар должен попадать в категорию
      // и по размеру своего варианта, а нормализовать «х»/«x» в SQL нельзя.
      // Поэтому грузим выборку целиком и отбираем на клиенте (см. ниже).
      categorySlug: undefined,
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
  }, [isSelectionPage, isSalePage, collectionName, appliedFilters])

  const { data: productsData = [], isLoading: isProductsLoading } =
    useProducts(productParams, { enabled: productsEnabled })

  // Если запрос выключен (например, корень «Сопутствующие товары»),
  // не показываем данные, даже если они лежат в кэше по такому же ключу.
  const allProducts = productsEnabled ? productsData : []

  // Один запрос вариантов на весь каталог вместо .in("id", [...]) на всю
  // выборку: тот URL занимал 18,5 КБ и с ~700 товаров начал бы падать.
  const { data: variantIndex = [], isLoading: isVariantsLoading } =
    useVariantIndex()

  // product_id -> его варианты (цена, размеры, поверхности, флаги)
  const variantsByProduct = useMemo(() => {
    const map = new Map<string, typeof variantIndex>()

    variantIndex.forEach((variant) => {
      const list = map.get(variant.product_id) ?? []
      list.push(variant)
      map.set(variant.product_id, list)
    })

    return map
  }, [variantIndex])

  // product_id -> размеры его вариантов (нормализованные)
  const sizesByProduct = useMemo(() => {
    const map = new Map<string, Set<string>>()

    variantIndex.forEach(({ product_id, size_name }) => {
      if (!size_name) return
      const set = map.get(product_id) ?? new Set<string>()
      set.add(normalizeSize(size_name))
      map.set(product_id, set)
    })

    return map
  }, [variantIndex])

  // Размер текущей категории берём из названия, а не из slug: slug'и в БД
  // местами разошлись с названиями («Плитка 100x100» -> slug «plitka»).
  const categorySize = useMemo(() => {
    if (!categorySlug) return ""

    const fromCategories = categories.find(
      (category) => category.slug === categorySlug,
    )

    if (fromCategories) return sizeFromCategoryName(fromCategories.name)

    // Фолбэк на случай, если категории ещё не пришли
    const fromProducts = productsData.find(
      (product) => product.category_slug === categorySlug,
    )

    return fromProducts
      ? sizeFromCategoryName(fromProducts.category_name ?? "")
      : ""
  }, [categories, productsData, categorySlug])

  // Адреса товаров: у одноимённых позиций в адрес входит артикул,
  // иначе обе карточки вели бы на одну страницу.
  const productHrefs = useProductHrefs()

  // Название текущего раздела — им подписываем карточки, найденные
  // по варианту, а не по своей категории.
  const categoryTitle = useMemo(() => {
    if (!categorySlug) return ""

    return (
      categories.find((category) => category.slug === categorySlug)?.name ?? ""
    )
  }, [categories, categorySlug])

  // Товар виден в категории, если он к ней привязан ИЛИ у него есть вариант
  // такого размера. Объединение, а не замена: иначе товар пропал бы из своей
  // же категории, когда среди вариантов нет её размера.
  const products = useMemo(() => {
    if (!allProducts.length || !categorySlug) return allProducts

    return allProducts.filter(
      (product) =>
        product.category_slug === categorySlug ||
        (categorySize !== "" &&
          sizesByProduct.get(product.id)?.has(categorySize)),
    )
  }, [allProducts, categorySlug, categorySize, sizesByProduct])

  // Карточки строим без картинок: они нужны только для видимых девяти,
  // а запрос за ними уходит уже после пагинации (см. ниже).
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

      // Товар попадает в раздел и по варианту: «Berlin антрацит» из
      // категории 120x60 виден в разделе 60x60, потому что такой вариант
      // у него есть. Подпись при этом должна называть раздел, в котором
      // человек находится, иначе карточка противоречит заголовку страницы.
      const matchedByVariant =
        categorySize !== "" &&
        product.category_slug !== categorySlug &&
        sizes.some((size) => normalizeSize(size) === categorySize)

      const categoryLabel =
        matchedByVariant && categoryTitle
          ? categoryTitle
          : product.category_name

      // Искомый размер — первым в списке, остальные следом
      const orderedSizes = matchedByVariant
        ? [
            ...sizes.filter((size) => normalizeSize(size) === categorySize),
            ...sizes.filter((size) => normalizeSize(size) !== categorySize),
          ]
        : sizes

      return {
        ...product,
        category_name: categoryLabel,
        href:
          productHrefs.get(product.id) ?? productHrefBySlug(product.name),
        image_url: null,
        sizes: orderedSizes,
        surfaces,
        isOnSale: variants.some((v) => v.is_on_sale),
        isRecommended: variants.some((v) => v.is_recommended),
        displayPrice: display.price ?? product.price_from,
        displayOldPrice: display.oldPrice,
        priceIsFrom: display.isFrom,
      }
    })
  }, [
    products,
    variantsByProduct,
    categorySize,
    categorySlug,
    categoryTitle,
    productHrefs,
  ])

  // Страница и поисковый запрос живут в URL (?page=N&q=...), чтобы «назад»
  // из карточки товара возвращал к тем же результатам.
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get("q") ?? ""

  // Поиск по названию — до сортировки и пагинации, иначе фильтровалась бы
  // только текущая страница.
  const foundProducts = useMemo(
    () =>
      productsWithImages.filter((product) =>
        matchesSearch(product.name, search),
      ),
    [productsWithImages, search],
  )

  // Всегда от дешёвых к дорогим. Сортируем до пагинации, иначе порядок
  // получился бы только внутри страницы.
  const sortedProducts = useMemo(
    () => [...foundProducts].sort(byDisplayPriceAsc),
    [foundProducts],
  )

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

  // Новый запрос — всегда с первой страницы. replace, чтобы набор текста
  // не забивал историю браузера.
  const handleSearchChange = (next: string) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev)
        if (next.trim()) params.set("q", next)
        else params.delete("q")
        params.delete("page")
        return params
      },
      { replace: true },
    )
  }

  const pageCount = Math.max(
    1,
    Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE),
  )

  // Не остаёмся на несуществующей странице (список сократился) — но не трогаем,
  // пока товары ещё грузятся, иначе собьём восстановление ?page при заходе.
  useEffect(() => {
    if (!isProductsLoading && page > pageCount) {
      setPageParam(pageCount, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProductsLoading, page, pageCount])

  const pageProducts = useMemo(() => {
    const start = (page - 1) * PRODUCTS_PER_PAGE
    return sortedProducts.slice(start, start + PRODUCTS_PER_PAGE)
  }, [sortedProducts, page])

  // Картинки запрашиваем только для девяти видимых товаров: URL получается
  // ~350 байт вместо 18,5 КБ на всю выборку.
  const pageProductIds = useMemo(
    () => pageProducts.map((product) => product.id),
    [pageProducts],
  )

  const { data: productImages = [], isLoading: isImagesLoading } =
    useProductImages(pageProductIds)

  const imagesMap = useMemo(() => {
    const map = new Map<string, string>()

    productImages.forEach((image) => {
      if (!map.has(image.product_id)) {
        map.set(image.product_id, image.image_url)
      }
    })

    return map
  }, [productImages])

  const pagedProducts = useMemo(
    () =>
      pageProducts.map((product) => ({
        ...product,
        image_url: imagesMap.get(product.id) ?? null,
      })),
    [pageProducts, imagesMap],
  )

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
    isVariantsLoading ||
    (pageProductIds.length > 0 && isImagesLoading) ||
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

  // Размеры из «Других размеров» лежат во вложенном children, поэтому
  // разворачиваем оба уровня: иначе для 34 категорий из 39 не находится
  // активный пункт и заголовок страницы падает в общее «Каталог».
  const flatItems = useMemo(() => {
    return catalogGroups.flatMap((group) =>
      group.items.flatMap((item) => [item, ...(item.children ?? [])]),
    )
  }, [catalogGroups])

  const activeItem = useMemo(() => {
    return flatItems.find((item) => item.value === activeCategory)
  }, [activeCategory, flatItems])

  const activeGroup = useMemo(() => {
    return catalogGroups.find((group) => {
      return (
        group.value === activeCategory ||
        group.items.some(
          (item) =>
            item.value === activeCategory ||
            item.children?.some((child) => child.value === activeCategory),
        )
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
      image: product.image_url ?? "",
      price: product.price_from ?? 0,
      oldPrice: undefined,
      href: productHrefs.get(product.id) ?? productHrefBySlug(product.name),
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

  // canonical берётся из pathname без query: страницы фильтров и пагинации
  // не должны попадать в индекс как отдельные документы.
  // Для подборок заголовок строится иначе: в меню пункт называется
  // «Дерево», а ищут «плитку под дерево».
  const seoSubject = isSelectionPage
    ? `Плитка ${collectionSeoPhrase[selectionSlug] ?? (collectionName || title)}`
    : title

  useSeo({
    title: buildTitle(`${seoSubject} — купить в Иваново`),
    // Без служебного хвоста про фильтр: в сниппет влезает ~160 символов,
    // и они должны работать на клик, а не на инструкцию по сайту.
    description: `${seoSubject} в Иваново: цены, размеры и фото. Доставка по всей Беларуси, консультация по подбору.`,
  })

  return (
    <CatalogView
      groups={catalogGroups}
      products={pagedProducts}
      search={search}
      foundCount={sortedProducts.length}
      onSearchChange={handleSearchChange}
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