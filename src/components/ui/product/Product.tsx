import { NavLink } from "react-router-dom"
import { useState } from "react"

type ProductCharacteristic = {
    label: string
    value: string
}

type Product = {
    id: string
    title: string
    category: string
    collection: string
    manufacturer?: string
    country?: string
    price: number
    oldPrice?: number | null
    image: string
    images?: string[]
    description: string
    characteristics: ProductCharacteristic[]
}

type Props = {
    product?: Product
}

const ProductView = ({ product }: Props) => {
    const [activeImage, setActiveImage] = useState(
        product?.images?.[0] || product?.image || ""
    )

    if (!product) {
        return (
            <main className="bg-white px-4 py-16">
                <div className="mx-auto max-w-[1280px] rounded-[24px] bg-[#f3f1ec] p-8 text-center">
                    <h1 className="text-3xl uppercase text-[#2f2f2f]">
                        Товар не найден
                    </h1>

                    <NavLink
                        to="/catalog/tiles"
                        className="mt-6 inline-flex h-11 items-center justify-center rounded-[14px] border border-black/10 bg-white px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
                    >
                        Вернуться в каталог
                    </NavLink>
                </div>
            </main>
        )
    }

    const gallery = product.images?.length
        ? product.images
        : [product.image]

    return (
        <main className="bg-white px-4 py-8 md:px-6 xl:px-8 xl:py-10">
            <div className="mx-auto max-w-[1280px]">
                {/* HEADER */}
                <div className="mb-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                        {product.category}
                    </p>

                    <h1 className="mt-3 text-3xl uppercase text-[#2f2f2f] md:text-4xl">
                        {product.title}
                    </h1>
                </div>

                {/* TOP */}
                <section className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                    {/* IMAGE */}
                    <div>
                        <div className="overflow-hidden rounded-[24px] bg-[#f3f1ec]">
                            <img
                                src={activeImage}
                                alt={product.title}
                                className="aspect-[16/11] w-full object-cover"
                            />
                        </div>

                        {/* THUMBNAILS */}
                        <div className="mt-4 grid grid-cols-4 gap-3">
                            {gallery.map((image, index) => {
                                const isActive = image === activeImage

                                return (
                                    <button
                                        key={`${image}-${index}`}
                                        type="button"
                                        onClick={() => setActiveImage(image)}
                                        className={`overflow-hidden rounded-[18px] border transition ${isActive
                                                ? "border-black"
                                                : "border-black/10 hover:border-black/30"
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.title} ${index + 1}`}
                                            className="aspect-square w-full object-cover"
                                        />
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* INFO */}
                    <div className="rounded-[24px] border border-black/10 bg-white p-5 md:p-6">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-gray-400">
                            Коллекция
                        </p>

                        <h2 className="mt-3 text-2xl uppercase text-[#2f2f2f]">
                            {product.collection}
                        </h2>

                        <p className="mt-4 text-sm leading-8 text-[#66615b]">
                            {product.description}
                        </p>

                        {/* CHARACTERISTICS */}
                        <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
                            {product.characteristics.map((item) => (
                                <div
                                    key={item.label}
                                    className="grid gap-2 py-4 text-sm sm:grid-cols-[170px_1fr]"
                                >
                                    <div className="text-gray-400">
                                        {item.label}
                                    </div>

                                    <div className="font-medium text-[#2f2f2f]">
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* PRICE */}
                        <div className="mt-6 flex items-end gap-3">
                            <span className="text-3xl font-semibold text-black">
                                {product.price} BYN
                            </span>

                            {product.oldPrice ? (
                                <span className="pb-1 text-lg text-gray-400 line-through">
                                    {product.oldPrice} BYN
                                </span>
                            ) : null}
                        </div>

                        {/* BUTTONS */}
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            <button
                                type="button"
                                className="h-12 rounded-[14px] border border-black/10 bg-[#f3f1ec] px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
                            >
                                Оставить заявку
                            </button>

                            <NavLink
                                to="/catalog/tiles"
                                className="flex h-12 items-center justify-center rounded-[14px] border border-black/10 px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition-all duration-200 hover:bg-[#f3f1ec]"
                            >
                                В каталог
                            </NavLink>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default ProductView