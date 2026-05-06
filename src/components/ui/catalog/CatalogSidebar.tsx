import { NavLink } from "react-router-dom"
import type { CatalogGroup } from "../../../types/ui/Catalog.type"
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
      {groups.map((group, groupIndex) => (
        <div key={group.title} className={groupIndex > 0 ? "mt-7" : ""}>
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-gray-400">
            {group.title}
          </p>

          <ul className="space-y-2">
            {group.items.map((item) => {
              const isActive = item.value === activeValue

              return (
                <li key={item.value}>
                  <NavLink
                    to={item.href}
                    onClick={onNavigate}
                    className={`block w-full rounded-xl px-4 py-3 text-left text-sm transition ${isActive
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-[#f3f1ec]"
                      }`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
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
        <CatalogSidebarContent groups={groups} activeValue={activeValue} />
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
          className={`absolute left-0 top-0 h-full w-[86%] max-w-[380px] bg-white p-4 transition-transform duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="mb-4 flex items-center justify-between">
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

          <CatalogSidebarContent
            groups={groups}
            activeValue={activeValue}
            onNavigate={onMobileClose}
          />
        </aside>
      </div>
    </>
  )
}

export default CatalogSidebar