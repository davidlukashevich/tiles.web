import viber from "../assets/viber.jpeg"
import kufar from "../assets/kufar.jpeg"
import telegram from "../assets/telegram.png"

export type NavLinkItem = {
  label: string
  href?: string
  children?: NavLinkItem[]
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
          // { label: "60x60", href: "/catalog/tiles/60x60" },
          // { label: "80x80", href: "/catalog/tiles/80x80" },
          // { label: "120x60", href: "/catalog/tiles/120x60" },
          // { label: "120x20", href: "/catalog/tiles/120x20" },
          // { label: "160x80", href: "/catalog/tiles/160x80" },
          // { label: "Керамическая Плитка", href: "/catalog/ceramic-tile" },
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
  { label: "Viber", href: "https://invite.viber.com/?g2=AQBrYsk0U9HR7E7kqW8mB2B7%2BjO58CRdE7FNq18DI1vchPl2j%2Fg3N6qMHTt9BlrU&lang=pl", img: viber },
  { label: "Kufar", href: "https://www.kufar.by/user/OvIl4pMf5MitD1nz_o3aRWo?previousUrl=https%3A%2F%2Fwww.kufar.by%2Fitem%2F1057720139&widgetPosition=upper", img: kufar },
  { label: "Telegram", href: "https://web.telegram.org/", img: telegram },
]

export const companyInfo = {
  brandName: "Квадратный Метр",
  brandSubtitle: "Керамическая плитка",
  phone: "+375 (33) 666-58-56",
  phoneHref: "tel:+375336665856",
  addressLines: ["г. Иваново", "ул.Кирова 52"],
  workTime: [
    "Пн: Выходной",
    "Вт – Пт: 09:00 – 18:00",
    "Сб – Вс: 09:00 – 15:00",
  ],
copyright: "© 2026 Квадратный метр. Все права защищены.",
}

export const footerLinks = {
  legal: [
    { label: "Политика конфиденциальности", href: "/privacy" },
    { label: "Пользовательское соглашение", href: "/terms" },
  ],
}