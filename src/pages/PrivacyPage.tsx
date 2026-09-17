import LegalDocumentContainer from "../components/containers/legal/LegalDocumentContainer"
import { useSeo } from "../hooks/useSeo"
import { buildTitle } from "../helpers/seo/site"

const PrivacyPage = () => {
    useSeo({
        title: buildTitle("Политика обработки персональных данных"),
        description:
            "Как «Квадратный Метр» собирает, хранит и обрабатывает персональные данные посетителей сайта.",
        canonicalPath: "/privacy",
    })

    return (
        <LegalDocumentContainer
            type="privacy_policy"
            title="Политика обработки персональных данных"
        />
    )
}

export default PrivacyPage
