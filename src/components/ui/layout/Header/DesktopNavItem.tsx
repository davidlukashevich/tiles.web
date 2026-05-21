import { useState } from "react"
import { NavLink } from "react-router-dom"
import type { NavItem } from "../../../../data/navigation"

type DesktopNavItemProps = {
  item: NavItem
}

export default function DesktopNavItem({
  item,
}: DesktopNavItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hasDropdown = Boolean(
    item.children?.length ||
    item.groups?.length ||
    item.promo
  )

  if (!hasDropdown) {
    return (
      <NavLink
        to={item.href || "/"}
        className="inline-flex items-center whitespace-nowrap text-[14px] font-medium tracking-[0.02em] text-neutral-900 transition-opacity hover:opacity-60"
      >
        {item.label}
      </NavLink>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {item.href ? (
        <NavLink
          to={item.href}
          className="inline-flex items-center gap-2 whitespace-nowrap text-[14px] font-medium tracking-[0.02em] text-neutral-900 transition-opacity hover:opacity-60"
        >
          <span>{item.label}</span>

          <span
            className={`text-[10px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""
              }`}
          >
            ▼
          </span>
        </NavLink>
      ) : (
        <button
          type="button"
          className="inline-flex items-center gap-2 whitespace-nowrap text-[14px] font-medium tracking-[0.02em] text-neutral-900 transition-opacity hover:opacity-60"
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
      )}

      <div
        className={`absolute left-0 top-full z-50 pt-4 transition-all duration-200 ${isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
          }`}
      >
        <div className="min-w-[280px] rounded-[20px] border border-neutral-200 bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
          {item.groups?.length ? (
            <div className="space-y-5">
              {item.groups.map((group) => (
                <div key={group.label}>
                  <NavLink
                    to={group.href}
                    onClick={() => setIsOpen(false)}
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400 transition-colors hover:text-neutral-950"
                  >
                    {group.label}
                  </NavLink>

                  <ul className="space-y-1">
                    {group.children.map((child) => (
                      <li key={child.href}>
                        <NavLink
                          to={child.href}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            [
                              "block rounded-xl px-3 py-2 text-[14px] transition-colors",
                              isActive
                                ? "bg-neutral-50 text-neutral-950"
                                : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950",
                            ].join(" ")
                          }
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
            <ul className="space-y-1">
              {item.children?.map((child) => (
                <li key={child.href}>
                  <NavLink
                    to={child.href}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      [
                        "block rounded-xl px-3 py-2 text-[14px] transition-colors",
                        isActive
                          ? "bg-neutral-50 text-neutral-950"
                          : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950",
                      ].join(" ")
                    }
                  >
                    {child.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}

          {item.promo ? (
            <div className="mt-4 border-t border-neutral-200 pt-4">
              <NavLink
                to={item.promo.href}
                onClick={() => setIsOpen(false)}
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