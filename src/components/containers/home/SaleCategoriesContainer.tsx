import { useEffect, useState } from "react"
import {
  getFavorites,
  toggleFavorite,
} from "../../../helpers/Favorite/favorite"
import type { SaleItem } from "../../../types/ui/Sale.type"
import SaleCategories from "../../ui/home/SaleCategories"

const SaleCategoriesContainer = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  const saleItems: SaleItem[] = [
    {
      id: "1",
      title: "Керамогранит светлый 60x60",
      subtitle: "Керамогранит · 60x60",
      description: "Матовая поверхность · Kerama Marazzi",
      image:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      price: "82 BYN",
      oldPrice: "99 BYN",
      isSale: true,
    },
    {
      id: "2",
      title: "Керамогранит под мрамор 80x80",
      subtitle: "Керамогранит · 80x80",
      description: "Лаппатированная поверхность · Paradyz",
      image:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      price: "79 BYN",
      oldPrice: "95 BYN",
      isSale: true,
    },
    {
      id: "3",
      title: "Затирка влагостойкая",
      subtitle: "Сопутствующие товары",
      description: "Mapei · Для ванной и кухни",
      image:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      price: "18 BYN",
      oldPrice: "24 BYN",
      isSale: true,
    },
  ]

  useEffect(() => {
    const syncFavorites = () => {
      setFavoriteIds(getFavorites().map((item) => item.id))
    }

    syncFavorites()

    window.addEventListener("favorites:changed", syncFavorites)
    window.addEventListener("storage", syncFavorites)

    return () => {
      window.removeEventListener("favorites:changed", syncFavorites)
      window.removeEventListener("storage", syncFavorites)
    }
  }, [])

  const handleToggleFavorite = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: SaleItem
  ) => {
    event.preventDefault()
    event.stopPropagation()

    toggleFavorite({
      id: item.id,
      title: item.title,
      category: item.subtitle,
      image: item.image,
      price: Number(item.price.replace(/[^\d.]/g, "")),
      oldPrice: item.oldPrice
        ? Number(item.oldPrice.replace(/[^\d.]/g, ""))
        : undefined,
      href: `/product/${item.id}`,
    })

    setFavoriteIds(getFavorites().map((item) => item.id))
  }

  return (
    <SaleCategories
      saleItems={saleItems}
      favoriteIds={favoriteIds}
      onToggleFavorite={handleToggleFavorite}
    />
  )
}

export default SaleCategoriesContainer