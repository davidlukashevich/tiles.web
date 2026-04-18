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
  const hasDropdown = Boolean(item.children?.length || item.groups?.length)

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
          className={`text-[10px] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          {item.groups?.length ? (
            <div className="space-y-4 pl-2">
              {item.groups.map((group) => (
                <div key={group.label}>
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                    {group.label}
                  </div>

                  <ul className="space-y-1">
                    {group.children.map((child) => (
                      <li key={child.href}>
                        <NavLink
                          to={child.href}
                          onClick={onNavigate}
                          className="block py-2 text-[14px] text-neutral-600 transition-colors hover:text-neutral-950"
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
                    className="block py-2 text-[14px] text-neutral-600 transition-colors hover:text-neutral-950"
                  >
                    {child.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}