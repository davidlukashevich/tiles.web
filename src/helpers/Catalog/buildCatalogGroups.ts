import type { Category } from "../../types/response/Category.type"

export type CatalogGroupItem = {
  label: string
  value: string
  href: string
}

export type CatalogGroup = {
  title: string
  value: string
  href: string
  items: CatalogGroupItem[]
}

export const buildCatalogGroups = (
  categories: Category[] = [],
): CatalogGroup[] => {
  return [
    {
      title: "Керамогранит",
      value: "tiles",
      href: "/catalog/tiles",
      items: categories.map((category) => ({
        label: category.name,
        value: category.slug,
        href: `/catalog/tiles/${category.slug}`,
      })),
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
  ]
}