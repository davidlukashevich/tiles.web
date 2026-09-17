// Единая точка правды для SEO-метаданных.
// SITE_URL используется в canonical, OG и sitemap — он должен совпадать
// с тем адресом, по которому сайт реально открывается (без слеша на конце).
export const SITE_URL = "https://kvadratnymetr.by"

export const SITE_NAME = "Квадратный Метр"

export const DEFAULT_TITLE =
    "Квадратный Метр — плитка и керамогранит в Иваново"

export const DEFAULT_DESCRIPTION =
    "Керамическая плитка и керамогранит в Иваново: большой выбор коллекций, " +
    "консультация по подбору под интерьер, доставка по всей Беларуси."

// Картинка для превью в мессенджерах и соцсетях (1200x630).
// Файл нужно положить в public/og.jpg.
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og.jpg`

export const absoluteUrl = (path: string): string => {
    if (!path) return SITE_URL
    if (path.startsWith("http")) return path
    return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

// «Название страницы | Квадратный Метр», но без дубля на главной
export const buildTitle = (pageTitle?: string): string => {
    if (!pageTitle) return DEFAULT_TITLE
    return `${pageTitle} | ${SITE_NAME}`
}

// Поисковики обрезают заголовок примерно на 65 символах. Длинные названия
// плитки («Альберони декорированный коричневый светлый 60x60») с полным
// хвостом дают 86 — гео и бренд просто не доезжают до экрана.
// Поэтому хвост отбрасывается по частям, от менее важного к более важному.
const TITLE_LIMIT = 65

export const buildProductTitle = (name: string, size?: string): string => {
    const base = [name, size].filter(Boolean).join(" ")

    const withAll = `${base} — купить в Иваново | ${SITE_NAME}`
    if (withAll.length <= TITLE_LIMIT) return withAll

    const withGeo = `${base} — купить в Иваново`
    if (withGeo.length <= TITLE_LIMIT) return withGeo

    return base
}
