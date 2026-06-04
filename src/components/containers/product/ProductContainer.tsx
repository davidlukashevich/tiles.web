import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import ProductView from "../../ui/product/Product"
import {
  isFavorite,
  toggleFavorite,
} from "../../../helpers/Favorite/favorite"

const products = [
  {
    id: "1",
    title: "Керамогранит серый 60x60",
    category: "Керамогранит",
    collection: "Urban Stone",
    size: "60x60",
    surface: "Матовая",
    manufacturer: "Cersanit",
    country: "Польша",
    price: 69,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    characteristics: [
      { label: "Размер", value: "60x60 см" },
      { label: "Поверхность", value: "Матовая" },
      { label: "Производитель", value: "Cersanit" },
      { label: "Страна", value: "Польша" },
      { label: "Назначение", value: "Пол / стены" },
      { label: "Износостойкость", value: "PEI IV" },
    ],
  },
  {
    id: "2",
    title: "Керамогранит светлый 60x60",
    category: "Керамогранит",
    collection: "Light Stone",
    size: "60x60, 120x60",
    surface: "Глянцевая, Лаппатированная",
    manufacturer: "Kerama Marazzi",
    country: "Россия",
    price: 82,
    oldPrice: 99,
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    characteristics: [
      { label: "Размер", value: "60x60 см, 120x60 см" },
      { label: "Поверхность", value: "Глянцевая, Лаппатированная" },
      { label: "Производитель", value: "Kerama Marazzi" },
      { label: "Страна", value: "Россия" },
      { label: "Назначение", value: "Пол / стены" },
      { label: "Тип", value: "Керамогранит" },
    ],
  },
]

const ProductContainer = () => {
  const [isRequestOpen, setIsRequestOpen] = useState(false)
  const [favorite, setFavorite] = useState(false)

  const { id } = useParams()

  const product = useMemo(() => {
    return products.find((item) => item.id === id)
  }, [id])

  useEffect(() => {
    if (!product) return

    setFavorite(isFavorite(product.id))

    const handleFavoritesChanged = () => {
      setFavorite(isFavorite(product.id))
    }

    window.addEventListener("favorites:changed", handleFavoritesChanged)
    window.addEventListener("storage", handleFavoritesChanged)

    return () => {
      window.removeEventListener("favorites:changed", handleFavoritesChanged)
      window.removeEventListener("storage", handleFavoritesChanged)
    }
  }, [product])

  const handleToggleFavorite = () => {
    if (!product) return

    const nextState = toggleFavorite({
      id: product.id,
      title: product.title,
      category: product.category,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice ?? undefined,
      href: `/product/${product.id}`,
    })

    setFavorite(nextState)
  }

  return (
    <ProductView
      product={product}
      isRequestOpen={isRequestOpen}
      isFavorite={favorite}
      onOpenRequest={() => setIsRequestOpen(true)}
      onCloseRequest={() => setIsRequestOpen(false)}
      onToggleFavorite={handleToggleFavorite}
    />
  )
}

export default ProductContainer