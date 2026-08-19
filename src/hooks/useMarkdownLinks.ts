import type { MouseEvent } from "react"
import { useNavigate } from "react-router-dom"

// Текст из БД вставляется через dangerouslySetInnerHTML, поэтому внутренние
// ссылки в нём — обычные <a>, а не Link. Без перехвата такой клик делает
// полную перезагрузку и запрос к серверу: на статичном хостинге без
// SPA-фолбэка это 404, а с фолбэком — лишний круг до сервера.
//
// Ctrl/Cmd/Shift и средняя кнопка не перехватываются: пользователь
// осознанно открывает в новой вкладке/окне, это работа браузера.
export const useMarkdownLinks = () => {
    const navigate = useNavigate()

    return (event: MouseEvent<HTMLElement>) => {
        if (event.defaultPrevented) return
        if (event.button !== 0) return
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

        const anchor = (event.target as HTMLElement).closest("a")
        if (!anchor) return

        const href = anchor.getAttribute("href") ?? ""

        // Внутренние — роутером. Внешние, mailto/tel и _blank — браузеру.
        if (!href.startsWith("/")) return
        if (anchor.getAttribute("target") === "_blank") return

        event.preventDefault()
        // Клик по ссылке внутри <label> иначе ещё и переключил бы галочку
        event.stopPropagation()

        navigate(href)
    }
}
