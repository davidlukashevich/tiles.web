import DOMPurify from "dompurify"
import { marked } from "marked"

marked.setOptions({
    gfm: true,
    breaks: true,
})

// Все ссылки открываем в новой вкладке. Для внутренних (/privacy, /terms) это
// важно из-за текстов согласий: переход в той же вкладке стёр бы заполненную
// форму заявки. Referrer на свой же домен не режем.
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (!(node instanceof HTMLAnchorElement)) return

    const href = node.getAttribute("href") ?? ""
    const isExternal = /^https?:\/\//i.test(href)
    const isInternal = href.startsWith("/")

    if (!isExternal && !isInternal) return

    node.setAttribute("target", "_blank")
    node.setAttribute("rel", isExternal ? "noreferrer noopener" : "noopener")
})

const sanitize = (html: string) =>
    DOMPurify.sanitize(html, { ADD_ATTR: ["target"] })

// Блочный markdown: заголовки, списки, абзацы (для /privacy и /terms).
export const renderMarkdown = (content: string): string =>
    sanitize(marked.parse(content, { async: false }))

// Инлайновый markdown: одна строка без <p> (для текстов галочек).
export const renderMarkdownInline = (content: string): string =>
    sanitize(marked.parseInline(content, { async: false }))

export const hasLink = (html: string): boolean => /<a\s/i.test(html)
