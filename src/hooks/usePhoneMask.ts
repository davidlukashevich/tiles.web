import { useLayoutEffect, useRef, useState } from "react"

import {
    BEL_NATIONAL_LENGTH,
    BEL_PREFIX,
    PHONE_SEPARATORS,
    belPhoneDigits,
    caretAfterDigits,
    countDigits,
    formatBelPhone,
    formatIntlPhone,
    intlPhoneDigits,
    looksBelarusian,
    normalizeBelPhonePaste,
    phoneCountryCode,
    phoneFlag,
    type PhoneMode,
} from "../helpers/phone"
import { getMaxDigitsByPrefix } from "../helpers/phoneIntl"

// Enter и Escape пропускаем, иначе из поля нельзя отправить форму
const ALLOWED_KEYS = [
    "Backspace",
    "Delete",
    "Tab",
    "Enter",
    "Escape",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
]

// Гибридная маска на контролируемом input.
// По умолчанию BY (+375 зашит). Чтобы ввести номер другой страны,
// нужно очистить поле (Backspace на префиксе) и нажать "+", либо просто
// вставить иностранный номер — режим переключится сам.
export const usePhoneMask = (
    value: string,
    onChange: (next: string) => void,
) => {
    const [mode, setMode] = useState<PhoneMode>("by")
    const ref = useRef<HTMLInputElement>(null)
    const caretRef = useRef<number | null>(null)

    // Каретку возвращаем после ре-рендера: значение переформатировано,
    // и браузер иначе поставил бы её в конец строки.
    useLayoutEffect(() => {
        const element = ref.current
        if (!element || caretRef.current === null) return

        element.setSelectionRange(caretRef.current, caretRef.current)
        caretRef.current = null
    })

    const commit = (next: string, caret: number) => {
        caretRef.current = caret
        onChange(next)
    }

    const toIntl = (next: string, caret: number) => {
        setMode("intl")
        commit(next, caret)
    }

    const isBy = mode === "by"

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const raw = event.target.value
        const caret = event.target.selectionStart ?? raw.length
        const digitsBefore = countDigits(raw, caret)
        const formatted = isBy ? formatBelPhone(raw) : formatIntlPhone(raw)

        commit(formatted, caretAfterDigits(formatted, digitsBefore))
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Cmd/Ctrl + A/C/V/X и прочие системные комбинации не трогаем
        if (event.metaKey || event.ctrlKey) return

        const element = event.currentTarget
        const current = element.value
        const start = element.selectionStart ?? 0
        const end = element.selectionEnd ?? 0
        const hasSelection = start !== end
        const fullSelection = start === 0 && end === current.length

        const digits = isBy
            ? belPhoneDigits(current)
            : intlPhoneDigits(current)

        // "+" уводит в международный режим, когда цифр ещё нет
        if (event.key === "+" && (digits.length === 0 || fullSelection)) {
            event.preventDefault()
            toIntl("+", 1)
            return
        }

        // Выделили всё и удалили
        if (
            fullSelection &&
            (event.key === "Backspace" || event.key === "Delete")
        ) {
            event.preventDefault()
            commit(isBy ? "" : "+", isBy ? 0 : 1)
            return
        }

        const floor = isBy ? BEL_PREFIX.length : 1

        // Каретка не уходит левее префикса
        if (
            event.key === "Home" ||
            (event.key === "ArrowLeft" && !event.shiftKey && start <= floor)
        ) {
            event.preventDefault()
            element.setSelectionRange(floor, floor)
            return
        }

        if (event.key === "Backspace" && !hasSelection) {
            // Backspace на префиксе очищает поле — это выход в другую страну
            if (start <= floor) {
                event.preventDefault()
                if (isBy) commit("", 0)
                return
            }

            // Backspace на разделителе съедает цифру слева, а не скобку/дефис
            let position = start
            while (
                position > floor &&
                PHONE_SEPARATORS.includes(current[position - 1])
            ) {
                position--
            }

            if (position !== start) {
                event.preventDefault()
                const next = current.slice(0, position - 1) + current.slice(start)
                const formatted = isBy
                    ? formatBelPhone(next)
                    : formatIntlPhone(next)
                const digitsBefore = countDigits(current, position - 1)

                commit(formatted, caretAfterDigits(formatted, digitsBefore))
                return
            }
        }

        const isDigit = /^\d$/.test(event.key)
        const maxDigits = isBy
            ? BEL_NATIONAL_LENGTH
            : getMaxDigitsByPrefix(digits)

        if (isDigit && !hasSelection && digits.length >= maxDigits) {
            event.preventDefault()
            return
        }

        if (!isDigit && !ALLOWED_KEYS.includes(event.key)) {
            event.preventDefault()
        }
    }

    const handleFocus = () => {
        if (isBy && !value.startsWith(BEL_PREFIX)) {
            commit(BEL_PREFIX, BEL_PREFIX.length)
            return
        }

        if (!isBy && !value.trim()) commit("+", 1)
    }

    // Пустой префикс не оставляем — иначе поле выглядит заполненным.
    // Заодно возвращаемся к BY: это режим по умолчанию.
    const handleBlur = () => {
        const digits = isBy ? belPhoneDigits(value) : intlPhoneDigits(value)
        if (digits.length > 0) return

        if (value !== "") onChange("")
        if (!isBy) setMode("by")
    }

    // Режим выбираем по содержимому вставки, а не по текущему режиму:
    // иначе белорусский местный номер (80XX...), вставленный в
    // международном режиме, был бы прочитан как российский +7.
    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault()
        const pasted = event.clipboardData.getData("text")

        if (looksBelarusian(pasted)) {
            const formatted = formatBelPhone(normalizeBelPhonePaste(pasted))
            setMode("by")
            commit(formatted, formatted.length)
            return
        }

        const formatted = formatIntlPhone(pasted)
        toIntl(formatted, formatted.length)
    }

    // Клик левее префикса не ставит каретку в начало строки
    const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
        const element = event.currentTarget
        const floor = isBy ? BEL_PREFIX.length : 1

        if ((element.selectionStart ?? 0) < floor) {
            element.setSelectionRange(floor, floor)
        }
    }

    return {
        mode,
        flag: phoneFlag(value, mode),
        countryCode: phoneCountryCode(value, mode),
        handlers: {
            ref,
            onChange: handleChange,
            onKeyDown: handleKeyDown,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onPaste: handlePaste,
            onClick: handleClick,
        },
    }
}
