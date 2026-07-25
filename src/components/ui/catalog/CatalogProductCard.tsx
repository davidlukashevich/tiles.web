import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { FaHeart, FaRegImage } from "react-icons/fa6"
import type { CatalogCardProduct } from "../../../types/response/Product.type"
import { productHrefBySlug } from "../../../helpers/slug"

type Props = {
  product: CatalogCardProduct
  isFavorite: boolean
  onToggleFavorite: (
    event: React.MouseEvent<HTMLButtonElement>,
    product: CatalogCardProduct,
  ) => void
}

const CatalogProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
}: Props) => {
  const productHref = productHrefBySlug(product.name)

  const location = useLocation()
  const fromState = { from: `${location.pathname}${location.search}` }

  const [hasImageError, setHasImageError] = useState(false)
  const showImage = Boolean(product.image_url) && !hasImageError

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-[#f3f0ea] transition hover:-translate-y-1 hover:shadow-xl">
      <NavLink to={productHref} state={fromState} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
          {showImage ? (
            <img
              src={product.image_url ?? undefined}
              alt={product.name}
              onError={() => setHasImageError(true)}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-neutral-100 text-neutral-400">
              <FaRegImage className="h-8 w-8" />
              <span className="text-xs font-medium">Нет фото</span>
            </div>
          )}

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

          {(product.isOnSale || product.isRecommended) && (
            <div className="absolute bottom-3 right-3 z-10 flex flex-wrap justify-end gap-2">
              {product.isOnSale && (
                <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-white shadow-md">
                  Распродажа
                </span>
              )}

              {product.isRecommended && (
                <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                  Новинка
                </span>
              )}
            </div>
          )}
        </div>
      </NavLink>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-2 min-h-[20px] text-sm text-neutral-400">
          {product.category_name}
        </p>

        <NavLink to={productHref} state={fromState}>
          <h3 className="mb-4 min-h-[56px] text-lg font-medium leading-snug text-black transition hover:text-neutral-600 sm:text-xl">
            {product.name}
          </h3>
        </NavLink>

        <p className="mb-3 min-h-[20px] flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-500">
          {product.brand_name ? <span>{product.brand_name}</span> : null}

          {product.brand_name && product.country_name ? (
            <span className="text-neutral-300">|</span>
          ) : null}

          {product.country_name ? <span>{product.country_name}</span> : null}
        </p>

        <div className="flex min-h-[40px] flex-wrap items-start gap-x-2 gap-y-1 text-sm text-neutral-600">
          {product.sizes.length > 0 ? (
            <span>{product.sizes.join(", ")}</span>
          ) : null}

          {product.sizes.length > 0 && product.surfaces.length > 0 ? (
            <span className="text-neutral-300">|</span>
          ) : null}

          {product.surfaces.length > 0 ? (
            <span>{product.surfaces.join(", ")}</span>
          ) : null}
        </div>

        <div className="mt-auto mb-5 flex flex-wrap items-end gap-x-3 gap-y-1 pt-5">
          {product.displayPrice != null ? (
            <>
              <p className="text-xl font-medium text-black sm:text-2xl">
                {product.priceIsFrom ? "от " : ""}
                {product.displayPrice} BYN
              </p>

              {product.displayOldPrice ? (
                <span className="pb-1 text-base text-gray-400 line-through">
                  {product.displayOldPrice} BYN
                </span>
              ) : null}
            </>
          ) : (
            <p className="text-xl font-medium text-black sm:text-2xl">
              Цена по запросу
            </p>
          )}
        </div>

        <NavLink
          to={productHref}
          state={fromState}
          className="w-full rounded-2xl bg-white px-5 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
        >
          Подробнее
        </NavLink>
      </div>
    </article>
  )
}

export default CatalogProductCard