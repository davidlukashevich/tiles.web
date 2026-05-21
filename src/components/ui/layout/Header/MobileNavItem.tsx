import { NavLink } from "react-router-dom"
import type { NavItem } from "../../../../data/navigation"

type MobileNavItemProps = {
  item: NavItem
  openSection: string | null
  onToggle: (label: string) => void
  onNavigate: () => void
}

export default function MobileNavItem({
  item,
  openSection,
  onToggle,
  onNavigate,
}: MobileNavItemProps) {
  const isOpen = openSection === item.label

  const hasDropdown = Boolean(
    item.children?.length ||
    item.groups?.length ||
    item.promo
  )

  if (!hasDropdown) {
    return (
      <NavLink
        to={item.href || "/"}
        onClick={onNavigate}
        className="block border-b border-neutral-200 py-4 text-[16px] font-medium text-neutral-900"
      >
        {item.label}
      </NavLink>
    )
  }

  return (
    <div className="border-b border-neutral-200">
      <button
        type="button"
        onClick={() => onToggle(item.label)}
        className="flex w-full items-center justify-between py-4 text-left text-[16px] font-medium text-neutral-900"
        aria-expanded={isOpen}
      >
        <span>{item.label}</span>

        <span
          className={`text-[10px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        >
          ▼
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
          }`}
      >
        <div className="overflow-hidden">
          {item.groups?.length ? (
            <div className="space-y-4 pl-2">
              {item.groups.map((group) => (
                <div key={group.label}>
                  <NavLink
                    to={group.href}
                    onClick={onNavigate}
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400 transition-colors hover:text-neutral-950"
                  >
                    {group.label}
                  </NavLink>

                  <ul className="space-y-1">
                    {group.children.map((child) => (
                      <li key={child.href}>
                        <NavLink
                          to={child.href}
                          onClick={onNavigate}
                          className="block rounded-xl py-2 text-[14px] text-neutral-600 transition-colors hover:text-neutral-950"
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-1 pl-2">
              {item.children?.map((child) => (
                <li key={child.href}>
                  <NavLink
                    to={child.href}
                    onClick={onNavigate}
                    className="block rounded-xl py-2 text-[14px] text-neutral-600 transition-colors hover:text-neutral-950"
                  >
                    {child.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}

          {item.promo ? (
            <div className="mt-4 pl-2">
              <NavLink
                to={item.promo.href}
                onClick={onNavigate}
                className="flex h-11 items-center justify-center rounded-[14px] border border-black/10 bg-[#f3f1ec] px-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
              >
                {item.promo.label}
              </NavLink>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}