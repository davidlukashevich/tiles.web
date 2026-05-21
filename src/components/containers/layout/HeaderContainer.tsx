import { useEffect, useState } from "react"
import logo from "../../../assets/logo.jpg"
import Header from "../../ui/layout/Header/Header"
import {
  companyInfo,
  navigation,
  socialLinks,
} from "../../../data/navigation"
import { toggleSectionValue } from "../../../helpers/Header/toggleSectionValue"

export default function HeaderContainer() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [projectModalOpen, setProjectModalOpen] = useState(false)

  const handleOpenMobileMenu = () => {
    setMobileMenuOpen(true)
  }

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false)
    setOpenSection(null)
  }

  const handleToggleSection = (label: string) => {
    setOpenSection((prev) => toggleSectionValue(prev, label))
  }

  useEffect(() => {
    const originalOverflow = document.body.style.overflow

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
        setOpenSection(null)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Header
      logoSrc={logo}
      brandName={companyInfo.brandName}
      brandSubtitle={companyInfo.brandSubtitle}
      phone={companyInfo.phone}
      phoneHref={companyInfo.phoneHref}
      mobileMenuOpen={mobileMenuOpen}
      openSection={openSection}
      navigation={navigation}
      socialLinks={socialLinks}
      projectModalOpen={projectModalOpen}
      onOpenProjectModal={() => setProjectModalOpen(true)}
      onCloseProjectModal={() => setProjectModalOpen(false)}
      onOpenMobileMenu={handleOpenMobileMenu}
      onCloseMobileMenu={handleCloseMobileMenu}
      onToggleSection={handleToggleSection}
    />
  )
}