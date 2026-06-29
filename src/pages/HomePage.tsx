import ContactFormContainer from "../components/containers/home/ContactFormContainer"
import SaleCategoriesContainer from "../components/containers/home/SaleCategoriesContainer"
import AboutUs from "../components/ui/home/AboutUs"
import PurchaseInfo from "../components/ui/home/Purchase"

const HomePage = () => {
    return (
        <div>
            {/* <TileCatalogContainer /> */}
            <SaleCategoriesContainer />
            <AboutUs />
            <PurchaseInfo />
            <ContactFormContainer />
        </div>
    )
}

export default HomePage