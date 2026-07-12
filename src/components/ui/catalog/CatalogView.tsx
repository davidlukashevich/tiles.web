import { useEffect } from "react"
import CatalogFilterModal from "./CatalogFilterModal"
import CatalogPagination from "./CatalogPagination"
import CatalogProductCard from "./CatalogProductCard"
import CatalogProductSkeleton from "./CatalogProductSkeleton"
import CatalogSidebar from "./CatalogSidebar"

import type {
  CatalogFilters,
  CatalogGroup,
} from "../../../types/ui/Catalog.type"

import type { CatalogCardProduct } from "../../../types/response/Product.type"

type Props = {
  groups: CatalogGroup[]
  products: CatalogCardProduct[]
  isLoading: boolean
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  favoriteIds: string[]
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
  onToggleFavorite: (
    event: React.MouseEvent<HTMLButtonElement>,
    product: CatalogCardProduct,
  ) => void
}

const CatalogView = ({
  groups,
  products,
  isLoading,
  page,
  pageCount,
  onPageChange,
  favoriteIds,
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
  onToggleFavorite,
}: Props) => {
  useEffect(() => {
    const isLocked = isFilterOpen || isSectionsOpen
    document.body.style.overflow = isLocked ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [isFilterOpen, isSectionsOpen])

  return (
    <main className="bg-white py-10 xl:py-14">
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
              className="w-full rounded-[18px] border border-black/10 bg-[#f3f1ec] px-5 py-3 text-[13px] font-semibold tracking-[0.08em] text-black transition-all duration-200 hover:border-black hover:bg-black hover:text-white sm:w-auto"
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
            {isLoading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CatalogProductSkeleton key={index} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
                  {products.map((product) => (
                    <CatalogProductCard
                      key={product.id}
                      product={product}
                      isFavorite={favoriteIds.includes(product.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
                  ))}
                </div>

                <CatalogPagination
                  page={page}
                  pageCount={pageCount}
                  onChange={onPageChange}
                />
              </>
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