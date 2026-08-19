type Props = {
    title: string
    subtitle?: string
    // Готовый sanitized HTML из markdown
    html: string | null
    version: string | null
    publishedAt: string | null
    isLoading: boolean
    isError: boolean
}

const formatDate = (value: string) => {
    const date = new Date(value)

    if (Number.isNaN(date.getTime())) return null

    return date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

const LegalDocumentView = ({
    title,
    subtitle,
    html,
    version,
    publishedAt,
    isLoading,
    isError,
}: Props) => {
    const publishedLabel = publishedAt ? formatDate(publishedAt) : null

    return (
        <main className="w-full bg-white py-10 lg:py-16">
            <div className="mx-auto max-w-[860px]">
                <h1 className="text-3xl font-medium uppercase leading-tight text-[#2f2f2f] sm:text-4xl">
                    {title}
                </h1>

                {subtitle ? (
                    <p className="mt-4 text-sm leading-7 text-[#66615b] md:text-base">
                        {subtitle}
                    </p>
                ) : null}

                {version || publishedLabel ? (
                    <p className="mt-5 text-[12px] uppercase tracking-[0.2em] text-[#9a968f]">
                        {[
                            version ? `Редакция ${version}` : null,
                            publishedLabel ? `от ${publishedLabel}` : null,
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    </p>
                ) : null}

                <div className="mt-8 border-t border-[#e5e0d8] pt-8">
                    {isLoading ? (
                        <div className="grid gap-3">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-4 animate-pulse rounded bg-[#f3f1ec]"
                                    style={{
                                        width: `${index % 3 === 2 ? 65 : 100}%`,
                                    }}
                                />
                            ))}
                        </div>
                    ) : null}

                    {!isLoading && (isError || !html) ? (
                        <div className="rounded-[18px] border border-[#d9d3ca] bg-[#f3f1ec] px-6 py-10 text-center">
                            <p className="text-base font-semibold text-[#2f2f2f]">
                                Не удалось загрузить документ
                            </p>
                            <p className="mt-3 text-sm text-[#66615b]">
                                Попробуйте обновить страницу позже или
                                запросите текст у менеджера.
                            </p>
                        </div>
                    ) : null}

                    {!isLoading && !isError && html ? (
                        <div
                            className="legal-content"
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    ) : null}
                </div>
            </div>
        </main>
    )
}

export default LegalDocumentView
