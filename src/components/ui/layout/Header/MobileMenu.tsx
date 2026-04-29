import type { SocialLink } from "../../../../data/navigation"
import type { NavItem } from "../../../../types/ui/Header.type"
import MobileNavItem from "./MobileNavItem"
import { FaPhone } from "react-icons/fa6"

type MobileMenuProps = {
  isVisible: boolean
  navigation: NavItem[]
  socialLinks: SocialLink[]
  phone: string
  phoneHref: string
  openSection: string | null
  onClose: () => void
  onToggleSection: (label: string) => void
}

export default function MobileMenu({
  isVisible,
  navigation,
  socialLinks,
  phone,
  phoneHref,
  openSection,
  onClose,
  onToggleSection,
}: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-[60] xl:hidden ${isVisible ? "pointer-events-auto" : "pointer-events-none"
        }`}
    >
      <button
        type="button"
        aria-label="Закрыть меню"
        onClick={onClose}
        className={`absolute inset-0 h-full w-full bg-black/30 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
      />

      <aside
        className={`absolute right-0 top-0 z-[61] flex h-dvh w-full flex-col overflow-hidden bg-white transition-transform duration-300 ease-out sm:w-[85%] sm:max-w-[460px] sm:shadow-[0_10px_40px_rgba(0,0,0,0.12)] ${isVisible ? "translate-x-0" : "translate-x-full"
          }`}
        aria-label="Мобильное меню"
      >
        <div className="flex min-h-[72px] items-center justify-between border-b border-neutral-200 px-4 sm:px-6">
          <div className="min-w-0">
            <div className="text-[14px] font-semibold uppercase tracking-[0.14em] text-neutral-950">
              Меню
            </div>
            <div className="mt-1 text-[12px] text-neutral-500">
              Навигация по сайту
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-neutral-300 text-[18px] text-neutral-900 transition-colors hover:border-neutral-900"
            aria-label="Закрыть меню"
          >
            x
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-8 pt-2 sm:px-6">
          <nav aria-label="Мобильная навигация">
            {navigation.map((item) => (
              <MobileNavItem
                key={item.label}
                item={item}
                openSection={openSection}
                onToggle={onToggleSection}
                onNavigate={onClose}
              />
            ))}
          </nav>

          <div className="mt-4">
            <a
              href={phoneHref}
              className="flex items-center gap-2 text-[18px] font-semibold text-neutral-950"
            >
              <FaPhone className="shrink-0" />
              <span>{phone}</span>
            </a>

            <p className="mt-2 text-[14px] text-neutral-500">
              Ежедневно, с 9:00 до 20:00
            </p>

            <ul className="mt-6 flex items-center gap-3" aria-label="Социальные сети">
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
                        className={"h-6 w-6 object-contain"}
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
        </div>
      </aside>
    </div>
  )
}