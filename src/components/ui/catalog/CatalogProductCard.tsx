import { NavLink } from "react-router-dom"
import { FaHeart } from "react-icons/fa6"
import type { CatalogProduct } from "../../../types/ui/Catalog.type"

type Props = {
  product: CatalogProduct
  isFavorite: boolean
  onToggleFavorite: (
    event: React.MouseEvent<HTMLButtonElement>,
    product: CatalogProduct
  ) => void
}

const CatalogProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
}: Props) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-[#f3f0ea] transition hover:-translate-y-1 hover:shadow-xl">
      <NavLink to={product.href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />

          <button
            type="button"
            onClick={(event) => onToggleFavorite(event, product)}
            className="absolute left-3 top-3 z-10 flex cursor-pointer items-center overflow-hidden rounded-full bg-white/95 shadow-md backdrop-blur"
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
              className={`flex h-10 w-10 items-center justify-center transition-colors ${isFavorite ? "bg-red-500 text-white" : "text-neutral-700"
                }`}
            >
              <FaHeart className="h-4 w-4" />
            </div>
          </button>

          {(product.isNew || product.isSale) && (
            <div className="absolute bottom-3 right-3 flex flex-wrap gap-2">
              {product.isSale ? (
                <div className="rounded-md bg-yellow-400 px-2 py-1 text-[11px] font-medium text-white">
                  Распродажа
                </div>
              ) : null}

              {product.isNew ? (
                <div className="rounded-md bg-[#5fa36a] px-2 py-1 text-[11px] font-medium text-white">
                  Новинка
                </div>
              ) : null}
            </div>
          )}
        </div>
      </NavLink>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-2 min-h-[20px] text-sm text-neutral-400">
          {product.category}
        </p>

        <NavLink to={product.href}>
          <h3 className="mb-4 min-h-[56px] text-lg font-medium leading-snug text-black transition hover:text-neutral-600 sm:text-xl">
            {product.title}
          </h3>
        </NavLink>

        <p className="mb-3 min-h-[20px] text-sm text-neutral-500">
          {product.manufacturer ?? ""}
        </p>

        <div className="flex min-h-[40px] flex-wrap items-start gap-x-2 gap-y-1 text-sm text-neutral-600">
          {product.formats?.length ? (
            <span>{product.formats.join(", ")}</span>
          ) : null}

          {product.surfaceTypes?.length ? (
            <>
              <span className="text-neutral-300">|</span>
              <span>{product.surfaceTypes.join(", ")}</span>
            </>
          ) : null}
        </div>

        <div className="mt-auto mb-5 flex items-end gap-3 pt-5">
          <p className="text-xl font-medium text-black sm:text-2xl">
            {product.price} BYN
          </p>

          {product.oldPrice ? (
            <p className="text-sm text-neutral-400 line-through sm:text-base">
              {product.oldPrice} BYN
            </p>
          ) : null}
        </div>

        <NavLink
          to={product.href}
          className="w-full rounded-2xl bg-white px-5 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
        >
          Подробнее
        </NavLink>
      </div>
    </article>
  )
}

export default CatalogProductCard