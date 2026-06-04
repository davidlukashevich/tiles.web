import { NavLink } from "react-router-dom"
import { IoIosClose } from "react-icons/io"
import type { FavoriteProduct } from "../../../types/ui/Favorite.type"

type Props = {
    isOpen: boolean
    favorites: FavoriteProduct[]
    onClose: () => void
    onRemove: (id: string) => void
}

const FavoritesDrawer = ({
    isOpen,
    favorites,
    onClose,
    onRemove,
}: Props) => {
    return (
        <div
            className={`fixed inset-0 z-[90] transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"
                }`}
        >
            <button
                type="button"
                onClick={onClose}
                className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity ${isOpen ? "opacity-100" : "opacity-0"
                    }`}
                aria-label="Закрыть избранное"
            />

            <aside
                className={`absolute right-0 top-0 z-[91] flex h-dvh w-full flex-col bg-white transition-transform duration-300 sm:max-w-[460px] ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex min-h-[72px] items-center justify-between border-b border-black/10 px-5">
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-gray-400">
                            Избранное
                        </p>

                        <h2 className="mt-1 text-xl font-semibold uppercase text-black">
                            Ваши товары
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#f3f1ec] text-black transition-all duration-200 hover:scale-105 hover:bg-black hover:text-white"
                        aria-label="Закрыть"
                    >
                        <IoIosClose className="h-7 w-7" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-5">
                    {favorites.length > 0 ? (
                        <div className="grid gap-4">
                            {favorites.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-[96px_1fr] gap-4 rounded-[22px] bg-[#f3f1ec] p-3"
                                >
                                    <NavLink
                                        to={item.href}
                                        onClick={onClose}
                                        className="overflow-hidden rounded-[16px] bg-neutral-200"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="aspect-square h-full w-full object-cover"
                                        />
                                    </NavLink>

                                    <div className="min-w-0">
                                        <p className="text-[11px] uppercase tracking-[0.12em] text-gray-400">
                                            {item.category}
                                        </p>

                                        <NavLink
                                            to={item.href}
                                            onClick={onClose}
                                            className="mt-2 block text-sm font-medium leading-5 text-black transition hover:text-neutral-600"
                                        >
                                            {item.title}
                                        </NavLink>

                                        <div className="mt-3 flex items-end gap-2">
                                            <span className="text-lg font-semibold text-black">
                                                {item.price} BYN
                                            </span>

                                            {item.oldPrice ? (
                                                <span className="pb-[2px] text-sm text-gray-400 line-through">
                                                    {item.oldPrice} BYN
                                                </span>
                                            ) : null}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => onRemove(item.id)}
                                            className="mt-3 cursor-pointer text-sm text-neutral-500 transition hover:text-black"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[24px] bg-[#f3f1ec] p-6 text-center">
                            <h3 className="text-xl font-medium uppercase text-black">
                                Пока пусто
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-neutral-500">
                                Добавляйте товары в избранное, чтобы быстро вернуться к ним позже.
                            </p>

                            <NavLink
                                to="/catalog/tiles"
                                onClick={onClose}
                                className="mt-5 inline-flex h-11 items-center justify-center rounded-[14px] bg-black px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition hover:opacity-80"
                            >
                                В каталог
                            </NavLink>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    )
}

export default FavoritesDrawer