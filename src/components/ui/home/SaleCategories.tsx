import { NavLink } from "react-router-dom"
import type { SaleItem } from "../../../types/ui/Sale.type"

type Props = {
  saleItems: SaleItem[]
}

const SaleCategories = ({ saleItems }: Props) => {
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
          {saleItems.map((item) => (
            <NavLink
              key={item.id}
              to={`/product/${item.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border-b border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* IMAGE */}
              <div className="relative h-40 overflow-hidden rounded-t-xl bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {(item.isSale || item.discountPercent) && (
                  <div className="absolute bottom-3 right-3 flex flex-wrap gap-2">
                    {item.discountPercent ? (
                      <div className="rounded-full bg-black px-2.5 py-1 text-[11px] font-medium text-white">
                        -{item.discountPercent}%
                      </div>
                    ) : null}

                    {item.isSale ? (
                      <div className="rounded-full bg-black px-2.5 py-1 text-[11px] font-medium text-white">
                        Распродажа
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col p-4">
                {/* SUBTITLE */}
                <p className="min-h-[18px] text-[10px] uppercase tracking-[0.12em] text-gray-400">
                  {item.subtitle}
                </p>

                {/* TITLE */}
                <h3 className="mt-2 min-h-[64px] text-[22px] leading-[1.2] text-gray-700">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-2 min-h-[44px] text-[13px] leading-5 text-gray-600">
                  {item.description}
                </p>

                {/* PRICE */}
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default SaleCategories