import CatalogFilterModal from "./CatalogFilterModal"
import CatalogProductCard from "./CatalogProductCard"
import CatalogSidebar from "./CatalogSidebar"
import type {
  CatalogFilters,
  CatalogGroup,
  CatalogProduct,
} from "../../../types/ui/Catalog.type"
import { useEffect } from "react"

type Props = {
  groups: CatalogGroup[]
  products: CatalogProduct[]
  activeCategory: string
  title: string
  description: string
  filters: CatalogFilters
  isFilterOpen: boolean
  isSectionsOpen: boolean
  onOpenFilter: () => void
  onCloseFilter: () => void
  onOpenSections: () => void
  onCloseSections: () => void
  onChangeFilters: (filters: CatalogFilters) => void
  onResetFilters: () => void
  onApplyFilters: () => void
}

const CatalogView = ({
  groups,
  products,
  activeCategory,
  title,
  description,
  filters,
  isFilterOpen,
  isSectionsOpen,
  onOpenFilter,
  onCloseFilter,
  onOpenSections,
  onCloseSections,
  onChangeFilters,
  onResetFilters,
  onApplyFilters,
}: Props) => {

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isFilterOpen])

  return (
    <main className="bg-white px-4 py-10 md:px-6 xl:px-8 xl:py-14">
      <section className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Каталог
            </p>

            <h1 className="mt-3 text-3xl uppercase md:text-4xl">
              {title}
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onOpenSections}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 px-5 text-sm text-gray-700 transition hover:bg-black hover:text-white xl:hidden"
            >
              Разделы
            </button>

            <button
              type="button"
              onClick={onOpenFilter}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-5 text-sm text-white transition hover:opacity-90"
            >
              Фильтр
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-[24px] bg-[#f3f1ec] p-6 md:p-8">
          <h2 className="text-2xl uppercase md:text-3xl">
            Товары каталога
          </h2>

          <p className="mt-4 max-w-[700px] text-sm leading-7 text-gray-600 md:text-base">
            {description}
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
          <CatalogSidebar
            groups={groups}
            activeValue={activeCategory}
            isMobileOpen={isSectionsOpen}
            onMobileClose={onCloseSections}
          />

          <div className="min-w-0">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <CatalogProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] bg-[#f3f1ec] p-8 text-center text-gray-600">
                Товары не найдены
              </div>
            )}
          </div>
        </div>
      </section>

      <CatalogFilterModal
        isOpen={isFilterOpen}
        filters={filters}
        onClose={onCloseFilter}
        onChange={onChangeFilters}
        onReset={onResetFilters}
        onApply={onApplyFilters}
      />
    </main>
  )
}

export default CatalogView