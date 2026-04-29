import { useMemo, useState } from "react"
import { SaleView } from "../../ui/sale/SaleView"

const saleProducts = [
    {
        id: 1,
        title: "Керамогранит серый 60x60",
        size: "60x60",
        category: "Плитка",
        oldPrice: 89,
        price: 69,
        discount: "-22%",
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 2,
        title: "Керамогранит бежевый 120x60",
        size: "120x60",
        category: "Плитка",
        oldPrice: 119,
        price: 95,
        discount: "-20%",
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 3,
        title: "Плитка под мрамор 80x80",
        size: "80x80",
        category: "Плитка",
        oldPrice: 105,
        price: 79,
        discount: "-25%",
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    },
]

export function SaleContainer() {
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const filteredProducts = useMemo(() => {
        const min = minPrice ? Number(minPrice) : 0
        const max = maxPrice ? Number(maxPrice) : Infinity

        return saleProducts.filter((product) => {
            return product.price >= min && product.price <= max
        })
    }, [minPrice, maxPrice])

    return (
        <SaleView
            products={filteredProducts}
            minPrice={minPrice}
            maxPrice={maxPrice}
            isFilterOpen={isFilterOpen}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onOpenFilter={() => setIsFilterOpen(true)}
            onCloseFilter={() => setIsFilterOpen(false)}
            onResetFilters={() => {
                setMinPrice("")
                setMaxPrice("")
            }}
        />
    )
}