import { NavLink } from "react-router-dom"
import { FaPhone } from "react-icons/fa6"
import type { NavItem, SocialLink } from "../../../data/navigation"

type FooterLink = {
  label: string
  href: string
}

type FooterProps = {
  logoSrc: string
  brandName: string
  brandSubtitle?: string
  phone: string
  phoneHref: string
  workTime: string
  addressLines: string[]
  navigation: NavItem[]
  socialLinks: SocialLink[]
  legalLinks: FooterLink[]
  copyright: string
}

export default function Footer({
  logoSrc,
  brandName,
  brandSubtitle,
  phone,
  phoneHref,
  workTime,
  addressLines,
  navigation,
  socialLinks,
  legalLinks,
  copyright,
}: FooterProps) {
  const catalogSection = navigation.find((item) => item.label === "Каталог")
  const buySection = navigation.find((item) => item.label === "Как купить")
  const aboutSection = navigation.find((item) => item.label === "О нас")
  const saleSection = navigation.find((item) => item.label === "Распродажа")

  const tileGroup = catalogSection?.groups?.find(
    (group) => group.label === "Плитка"
  )

  const relatedGroup = catalogSection?.groups?.find(
    (group) => group.label === "Сопутствующие товары"
  )

  const logoBlock = (
    <div className="space-y-4 xl:pr-8">
      <NavLink to="/" className="inline-flex items-start gap-5">
        <img
          src={logoSrc}
          alt={brandName}
          className="h-14 w-14 shrink-0 object-cover"
        />

        <div>
          <div className="text-[18px] font-semibold uppercase tracking-[0.18em]">
            {brandName}
          </div>

          {brandSubtitle && (
            <div className="mt-2 text-[12px] uppercase tracking-[0.28em] text-white/55">
              {brandSubtitle}
            </div>
          )}
        </div>
      </NavLink>
    </div>
  )

  const tileBlock = (
    <div>
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
        Плитка
      </h3>

      <ul className="space-y-3 text-sm text-white/65">
        {saleSection?.href && (
          <li>
            <NavLink to={saleSection.href} className="hover:text-white">
              {saleSection.label}
            </NavLink>
          </li>
        )}

        {tileGroup?.children.map((item) => (
          <li key={item.href}>
            <NavLink to={item.href} className="hover:text-white">
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )

  const relatedBlock = (
    <div>
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
        Сопутствующие товары
      </h3>

      <ul className="space-y-3 text-sm text-white/65">
        {relatedGroup?.children.map((item) => (
          <li key={item.href}>
            <NavLink to={item.href} className="hover:text-white">
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )

  const buyersBlock = (
    <div>
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
        Покупателям
      </h3>

      <ul className="space-y-3 text-sm text-white/65">
        {buySection?.children?.map((item) => (
          <li key={item.href}>
            <NavLink to={item.href} className="hover:text-white">
              {item.label}
            </NavLink>
          </li>
        ))}

        {aboutSection?.href && (
          <li>
            <NavLink to={aboutSection.href} className="hover:text-white">
              {aboutSection.label}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  )

  const contactsBlock = (
    <div>
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
        Контакты
      </h3>

      <div className="space-y-4">
        <a
          href={phoneHref}
          className="inline-flex items-center gap-3 text-sm text-white/85 hover:text-white"
        >
          <FaPhone />
          <span>{phone}</span>
        </a>

        <p className="text-sm text-white/65">{workTime}</p>

        <address className="not-italic text-sm text-white/65">
          {addressLines.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </address>

        <div className="flex items-center gap-3 pt-2">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 hover:shadow-md"
            >
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.label}
                  className={"h-6 w-6 object-contain"}
                />
              ) : (
                <span className="text-[11px] font-semibold tracking-[0.12em] text-neutral-700">
                  {item.label}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <footer className="bg-[#2b2727] text-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="border-b border-white/10 pb-10">
          <div className="block xl:hidden">
            <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-12">
              <div className="flex flex-col gap-10">
                {logoBlock}
                {tileBlock}
                {relatedBlock}
              </div>

              <div className="flex flex-col gap-10">
                {buyersBlock}
                {contactsBlock}
              </div>
            </div>
          </div>

          <div className="hidden xl:grid xl:grid-cols-[1.35fr_0.85fr_0.95fr_1fr_0.95fr] xl:items-start xl:gap-x-10">
            {logoBlock}
            {tileBlock}
            {relatedBlock}
            {buyersBlock}
            {contactsBlock}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-sm text-white/45 lg:flex-row lg:justify-between">
          <p>{copyright}</p>

          <div className="flex flex-wrap gap-4">
            {legalLinks.map((item) => (
              <NavLink key={item.href} to={item.href} className="hover:text-white">
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}