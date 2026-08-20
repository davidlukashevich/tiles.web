import type { FavoriteProduct } from "../../types/ui/Favorite.type"

const FAVORITES_KEY = "favoriteProducts"

// Раньше товарам без фото подставлялась картинка со стока. Она осталась
// в localStorage у тех, кто добавил такой товар до правки, — вырезаем её,
// чтобы вместо чужого фото показывался блок «Нет фото».
const STOCK_PLACEHOLDER = "images.unsplash.com"

const normalize = (item: FavoriteProduct): FavoriteProduct =>
    item.image && item.image.includes(STOCK_PLACEHOLDER)
        ? { ...item, image: "" }
        : item

export const getFavorites = (): FavoriteProduct[] => {
    try {
        const data = localStorage.getItem(FAVORITES_KEY)
        return data ? (JSON.parse(data) as FavoriteProduct[]).map(normalize) : []
    } catch {
        return []
    }
}

export const isFavorite = (id: string) => {
    return getFavorites().some((item) => item.id === id)
}

export const toggleFavorite = (product: FavoriteProduct) => {
    const favorites = getFavorites()
    const exists = favorites.some((item) => item.id === product.id)

    const nextFavorites = exists
        ? favorites.filter((item) => item.id !== product.id)
        : [...favorites, product]

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites))
    window.dispatchEvent(new Event("favorites:changed"))

    return !exists
}
// Удаление из шторки избранного. Возвращает новый список, чтобы вызывающий
// не читал localStorage повторно.
export const removeFavorite = (id: string): FavoriteProduct[] => {
    const nextFavorites = getFavorites().filter((item) => item.id !== id)

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites))
    window.dispatchEvent(new Event("favorites:changed"))

    return nextFavorites
}
