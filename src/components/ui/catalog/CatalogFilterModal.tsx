import { useEffect } from "react"
import { IoIosClose } from "react-icons/io"
import type { CatalogFilters } from "../../../types/ui/Catalog.type"

type Props = {
  isOpen: boolean
  filters: CatalogFilters
  onClose: () => void
  onChange: (filters: CatalogFilters) => void
  onReset: () => void
  onApply: () => void
}

const manufacturers = [
  "LAPARET",
  "KERAMA MARAZZI",
  "Грани Таганая",
  "ESTIMA",
  "PRIMAVERA",
  "BYTTERFLY",
  "IDALGO",
  "GRANITEA",
  "УРАЛЬСКИЙ ГРАНИТ",
  "CERSANIT",
  "CERADIM",
  "КЕРАМИН",
]

const surfaceTypes = [
  "Матовая",
  "Полированная",
  "Глянцевая",
  "Структурная",
  "Лаппатированная",
  "Сатинированная",
  "Карвинг",
  "Вельвет",
  "Sugar",
  "Металлик",
]

const toggleValue = (list: string[], value: string) => {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value]
}

const CatalogFilterModal = ({
  isOpen,
  filters,
  onClose,
  onChange,
  onReset,
  onApply,
}: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40 px-4 py-4 sm:items-center sm:justify-center">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer"
        aria-label="Закрыть"
      />

      <div className="relative max-h-[90vh] w-full overflow-y-auto rounded-[28px] bg-white p-5 shadow-2xl sm:max-w-[520px] sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-medium uppercase text-black">
            Фильтрация
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#f3f0ea] text-neutral-900 transition-all duration-200 hover:scale-105 hover:bg-black hover:text-white"
            aria-label="Закрыть"
          >
            <IoIosClose className="h-7 w-7" />
          </button>
        </div>

        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-neutral-500">
                Цена от
              </label>

              <input
                type="number"
                value={filters.priceFrom}
                onChange={(event) =>
                  onChange({
                    ...filters,
                    priceFrom: event.target.value,
                  })
                }
                placeholder="0"
                className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-neutral-500">
                Цена до
              </label>

              <input
                type="number"
                value={filters.priceTo}
                onChange={(event) =>
                  onChange({
                    ...filters,
                    priceTo: event.target.value,
                  })
                }
                placeholder="999"
                className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-black"
              />
            </div>
          </div>

          <FilterCheckboxGroup
            title="Производитель"
            options={manufacturers}
            selected={filters.manufacturers}
            onToggle={(value) =>
              onChange({
                ...filters,
                manufacturers: toggleValue(
                  filters.manufacturers,
                  value
                ),
              })
            }
          />

          <FilterCheckboxGroup
            title="Тип поверхности"
            options={surfaceTypes}
            selected={filters.surfaceTypes}
            onToggle={(value) =>
              onChange({
                ...filters,
                surfaceTypes: toggleValue(
                  filters.surfaceTypes,
                  value
                ),
              })
            }
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onReset}
              className="cursor-pointer rounded-2xl bg-[#f3f0ea] px-5 py-4 text-sm font-medium text-black transition hover:bg-[#e7e3dc]"
            >
              Сбросить
            </button>

            <button
              type="button"
              onClick={onApply}
              className="cursor-pointer rounded-2xl bg-black px-5 py-4 text-sm font-medium text-white transition hover:opacity-85"
            >
              Показать
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogFilterModal

type FilterCheckboxGroupProps = {
  title: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}

function FilterCheckboxGroup({
  title,
  options,
  selected,
  onToggle,
}: FilterCheckboxGroupProps) {
  return (
    <div>
      <p className="mb-3 text-sm text-neutral-500">
        {title}
      </p>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = selected.includes(option)

          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm transition ${isActive
                  ? "border-black bg-black text-white"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-black"
                }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}