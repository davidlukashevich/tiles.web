import SaleCategoriesContainer from "../components/containers/home/SaleCategoriesContainer"
import TileCatalogContainer from "../components/containers/home/TileCatalogContainer"
import AboutUs from "../components/ui/home/AboutUs"
import ContactForm from "../components/ui/home/ContactForm"
import PurchaseInfo from "../components/ui/home/Purchase"

const HomePage = () => {
    return (
        <div>
            <TileCatalogContainer />
            <AboutUs />
            <SaleCategoriesContainer />
            <PurchaseInfo />
            <ContactForm />
        </div>
    )
}

export default HomePage