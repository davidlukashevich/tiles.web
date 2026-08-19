import { useMemo } from "react"

import { useLegalDocument } from "../../../hooks/useLegalDocuments"
import { renderMarkdown } from "../../../helpers/markdown"
import type { LegalDocumentType } from "../../../types/response/LegalDocument.type"
import LegalDocumentView from "../../ui/legal/LegalDocumentView"

type Props = {
    type: LegalDocumentType
    title: string
    subtitle?: string
}

const LegalDocumentContainer = ({ type, title, subtitle }: Props) => {
    const { data, isLoading, isError } = useLegalDocument(type)

    const content = data?.content ?? null

    const html = useMemo(
        () => (content ? renderMarkdown(content) : null),
        [content],
    )

    return (
        <LegalDocumentView
            title={title}
            subtitle={subtitle}
            html={html}
            version={data?.version ?? null}
            publishedAt={data?.published_at ?? null}
            isLoading={isLoading}
            isError={isError}
        />
    )
}

export default LegalDocumentContainer
