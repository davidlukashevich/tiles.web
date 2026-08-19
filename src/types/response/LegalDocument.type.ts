export type LegalDocumentType =
    | "privacy_policy"
    | "personal_data_consent"
    | "cross_border_consent"
    | "application_terms"

export type LegalDocument = {
    id: string
    type: LegalDocumentType
    version: string
    content: string
    published_at: string
}
