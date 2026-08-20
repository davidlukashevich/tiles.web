import { useEffect } from "react"

// Держит в CSS-переменной --header-height реальную высоту залипающего хедера.
//
// Хардкодить её нельзя: она разная на разных ширинах (73px на мобильном,
// 85px на десктопе) и меняется при любой правке хедера. Из-за хардкода
// под залипающими табами появлялся зазор, через который был виден
// проезжающий контент.
//
// Через CSS-переменную, а не через состояние: значение нужно только
// вёрстке, и лишние ре-рендеры ни к чему. Первый замер делаем сразу,
// не дожидаясь ResizeObserver — он не сработает, если страница скрыта.
export const useHeaderHeight = () => {
    useEffect(() => {
        const header = document.querySelector("header")
        if (!header) return

        const apply = () => {
            const { height } = header.getBoundingClientRect()
            document.documentElement.style.setProperty(
                "--header-height",
                `${Math.round(height)}px`,
            )
        }

        apply()

        const observer = new ResizeObserver(apply)
        observer.observe(header)
        window.addEventListener("resize", apply)

        return () => {
            observer.disconnect()
            window.removeEventListener("resize", apply)
        }
    }, [])
}
