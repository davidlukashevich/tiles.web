import LegalDocumentContainer from "../components/containers/legal/LegalDocumentContainer"
import { useSeo } from "../hooks/useSeo"
import { buildTitle } from "../helpers/seo/site"

const TermsPage = () => {
    useSeo({
        title: buildTitle("Условия оформления заявки"),
        description:
            "Условия оформления заявки на покупку плитки в «Квадратном Метре»: порядок обработки обращений и обязанности сторон.",
        canonicalPath: "/terms",
    })

    return (
        <LegalDocumentContainer
            type="application_terms"
            title="Условия оформления заявки"
        />
    )
}

export default TermsPage
