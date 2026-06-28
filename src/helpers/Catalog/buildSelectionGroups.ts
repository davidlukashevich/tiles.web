import type { CatalogGroup } from "../../types/ui/Catalog.type"
import { collectionMap } from "./collectionMap"

export const buildSelectionGroups = (): CatalogGroup[] => [
  {
    title: "Подборки",
    value: "selections",
    href: "/catalog/selections/marble",
    items: Object.entries(collectionMap).map(([slug, name]) => ({
      label: name,
      value: slug,
      href: `/catalog/selections/${slug}`,
    })),
  },
]