import viber from "../assets/viber.jpeg"
import kufar from "../assets/kufar.jpeg"

export type NavLinkItem = {
  label: string
  href: string
}

export type NavGroup = {
  label: string
  href: string
  children: NavLinkItem[]
}

export type NavPromo = {
  label: string
  href: string
  badge?: string
}

export type NavItem = {
  label: string
  href?: string
  children?: NavLinkItem[]
  groups?: NavGroup[]
  promo?: NavPromo
}

export type SocialLink = {
  label: string
  href: string
  img?: string
}

export const navigation: NavItem[] = [
  {
    label: "Каталог",
    href: "/catalog/tiles",
    promo: {
      label: "Распродажа",
      href: "/catalog/sale",
      badge: "Sale",
    },
    groups: [
      {
        label: "Керамогранит",
        href: "/catalog/tiles",
        children: [
          { label: "60x60", href: "/catalog/tiles/60x60" },
          { label: "80x80", href: "/catalog/tiles/80x80" },
          { label: "120x60", href: "/catalog/tiles/120x60" },
          { label: "120x20", href: "/catalog/tiles/120x20" },
          { label: "160x80", href: "/catalog/tiles/160x80" },
          { label: "Керамическая Плитка", href: "/catalog/ceramic-tile" },
        ],
      },
      {
        label: "Сопутствующие Товары",
        href: "/catalog/accessories",
        children: [
          { label: "Строительные смеси", href: "/catalog/accessories/mixes" },
          { label: "Затирка", href: "/catalog/accessories/grout" },
          { label: "Силикон", href: "/catalog/accessories/silicone" },
          { label: "Прочее", href: "/catalog/accessories/other" },
        ],
      },
    ],
  },
  {
    label: "Подборка",
    children: [
      {
        label: "Мрамор",
        href: "/catalog/selections/marble",
      },
      {
        label: "Бетон",
        href: "/catalog/selections/concrete",
      },
      {
        label: "Камень",
        href: "/catalog/selections/stone",
      },
      {
        label: "Оникс",
        href: "/catalog/selections/onyx",
      },
      {
        label: "Дерево",
        href: "/catalog/selections/wood",
      },
      {
        label: "Терраццо",
        href: "/catalog/selections/terrazzo",
      },
      {
        label: "Пэчворк",
        href: "/catalog/selections/patchwork",
      },
      {
        label: "Травертин",
        href: "/catalog/selections/travertine",
      },
      {
        label: "Кирпичик",
        href: "/catalog/selections/brick",
      },
      {
        label: "Ржавчина",
        href: "/catalog/selections/rust",
      },
      {
        label: "Моноколор",
        href: "/catalog/selections/monocolor",
      },
      {
        label: "Декор",
        href: "/catalog/selections/decor",
      },
    ],
  },
  {
    label: "Как купить",
    children: [
      { label: "Рассрочка", href: "/how-to-buy/installment" },
      { label: "Оплата", href: "/how-to-buy/payment" },
      { label: "Доставка", href: "/how-to-buy/delivery" },
      { label: "Самовывоз", href: "/how-to-buy/pickup" },
      { label: "Прием и возврат товара", href: "/how-to-buy/returns" },
    ],
  },
  {
    label: "О нас",
    href: "/about",
  },
]

export const socialLinks: SocialLink[] = [
  { label: "Viber", href: "https://viber.com", img: viber },
  { label: "Kufar", href: "https://kufar.by", img: kufar },
]

export const companyInfo = {
  brandName: "Квадратный Метр",
  brandSubtitle: "Керамическая плитка",
  phone: "+375 (29) xxx-xx-xx",
  phoneHref: "tel:+37529xxxxxxx",
  addressLines: ["г. Минск", "ул. Примерная, 10"],
  workTime: "Ежедневно, с 9:00 до 20:00",
  copyright: "© 2026 Квадратный метр. Все права защищены.",
}

export const footerLinks = {
  legal: [
    { label: "Политика конфиденциальности", href: "/privacy" },
    { label: "Пользовательское соглашение", href: "/terms" },
  ],
}