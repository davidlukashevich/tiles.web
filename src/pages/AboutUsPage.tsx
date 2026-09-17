import AboutUsContainer from "../components/containers/about/AboutUsContainer"
import { useSeo } from "../hooks/useSeo"
import { buildTitle } from "../helpers/seo/site"

const AboutUsPage = () => {
    useSeo({
        title: buildTitle("О компании"),
        description:
            "Салон керамической плитки и керамогранита в Иваново: подбор под интерьер, консультация, доставка по всей Беларуси.",
        canonicalPath: "/about",
    })

    return (
        <AboutUsContainer />
    )
}

export default AboutUsPage
