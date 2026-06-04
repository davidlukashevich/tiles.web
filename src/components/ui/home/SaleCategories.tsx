import { NavLink } from "react-router-dom"
import { FaHeart } from "react-icons/fa6"
import type { SaleItem } from "../../../types/ui/Sale.type"

type Props = {
  saleItems: SaleItem[]
  favoriteIds: string[]
  onToggleFavorite: (
    event: React.MouseEvent<HTMLButtonElement>,
    item: SaleItem
  ) => void
}

const SaleCategories = ({
  saleItems,
  favoriteIds,
  onToggleFavorite,
}: Props) => {
  return (
    <section className="px-4 py-10 md:px-6 xl:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Распродажа
            </p>

            <h2 className="mt-3 text-3xl uppercase md:text-4xl">
              Выгодные предложения
            </h2>
          </div>

          <NavLink
            to="/catalog/sale"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-[#f3f1ec] px-5 text-sm text-gray-700 transition hover:bg-black hover:text-white"
          >
            Смотреть всё
          </NavLink>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {saleItems.map((item) => {
            const isFavorite = favoriteIds.includes(item.id)

            return (
              <NavLink
                key={item.id}
                to={`/product/${item.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border-b border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-40 overflow-hidden rounded-t-xl bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <button
                    type="button"
                    onClick={(event) => onToggleFavorite(event, item)}
                    className="absolute left-3 top-3 z-10 flex cursor-pointer items-center overflow-hidden rounded-full bg-white/95 shadow-md backdrop-blur"
                    aria-label={
                      isFavorite
                        ? "Удалить из избранного"
                        : "Добавить в избранное"
                    }
                  >
                    <span
                      className={`whitespace-nowrap text-[12px] font-medium transition-all duration-300 ${isFavorite
                          ? "max-w-[180px] px-3 opacity-100"
                          : "max-w-0 px-0 opacity-0 group-hover:max-w-[180px] group-hover:px-3 group-hover:opacity-100"
                        }`}
                    >
                      {isFavorite
                        ? "Удалить из избранного"
                        : "Добавить в избранное"}
                    </span>

                    <div
                      className={`flex h-10 w-10 items-center justify-center transition-colors ${isFavorite
                          ? "bg-red-500 text-white"
                          : "text-neutral-700"
                        }`}
                    >
                      <FaHeart className="h-4 w-4" />
                    </div>
                  </button>

                  {item.isSale ? (
                    <div className="absolute bottom-3 right-3 flex flex-wrap gap-2">
                      <div className="rounded-md bg-yellow-400 px-2.5 py-1 text-[11px] font-medium text-white">
                        Распродажа
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <p className="min-h-[18px] text-[10px] uppercase tracking-[0.12em] text-gray-400">
                    {item.subtitle}
                  </p>

                  <h3 className="mt-2 min-h-[64px] text-[22px] leading-[1.2] text-gray-700">
                    {item.title}
                  </h3>

                  <p className="mt-2 min-h-[44px] text-[13px] leading-5 text-gray-600">
                    {item.description}
                  </p>

                  <div className="mt-auto flex items-end gap-2 pt-5">
                    <span className="text-xl font-semibold text-black">
                      {item.price}
                    </span>

                    {item.oldPrice ? (
                      <span className="pb-[2px] text-sm text-gray-400 line-through">
                        {item.oldPrice}
                      </span>
                    ) : null}
                  </div>
                </div>
              </NavLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SaleCategories