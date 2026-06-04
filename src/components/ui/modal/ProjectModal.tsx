import { useEffect } from "react"
import { IoIosClose } from "react-icons/io"

type Props = {
    isOpen: boolean
    onClose: () => void
}

const ProjectModal = ({ isOpen, onClose }: Props) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : ""

        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    if (!isOpen) return null

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

                <form className="mt-8 grid gap-5">
                    <label className="grid gap-3">
                        <span className="text-sm text-neutral-500">Ваше имя</span>

                        <input
                            type="text"
                            placeholder="Введите имя"
                            className="h-12 rounded-[16px] border border-black/10 px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
                        />
                    </label>

                    <label className="grid gap-3">
                        <span className="text-sm text-neutral-500">Телефон</span>

                        <input
                            type="tel"
                            placeholder="+375 (__) ___-__-__"
                            className="h-12 rounded-[16px] border border-black/10 px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
                        />
                    </label>

                    <button
                        type="submit"
                        className="mt-2 h-12 cursor-pointer rounded-[14px] bg-black px-5 text-[13px] font-semibold text-white transition-opacity hover:opacity-80"
                    >
                        Отправить
                    </button>

                    <p className="text-center text-xs leading-5 text-neutral-400">
                        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                </form>
            </div>
        </div>
    )
}

export default ProjectModal