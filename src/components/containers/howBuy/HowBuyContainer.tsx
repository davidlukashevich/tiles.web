import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import HowBuyView from "../../ui/howBuy/HowBuyView"

const sections = [
    {
        id: "installment",
        label: "Рассрочка",
        title: "Рассрочка",
        text: "Вы можете оформить покупку в рассрочку на удобных условиях.",
        items: ["Удобные условия", "Консультация менеджера", "Быстрое оформление"],
    },
    {
        id: "payment",
        label: "Оплата",
        title: "Оплата",
        text: "Оплатить заказ можно удобным способом после подтверждения заказа.",
        items: ["Наличный расчет", "Безналичная оплата", "Оплата после подтверждения"],
    },
    {
        id: "delivery",
        label: "Доставка",
        title: "Доставка",
        text: "Организуем доставку плитки по Минску и другим направлениям.",
        items: ["Доставка до объекта", "Согласование времени", "Расчет стоимости"],
    },
    {
        id: "pickup",
        label: "Самовывоз",
        title: "Самовывоз",
        text: "Вы можете самостоятельно забрать заказ после подтверждения готовности.",
        items: ["Предварительное согласование", "Подготовка заказа", "Удобное получение"],
    },
    {
        id: "returns",
        label: "Прием и возврат",
        title: "Прием и возврат товара",
        text: "Условия возврата и обмена можно уточнить у менеджера.",
        items: ["Проверка товара", "Согласование возврата", "Помощь с обменом"],
    }
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

    const top =
      element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET

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