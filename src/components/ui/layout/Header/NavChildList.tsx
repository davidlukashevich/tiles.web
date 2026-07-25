import { useState } from "react"
import { NavLink } from "react-router-dom"
import type { NavLinkItem } from "../../../../data/navigation"

type Variant = "desktop" | "mobile"

type Props = {
  items: NavLinkItem[]
  onNavigate?: () => void
  variant?: Variant
}

const linkClass = (variant: Variant) =>
  variant === "desktop"
    ? "block rounded-xl px-3 py-2 text-[14px] text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-950"
    : "block rounded-xl py-2 text-[14px] text-neutral-600 transition-colors hover:text-neutral-950"

const NavChildList = ({ items, onNavigate, variant = "desktop" }: Props) => {
  return (
    <ul className="space-y-1">
      {items.map((child) =>
        child.children?.length ? (
          <li key={child.label}>
            <ExpandableItem
              item={child}
              onNavigate={onNavigate}
              variant={variant}
            />
          </li>
        ) : (
          <li key={child.label}>
            <NavLink
              to={child.href || "/"}
              onClick={onNavigate}
              className={linkClass(variant)}
            >
              {child.label}
            </NavLink>
          </li>
        ),
      )}
    </ul>
  )
}

type ExpandableProps = {
  item: NavLinkItem
  onNavigate?: () => void
  variant: Variant
}

const ExpandableItem = ({ item, onNavigate, variant }: ExpandableProps) => {
  const [open, setOpen] = useState(false)

  const toggleClass =
    variant === "desktop"
      ? "flex w-full items-center justify-between rounded-xl px-3 py-2 text-[14px] text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-950"
      : "flex w-full items-center justify-between rounded-xl py-2 text-[14px] text-neutral-600 transition-colors hover:text-neutral-950"

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`cursor-pointer ${toggleClass}`}
        aria-expanded={open}
      >
        <span>{item.label}</span>
        <span
          className={`text-[10px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {open ? (
        <ul className="mb-1 ml-3 space-y-1 border-l border-neutral-200 pl-2">
          {item.children?.map((sub) => (
            <li key={sub.label}>
              <NavLink
                to={sub.href || "/"}
                onClick={onNavigate}
                className={linkClass(variant)}
              >
                {sub.label}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )
}

export default NavChildList
