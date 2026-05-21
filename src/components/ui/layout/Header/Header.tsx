import { useEffect, useRef, useState } from "react"
import type { NavItem, SocialLink } from "../../../../data/navigation"
import Container from "../Container"
import DesktopMenu from "./DesktopMenu"
import MobileMenu from "./MobileMenu"
import { FaPhone } from "react-icons/fa6"
import { NavLink } from "react-router-dom"
import ProjectModal from "../../modal/ProjectModal"

export type HeaderProps = {
  logoSrc: string
  brandName: string
  brandSubtitle?: string
  phone: string
  phoneHref: string
  mobileMenuOpen: boolean
  openSection: string | null
  navigation: NavItem[]
  socialLinks: SocialLink[]
  projectModalOpen: boolean
  onOpenProjectModal: () => void
  onCloseProjectModal: () => void
  onOpenMobileMenu: () => void
  onCloseMobileMenu: () => void
  onToggleSection: (label: string) => void
}

const MOBILE_MENU_ANIMATION_DURATION = 300

export default function Header({
  logoSrc,
  brandName,
  brandSubtitle,
  phone,
  phoneHref,
  mobileMenuOpen,
  openSection,
  navigation,
  socialLinks,
  projectModalOpen,
  onCloseProjectModal,
  onOpenProjectModal,
  onOpenMobileMenu,
  onCloseMobileMenu,
  onToggleSection,
}: HeaderProps) {
  const [shouldRenderMobileMenu, setShouldRenderMobileMenu] = useState(false)
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false)
  const closeTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }

    if (mobileMenuOpen) {
      setShouldRenderMobileMenu(true)

      const rafId = window.requestAnimationFrame(() => {
        setIsMobileMenuVisible(true)
      })

      return () => {
        window.cancelAnimationFrame(rafId)
      }
    }

    setIsMobileMenuVisible(false)

    closeTimeoutRef.current = window.setTimeout(() => {
      setShouldRenderMobileMenu(false)
    }, MOBILE_MENU_ANIMATION_DURATION)

    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <Container>
          <div className="flex min-h-[72px] items-center justify-between gap-3 xl:min-h-[84px]">
            <NavLink
              to="/"
              className="flex min-w-0 shrink items-center gap-3 text-neutral-950"
              aria-label="На главную"
            >
              <img
                src={logoSrc}
                alt="Logo"
                className="h-10 w-10 shrink-0 object-cover sm:h-12 sm:w-12"
              />

              <div className="min-w-0">
                <div className="whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-950 sm:text-[14px] xl:text-[15px]">
                  {brandName}
                </div>

                {brandSubtitle ? (
                  <div className="mt-1 hidden whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-neutral-500 sm:block xl:text-[11px]">
                    {brandSubtitle}
                  </div>
                ) : null}
              </div>
            </NavLink>

            <DesktopMenu
              navigation={navigation}
              socialLinks={socialLinks}
              phone={phone}
              phoneHref={phoneHref}
              onOpenProjectModal={onOpenProjectModal}
            />

            <div className="flex items-center gap-2 xl:hidden">
              <a
                href={phoneHref}
                className="hidden items-center gap-2 whitespace-nowrap text-[14px] font-medium text-neutral-900 md:flex"
              >
                <FaPhone className="shrink-0" />
                <span>{phone}</span>
              </a>

              <button
                type="button"
                onClick={onOpenMobileMenu}
                className="flex h-11 w-11 shrink-0 items-center justify-center border border-neutral-300 text-neutral-900 transition-colors hover:border-neutral-900"
                aria-label="Открыть меню"
                aria-expanded={mobileMenuOpen}
              >
                <span className="relative block h-4 w-5">
                  <span className="absolute left-0 top-0 block h-px w-5 bg-current" />
                  <span className="absolute left-0 top-1.5 block h-px w-5 bg-current" />
                  <span className="absolute left-0 top-3 block h-px w-5 bg-current" />
                </span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {shouldRenderMobileMenu && (
        <MobileMenu
          isVisible={isMobileMenuVisible}
          navigation={navigation}
          socialLinks={socialLinks}
          phone={phone}
          phoneHref={phoneHref}
          openSection={openSection}
          onClose={onCloseMobileMenu}
          onToggleSection={onToggleSection}
          onOpenProjectModal={onOpenProjectModal}
        />
      )}

      <ProjectModal
        isOpen={projectModalOpen}
        onClose={onCloseProjectModal}
      />
    </>
  )
}