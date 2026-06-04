import { NavLink } from "react-router-dom"
import type {
  NavItem,
  SocialLink,
  NavLinkItem,
} from "../../../data/navigation"
import { FaPhone } from "react-icons/fa6"

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
  legalLinks: NavLinkItem[]
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
  const catalogItem = navigation.find((item) => item.label === "Каталог")
  const selectionItem = navigation.find((item) => item.label === "Подборка")
  const howToBuyItem = navigation.find((item) => item.label === "Как купить")
  const aboutItem = navigation.find((item) => item.label === "О нас")

  const tileLinks = catalogItem?.groups?.[0]?.children ?? []
  const accessoriesLinks = catalogItem?.groups?.[1]?.children ?? []
  const selectionLinks = selectionItem?.children ?? []
  const buyerLinks = howToBuyItem?.children ?? []

  return (
    <footer className="bg-[#292625] px-4 py-14 text-white md:px-6 xl:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 xl:grid-cols-[260px_1fr]">
          <div>
            <NavLink to="/" className="flex items-start gap-4">
              <img
                src={logoSrc}
                alt={brandName}
                className="h-14 w-14 shrink-0 object-cover"
              />

              <div>
                <div className="text-[18px] font-semibold uppercase tracking-[0.18em]">
                  {brandName}
                </div>

                {brandSubtitle ? (
                  <div className="mt-3 text-[12px] uppercase tracking-[0.35em] text-white/45">
                    {brandSubtitle}
                  </div>
                ) : null}
              </div>
            </NavLink>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <FooterColumn title="Плитка" links={tileLinks} />

            <FooterColumn
              title="Сопутствующие товары"
              links={accessoriesLinks}
            />

            <FooterColumn title="Подборка" links={selectionLinks} />

            <div>
              <FooterColumn title="Покупателям" links={buyerLinks} />

              {aboutItem?.href ? (
                <NavLink
                  to={aboutItem.href}
                  className="mt-4 block text-[14px] text-white/70 transition hover:text-white"
                >
                  О нас
                </NavLink>
              ) : null}
            </div>

            <div>
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.28em]">
                Контакты
              </h3>

              <a
                href={phoneHref}
                className="mt-6 flex items-center gap-3 text-[14px] text-white transition hover:text-white/70"
              >
                <FaPhone className="shrink-0" />
                <span>{phone}</span>
              </a>

              <p className="mt-5 text-[14px] leading-6 text-white/70">
                {workTime}
              </p>

              <div className="mt-5 text-[14px] leading-6 text-white/70">
                {addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <ul className="mt-6 flex flex-wrap items-center gap-3">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:bg-white/10"
                    >
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={item.label}
                          className="h-6 w-6 object-contain"
                        />
                      ) : (
                        <span className="text-[11px] font-semibold">
                          {item.label}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-[13px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>{copyright}</p>

          <div className="flex flex-wrap gap-5">
            {legalLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

type FooterColumnProps = {
  title: string
  links: NavLinkItem[]
}

const FooterColumn = ({ title, links }: FooterColumnProps) => {
  return (
    <div>
      <h3 className="text-[13px] font-semibold uppercase tracking-[0.28em]">
        {title}
      </h3>

      <ul className="mt-6 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <NavLink
              to={link.href}
              className="text-[14px] text-white/70 transition hover:text-white"
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}