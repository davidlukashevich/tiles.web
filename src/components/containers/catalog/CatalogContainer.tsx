import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import CatalogView from "../../ui/catalog/CatalogView"
import type {
  CatalogFilters,
  CatalogGroup,
  CatalogProduct,
} from "../../../types/ui/Catalog.type"
import {
  getFavorites,
  toggleFavorite,
} from "../../../helpers/Favorite/favorite"

const catalogGroups: CatalogGroup[] = [
  {
    title: "Плитка",
    value: "tiles",
    href: "/catalog/tiles",
    items: [
      { label: "60x60", value: "60x60", href: "/catalog/tiles/60x60" },
      { label: "80x80", value: "80x80", href: "/catalog/tiles/80x80" },
      { label: "120x60", value: "120x60", href: "/catalog/tiles/120x60" },
      { label: "120x20", value: "120x20", href: "/catalog/tiles/120x20" },
      { label: "160x80", value: "160x80", href: "/catalog/tiles/160x80" },
      {
        label: "Керамическая плитка",
        value: "ceramic-tile",
        href: "/catalog/ceramic-tile",
      },
    ],
  },
  {
    title: "Сопутствующие товары",
    value: "accessories",
    href: "/catalog/accessories",
    items: [
      {
        label: "Строительные смеси",
        value: "mixes",
        href: "/catalog/accessories/mixes",
      },
      {
        label: "Затирка",
        value: "grout",
        href: "/catalog/accessories/grout",
      },
      {
        label: "Силикон",
        value: "silicone",
        href: "/catalog/accessories/silicone",
      },
      {
        label: "Прочее",
        value: "other",
        href: "/catalog/accessories/other",
      },
    ],
  },
  {
    title: "Распродажа",
    value: "sale",
    href: "/catalog/sale",
    items: [],
  },
]

const products: CatalogProduct[] = [
  {
    id: "1",
    title: "Керамогранит светлый 60x60",
    category: "Керамогранит · 60x60",
    categoryValue: "60x60",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 82,
    oldPrice: 99,
    href: "/product/1",
    manufacturer: "Kerama Marazzi",
    formats: ["60x60", "120x60"],
    surfaceTypes: ["Глянцевая", "Лаппатированная"],
    isSale: true,
  },
  {
    id: "2",
    title: "Керамогранит под мрамор 80x80",
    category: "Керамогранит · 80x80",
    categoryValue: "80x80",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 79,
    oldPrice: 95,
    href: "/product/2",
    manufacturer: "Paradyz",
    formats: ["80x80"],
    surfaceTypes: ["Лаппатированная"],
    isNew: true,
    isSale: true,
  },
  {
    id: "3",
    title: "Керамогранит серый 60x60",
    category: "Керамогранит · 60x60",
    categoryValue: "60x60",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 69,
    href: "/product/3",
    manufacturer: "Cersanit",
    formats: ["60x60"],
    surfaceTypes: ["Матовая"],
    isNew: true,
  },
  {
    id: "4",
    title: "Керамогранит бетон 120x60",
    category: "Керамогранит · 120x60",
    categoryValue: "120x60",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 91,
    href: "/product/4",
    manufacturer: "Cersanit",
    formats: ["120x60"],
    surfaceTypes: ["Матовая"],
  },
  {
    id: "5",
    title: "Керамогранит 120x20",
    category: "Керамогранит · 120x20",
    categoryValue: "120x20",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 88,
    href: "/product/5",
    manufacturer: "Kerama Marazzi",
    formats: ["120x20"],
    surfaceTypes: ["Структурная"],
    isNew: true,
  },
  {
    id: "6",
    title: "Керамогранит 160x80",
    category: "Керамогранит · 160x80",
    categoryValue: "160x80",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 125,
    href: "/product/6",
    manufacturer: "Paradyz",
    formats: ["160x80"],
    surfaceTypes: ["Матовая", "Глянцевая"],
  },
  {
    id: "7",
    title: "Керамическая плитка настенная",
    category: "Керамическая плитка",
    categoryValue: "ceramic-tile",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 55,
    href: "/product/7",
    manufacturer: "Cersanit",
    formats: ["30x60"],
    surfaceTypes: ["Глянцевая"],
    isNew: true,
  },
  {
    id: "8",
    title: "Строительная смесь для плитки",
    category: "Сопутствующие товары · Строительные смеси",
    categoryValue: "mixes",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 25,
    href: "/product/8",
    manufacturer: "Ceresit",
  },
  {
    id: "9",
    title: "Затирка влагостойкая",
    category: "Сопутствующие товары · Затирка",
    categoryValue: "grout",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 18,
    oldPrice: 24,
    href: "/product/9",
    manufacturer: "Mapei",
    isSale: true,
  },
  {
    id: "10",
    title: "Силикон санитарный",
    category: "Сопутствующие товары · Силикон",
    categoryValue: "silicone",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 14,
    href: "/product/10",
    manufacturer: "Soudal",
  },
  {
    id: "11",
    title: "Инструменты и прочие товары",
    category: "Сопутствующие товары · Прочее",
    categoryValue: "other",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 12,
    href: "/product/11",
    manufacturer: "Other",
  },
]

const initialFilters: CatalogFilters = {
  priceFrom: "",
  priceTo: "",
  manufacturers: [],
  formats: [],
  surfaceTypes: [],
}

const tileCategories = [
  "60x60",
  "80x80",
  "120x60",
  "120x20",
  "160x80",
  "ceramic-tile",
]

const accessoryCategories = ["mixes", "grout", "silicone", "other"]

const CatalogContainer = () => {
  const { type, section } = useParams()

  const activeCategory = section ?? type ?? "tiles"

  const [filters, setFilters] = useState<CatalogFilters>(initialFilters)
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
  }, [activeCategory])

  const activeGroup = useMemo(() => {
    return catalogGroups.find((group) => {
      return (
        group.value === activeCategory ||
        group.items.some((item) => item.value === activeCategory)
      )
    })
  }, [activeCategory])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const priceFrom = Number(filters.priceFrom || 0)
      const priceTo = Number(filters.priceTo || Infinity)

      const matchesCategory =
        activeCategory === "tiles"
          ? tileCategories.includes(product.categoryValue)
          : activeCategory === "accessories"
            ? accessoryCategories.includes(product.categoryValue)
            : activeCategory === "sale"
              ? product.isSale === true
              : product.categoryValue === activeCategory

      const matchesPrice = product.price >= priceFrom && product.price <= priceTo

      const matchesManufacturer =
        filters.manufacturers.length === 0 ||
        filters.manufacturers.includes(product.manufacturer ?? "")

      const matchesFormat =
        filters.formats.length === 0 ||
        product.formats?.some((format) => filters.formats.includes(format))

      const matchesSurface =
        filters.surfaceTypes.length === 0 ||
        product.surfaceTypes?.some((surface) =>
          filters.surfaceTypes.includes(surface)
        )

      return (
        matchesCategory &&
        matchesPrice &&
        matchesManufacturer &&
        matchesFormat &&
        matchesSurface
      )
    })
  }, [activeCategory, filters])

  const handleToggleFavorite = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: CatalogProduct
  ) => {
    event.preventDefault()
    event.stopPropagation()

    toggleFavorite({
      id: product.id,
      title: product.title,
      category: product.category,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice,
      href: product.href,
    })

    setFavoriteIds(getFavorites().map((item) => item.id))
  }

  const title = activeItem?.label ?? activeGroup?.title ?? "Каталог"

  const description =
    activeCategory === "sale"
      ? "Товары со скидками и выгодными предложениями. Используйте фильтр, чтобы быстрее найти подходящий вариант."
      : activeGroup?.value === "tiles"
        ? "Выберите плитку нужного формата. Используйте фильтр, чтобы быстрее найти подходящий вариант."
        : activeGroup?.value === "accessories"
          ? "Сопутствующие товары для укладки и ухода за плиткой."
          : "Выберите нужный товар из каталога."

  return (
    <CatalogView
      groups={catalogGroups}
      products={filteredProducts}
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
      onResetFilters={() => setFilters(initialFilters)}
      onApplyFilters={() => setIsFilterOpen(false)}
      onToggleFavorite={handleToggleFavorite}
    />
  )
}

export default CatalogContainer