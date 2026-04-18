import type { SaleItem } from "../../../types/ui/Sale.type"
import SaleCategories from "../../ui/home/SaleCategories"

const SaleCategoriesContainer = () => {
    const saleItems: SaleItem[] = [
      {
        title: 'Скидки до 40%',
        subtitle: 'Распродажа',
        description: 'Актуальные коллекции плитки по сниженной цене.',
        image:
          'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
        badge: '-40%',
      },
      {
        title: 'Остатки коллекций',
        subtitle: 'Распродажа',
        description: 'Последние позиции популярных серий.',
        image:
          'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
        badge: 'Limited',
      },
      {
        title: 'Большие форматы',
        subtitle: 'Распродажа',
        description: 'Крупноформатная плитка со скидкой.',
        image:
          'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
        badge: 'Sale',
      },
      {
        title: 'Премиум коллекции',
        subtitle: 'Распродажа',
        description: 'Избранные позиции по доступной цене.',
        image:
          'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
        badge: '-25%',
      },
    ]

    return (
        <SaleCategories saleItems={saleItems} />
    )
}

export default SaleCategoriesContainer