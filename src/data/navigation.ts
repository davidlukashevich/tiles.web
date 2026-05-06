import viber from "../assets/viber.jpeg"
import kufar from "../assets/kufar.jpeg"

export type NavLinkItem = {
  label: string
  href: string
}

export type NavGroup = {
  label: string
  children: NavLinkItem[]
}

export type NavItem = {
  label: string
  href?: string
  children?: NavLinkItem[]
  groups?: NavGroup[]
}

export type SocialLink = {
  label: string
  href: string
  img?: string
}

export const navigation: NavItem[] = [
  {
    label: "Каталог",
    groups: [
      {
        label: "Плитка",
        children: [
          { label: "60x60", href: "catalog/tiles/60x60" },
          { label: "120x60", href: "catalog/tiles/120x60" },
          { label: "80x80", href: "catalog/tiles/80x80" },
          { label: "100x100", href: "catalog/tiles/100x100" },
        ],
      },
      {
        label: "Сопутствующие товары",
        children: [
          { label: "Клей", href: "/catalog/accessories/glue" },
          { label: "Герметик", href: "/catalog/accessories/sealant" },
          { label: "Фуга", href: "/catalog/accessories/grout" },
        ],
      },
    ],
  },
  {
    label: "Распродажа",
    href: "/sale",
  },
  {
    label: "Как купить",
    children: [
      { label: "Рассрочка", href: "/how-to-buy/installment" },
      { label: "Оплата", href: "/how-to-buy/payment" },
      { label: "Доставка", href: "/how-to-buy/delivery" },
      { label: "Самовывоз", href: "/how-to-buy/pickup" },
      { label: "Прием и возврат товара", href: "/how-to-buy/returns" },
      { label: "Гарантийное обслуживание", href: "/how-to-buy/warranty" },
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