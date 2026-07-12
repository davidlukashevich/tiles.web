import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

type Props = {
  page: number
  pageCount: number
  onChange: (page: number) => void
}

// Собираем список страниц с многоточиями: 1 … 4 5 6 … 12
const buildPages = (page: number, pageCount: number): (number | "…")[] => {
  const pages: (number | "…")[] = []
  const delta = 1

  const start = Math.max(2, page - delta)
  const end = Math.min(pageCount - 1, page + delta)

  pages.push(1)

  if (start > 2) pages.push("…")

  for (let i = start; i <= end; i++) pages.push(i)

  if (end < pageCount - 1) pages.push("…")

  if (pageCount > 1) pages.push(pageCount)

  return pages
}

const arrowClass =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-neutral-700 transition hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-black/10 disabled:hover:bg-transparent disabled:hover:text-neutral-700 sm:h-10 sm:w-10"

const CatalogPagination = ({ page, pageCount, onChange }: Props) => {
  if (pageCount <= 1) return null

  const pages = buildPages(page, pageCount)

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
      aria-label="Пагинация"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className={`${arrowClass} cursor-pointer`}
        aria-label="Предыдущая страница"
      >
        <IoIosArrowBack className="h-5 w-5" />
      </button>

      {pages.map((item, index) =>
        item === "…" ? (
          <span
            key={`dots-${index}`}
            className="px-2 text-sm text-neutral-400"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === page ? "page" : undefined}
            className={`flex h-9 min-w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border px-2.5 text-sm transition sm:h-10 sm:min-w-10 sm:px-3 ${
              item === page
                ? "border-black bg-black text-white"
                : "border-black/10 text-neutral-700 hover:border-black"
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= pageCount}
        className={`${arrowClass} cursor-pointer`}
        aria-label="Следующая страница"
      >
        <IoIosArrowForward className="h-5 w-5" />
      </button>
    </nav>
  )
}

export default CatalogPagination
