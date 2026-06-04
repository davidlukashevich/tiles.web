import { FaHeart, FaPhone } from "react-icons/fa6"
import type { NavItem, SocialLink } from "../../../../data/navigation"
import DesktopNavItem from "./DesktopNavItem"

type DesktopMenuProps = {
  navigation: NavItem[]
  socialLinks: SocialLink[]
  phone: string
  phoneHref: string
  favoritesCount: number
  onOpenFavorites: () => void
  onOpenProjectModal: () => void
}

export default function DesktopMenu({
  navigation,
  socialLinks,
  phone,
  phoneHref,
  favoritesCount,
  onOpenFavorites,
  onOpenProjectModal,
}: DesktopMenuProps) {
  return (
    <>
      <nav aria-label="Основная навигация" className="hidden xl:block">
        <ul className="flex items-center gap-4 2xl:gap-7">
          {navigation.map((item) => (
            <li key={item.label}>
              <DesktopNavItem item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden items-center gap-2 xl:flex 2xl:gap-5">
        {/* 3D ПРОЕКТ */}
        <button
          type="button"
          onClick={onOpenProjectModal}
          className="inline-flex h-11 cursor-pointer items-center justify-center rounded-[12px] border border-black/10 bg-[#f3f1ec] px-4 text-[10px] font-semibold uppercase tracking-[0.06em] text-black transition-all duration-200 hover:border-black hover:bg-black hover:text-white 2xl:px-5 2xl:text-[11px]"
        >
          <span className="hidden 2xl:inline">
            Заказать 3D-проект
          </span>

          <span className="2xl:hidden">
            3D-проект
          </span>
        </button>

        {/* ТЕЛЕФОН */}
        <a
          href={phoneHref}
          aria-label={phone}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-[14px] border border-black/5 bg-white
            text-neutral-900 transition
            hover:-translate-y-1 hover:shadow-md

            2xl:h-auto
            2xl:w-auto
            2xl:gap-2
            2xl:border-0
            2xl:bg-transparent
            2xl:px-0
            2xl:hover:translate-y-0
            2xl:hover:shadow-none
            2xl:hover:opacity-60
          "
        >
          <FaPhone className="shrink-0" />

          <span className="hidden whitespace-nowrap text-[14px] font-medium tracking-[0.02em] 2xl:inline">
            {phone}
          </span>
        </a>

        {/* ИЗБРАННОЕ */}
        <button
          type="button"
          onClick={onOpenFavorites}
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-[14px] border border-black/5 bg-white text-neutral-900 transition hover:-translate-y-1 hover:shadow-md"
          aria-label="Открыть избранное"
        >
          <FaHeart className="h-4 w-4" />

          {favoritesCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
              {favoritesCount}
            </span>
          )}
        </button>

        {/* СОЦСЕТИ */}
        <ul
          className="flex items-center gap-2 2xl:gap-3"
          aria-label="Социальные сети"
        >
          {socialLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-black/5 bg-white transition hover:-translate-y-1 hover:shadow-md"
              >
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.label}
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  <span className="text-[11px] font-semibold tracking-[0.12em] text-neutral-700">
                    {item.label}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}