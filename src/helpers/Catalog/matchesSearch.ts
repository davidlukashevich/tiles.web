// Поиск по названию товара на клиенте: весь список выборки уже загружен
// (пагинация в каталоге клиентская), поэтому запрос на сервер не нужен.
export const normalizeSearch = (value: string): string =>
    value.toLowerCase().replace(/\s+/g, " ").trim()

// Регистр не важен, лишние пробелы игнорируются, слова можно вводить
// в любом порядке: «bianco ark» найдёт «Ark Bianco».
export const matchesSearch = (name: string, query: string): boolean => {
    const normalized = normalizeSearch(query)
    if (!normalized) return true

    const target = name.toLowerCase()
    return normalized.split(" ").every((word) => target.includes(word))
}
