import { useState } from "react"
import { NavLink } from "react-router-dom"
import type {
  CatalogGroup,
  CatalogGroupItem,
} from "../../../types/ui/Catalog.type"
import { IoIosClose } from "react-icons/io"

type Props = {
  groups: CatalogGroup[]
  activeValue: string
  isMobileOpen: boolean
  onMobileClose: () => void
}

type SidebarContentProps = {
  groups: CatalogGroup[]
  activeValue: string
  onNavigate?: () => void
}

const CatalogSidebarContent = ({
  groups,
  activeValue,
  onNavigate,
}: SidebarContentProps) => {
  return (
    <div className="rounded-[24px] border border-black/10 bg-white p-5">
      {groups.map((group, groupIndex) => {
        const isGroupActive = group.value === activeValue
        const isSaleGroup = group.value === "sale"
        const hasItems = group.items.length > 0

        return (
          <div
            key={group.value}
            className={`
        ${groupIndex > 0 ? "mt-7 pt-7 border-t border-black/10" : ""}
      `}
          >
            {isSaleGroup ? (
              <NavLink
                to={group.href}
                onClick={onNavigate}
                className={`flex h-11 items-center justify-center rounded-[14px] border border-black/10 px-4 text-[12px] font-semibold uppercase tracking-[0.08em] transition-all duration-200 ${isGroupActive
                    ? "bg-black text-white"
                    : "bg-[#f3f1ec] text-black hover:border-black hover:bg-black hover:text-white"
                  }`}
              >
                {group.title}
              </NavLink>
            ) : (
              <NavLink
                to={group.href}
                onClick={onNavigate}
                className={`mb-4 block text-xs font-semibold uppercase tracking-[0.28em] transition hover:text-black ${isGroupActive ? "text-black" : "text-gray-400"
                  }`}
              >
                {group.title}
              </NavLink>
            )}

            {hasItems ? (
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.value}>
                    <SidebarItem
                      item={item}
                      activeValue={activeValue}
                      onNavigate={onNavigate}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

type SidebarItemProps = {
  item: CatalogGroupItem
  activeValue: string
  onNavigate?: () => void
}

const itemClass = (isActive: boolean) =>
  `block w-full rounded-xl px-4 py-3 text-left text-sm transition ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-[#f3f1ec]"
  }`

const SidebarItem = ({ item, activeValue, onNavigate }: SidebarItemProps) => {
  const hasChildren = Boolean(item.children?.length)
  const childActive =
    item.children?.some((child) => child.value === activeValue) ?? false
  const [open, setOpen] = useState(childActive)

  if (!hasChildren) {
    return (
      <NavLink
        to={item.href}
        onClick={onNavigate}
        className={itemClass(item.value === activeValue)}
      >
        {item.label}
      </NavLink>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-[#f3f1ec]"
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
        <ul className="mt-1 ml-3 space-y-1 border-l border-black/10 pl-2">
          {item.children?.map((sub) => (
            <li key={sub.value}>
              <NavLink
                to={sub.href}
                onClick={onNavigate}
                className={itemClass(sub.value === activeValue)}
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

const CatalogSidebar = ({
  groups,
  activeValue,
  isMobileOpen,
  onMobileClose,
}: Props) => {
  return (
    <>
      <aside className="hidden xl:block">
        <CatalogSidebarContent
          groups={groups}
          activeValue={activeValue}
        />
      </aside>

      <div
        className={`fixed inset-0 z-[70] xl:hidden ${isMobileOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        <button
          type="button"
          onClick={onMobileClose}
          className={`absolute inset-0 bg-black/35 transition-opacity ${isMobileOpen ? "opacity-100" : "opacity-0"
            }`}
          aria-label="Закрыть разделы"
        />

        <aside
          className={`absolute left-0 top-0 flex h-full w-[86%] max-w-[380px] flex-col bg-white p-4 transition-transform duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="mb-4 flex shrink-0 items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-gray-400">
                Каталог
              </p>

              <h2 className="mt-2 text-2xl uppercase">
                Разделы
              </h2>
            </div>

            <button
              type="button"
              onClick={onMobileClose}
              className="flex h-11 w-11 shrink-0 items-center justify-center border border-neutral-300 text-[18px] text-neutral-900 transition-colors hover:border-neutral-900"
              aria-label="Закрыть меню"
            >
              <IoIosClose className="h-7 w-7" />
            </button>
          </div>

          <div className="-mr-2 flex-1 overflow-y-auto pr-2">
            <CatalogSidebarContent
              groups={groups}
              activeValue={activeValue}
              onNavigate={onMobileClose}
            />
          </div>
        </aside>
      </div>
    </>
  )
}

export default CatalogSidebar