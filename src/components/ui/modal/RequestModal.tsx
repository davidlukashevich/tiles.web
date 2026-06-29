import { useEffect, useState } from "react"
import { IoIosClose } from "react-icons/io"
import ConsentCheckboxes from "../form/ConsentCheckboxes"

type Props = {
    isOpen: boolean
    onClose: () => void
}

const RequestModal = ({ isOpen, onClose }: Props) => {
    const [consentValid, setConsentValid] = useState(false)

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : ""

        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    if (!isOpen) return null

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
            <div className="relative z-[101] w-full max-w-[720px] rounded-[32px] bg-white p-6 shadow-2xl md:p-8">
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

                {/* DESCRIPTION */}
                <p className="mt-5 max-w-[560px] text-sm leading-7 text-neutral-600 md:text-[15px]">
                    Оставьте заявку — мы свяжемся с вами, уточним детали заказа и
                    поможем подобрать подходящие материалы для вашего проекта.
                </p>

                {/* FORM */}
                <form className="mt-8 grid gap-5">
                    {/* NAME */}
                    <label className="grid gap-3">
                        <span className="text-sm text-neutral-500">
                            Ваше имя
                        </span>

                        <input
                            type="text"
                            placeholder="Введите имя"
                            className="h-14 rounded-[18px] border border-black/10 px-5 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-black"
                        />
                    </label>

                    {/* PHONE */}
                    <label className="grid gap-3">
                        <span className="text-sm text-neutral-500">
                            Телефон
                        </span>

                        <input
                            type="tel"
                            placeholder="+375 (__) ___-__-__"
                            className="h-14 rounded-[18px] border border-black/10 px-5 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-black"
                        />
                    </label>

                    {/* COMMENT */}
                    <label className="grid gap-3">
                        <span className="text-sm text-neutral-500">
                            Комментарий
                        </span>

                        <textarea
                            rows={4}
                            placeholder="Например: нужен расчет плитки для ванной комнаты"
                            className="resize-none rounded-[18px] border border-black/10 px-5 py-4 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-black"
                        />
                    </label>

                    {/* CONSENTS */}
                    <ConsentCheckboxes onValidityChange={setConsentValid} />

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={!consentValid}
                        className="mt-2 flex h-14 items-center justify-center rounded-[18px] bg-black px-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40 enabled:cursor-pointer"
                    >
                        Отправить заявку
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RequestModal