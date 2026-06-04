import type { FavoriteProduct } from "../../types/ui/Favorite.type"

const FAVORITES_KEY = "favoriteProducts"

export const getFavorites = (): FavoriteProduct[] => {
    try {
        const data = localStorage.getItem(FAVORITES_KEY)
        return data ? JSON.parse(data) : []
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