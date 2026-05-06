import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import type {
  CatalogFilters,
  CatalogGroup,
  CatalogProduct,
} from "../../../types/ui/Catalog.type"
import CatalogView from "../../ui/catalog/CatalogView"

const catalogGroups: CatalogGroup[] = [
  {
    title: "Плитка",
    items: [
      {
        label: "60x60",
        href: "/catalog/tiles/60x60",
        value: "60x60",
      },
      {
        label: "80x80",
        href: "/catalog/tiles/80x80",
        value: "80x80",
      },
      {
        label: "100x100",
        href: "/catalog/tiles/100x100",
        value: "100x100",
      },
      {
        label: "120x60",
        href: "/catalog/tiles/120x60",
        value: "120x60",
      },
    ],
  },
  {
    title: "Сопутствующие товары",
    items: [
      {
        label: "Клей",
        href: "/catalog/accessories/glue",
        value: "glue",
      },
      {
        label: "Герметик",
        href: "/catalog/accessories/sealant",
        value: "sealant",
      },
      {
        label: "Фуга",
        href: "/catalog/accessories/grout",
        value: "grout",
      },
    ],
  },
]

const products: CatalogProduct[] = [
  {
    id: "1",
    title: "Керамогранит серый 60x60",
    category: "Плитка · 60x60",
    categoryValue: "60x60",
    format: "60x60",
    manufacturer: "Cersanit",
    surfaceType: "Матовая",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 69,
    oldPrice: 89,
    badge: "-22%",
    href: "/product/1",
  },
  {
    id: "2",
    title: "Плитка светлая 60x60",
    category: "Плитка · 60x60",
    categoryValue: "60x60",
    format: "60x60",
    manufacturer: "Kerama Marazzi",
    surfaceType: "Глянцевая",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 82,
    oldPrice: 99,
    badge: "-17%",
    href: "/product/2",
  },
  {
    id: "2",
    title: "Плитка светлая 60x60",
    category: "Плитка · 60x60",
    categoryValue: "60x60",
    format: "60x60",
    manufacturer: "Kerama Marazzi",
    surfaceType: "Глянцевая",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 82,
    oldPrice: 99,
    badge: "-17%",
    href: "/product/2",
  },
  {
    id: "2",
    title: "Плитка светлая 60x60",
    category: "Плитка · 60x60",
    categoryValue: "60x60",
    format: "60x60",
    manufacturer: "Kerama Marazzi",
    surfaceType: "Глянцевая",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 82,
    oldPrice: 99,
    badge: "-17%",
    href: "/product/2",
  },
  {
    id: "2",
    title: "Плитка светлая 60x60",
    category: "Плитка · 60x60",
    categoryValue: "60x60",
    format: "60x60",
    manufacturer: "Kerama Marazzi",
    surfaceType: "Глянцевая",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 82,
    oldPrice: 99,
    badge: "-17%",
    href: "/product/2",
  },
  {
    id: "2",
    title: "Плитка светлая 60x60",
    category: "Плитка · 60x60",
    categoryValue: "60x60",
    format: "60x60",
    manufacturer: "Kerama Marazzi",
    surfaceType: "Глянцевая",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 82,
    oldPrice: 99,
    badge: "-17%",
    href: "/product/2",
  },
  {
    id: "2",
    title: "Плитка светлая 60x60",
    category: "Плитка · 60x60",
    categoryValue: "60x60",
    format: "60x60",
    manufacturer: "Kerama Marazzi",
    surfaceType: "Глянцевая",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 82,
    oldPrice: 99,
    badge: "-17%",
    href: "/product/2",
  },
  {
    id: "3",
    title: "Плитка под мрамор 80x80",
    category: "Плитка · 80x80",
    categoryValue: "80x80",
    format: "80x80",
    manufacturer: "Paradyz",
    surfaceType: "Лаппатированная",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 79,
    oldPrice: 105,
    badge: "-25%",
    href: "/product/3",
  },
  {
    id: "4",
    title: "Керамогранит 100x100",
    category: "Плитка · 100x100",
    categoryValue: "100x100",
    format: "100x100",
    manufacturer: "Cersanit",
    surfaceType: "Матовая",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 110,
    href: "/product/4",
  },
  {
    id: "5",
    title: "Керамогранит бежевый 120x60",
    category: "Плитка · 120x60",
    categoryValue: "120x60",
    format: "120x60",
    manufacturer: "Kerama Marazzi",
    surfaceType: "Глянцевая",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 95,
    oldPrice: 119,
    badge: "-20%",
    href: "/product/5",
  },
  {
    id: "6",
    title: "Клей для плитки усиленный",
    category: "Сопутствующие товары · Клей",
    categoryValue: "glue",
    manufacturer: "Ceresit",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 25,
    href: "/product/6",
  },
  {
    id: "7",
    title: "Герметик санитарный",
    category: "Сопутствующие товары · Герметик",
    categoryValue: "sealant",
    manufacturer: "Soudal",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 14,
    href: "/product/7",
  },
  {
    id: "8",
    title: "Фуга влагостойкая",
    category: "Сопутствующие товары · Фуга",
    categoryValue: "grout",
    manufacturer: "Mapei",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    price: 18,
    href: "/product/8",
  },
]

const initialFilters: CatalogFilters = {
  priceFrom: "",
  priceTo: "",
  manufacturers: [],
  formats: [],
  surfaceTypes: [],
}

const defaultCategory = "60x60"

const CatalogContainer = () => {
  const { section } = useParams()

  const activeCategory = section ?? defaultCategory

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSectionsOpen, setIsSectionsOpen] = useState(false)
  const [filters, setFilters] = useState<CatalogFilters>(initialFilters)

  const activeItem = useMemo(() => {
    return catalogGroups
      .flatMap((group) => group.items)
      .find((item) => item.value === activeCategory)
  }, [activeCategory])

  const activeGroup = useMemo(() => {
    return catalogGroups.find((group) =>
      group.items.some((item) => item.value === activeCategory)
    )
  }, [activeCategory])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const priceFrom = Number(filters.priceFrom || 0)
      const priceTo = Number(filters.priceTo || Infinity)

      const matchesCategory = product.categoryValue === activeCategory

      const matchesPrice =
        product.price >= priceFrom && product.price <= priceTo

      const matchesManufacturer =
        filters.manufacturers.length === 0 ||
        filters.manufacturers.includes(product.manufacturer ?? "")

      const matchesFormat =
        filters.formats.length === 0 ||
        filters.formats.includes(product.format ?? "")

      const matchesSurface =
        filters.surfaceTypes.length === 0 ||
        filters.surfaceTypes.includes(product.surfaceType ?? "")

      return (
        matchesCategory &&
        matchesPrice &&
        matchesManufacturer &&
        matchesFormat &&
        matchesSurface
      )
    })
  }, [activeCategory, filters])

  const title = activeItem?.label ?? "Каталог"

  const description =
    activeGroup?.title === "Плитка"
      ? "Выберите плитку нужного формата. Используйте фильтр, чтобы быстрее найти подходящий вариант по цене, производителю и типу поверхности."
      : "Сопутствующие товары для укладки и ухода за плиткой. Используйте фильтр, чтобы подобрать нужный товар по цене и производителю."

  return (
    <CatalogView
      groups={catalogGroups}
      products={filteredProducts}
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
    />
  )
}

export default CatalogContainer