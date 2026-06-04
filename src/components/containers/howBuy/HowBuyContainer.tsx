import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import HowBuyView from "../../ui/howBuy/HowBuyView"

const sections = [
  {
    id: "installment",
    label: "Рассрочка",
    title: "Рассрочка",
    text: "Вы можете оформить покупку в рассрочку на удобных условиях.",
    items: [
      {
        title: "Удобные условия",
        text: "Менеджер расскажет доступные варианты рассрочки и поможет выбрать подходящий способ оплаты.",
      },
      {
        title: "Консультация менеджера",
        text: "Мы уточним сумму заказа, сроки и подскажем, какие документы могут понадобиться.",
      },
      {
        title: "Быстрое оформление",
        text: "После согласования заказа оформление проходит быстро, без лишних сложностей.",
      },
    ],
  },
  {
    id: "payment",
    label: "Оплата",
    title: "Оплата",
    text: "Оплатить заказ можно удобным способом после подтверждения заказа.",
    items: [
      {
        title: "Наличный расчет",
        text: "Вы можете оплатить заказ наличными после согласования деталей с менеджером.",
      },
      {
        title: "Безналичная оплата",
        text: "Подходит для организаций и частных клиентов, которым удобен перевод на расчетный счет.",
      },
      {
        title: "Оплата после подтверждения",
        text: "Сначала мы проверим наличие товара, согласуем заказ и только потом подтвердим оплату.",
      },
    ],
  },
  {
    id: "delivery",
    label: "Доставка",
    title: "Доставка",
    text: "Организуем доставку плитки по Минску и другим направлениям.",
    items: [
      {
        title: "Доставка до объекта",
        text: "Доставим плитку и сопутствующие товары по указанному адресу в согласованное время.",
      },
      {
        title: "Согласование времени",
        text: "Менеджер заранее уточнит удобный день и временной интервал доставки.",
      },
      {
        title: "Расчет стоимости",
        text: "Стоимость доставки зависит от адреса, объема заказа и условий разгрузки.",
      },
    ],
  },
  {
    id: "pickup",
    label: "Самовывоз",
    title: "Самовывоз",
    text: "Вы можете самостоятельно забрать заказ после подтверждения готовности.",
    items: [
      {
        title: "Предварительное согласование",
        text: "Перед приездом мы подтвердим наличие товара и подготовим заказ к выдаче.",
      },
      {
        title: "Подготовка заказа",
        text: "Товар будет собран и проверен, чтобы вам не пришлось ждать на месте.",
      },
      {
        title: "Удобное получение",
        text: "Менеджер подскажет адрес, время работы и порядок получения заказа.",
      },
    ],
  },
  {
    id: "returns",
    label: "Прием и возврат",
    title: "Прием и возврат товара",
    text: "Условия возврата и обмена можно уточнить у менеджера.",
    items: [
      {
        title: "Проверка товара",
        text: "Рекомендуем проверить количество, оттенок, калибр и целостность товара при получении.",
      },
      {
        title: "Согласование возврата",
        text: "Возврат или обмен согласуется индивидуально с учетом состояния товара и сроков.",
      },
      {
        title: "Помощь с обменом",
        text: "Если понадобится другой формат или позиция, менеджер поможет подобрать замену.",
      },
    ],
  },
]

const HEADER_OFFSET = 160
const AUTO_SCROLL_TIME = 800

export function HowBuyContainer() {
  const { section } = useParams<{ section?: string }>()
  const navigate = useNavigate()
  const isAutoScrollingRef = useRef(false)

  const currentSectionId = useMemo(() => {
    return sections.find((item) => item.id === section)?.id ?? sections[0].id
  }, [section])

  const [activeSectionId, setActiveSectionId] = useState(currentSectionId)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET

    window.scrollTo({
      top,
      behavior: "smooth",
    })
  }

  const startAutoScroll = (id: string) => {
    isAutoScrollingRef.current = true
    setActiveSectionId(id)
    scrollToSection(id)

    window.setTimeout(() => {
      isAutoScrollingRef.current = false
      setActiveSectionId(id)
    }, AUTO_SCROLL_TIME)
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      startAutoScroll(currentSectionId)
    }, 100)

    return () => window.clearTimeout(timer)
  }, [currentSectionId])

  useEffect(() => {
    const handleScroll = () => {
      if (isAutoScrollingRef.current) return

      const scrollPosition = window.scrollY + HEADER_OFFSET + 80
      let currentId = sections[0].id

      for (const item of sections) {
        const element = document.getElementById(item.id)
        if (!element) continue

        if (element.offsetTop <= scrollPosition) {
          currentId = item.id
        }
      }

      setActiveSectionId(currentId)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleTabClick = (id: string) => {
    navigate(`/how-to-buy/${id}`)
    startAutoScroll(id)
  }

  return (
    <HowBuyView
      sections={sections}
      activeSectionId={activeSectionId}
      onTabClick={handleTabClick}
    />
  )
}