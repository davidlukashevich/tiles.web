import type { NavItem, NavLinkItem } from "../../data/navigation"
import type { Category } from "../../types/response/Category.type"
import { splitTileCategories } from "../Catalog/tileCategories"

const toLink = (category: Category): NavLinkItem => ({
    label: category.name,
    href: `/catalog/tiles/${category.slug}`,
})

export const buildNavigation = (
    navigation: NavItem[],
    categories: Category[] = [],
): NavItem[] => {
    return navigation.map((item) => {
        if (item.label !== "Каталог" || !item.groups) {
            return item
        }

        return {
            ...item,
            groups: item.groups.map((group) => {
                if (group.label !== "Керамогранит") {
                    return group
                }

                const { main, rest } = splitTileCategories(categories)

                const children: NavLinkItem[] = main.map(toLink)

                // В шапке «Другие размеры» — просто ссылка на первый из остальных
                if (rest.length) {
                    children.push({
                        label: "Другие размеры",
                        href: `/catalog/tiles/${rest[0].slug}`,
                    })
                }

                return { ...group, children }
            }),
        }
    })
}