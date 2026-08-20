// Размеры в БД записаны непоследовательно: где-то кириллическая «х»
// («Плитка 80х80»), где-то латинская «x» («80x80»), встречаются двойные
// пробелы («Плитка  29,7x59,8»). Приводим к одному виду, иначе категория
// и размер варианта не сойдутся.
export const normalizeSize = (value: string): string =>
    value.toLowerCase().replace(/х/g, "x").replace(/\s+/g, "")

// Название категории -> размер: «Плитка  29,7x59,8» -> «29,7x59,8»
export const sizeFromCategoryName = (name: string): string =>
    normalizeSize(name.replace(/плитка/i, ""))
