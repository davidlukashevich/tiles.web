import { HowBuyContainer } from "../components/containers/howBuy/HowBuyContainer"
import { useSeo } from "../hooks/useSeo"
import { buildTitle } from "../helpers/seo/site"

const HowBuyPage = () => {
    useSeo({
        title: buildTitle("Как купить — оплата и доставка"),
        description:
            "Как заказать плитку в Иваново: оформление заявки, способы оплаты, доставка по всей Беларуси и самовывоз.",
        // У страницы есть разделы (/how-to-buy/:section) — все они
        // склеиваются в один адрес, чтобы не плодить дубли.
        canonicalPath: "/how-to-buy",
    })

    return (
        <HowBuyContainer />
    )
}

export default HowBuyPage
