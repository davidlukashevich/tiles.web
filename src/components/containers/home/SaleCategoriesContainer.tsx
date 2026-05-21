import type { SaleItem } from "../../../types/ui/Sale.type"
import SaleCategories from "../../ui/home/SaleCategories"

const SaleCategoriesContainer = () => {
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
      discountPercent: 17,
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
      discountPercent: 20,
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
      discountPercent: 25,
    },
  ]

  return <SaleCategories saleItems={saleItems} />
}

export default SaleCategoriesContainer