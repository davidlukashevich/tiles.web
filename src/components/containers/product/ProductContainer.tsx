import { useMemo } from "react"
import { useParams } from "react-router-dom"
import ProductView from "../../ui/product/Product"

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
    description:
      "Практичный керамогранит в спокойном сером оттенке. Подходит для ванной, кухни, прихожей и коммерческих помещений.",
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
    description:
      "Светлый керамогранит с универсальным дизайном. Хорошо подходит для современных интерьеров.",
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
  const { id } = useParams()

  const product = useMemo(() => {
    return products.find((item) => item.id === id)
  }, [id])

  return <ProductView product={product} />
}

export default ProductContainer