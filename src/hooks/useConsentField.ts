import { useCallback, useMemo, useState } from "react"

import { hasLink, renderMarkdownInline } from "../helpers/markdown"
import { useConsentDocuments } from "./useLegalDocuments"
import type {
    ConsentProps,
    ConsentState,
} from "../components/ui/form/ConsentCheckboxes"

const initialConsent: ConsentState = {
    consent_personal_data: false,
    consent_cross_border: false,
}

export type ConsentField = {
    value: ConsentState
    // Оба согласия отмечены и тексты успешно загружены
    isValid: boolean
    isUnavailable: boolean
    reset: () => void
    props: ConsentProps
}

// Состояние двух обязательных галочек + их тексты из БД.
// Версии согласий на бэкенд не отправляются: submit-lead сам подставляет
// актуальную редакцию из legal_documents.
export const useConsentField = (): ConsentField => {
    const [value, setValue] = useState<ConsentState>(initialConsent)

    const { personalData, crossBorder, isLoading, isUnavailable } =
        useConsentDocuments()

    const personalDataContent = personalData?.content ?? null
    const crossBorderContent = crossBorder?.content ?? null

    const personalDataHtml = useMemo(
        () =>
            personalDataContent
                ? renderMarkdownInline(personalDataContent)
                : null,
        [personalDataContent],
    )

    const crossBorderHtml = useMemo(
        () =>
            crossBorderContent
                ? renderMarkdownInline(crossBorderContent)
                : null,
        [crossBorderContent],
    )

    const reset = useCallback(() => setValue(initialConsent), [])

    const isValid =
        !isLoading &&
        !isUnavailable &&
        value.consent_personal_data &&
        value.consent_cross_border

    return {
        value,
        isValid,
        isUnavailable,
        reset,
        props: {
            value,
            onChange: setValue,
            personalDataHtml,
            crossBorderHtml,
            personalDataNeedsLink: !personalDataHtml
                ? false
                : !hasLink(personalDataHtml),
            crossBorderNeedsLink: !crossBorderHtml
                ? false
                : !hasLink(crossBorderHtml),
            isLoading,
            isUnavailable,
        },
    }
}
