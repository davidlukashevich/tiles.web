import { NavLink } from "react-router-dom"
import type { CatalogProduct } from "../../../types/ui/Catalog.type"

type Props = {
  product: CatalogProduct
}

const CatalogProductCard = ({ product }: Props) => {
  return (
    <article className="overflow-hidden rounded-[28px] bg-[#f3f0ea]">
      <NavLink to={product.href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </NavLink>

      <div className="flex min-h-[220px] flex-col p-5 sm:p-6">
        <p className="mb-2 text-sm text-neutral-400">
          {product.category}
        </p>

        <NavLink to={product.href}>
          <h3 className="mb-4 min-h-[56px] text-lg font-medium leading-snug text-black sm:text-xl">
            {product.title}
          </h3>
        </NavLink>

        <div className="mb-5 flex items-end gap-3">
          <p className="text-xl font-medium text-black sm:text-2xl">
            {product.price} BYN
          </p>
        </div>

        <NavLink
          to={product.href}
          className="mt-auto w-full rounded-2xl bg-white px-5 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
        >
          Подробнее
        </NavLink>
      </div>
    </article>
  )
}

export default CatalogProductCard