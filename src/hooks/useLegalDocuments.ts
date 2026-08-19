import { useQuery } from "@tanstack/react-query"

import { getLegalDocument, getLegalDocuments } from "../api/legal.api"
import type {
    LegalDocument,
    LegalDocumentType,
} from "../types/response/LegalDocument.type"

// Юридические тексты меняются редко — держим их в кэше на всю сессию.
const LEGAL_QUERY_OPTIONS = {
    staleTime: Infinity,
    gcTime: Infinity,
} as const

export const useLegalDocuments = () => {
    return useQuery({
        queryKey: ["legal-documents"],
        queryFn: getLegalDocuments,
        ...LEGAL_QUERY_OPTIONS,
    })
}

export const useLegalDocument = (type: LegalDocumentType) => {
    return useQuery({
        queryKey: ["legal-document", type],
        queryFn: () => getLegalDocument(type),
        ...LEGAL_QUERY_OPTIONS,
    })
}

export type ConsentDocuments = {
    personalData: LegalDocument | null
    crossBorder: LegalDocument | null
    isLoading: boolean
    // true, если запрос упал ИЛИ в БД нет активной редакции одного из согласий.
    // В этом случае отправку заявки нужно блокировать: подставлять текст
    // из кода нельзя.
    isUnavailable: boolean
}

// Тексты двух обязательных галочек под формой заявки.
export const useConsentDocuments = (): ConsentDocuments => {
    const { data, isLoading, isError } = useLegalDocuments()

    const personalData =
        data?.find((item) => item.type === "personal_data_consent") ?? null

    const crossBorder =
        data?.find((item) => item.type === "cross_border_consent") ?? null

    return {
        personalData,
        crossBorder,
        isLoading,
        isUnavailable:
            !isLoading && (isError || !personalData || !crossBorder),
    }
}
