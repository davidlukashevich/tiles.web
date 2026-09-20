import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

import { trackPageView } from "../helpers/metrika"

/**
 * Считает просмотры страниц при переходах внутри приложения.
 *
 * Первую загрузку засчитывает сам счётчик в index.html, поэтому её
 * пропускаем — иначе она попадёт в отчёты дважды.
 */
export const useMetrikaPageViews = () => {
    const { pathname, search } = useLocation()
    const isFirst = useRef(true)

    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false
            return
        }

        trackPageView(`${pathname}${search}`, document.title)
    }, [pathname, search])
}
