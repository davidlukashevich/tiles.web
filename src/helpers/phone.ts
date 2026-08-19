// Гибридная маска телефона: по умолчанию BY (+375), с переключением
// в международный режим. BY-часть перенесена из phoneMask.js
// (applyBelMaskToInput), международная — из applyIntlMaskToInput.
import {
    flagEmojiForPhoneDigits,
    isoFromFlagEmoji,
    formatPhoneForDisplay,
    getMaxDigitsByPrefix,
    normalizePhoneDigits,
} from "./phoneIntl"

export type PhoneMode = "by" | "intl"

export const BEL_PREFIX = "+375 ("
export const BEL_CODE = "375"
export const BEL_NATIONAL_LENGTH = 9
export const BEL_FLAG = "🇧🇾"

export const PHONE_SEPARATORS = [" ", "(", ")", "-"]

// --- BY ---------------------------------------------------------------

// Только национальные цифры (без кода 375), максимум 9
export const belPhoneDigits = (value: string): string => {
    let digits = value.replace(/\D/g, "")
    if (digits.startsWith(BEL_CODE)) digits = digits.slice(BEL_CODE.length)
    return digits.slice(0, BEL_NATIONAL_LENGTH)
}

// Любая строка -> "+375 (29) 123-45-67"
export const formatBelPhone = (value: string): string => {
    const digits = belPhoneDigits(value)

    let formatted = "+375 "
    if (digits.length > 0) formatted += `(${digits.slice(0, 2)}`
    if (digits.length >= 2) formatted += ") "
    if (digits.length >= 3) formatted += digits.slice(2, 5)
    // > вместо >=, чтобы не оставался висячий дефис ("+375 (29) 123-")
    if (digits.length > 5) formatted += `-${digits.slice(5, 7)}`
    if (digits.length > 7) formatted += `-${digits.slice(7, 9)}`

    return formatted
}

// Вставка в BY-режиме: 80XX -> 375XX, 9 цифр -> дописываем код страны
export const normalizeBelPhonePaste = (text: string): string => {
    let digits = text.replace(/\D/g, "")

    if (digits.startsWith("80")) digits = `${BEL_CODE}${digits.slice(2)}`
    if (digits.length === BEL_NATIONAL_LENGTH) digits = `${BEL_CODE}${digits}`

    return digits.slice(0, 12)
}

// --- INTL -------------------------------------------------------------

export const intlPhoneDigits = (value: string): string => {
    const digits = normalizePhoneDigits(value)
    const max = getMaxDigitsByPrefix(digits)
    return digits.length > max ? digits.slice(0, max) : digits
}

export const formatIntlPhone = (value: string): string => {
    const digits = intlPhoneDigits(value)
    return digits ? formatPhoneForDisplay(digits) : "+"
}

// --- РЕЖИМ ------------------------------------------------------------

// Похоже ли вставленное на белорусский номер: с кодом 375,
// в местном формате 80XX или просто 9 цифр без кода
export const looksBelarusian = (text: string): boolean => {
    const digits = text.replace(/\D/g, "")
    return (
        digits.startsWith(BEL_CODE) ||
        digits.startsWith("80") ||
        digits.length === BEL_NATIONAL_LENGTH
    )
}

export const phoneFlag = (value: string, mode: PhoneMode): string =>
    mode === "by" ? BEL_FLAG : flagEmojiForPhoneDigits(intlPhoneDigits(value))

// ISO-код страны для SVG-флага. null — страна не определена (общий глобус).
export const phoneCountryCode = (
    value: string,
    mode: PhoneMode,
): string | null =>
    isoFromFlagEmoji(phoneFlag(value, mode))

// --- ВАЛИДАЦИЯ --------------------------------------------------------

// Режим поля валидатору знать не нужно — ориентируемся на код страны.
//
// Для +375 проверяем строго (9 национальных цифр). Для остальных стран
// строгую проверку по PHONE_COUNTRIES.total делать нельзя: в справочнике
// из phoneIntl.js у 92 из 205 записей total расходится с шаблоном national
// (например +48: total=12, а по шаблону 11). По такому total корректный
// польский номер отклонялся бы как неполный. Поэтому вне BY проверяем
// только разумный диапазон, а верхнюю границу держит сама маска.
const MIN_INTL_DIGITS = 8
const MAX_E164_DIGITS = 15

export const phoneError = (value: string): string | undefined => {
    const digits = normalizePhoneDigits(value)

    if (digits.length === 0) return "Введите телефон"

    if (digits.startsWith(BEL_CODE)) {
        return digits.length < BEL_CODE.length + BEL_NATIONAL_LENGTH
            ? "Введите номер полностью"
            : undefined
    }

    if (digits.length < MIN_INTL_DIGITS) return "Введите номер полностью"
    if (digits.length > MAX_E164_DIGITS) return "Слишком длинный номер"

    return undefined
}

// --- КАРЕТКА ----------------------------------------------------------

export const caretAfterDigits = (
    formatted: string,
    digitsBefore: number,
): number => {
    if (digitsBefore <= 0) return formatted.startsWith("+375") ? BEL_PREFIX.length : 1

    let seen = 0
    for (let index = 0; index < formatted.length; index++) {
        if (/\d/.test(formatted[index])) seen++
        if (seen !== digitsBefore) continue

        let caret = index + 1
        while (PHONE_SEPARATORS.includes(formatted[caret])) caret++
        return caret
    }

    return formatted.length
}

export const countDigits = (value: string, until: number): number => {
    let count = 0
    for (let index = 0; index < until && index < value.length; index++) {
        if (/\d/.test(value[index])) count++
    }
    return count
}
