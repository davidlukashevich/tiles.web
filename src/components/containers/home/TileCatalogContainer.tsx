import type { TileCategory } from "../../../types/ui/TileCategory.type"
import TileCatalog from "../../ui/home/TileCatalog"

const TileCatalogContainer = () => {
    const categories: TileCategory[] = [
        {
            title: "60x60",
            subtitle: "Плитка",
            description:
                "Универсальный формат для кухни, ванной и коммерческих помещений.",
            image:
                "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
            href: "/catalog/tiles/60x60",
        },
        {
            title: "80x80",
            subtitle: "Плитка",
            description:
                "Крупный квадратный формат для современных интерьеров.",
            image:
                "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
            href: "/catalog/tiles/80x80",
        },
        {
            title: "120x60",
            subtitle: "Плитка",
            description:
                "Современный вытянутый формат для стен и пола.",
            image:
                "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
            href: "/catalog/tiles/120x60",
        },
        {
            title: "120x20",
            subtitle: "Плитка",
            description:
                "Формат под дерево для уютных и тёплых интерьеров.",
            image:
                "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
            href: "/catalog/tiles/120x20",
        },
        {
            title: "160x80",
            subtitle: "Плитка",
            description:
                "Крупный премиальный формат для просторных помещений.",
            image:
                "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
            href: "/catalog/tiles/160x80",
        },
        {
            title: "Керамическая плитка",
            subtitle: "Плитка",
            description:
                "Классические решения для ванной комнаты и кухни.",
            image:
                "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
            href: "/catalog/ceramic-tile",
        },
    ]

    return <TileCatalog categories={categories} />
}

export default TileCatalogContainer