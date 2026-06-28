import type { NavItem } from "../../data/navigation"
import type { Category } from "../../types/response/Category.type"

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

                return {
                    ...group,
                    children: categories.map((category) => ({
                        label: category.name,
                        href: `/catalog/tiles/${category.slug}`,
                    })),
                }
            }),
        }
    })
}