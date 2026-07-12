import { useEffect } from "react"
import { IoIosClose } from "react-icons/io"
import ConsentCheckboxes from "../form/ConsentCheckboxes"
import type { ConsentState } from "../form/ConsentCheckboxes"

export type RequestValues = {
    name: string
    phone: string
    message: string
}

export type RequestErrors = Partial<Record<keyof RequestValues, string>>

type Props = {
    isOpen: boolean
    onClose: () => void
    values: RequestValues
    honeypot: string
    errors: RequestErrors
    touched: Partial<Record<keyof RequestValues, boolean>>
    productName?: string
    onChange: (field: keyof RequestValues, value: string) => void
    onBlur: (field: keyof RequestValues) => void
    onHoneypotChange: (value: string) => void
    onConsentChange: (consent: ConsentState) => void
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    canSubmit: boolean
    isSubmitting: boolean
    isSuccess: boolean
    leadNumber: number | null
    errorMessage: string | null
}

const fieldClass = (hasError: boolean) =>
    `h-14 rounded-[18px] border px-5 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-black ${hasError ? "border-red-400 focus:border-red-400" : "border-black/10"
    }`

const RequestModal = ({
    isOpen,
    onClose,
    values,
    honeypot,
    errors,
    touched,
    productName,
    onChange,
    onBlur,
    onHoneypotChange,
    onConsentChange,
    onSubmit,
    canSubmit,
    isSubmitting,
    isSuccess,
    leadNumber,
    errorMessage,
}: Props) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : ""

        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    if (!isOpen) return null

    const showError = (field: keyof RequestValues) =>
        touched[field] ? errors[field] : undefined

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* BACKDROP */}
            <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть"
                className="absolute inset-0 cursor-pointer bg-black/45 backdrop-blur-[2px]"
            />

            {/* MODAL */}
            <div className="relative z-[101] max-h-[90vh] w-full max-w-[720px] overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl md:p-8">
                {/* CLOSE */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Закрыть"
                    className="absolute right-6 top-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#f3f1ec] text-black transition-all duration-200 hover:scale-105 hover:bg-black hover:text-white"
                >
                    <IoIosClose className="h-7 w-7" />
                </button>

                {/* TITLE */}
                <h2 className="max-w-[520px] pr-14 text-2xl font-semibold uppercase leading-tight text-black md:text-[38px]">
                    Оставить заявку
                </h2>

                {isSuccess ? (
                    <div className="mt-8 rounded-[18px] border border-black/10 bg-[#f3f1ec] px-6 py-10 text-center">
                        <p className="text-xl font-semibold text-black">
                            Заявка отправлена{leadNumber ? ` №${leadNumber}` : ""}
                        </p>
                        <p className="mt-3 text-sm text-neutral-600">
                            Мы свяжемся с вами в ближайшее время.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* DESCRIPTION */}
                        <p className="mt-5 max-w-[560px] text-sm leading-7 text-neutral-600 md:text-[15px]">
                            Оставьте заявку — мы свяжемся с вами, уточним детали заказа и
                            поможем подобрать подходящие материалы для вашего проекта.
                        </p>

                        {productName ? (
                            <p className="mt-3 text-sm text-neutral-500">
                                Товар:{" "}
                                <span className="font-medium text-black">
                                    {productName}
                                </span>
                            </p>
                        ) : null}

                        {/* FORM */}
                        <form
                            className="mt-8 grid gap-5"
                            onSubmit={onSubmit}
                            noValidate
                        >
                            {/* NAME */}
                            <label className="grid gap-2">
                                <span className="text-sm text-neutral-500">Ваше имя</span>
                                <input
                                    type="text"
                                    maxLength={200}
                                    value={values.name}
                                    onChange={(event) => onChange("name", event.target.value)}
                                    onBlur={() => onBlur("name")}
                                    placeholder="Введите имя"
                                    aria-invalid={Boolean(showError("name"))}
                                    className={fieldClass(Boolean(showError("name")))}
                                />
                                {showError("name") && (
                                    <span className="text-xs text-red-600">
                                        {showError("name")}
                                    </span>
                                )}
                            </label>

                            {/* PHONE */}
                            <label className="grid gap-2">
                                <span className="text-sm text-neutral-500">Телефон</span>
                                <input
                                    type="tel"
                                    value={values.phone}
                                    onChange={(event) => onChange("phone", event.target.value)}
                                    onBlur={() => onBlur("phone")}
                                    placeholder="+375 (__) ___-__-__"
                                    aria-invalid={Boolean(showError("phone"))}
                                    className={fieldClass(Boolean(showError("phone")))}
                                />
                                {showError("phone") && (
                                    <span className="text-xs text-red-600">
                                        {showError("phone")}
                                    </span>
                                )}
                            </label>

                            {/* COMMENT */}
                            <label className="grid gap-2">
                                <span className="text-sm text-neutral-500">Комментарий</span>
                                <textarea
                                    rows={4}
                                    maxLength={4000}
                                    value={values.message}
                                    onChange={(event) =>
                                        onChange("message", event.target.value)
                                    }
                                    onBlur={() => onBlur("message")}
                                    placeholder="Например: нужен расчет плитки для ванной комнаты"
                                    className="resize-none rounded-[18px] border border-black/10 px-5 py-4 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-black"
                                />
                            </label>

                            {/* HONEYPOT */}
                            <input
                                type="text"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                value={honeypot}
                                onChange={(event) => onHoneypotChange(event.target.value)}
                                className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
                            />

                            {/* CONSENTS */}
                            <ConsentCheckboxes onChange={onConsentChange} />

                            {errorMessage && (
                                <p className="text-sm text-red-600">{errorMessage}</p>
                            )}

                            {/* BUTTON */}
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className="mt-2 flex h-14 items-center justify-center rounded-[18px] bg-black px-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40 enabled:cursor-pointer"
                            >
                                {isSubmitting ? "Отправка..." : "Отправить заявку"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default RequestModal
