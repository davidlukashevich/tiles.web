import ContactFormContainer from "../components/containers/home/ContactFormContainer"
import SaleCategoriesContainer from "../components/containers/home/SaleCategoriesContainer"
import AboutUs from "../components/ui/home/AboutUs"
import PurchaseInfo from "../components/ui/home/Purchase"
import { useSeo } from "../hooks/useSeo"
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL } from "../helpers/seo/site"

const HomePage = () => {
    useSeo({
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        canonicalPath: "/",
        // Карточка организации: помогает поиску связать сайт с компанией
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "Store",
            name: SITE_NAME,
            url: SITE_URL,
            image: `${SITE_URL}/og.jpg`,
            description: DEFAULT_DESCRIPTION,
            priceRange: "BYN",
            areaServed: {
                "@type": "Country",
                name: "Беларусь",
            },
            address: {
                "@type": "PostalAddress",
                addressCountry: "BY",
                addressRegion: "Брестская область",
                addressLocality: "Иваново",
            },
        },
    })

    return (
        <div>
            {/* На главной все заголовки — h2 (блоки «Выгодные предложения»,
                «Почему выбирают нас» и т.д.). Главной странице нужен один h1
                с основным запросом; визуально он не нужен, поэтому sr-only. */}
            <h1 className="sr-only">
                Плитка и керамогранит в Иваново — «Квадратный Метр»
            </h1>

            <SaleCategoriesContainer />
            <AboutUs />
            <PurchaseInfo />
            <ContactFormContainer />
        </div>
    )
}

export default HomePage
