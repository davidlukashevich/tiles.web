import type { NavItem, SocialLink } from "../../../../data/navigation"
import DesktopNavItem from "./DesktopNavItem"
import { FaPhone } from "react-icons/fa6"

type DesktopMenuProps = {
  navigation: NavItem[]
  socialLinks: SocialLink[]
  phone: string
  phoneHref: string
}

export default function DesktopMenu({
  navigation,
  socialLinks,
  phone,
  phoneHref,
}: DesktopMenuProps) {
  return (
    <>
      <nav aria-label="Основная навигация" className="hidden xl:block">
        <ul className="flex items-center gap-6 2xl:gap-8">
          {navigation.map((item) => (
            <li key={item.label}>
              <DesktopNavItem item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden items-center gap-5 xl:flex 2xl:gap-8">
        <a
          href={phoneHref}
          className="flex items-center gap-2 whitespace-nowrap text-[14px] font-medium tracking-[0.02em] text-neutral-900 transition-opacity hover:opacity-60"
        >
          <FaPhone className="shrink-0" />
          <span>{phone}</span>
        </a>

        <ul className="flex items-center gap-2 2xl:gap-3" aria-label="Социальные сети">
          {socialLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="flex h-7 w-7 items-center justify-center border border-neutral-300 transition-colors hover:border-neutral-900"
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