import { Link } from "react-router-dom"

export type ConsentState = {
    consent_personal_data: boolean
    consent_cross_border: boolean
}

export type ConsentProps = {
    value: ConsentState
    onChange: (next: ConsentState) => void
    // Готовый sanitized HTML текстов согласий из public_legal_documents_view
    personalDataHtml: string | null
    crossBorderHtml: string | null
    // true, если в тексте согласия нет своей ссылки — тогда добавляем /privacy
    personalDataNeedsLink: boolean
    crossBorderNeedsLink: boolean
    isLoading: boolean
    isUnavailable: boolean
}

const rowClass =
    "flex items-start gap-3 text-xs leading-5 text-neutral-500"

const ConsentCheckboxes = ({
    value,
    onChange,
    personalDataHtml,
    crossBorderHtml,
    personalDataNeedsLink,
    crossBorderNeedsLink,
    isLoading,
    isUnavailable,
}: ConsentProps) => {
    if (isLoading) {
        return (
            <div className="grid gap-3">
                <div className="h-4 w-4/5 animate-pulse rounded bg-neutral-100" />
                <div className="h-4 w-3/5 animate-pulse rounded bg-neutral-100" />
            </div>
        )
    }

    // Старый/дефолтный текст из кода показывать нельзя — только ошибка.
    if (isUnavailable) {
        return (
            <p className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-700">
                Не удалось загрузить условия, попробуйте позже.
            </p>
        )
    }

    const privacyLink = (
        <>
            {" "}
            <Link
                to="/privacy"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-black"
            >
                Политика обработки персональных данных
            </Link>
        </>
    )

    return (
        <div className="grid gap-3">
            <label className={`cursor-pointer ${rowClass}`}>
                <input
                    type="checkbox"
                    checked={value.consent_personal_data}
                    onChange={(event) =>
                        onChange({
                            ...value,
                            consent_personal_data: event.target.checked,
                        })
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-black"
                />
                <span>
                    <span
                        className="legal-inline"
                        dangerouslySetInnerHTML={{
                            __html: personalDataHtml ?? "",
                        }}
                    />
                    {personalDataNeedsLink ? privacyLink : null}
                </span>
            </label>

            <label className={`cursor-pointer ${rowClass}`}>
                <input
                    type="checkbox"
                    checked={value.consent_cross_border}
                    onChange={(event) =>
                        onChange({
                            ...value,
                            consent_cross_border: event.target.checked,
                        })
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-black"
                />
                <span>
                    <span
                        className="legal-inline"
                        dangerouslySetInnerHTML={{
                            __html: crossBorderHtml ?? "",
                        }}
                    />
                    {crossBorderNeedsLink ? privacyLink : null}
                </span>
            </label>
        </div>
    )
}

export default ConsentCheckboxes
