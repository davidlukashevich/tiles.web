import { useEffect } from "react"
import type { SaleProduct } from "../../../types/ui/Sale.type"
import { IoIosClose } from "react-icons/io"

type Props = {
    products: SaleProduct[]
    minPrice: string
    maxPrice: string
    isFilterOpen: boolean
    onOpenFilter: () => void
    onCloseFilter: () => void
    onMinPriceChange: (value: string) => void
    onMaxPriceChange: (value: string) => void
    onResetFilters: () => void
}

export function SaleView({
    products,
    minPrice,
    maxPrice,
    isFilterOpen,
    onOpenFilter,
    onCloseFilter,
    onMinPriceChange,
    onMaxPriceChange,
    onResetFilters,
}: Props) {
    // 🔒 Блокировка скролла
    useEffect(() => {
        if (!isFilterOpen) return

        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = originalOverflow
        }
    }, [isFilterOpen])

    return (
        <main className="w-full bg-white py-10 lg:py-20">
            <section className="mx-auto w-full max-w-[1440px] px-4 sm:px-5 lg:px-10">
                {/* HEADER */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-slate-400 sm:tracking-[0.45em]">
                            Выгодные предложения
                        </p>

                        <h1 className="text-4xl font-medium uppercase leading-none text-black">
                            Распродажа
                        </h1>
                    </div>

                    <button
                        type="button"
                        onClick={onOpenFilter}
                        className="w-full rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80 sm:w-auto"
                    >
                        Фильтр
                    </button>
                </div>

                {/* DESCRIPTION */}
                <div className="mb-6 rounded-[28px] bg-[#f3f0ea] p-5 sm:p-8 lg:p-10">
                    <h2 className="mb-3 text-3xl font-medium uppercase text-black">
                        Товары со скидкой
                    </h2>

                    <p className="max-w-[720px] text-base leading-relaxed text-neutral-500">
                        Плитка и сопутствующие товары по специальным ценам. Количество
                        товаров ограничено, наличие уточняйте у менеджера.
                    </p>
                </div>

                {/* PRODUCTS */}
                {products.length ? (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {products.map((product) => (
                            <article
                                key={product.id}
                                className="group overflow-hidden rounded-[28px] bg-[#f3f0ea]"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    <div className="absolute left-4 top-4 rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
                                        {product.discount}
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6">
                                    <p className="mb-2 text-sm text-neutral-400">
                                        {product.category} · {product.size}
                                    </p>

                                    <h3 className="mb-4 text-lg font-medium leading-snug text-black sm:text-xl">
                                        {product.title}
                                    </h3>

                                    <div className="mb-5 flex items-end gap-3">
                                        <p className="text-xl font-medium text-black sm:text-2xl">
                                            {product.price} BYN
                                        </p>

                                        <p className="text-sm text-neutral-400 line-through sm:text-base">
                                            {product.oldPrice} BYN
                                        </p>
                                    </div>

                                    <button className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white">
                                        Подробнее
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-[28px] bg-[#f3f0ea] p-8 text-center text-neutral-500">
                        По выбранному диапазону товаров не найдено.
                    </div>
                )}
            </section>

            {/* FILTER MODAL */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-50 flex items-end bg-black/40 px-4 py-4 sm:items-center sm:justify-center">
                    <div className="w-full rounded-[28px] bg-white p-5 shadow-xl sm:max-w-[420px] sm:p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-medium uppercase text-black">
                                Фильтрация
                            </h2>

                            <button
                                type="button"
                                onClick={onCloseFilter}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f0ea] text-xl cursor-pointer"
                            >
                                <IoIosClose className="h-7 w-7" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm text-neutral-500">
                                    Цена от
                                </label>
                                <input
                                    value={minPrice}
                                    onChange={(e) => onMinPriceChange(e.target.value)}
                                    type="number"
                                    placeholder="0"
                                    className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-neutral-500">
                                    Цена до
                                </label>
                                <input
                                    value={maxPrice}
                                    onChange={(e) => onMaxPriceChange(e.target.value)}
                                    type="number"
                                    placeholder="999"
                                    className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onResetFilters}
                                    className="rounded-2xl bg-[#f3f0ea] px-5 py-4 text-sm font-medium text-black cursor-pointer"
                                >
                                    Сбросить
                                </button>

                                <button
                                    type="button"
                                    onClick={onCloseFilter}
                                    className="rounded-2xl bg-black px-5 py-4 text-sm font-medium text-white cursor-pointer"
                                >
                                    Показать
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}