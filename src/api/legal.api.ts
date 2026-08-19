import { supabase } from "../lib/supabase"
import type {
    LegalDocument,
    LegalDocumentType,
} from "../types/response/LegalDocument.type"

// View отдаёт только активные редакции — фильтровать по is_active не нужно.
const VIEW = "public_legal_documents_view"
const COLUMNS = "id, type, version, content, published_at"

export const getLegalDocuments = async (): Promise<LegalDocument[]> => {
    try {
        const { data, error } = await supabase.from(VIEW).select(COLUMNS)

        if (error) {
            throw error
        }

        return data as LegalDocument[]
    } catch (error) {
        console.error("Failed to fetch legal documents:", error)
        throw error
    }
}

export const getLegalDocument = async (
    type: LegalDocumentType,
): Promise<LegalDocument | null> => {
    try {
        const { data, error } = await supabase
            .from(VIEW)
            .select(COLUMNS)
            .eq("type", type)
            .maybeSingle()

        if (error) {
            throw error
        }

        return data as LegalDocument | null
    } catch (error) {
        console.error(`Failed to fetch legal document "${type}":`, error)
        throw error
    }
}
