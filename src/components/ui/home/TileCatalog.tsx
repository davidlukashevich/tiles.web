import { NavLink } from "react-router-dom"
import type { TileCategory } from "../../../types/ui/TileCategory.type"

type Props = {
    categories: TileCategory[]
}

const TileCatalog = ({ categories }: Props) => {
    return (
        <section className="px-4 py-10 md:px-6 xl:px-8">
            <div className="mx-auto max-w-[1280px]">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                            Категории
                        </p>

                        <h2 className="mt-3 text-3xl uppercase md:text-4xl">
                            Плитка
                        </h2>
                    </div>

                    <NavLink
                        to="/catalog/tiles/60x60"
                        className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 px-5 text-sm text-gray-700 transition hover:bg-black hover:text-white"
                    >
                        Смотреть всё
                    </NavLink>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {categories.map((category) => (
                        <NavLink
                            key={category.title}
                            to={category.href}
                            className="overflow-hidden rounded-xl border-b border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div
                                className="h-48 bg-cover bg-center"
                                style={{ backgroundImage: `url(${category.image})` }}
                            />

                            <div className="p-4">
                                <p className="mb-2 text-xs uppercase text-gray-400">
                                    {category.subtitle}
                                </p>

                                <h3 className="text-2xl text-gray-700">
                                    {category.title}
                                </h3>

                                <p className="mt-2 text-sm text-gray-600">
                                    {category.description}
                                </p>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TileCatalog