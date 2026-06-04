import { useEffect, useState } from "react"
import FavoritesDrawer from "../../ui/favorites/FavoritesDrawer"
import type { FavoriteProduct } from "../../../types/ui/Favorite.type"

const FAVORITES_KEY = "favoriteProducts"

type Props = {
    isOpen: boolean
    onClose: () => void
    onChangeCount: (count: number) => void
}

const getFavorites = (): FavoriteProduct[] => {
    try {
        const value = localStorage.getItem(FAVORITES_KEY)
        return value ? JSON.parse(value) : []
    } catch {
        return []
    }
}

const FavoritesContainer = ({
    isOpen,
    onClose,
    onChangeCount,
}: Props) => {
    const [favorites, setFavorites] = useState<FavoriteProduct[]>([])

    const syncFavorites = () => {
        const items = getFavorites()
        setFavorites(items)
        onChangeCount(items.length)
    }

    useEffect(() => {
        syncFavorites()

        window.addEventListener("storage", syncFavorites)
        window.addEventListener("favorites:changed", syncFavorites)

        return () => {
            window.removeEventListener("storage", syncFavorites)
            window.removeEventListener("favorites:changed", syncFavorites)
        }
    }, [])

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : ""

        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    const handleRemove = (id: string) => {
        const nextFavorites = favorites.filter((item) => item.id !== id)

        localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites))
        setFavorites(nextFavorites)
        onChangeCount(nextFavorites.length)

        window.dispatchEvent(new Event("favorites:changed"))
    }

    return (
        <FavoritesDrawer
            isOpen={isOpen}
            favorites={favorites}
            onClose={onClose}
            onRemove={handleRemove}
        />
    )
}

export default FavoritesContainer