import type { SaleItem } from "../../../types/ui/Sale.type"

type Props = {
  saleItems: SaleItem[]
}

const SaleCategories = ({ saleItems }: Props) => {
  return (
    <section className="px-4 py-10 md:px-6 xl:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Распродажа
            </p>
            <h2 className="mt-3 text-3xl uppercase md:text-4xl">
              Выгодные предложения
            </h2>
          </div>

          <a
            href="/sale"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 px-5 text-sm text-gray-700 transition hover:bg-black hover:text-white"
          >
            Смотреть всё
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {saleItems.map((item) => (
            <a
              key={item.title}
              href="/sale"
              className="group overflow-hidden rounded-xl border-b border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className="relative h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs text-white">
                  {item.badge}
                </div>
              </div>

              <div className="p-4">
                <p className="mb-2 text-xs uppercase text-gray-400">
                  {item.subtitle}
                </p>
                <h3 className="text-2xl text-gray-700">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SaleCategories