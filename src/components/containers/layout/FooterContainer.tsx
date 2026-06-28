import logo from "../../../assets/logo.jpg"
import {
  companyInfo,
  footerLinks,
  navigation,
  socialLinks,
} from "../../../data/navigation"
import { buildNavigation } from "../../../helpers/Header/buildNavigation"
import { useCategories } from "../../../hooks/useCategories"
import Footer from "../../ui/layout/Footer"

export default function FooterContainer() {
  const { data } = useCategories()
  const menuNavigation = buildNavigation(navigation, data)

  return (
    <Footer
      logoSrc={logo}
      brandName={companyInfo.brandName}
      brandSubtitle={companyInfo.brandSubtitle}
      phone={companyInfo.phone}
      phoneHref={companyInfo.phoneHref}
      workTime={companyInfo.workTime}
      addressLines={companyInfo.addressLines}
      navigation={menuNavigation}
      socialLinks={socialLinks}
      legalLinks={footerLinks.legal}
      copyright={companyInfo.copyright}
    />
  )
}