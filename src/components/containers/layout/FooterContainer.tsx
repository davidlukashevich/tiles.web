import logo from "../../../assets/logo.jpg"
import {
  companyInfo,
  footerLinks,
  navigation,
  socialLinks,
} from "../../../data/navigation"
import Footer from "../../ui/layout/Footer"

export default function FooterContainer() {
  return (
    <Footer
      logoSrc={logo}
      brandName={companyInfo.brandName}
      brandSubtitle={companyInfo.brandSubtitle}
      phone={companyInfo.phone}
      phoneHref={companyInfo.phoneHref}
      workTime={companyInfo.workTime}
      addressLines={companyInfo.addressLines}
      navigation={navigation}
      socialLinks={socialLinks}
      legalLinks={footerLinks.legal}
      copyright={companyInfo.copyright}
    />
  )
}