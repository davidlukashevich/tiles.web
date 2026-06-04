import SaleCategoriesContainer from "../components/containers/home/SaleCategoriesContainer"
import AboutUs from "../components/ui/home/AboutUs"
import ContactForm from "../components/ui/home/ContactForm"
import PurchaseInfo from "../components/ui/home/Purchase"

const HomePage = () => {
    return (
        <div>
            {/* <TileCatalogContainer /> */}
            <SaleCategoriesContainer />
            <AboutUs />
            <PurchaseInfo />
            <ContactForm />
        </div>
    )
}

export default HomePage