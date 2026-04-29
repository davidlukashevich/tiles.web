import type { HowBuySection } from "../../../types/ui/HowBuy.type"

type MobileTabsProps = {
    sections: HowBuySection[]
    activeSectionId: string
    onTabClick: (id: string) => void
}

const MobileTabs = ({
    sections,
    activeSectionId,
    onTabClick,
}: MobileTabsProps) => {
    const currentIndex = sections.findIndex((s) => s.id === activeSectionId)

    const safeIndex = currentIndex >= 0 ? currentIndex : 0
    const prev = sections[safeIndex - 1]
    const next = sections[safeIndex + 1]
    const current = sections[safeIndex]

    return (
        <div className="mx-auto flex w-full max-w-[360px] items-center gap-2 rounded-2xl bg-[#f3f0ea] p-2 lg:hidden">
            <button
                type="button"
                disabled={!prev}
                onClick={() => prev && onTabClick(prev.id)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl disabled:opacity-30"
            >
                ←
            </button>

            <button
                type="button"
                onClick={() => onTabClick(current.id)}
                className="min-w-0 flex-1 truncate rounded-xl bg-black px-3 py-3 text-center text-sm font-medium text-white"
            >
                {current.label}
            </button>

            <button
                type="button"
                disabled={!next}
                onClick={() => next && onTabClick(next.id)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl disabled:opacity-30"
            >
                →
            </button>
        </div>
    )
}

export default MobileTabs