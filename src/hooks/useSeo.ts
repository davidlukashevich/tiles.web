import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import {
    DEFAULT_OG_IMAGE,
    SITE_NAME,
    absoluteUrl,
} from "../helpers/seo/site"

export type SeoOptions = {
    /** Полный <title> страницы */
    title: string
    description: string
    /** Путь без домена: "/catalog/tiles". По умолчанию — текущий путь без query. */
    canonicalPath?: string
    /** Абсолютный URL картинки для превью */
    image?: string
    /** Закрыть страницу от индексации */
    noindex?: boolean
    /** Микроразметка Schema.org */
    jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

const JSON_LD_ID = "seo-json-ld"

const upsertMeta = (
    attr: "name" | "property",
    key: string,
    content: string,
) => {
    let el = document.head.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`,
    )

    if (!el) {
        el = document.createElement("meta")
        el.setAttribute(attr, key)
        document.head.appendChild(el)
    }

    el.setAttribute("content", content)
}

const upsertLink = (rel: string, href: string) => {
    let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

    if (!el) {
        el = document.createElement("link")
        el.setAttribute("rel", rel)
        document.head.appendChild(el)
    }

    el.setAttribute("href", href)
}

/**
 * Проставляет title, description, canonical, Open Graph и JSON-LD.
 *
 * Передайте null, пока данные страницы ещё грузятся — тогда хук ничего
 * не трогает и в выдачу не утекут заголовки-заглушки.
 *
 * Важно: всё это выполняется на клиенте. Поисковики, которые не исполняют
 * JS, метаданных не увидят — для полноценной индексации нужен пререндер.
 */
export const useSeo = (options: SeoOptions | null) => {
    const { pathname } = useLocation()

    const title = options?.title
    const description = options?.description
    const canonicalPath = options?.canonicalPath ?? pathname
    const image = options?.image ?? DEFAULT_OG_IMAGE
    const noindex = options?.noindex ?? false
    const jsonLd = options?.jsonLd

    useEffect(() => {
        if (!title || !description) return

        const canonical = absoluteUrl(canonicalPath)

        document.title = title
        upsertMeta("name", "description", description)
        upsertLink("canonical", canonical)

        upsertMeta(
            "name",
            "robots",
            noindex ? "noindex, nofollow" : "index, follow",
        )

        upsertMeta("property", "og:type", "website")
        upsertMeta("property", "og:site_name", SITE_NAME)
        upsertMeta("property", "og:locale", "ru_RU")
        upsertMeta("property", "og:title", title)
        upsertMeta("property", "og:description", description)
        upsertMeta("property", "og:url", canonical)
        upsertMeta("property", "og:image", image)

        upsertMeta("name", "twitter:card", "summary_large_image")
        upsertMeta("name", "twitter:title", title)
        upsertMeta("name", "twitter:description", description)
        upsertMeta("name", "twitter:image", image)
    }, [title, description, canonicalPath, image, noindex])

    // Сравниваем сериализованную разметку, а не ссылку на объект:
    // литерал в компоненте создаётся заново на каждый рендер.
    const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : null

    useEffect(() => {
        document.getElementById(JSON_LD_ID)?.remove()

        if (!jsonLdString) return

        const script = document.createElement("script")
        script.id = JSON_LD_ID
        script.type = "application/ld+json"
        script.textContent = jsonLdString
        document.head.appendChild(script)

        return () => {
            script.remove()
        }
    }, [jsonLdString])
}
