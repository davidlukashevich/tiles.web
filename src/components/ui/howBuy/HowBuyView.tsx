import type { HowBuySection } from "../../../types/ui/HowBuy.type";
import MobileTabs from "./MobileTabs";

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
    return (
        <main className="w-full bg-white py-10 lg:py-20">
            <section className="mx-auto w-full max-w-[1440px] px-4 sm:px-5 lg:px-10">
                <div className="mx-auto mb-8 max-w-[900px] text-center lg:mb-14">
                    <h1 className="mb-5 text-3xl font-medium uppercase leading-none text-black sm:text-4xl md:text-4xl lg:text-4xl">
                        Как купить
                    </h1>

                    <p className="mx-auto max-w-[780px] text-base leading-relaxed text-neutral-500 sm:text-lg md:text-lg">
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
                                            "rounded-[22px] px-6 py-4 text-base font-medium transition-all",
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

                <div className="grid w-full gap-5 sm:gap-6 lg:gap-8">
                    {sections.map((section) => (
                        <article
                            key={section.id}
                            id={section.id}
                            className="w-full min-w-0 scroll-mt-[170px] overflow-hidden rounded-[24px] bg-[#f3f0ea] p-4 sm:p-6 md:p-10 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:scroll-mt-[150px] lg:rounded-[36px] lg:p-16"
                        >
                            <div className="mb-7 min-w-0 lg:mb-0">
                                <p className="mb-3 text-xs uppercase tracking-[0.35em] text-slate-400 sm:tracking-[0.45em]">
                                    Как купить
                                </p>

                                <h2 className="mb-4 break-words text-3xl font-medium uppercase leading-tight text-black sm:text-4xl md:text-4xl">
                                    {section.title}
                                </h2>

                                <p className="max-w-[620px] break-words text-base leading-relaxed text-neutral-500 sm:text-lg md:text-lg">
                                    {section.text}
                                </p>
                            </div>

<div className="grid min-w-0 gap-2 sm:gap-3 md:grid-cols-2">
  {section.items.map((item) => (
    <div
      key={item}
      className="
        flex items-center
        min-w-0
        rounded-[18px] bg-white
        px-3 py-3
        text-sm leading-snug text-slate-700
        shadow-sm
        sm:rounded-[22px] sm:px-4 sm:py-4 sm:text-base
        md:px-5 md:py-5
      "
    >
      <p className="break-words">{item}</p>
    </div>
  ))}
</div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default HowBuyView