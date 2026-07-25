import type { Category } from "../../types/response/Category.type"
import { splitTileCategories } from "./tileCategories"

export type CatalogGroupItem = {
  label: string
  value: string
  href: string
  children?: CatalogGroupItem[]
}

export type CatalogGroup = {
  title: string
  value: string
  href: string
  items: CatalogGroupItem[]
}

const toItem = (category: Category): CatalogGroupItem => ({
  label: category.name,
  value: category.slug,
  href: `/catalog/tiles/${category.slug}`,
})

export const buildCatalogGroups = (
  categories: Category[] = [],
): CatalogGroup[] => {
  const { main, rest } = splitTileCategories(categories)

  const tileItems: CatalogGroupItem[] = main.map(toItem)

  if (rest.length) {
    tileItems.push({
      label: "Другие размеры",
      value: "tiles-other",
      href: "",
      children: rest.map(toItem),
    })
  }

  return [
    {
      title: "Керамогранит",
      value: "tiles",
      href: "/catalog/tiles",
      items: tileItems,
    },
    {
      title: "Сопутствующие товары",
      value: "accessories",
      href: "/catalog/accessories",
      items: [
        {
          label: "Строительные смеси",
          value: "mixes",
          href: "/catalog/accessories/mixes",
        },
        {
          label: "Затирка",
          value: "grout",
          href: "/catalog/accessories/grout",
        },
        {
          label: "Силикон",
          value: "silicone",
          href: "/catalog/accessories/silicone",
        },
      ],
    },
    {
      title: "Распродажа",
      value: "sale",
      href: "/catalog/sale",
      items: [],
    },
  ]
}