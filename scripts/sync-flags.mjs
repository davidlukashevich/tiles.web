// Копирует в public/flags только те флаги, что реально нужны справочнику
// телефонов (src/helpers/phoneIntl.ts).
//
// Сканируем ВЕСЬ файл, а не только карту FLAG_BY_PREFIX: часть флагов
// задаётся особыми правилами вне карты (например 🇰🇿/🇷🇺 для +7 — они
// выбираются по второй цифре номера).
//
// Пакет flag-icons лежит в devDependencies и его CSS НЕ подключается:
// он инлайнит все 534 флага data-URI (~410 КБ в бандл). Отдельные файлы
// в public/ грузятся по одному, по факту показа.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs"

const SOURCE = "node_modules/flag-icons/flags/4x3"
const TARGET = "public/flags"
const REGIONAL_INDICATOR_PAIR = /[\u{1F1E6}-\u{1F1FF}]{2}/gu

// Региональные индикаторы U+1F1E6..U+1F1FF кодируют латинские буквы
const isoFromEmoji = (emoji) =>
  [...emoji]
    .map((char) => char.codePointAt(0))
    .filter((code) => code >= 0x1f1e6 && code <= 0x1f1ff)
    .map((code) => String.fromCharCode(65 + code - 0x1f1e6))
    .join("")

const source = readFileSync("src/helpers/phoneIntl.ts", "utf8")

const codes = [
  ...new Set(
    [...source.matchAll(REGIONAL_INDICATOR_PAIR)]
      .map((match) => isoFromEmoji(match[0]).toLowerCase())
      .filter((code) => code.length === 2),
  ),
].sort()

if (codes.length === 0) {
  console.error("В src/helpers/phoneIntl.ts не найдено ни одного emoji-флага")
  process.exit(1)
}

mkdirSync(TARGET, { recursive: true })

const missing = []
for (const code of codes) {
  const from = `${SOURCE}/${code}.svg`
  if (!existsSync(from)) {
    missing.push(code)
    continue
  }
  copyFileSync(from, `${TARGET}/${code}.svg`)
}

console.log(`Скопировано флагов: ${codes.length - missing.length}/${codes.length}`)

if (missing.length) {
  console.error(`Нет в пакете flag-icons: ${missing.join(", ")}`)
  process.exit(1)
}
