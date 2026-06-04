import { useState } from "react"
import { IoIosArrowForward } from "react-icons/io"
import type { HowBuySection } from "../../../types/ui/HowBuy.type"
import MobileTabs from "./MobileTabs"

type Props = {
    sections: HowBuySection[]
    activeSectionId: string
    onTabClick: (id: string) => void
}

const HowBuyView = ({
    sections,
    activeSectionId,
    onTabClick,
}: Props) => {
    const [openItem, setOpenItem] = useState<string | null>(null)

    const handleToggleItem = (id: string) => {
        setOpenItem((prev) => (prev === id ? null : id))
    }

    return (
        <main className="w-full bg-white py-10 lg:py-20">
            <section className="mx-auto w-full max-w-[1440px] px-4 sm:px-5 lg:px-10">
                <div className="mx-auto mb-8 max-w-[900px] text-center lg:mb-14">
                    <h1 className="mb-5 text-3xl font-medium uppercase leading-none text-black sm:text-4xl">
                        Как купить
                    </h1>

                    <p className="mx-auto max-w-[780px] text-base leading-relaxed text-neutral-500 sm:text-lg">
                        Мы сделали процесс покупки простым и понятным: выберите плитку,
                        оставьте заявку, согласуйте детали и получите заказ удобным способом.
                    </p>
                </div>

                <div className="sticky top-[104px] z-40 mb-8 bg-white/90 py-3 backdrop-blur lg:top-[90px] lg:mb-14 lg:py-4">
                    <div className="hidden justify-center lg:flex">
                        <div className="flex gap-2 rounded-[28px] bg-[#f3f0ea] p-2">
                            {sections.map((section) => {
                                const isActive = activeSectionId === section.id

                                return (
                                    <button
                                        key={section.id}
                                        type="button"
                                        onClick={() => onTabClick(section.id)}
                                        className={[
                                            "cursor-pointer rounded-[22px] px-6 py-4 text-base font-medium transition-all",
                                            isActive
                                                ? "bg-black text-white"
                                                : "text-neutral-600 hover:bg-white hover:text-black",
                                        ].join(" ")}
                                    >
                                        {section.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <MobileTabs
                        sections={sections}
                        activeSectionId={activeSectionId}
                        onTabClick={onTabClick}
                    />
                </div>

                <div className="grid gap-5 sm:gap-6 lg:gap-8">
                    {sections.map((section) => (
                        <article
                            key={section.id}
                            id={section.id}
                            className="scroll-mt-[170px] overflow-hidden rounded-[24px] bg-[#f3f0ea] p-4 sm:p-6 md:p-10 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:scroll-mt-[150px] lg:rounded-[36px] lg:p-16"
                        >
                            <div className="mb-7 lg:mb-0">
                                <h2 className="mb-4 text-3xl font-medium uppercase leading-tight text-black sm:text-4xl">
                                    {section.title}
                                </h2>

                                <p className="max-w-[620px] text-base leading-relaxed text-neutral-500 sm:text-lg">
                                    {section.text}
                                </p>
                            </div>

                            <div className="grid gap-3">
                                {section.items.map((item) => {
                                    const itemId = `${section.id}-${item.title}`
                                    const isOpen = openItem === itemId

                                    return (
                                        <div
                                            key={itemId}
                                            className={[
                                                "overflow-hidden rounded-[22px] bg-white shadow-sm transition-all duration-300",
                                                isOpen
                                                    ? "shadow-md"
                                                    : "hover:-translate-y-0.5 hover:shadow-md",
                                            ].join(" ")}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => handleToggleItem(itemId)}
                                                className="group flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left"
                                            >
                                                <span className="text-base text-slate-700">
                                                    {item.title}
                                                </span>

                                                <span
                                                    className={[
                                                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                                                        isOpen
                                                            ? "rotate-90 bg-black text-white"
                                                            : "bg-[#f3f0ea] text-black group-hover:bg-black group-hover:text-white",
                                                    ].join(" ")}
                                                >
                                                    <IoIosArrowForward className="h-4 w-4" />
                                                </span>
                                            </button>

                                            <div
                                                className={[
                                                    "grid transition-all duration-300",
                                                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                                                ].join(" ")}
                                            >
                                                <div className="overflow-hidden">
                                                    <div className="border-t border-black/10 px-5 py-4">
                                                        <p className="text-sm leading-7 text-neutral-500">
                                                            {item.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default HowBuyView