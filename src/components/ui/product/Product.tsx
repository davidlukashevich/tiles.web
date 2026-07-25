import { NavLink } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { FaHeart, FaRegImage } from "react-icons/fa6"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import RequestModalContainer from "../../containers/product/RequestModalContainer"

type ProductCharacteristic = {
    label: string
    value: string
}

type ProductVariant = {
    id: string
    size: string
    surface: string
    price: number | null
    oldPrice?: number
    discountPercent?: number
    isOnSale: boolean
    isRecommended: boolean
}

type Product = {
    id: string
    sku?: string
    title: string
    category: string
    collection: string
    manufacturer?: string
    country?: string
    price: number
    oldPrice?: number | null
    priceIsFrom?: boolean
    image: string
    images?: string[]
    characteristics: ProductCharacteristic[]
    variants?: ProductVariant[]
    youtubeUrl?: string | null
    href?: string
}

const formatPrice = (value: number) => `${value} BYN`

type Props = {
    product?: Product
    isLoading: boolean
    backHref: string
    isRequestOpen: boolean
    isFavorite: boolean
    onOpenRequest: () => void
    onCloseRequest: () => void
    onToggleFavorite: () => void
}

const ProductView = ({
    product,
    isLoading,
    backHref,
    isRequestOpen,
    isFavorite,
    onOpenRequest,
    onCloseRequest,
    onToggleFavorite,
}: Props) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const stripRef = useRef<HTMLDivElement>(null)

    // Сбрасываем на первую картинку, когда товар подгрузился/сменился
    useEffect(() => {
        setActiveIndex(0)
    }, [product])

    // Активная миниатюра доезжает в центр ленты
    useEffect(() => {
        const strip = stripRef.current
        if (!strip) return

        const thumb = strip.children[activeIndex] as HTMLElement | undefined
        if (!thumb) return

        const target =
            strip.scrollLeft +
            thumb.getBoundingClientRect().left -
            strip.getBoundingClientRect().left -
            (strip.clientWidth - thumb.clientWidth) / 2

        strip.scrollLeft = target
    }, [activeIndex])

    if (isLoading) {
        return (
            <main className="bg-white px-4 py-8 md:px-6 xl:px-8 xl:py-10">
                <div className="mx-auto max-w-[1440px]">
                    <div className="mb-6 animate-pulse">
                        <div className="h-3 w-24 rounded bg-gray-200" />
                        <div className="mt-3 h-9 w-2/3 rounded bg-gray-200" />
                    </div>

                    <div className="grid animate-pulse items-start gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                        <div>
                            <div className="aspect-[16/11] w-full rounded-[24px] bg-gray-200" />
                            <div className="mt-4 grid grid-cols-4 gap-3">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square rounded-[18px] bg-gray-200"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[24px] border border-black/10 p-6">
                            <div className="h-3 w-24 rounded bg-gray-200" />
                            <div className="mt-3 h-7 w-1/2 rounded bg-gray-200" />
                            <div className="mt-6 space-y-4">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-5 w-full rounded bg-gray-200"
                                    />
                                ))}
                            </div>
                            <div className="mt-6 h-9 w-1/3 rounded bg-gray-200" />
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    if (!product) {
        return (
            <main className="bg-white px-4 py-16">
                <div className="mx-auto max-w-[1440px] rounded-[24px] bg-[#f3f1ec] p-8 text-center">
                    <h1 className="text-3xl uppercase text-[#2f2f2f]">
                        Товар не найден
                    </h1>

                    <NavLink
                        to={backHref}
                        className="mt-6 inline-flex h-11 items-center justify-center rounded-[14px] border border-black/10 bg-white px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
                    >
                        Вернуться в каталог
                    </NavLink>
                </div>
            </main>
        )
    }

    const gallery = (
        product.images?.length ? product.images : [product.image]
    ).filter(Boolean)

    const total = gallery.length
    const currentIndex = total ? Math.min(activeIndex, total - 1) : 0
    const activeImage = gallery[currentIndex] ?? ""

    const goPrev = () =>
        setActiveIndex((currentIndex - 1 + total) % total)
    const goNext = () => setActiveIndex((currentIndex + 1) % total)

    const priceLabel = `${product.priceIsFrom ? "от " : ""}${formatPrice(product.price)}`

    const variants = product.variants ?? []

    return (
        <>
            <main className="bg-white px-4 py-8 md:px-6 xl:px-8 xl:py-10">
                <div className="mx-auto max-w-[1440px]">
                    <div className="mb-6">
                        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                            {product.category}
                        </p>

                        <h1 className="mt-3 text-3xl uppercase text-[#2f2f2f] md:text-4xl">
                            {product.title}
                        </h1>
                    </div>

                    <section className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="min-w-0">
                            <div className="group relative overflow-hidden rounded-[24px] bg-[#f3f1ec]">
                                {activeImage ? (
                                    <img
                                        src={activeImage}
                                        alt={product.title}
                                        className="aspect-[16/11] w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex aspect-[16/11] w-full flex-col items-center justify-center gap-2 text-neutral-400">
                                        <FaRegImage className="h-10 w-10" />
                                        <span className="text-sm font-medium">
                                            Нет фото
                                        </span>
                                    </div>
                                )}

                                {total > 1 ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={goPrev}
                                            aria-label="Предыдущее фото"
                                            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-black shadow-md transition hover:bg-black hover:text-white"
                                        >
                                            <IoIosArrowBack className="h-5 w-5" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={goNext}
                                            aria-label="Следующее фото"
                                            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-black shadow-md transition hover:bg-black hover:text-white"
                                        >
                                            <IoIosArrowForward className="h-5 w-5" />
                                        </button>

                                        <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
                                            {currentIndex + 1} / {total}
                                        </div>
                                    </>
                                ) : null}
                            </div>

                            {total > 1 ? (
                                <div
                                    ref={stripRef}
                                    className="mt-4 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                                >
                                    {gallery.map((image, index) => {
                                        const isActive = index === currentIndex

                                        return (
                                            <button
                                                key={`${image}-${index}`}
                                                type="button"
                                                onClick={() => setActiveIndex(index)}
                                                className={`h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-[16px] border transition ${isActive
                                                        ? "border-black"
                                                        : "border-black/10 hover:border-black/30"
                                                    }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${product.title} ${index + 1}`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </button>
                                        )
                                    })}
                                </div>
                            ) : null}

                            {product.youtubeUrl ? (
                                <a
                                    href={product.youtubeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-4 flex h-12 items-center justify-center rounded-[16px] border border-black/10 px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
                                >
                                    Смотреть видео
                                </a>
                            ) : null}
                        </div>

                        <div className="relative min-w-0 rounded-[24px] border border-black/10 bg-white p-5 md:p-6">
                            <button
                                type="button"
                                onClick={onToggleFavorite}
                                className="group absolute right-5 top-5 z-10 flex cursor-pointer items-center overflow-hidden rounded-full bg-white shadow-md backdrop-blur"
                                aria-label={
                                    isFavorite
                                        ? "Удалить из избранного"
                                        : "Добавить в избранное"
                                }
                            >
                                <span
                                    className={`whitespace-nowrap text-[12px] font-medium transition-all duration-300 ${isFavorite
                                            ? "max-w-[180px] px-3 opacity-100"
                                            : "max-w-0 px-0 opacity-0 group-hover:max-w-[180px] group-hover:px-3 group-hover:opacity-100"
                                        }`}
                                >
                                    {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                                </span>

                                <div
                                    className={`flex h-11 w-11 items-center justify-center transition-colors ${isFavorite
                                            ? "bg-red-500 text-white"
                                            : "bg-[#f3f1ec] text-black"
                                        }`}
                                >
                                    <FaHeart className="h-4 w-4" />
                                </div>
                            </button>

                            <p className="pr-14 text-[11px] uppercase tracking-[0.28em] text-gray-400">
                                Коллекция
                            </p>

                            <h2 className="mt-3 pr-14 text-2xl uppercase text-[#2f2f2f]">
                                {product.collection}
                            </h2>

                            <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
                                {product.characteristics.map((item) => (
                                    <div
                                        key={item.label}
                                        className="grid gap-2 py-4 text-sm sm:grid-cols-[170px_1fr]"
                                    >
                                        <div className="text-gray-400">{item.label}</div>

                                        <div className="font-medium text-[#2f2f2f]">
                                            {item.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1">
                                <span className="text-3xl font-semibold text-black">
                                    {priceLabel}
                                </span>

                                {product.oldPrice ? (
                                    <span className="pb-1 text-lg text-gray-400 line-through">
                                        {formatPrice(product.oldPrice)}
                                    </span>
                                ) : null}
                            </div>

                            {variants.length > 0 ? (
                                <div className="mt-6">
                                    <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-gray-400">
                                        Варианты
                                    </p>

                                    <div className="divide-y divide-black/10 overflow-hidden rounded-[16px] border border-black/10">
                                        {variants.map((variant) => (
                                            <div
                                                key={variant.id}
                                                className="flex flex-wrap items-center justify-between gap-3 p-4"
                                            >
                                                <div className="min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2 text-sm">
                                                        <span className="font-medium text-[#2f2f2f]">
                                                            {variant.size}
                                                        </span>
                                                        <span className="text-neutral-300">·</span>
                                                        <span className="text-gray-600">
                                                            {variant.surface}
                                                        </span>
                                                    </div>

                                                    {(variant.isOnSale || variant.isRecommended) && (
                                                        <div className="mt-2 flex flex-wrap gap-2">
                                                            {variant.isOnSale && (
                                                                <span className="rounded-full bg-yellow-400 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                                                                    Распродажа
                                                                </span>
                                                            )}
                                                            {variant.isRecommended && (
                                                                <span className="rounded-full bg-green-500 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                                                                    Новинка
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="text-right">
                                                    {variant.price != null ? (
                                                        <div className="flex items-baseline justify-end gap-2">
                                                            <span className="text-lg font-semibold text-black">
                                                                {formatPrice(variant.price)}
                                                            </span>
                                                            {variant.oldPrice ? (
                                                                <span className="text-sm text-gray-400 line-through">
                                                                    {formatPrice(variant.oldPrice)}
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-gray-500">
                                                            Цена по запросу
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    className="h-12 cursor-pointer rounded-[14px] border border-black/10 bg-[#f3f1ec] px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
                                    onClick={onOpenRequest}
                                >
                                    Оставить заявку
                                </button>

                                <NavLink
                                    to={backHref}
                                    className="flex h-12 items-center justify-center rounded-[14px] border border-black/10 px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition-all duration-200 hover:bg-[#f3f1ec]"
                                >
                                    В каталог
                                </NavLink>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <RequestModalContainer
                isOpen={isRequestOpen}
                onClose={onCloseRequest}
                productId={product.id}
                productName={product.title}
            />
        </>
    )
}

export default ProductView