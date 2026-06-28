import { NavLink } from "react-router-dom"
import { FaHeart } from "react-icons/fa6"
import type { ProductWithImage } from "../../../types/response/Product.type"

type Props = {
  product: ProductWithImage
  isFavorite: boolean
  onToggleFavorite: (
    event: React.MouseEvent<HTMLButtonElement>,
    product: ProductWithImage,
  ) => void
}

const PRODUCT_PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"

const getPriceText = (priceFrom: number | null, priceTo: number | null) => {
  if (priceFrom === null && priceTo === null) return "Цена по запросу"

  if (priceFrom !== null && priceTo !== null && priceFrom !== priceTo) {
    return `от ${priceFrom} BYN`
  }

  return `${priceFrom ?? priceTo} BYN`
}

const CatalogProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
}: Props) => {
  const productHref = `/product/${product.sku}`
  const priceText = getPriceText(product.price_from, product.price_to)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-[#f3f0ea] transition hover:-translate-y-1 hover:shadow-xl">
      <NavLink to={productHref} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
          <img
            src={product.image_url ?? PRODUCT_PLACEHOLDER_IMAGE}
            alt={product.name}
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
        </div>
      </NavLink>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-2 min-h-[20px] text-sm text-neutral-400">
          {product.category_name}
        </p>

        <NavLink to={productHref}>
          <h3 className="mb-4 min-h-[56px] text-lg font-medium leading-snug text-black transition hover:text-neutral-600 sm:text-xl">
            {product.name}
          </h3>
        </NavLink>

        <p className="mb-3 min-h-[20px] text-sm text-neutral-500">
          {product.brand_name ?? ""}
        </p>

        <div className="flex min-h-[40px] flex-wrap items-start gap-x-2 gap-y-1 text-sm text-neutral-600">
          {product.category_name ? <span>{product.category_name}</span> : null}

          {product.sort_name ? (
            <>
              <span className="text-neutral-300">|</span>
              <span>{product.sort_name}</span>
            </>
          ) : null}
        </div>

        <div className="mt-auto mb-5 flex items-end gap-3 pt-5">
          <p className="text-xl font-medium text-black sm:text-2xl">
            {priceText}
          </p>
        </div>

        <NavLink
          to={productHref}
          className="w-full rounded-2xl bg-white px-5 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
        >
          Подробнее
        </NavLink>
      </div>
    </article>
  )
}

export default CatalogProductCard