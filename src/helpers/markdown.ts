import DOMPurify from "dompurify"
import { marked } from "marked"

marked.setOptions({
    gfm: true,
    breaks: true,
})

// Внешние ссылки открываем в новой вкладке — они ведут на другие сайты.
// Внутренние (/privacy, /terms) оставляем в текущей.
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (!(node instanceof HTMLAnchorElement)) return

    const href = node.getAttribute("href") ?? ""
    if (!/^https?:\/\//i.test(href)) return

    node.setAttribute("target", "_blank")
    node.setAttribute("rel", "noreferrer noopener")
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
