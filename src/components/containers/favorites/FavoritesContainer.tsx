import { useEffect, useState } from "react"
import FavoritesDrawer from "../../ui/favorites/FavoritesDrawer"
import type { FavoriteProduct } from "../../../types/ui/Favorite.type"
import {
  getFavorites,
  removeFavorite,
} from "../../../helpers/Favorite/favorite"

type Props = {
    isOpen: boolean
    onClose: () => void
    onChangeCount: (count: number) => void
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
        const nextFavorites = removeFavorite(id)

        setFavorites(nextFavorites)
        onChangeCount(nextFavorites.length)
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