import { useEffect } from "react"
import { IoIosClose } from "react-icons/io"
import ConsentCheckboxes from "../form/ConsentCheckboxes"
import type { ConsentState } from "../form/ConsentCheckboxes"

export type ProjectValues = {
    name: string
    phone: string
}

export type ProjectErrors = Partial<Record<keyof ProjectValues, string>>

type Props = {
    isOpen: boolean
    onClose: () => void
    values: ProjectValues
    honeypot: string
    errors: ProjectErrors
    touched: Partial<Record<keyof ProjectValues, boolean>>
    onChange: (field: keyof ProjectValues, value: string) => void
    onBlur: (field: keyof ProjectValues) => void
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
    `h-12 rounded-[16px] border px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black ${hasError ? "border-red-400 focus:border-red-400" : "border-black/10"
    }`

const ProjectModal = ({
    isOpen,
    onClose,
    values,
    honeypot,
    errors,
    touched,
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

    const showError = (field: keyof ProjectValues) =>
        touched[field] ? errors[field] : undefined

    return (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
            <button
                type="button"
                onClick={onClose}
                className="absolute inset-0 cursor-pointer bg-black/45 backdrop-blur-[2px]"
                aria-label="Закрыть"
            />

            <div className="relative z-[91] w-full max-w-[620px] rounded-[28px] bg-white p-6 shadow-2xl md:p-8">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-6 top-6 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#f3f1ec] text-neutral-900 transition-all duration-200 hover:scale-105 hover:bg-black hover:text-white"
                    aria-label="Закрыть"
                >
                    <IoIosClose className="h-7 w-7" />
                </button>

                <h2 className="pr-14 text-2xl font-semibold uppercase text-black">
                    Заказать бесплатный 3D-проект
                </h2>

                <p className="mt-5 max-w-[480px] text-sm leading-7 text-neutral-600">
                    Оставьте заявку — мы свяжемся с вами, уточним размеры помещения и
                    подготовим следующий этап работы.
                </p>

                {isSuccess ? (
                    <div className="mt-8 rounded-[16px] border border-black/10 bg-[#f3f1ec] px-6 py-10 text-center">
                        <p className="text-lg font-semibold text-black">
                            Заявка отправлена{leadNumber ? ` №${leadNumber}` : ""}
                        </p>
                        <p className="mt-3 text-sm text-neutral-600">
                            Мы свяжемся с вами в ближайшее время.
                        </p>
                    </div>
                ) : (
                    <form className="mt-8 grid gap-5" onSubmit={onSubmit} noValidate>
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

                        {/* HONEYPOT: скрыт от людей, заполняется ботами */}
                        <input
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            value={honeypot}
                            onChange={(event) => onHoneypotChange(event.target.value)}
                            className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
                        />

                        <ConsentCheckboxes onChange={onConsentChange} />

                        {errorMessage && (
                            <p className="text-sm text-red-600">{errorMessage}</p>
                        )}

                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className="mt-2 h-12 rounded-[14px] bg-black px-5 text-[13px] font-semibold text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40 enabled:cursor-pointer"
                        >
                            {isSubmitting ? "Отправка..." : "Отправить"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ProjectModal
