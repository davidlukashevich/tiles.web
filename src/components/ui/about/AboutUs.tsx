import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react"

import viberIcon from "../../../assets/viber.jpeg"
import kufarIcon from "../../../assets/kufar.jpeg"

type Props = {
    mapUrl: string
}

const socialLinks = [
    {
        label: "Viber",
        href: "#",
        img: viberIcon,
    },
    {
        label: "Kufar",
        href: "#",
        img: kufarIcon,
    },
]

const AboutUs = ({ mapUrl }: Props) => {
    return (
        <main className="bg-white px-4 py-10 md:px-6 md:py-14 xl:px-8 xl:py-16">
            <section className="mx-auto max-w-[1280px]">
                <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
                    <div className="xl:pt-6">
                        <h1 className="max-w-[720px] text-[36px] leading-[1.1] text-[#111] md:text-[36px] xl:text-[36px]">
                            Магазин плитки и решений
                            <br />
                            для интерьера
                        </h1>

                        <div className="mt-6 h-[2px] w-14 bg-[#111]" />

                        <div className="mt-8 max-w-[720px] space-y-5 text-[17px] leading-8 text-[#5f5a54]">
                            <p>
                                Мы помогаем подобрать плитку под любой интерьер — от спокойных
                                минималистичных решений до выразительных акцентных коллекций.
                            </p>

                            <p>
                                Сопровождаем клиента на каждом этапе: от консультации и выбора
                                формата до покупки, доставки и дальнейшей поддержки.
                            </p>

                            <p>
                                Для нас важно не просто продать материал, а помочь собрать
                                цельное и аккуратное пространство, в котором всё сочетается по
                                стилю, размеру и назначению.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-3 text-sm text-[#3e3a36] sm:grid-cols-3">
                            {[
                                "Большой выбор коллекций",
                                "Помощь с подбором",
                                "Доставка и самовывоз",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-[16px] bg-[#f3f1ec] px-4 py-4 text-center"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="rounded-[24px] bg-[#f7f5f0] p-6 md:p-8 xl:p-10">
                        <h2 className="text-[26px] leading-tight text-[#111] md:text-[32px]">
                            Контактная информация
                        </h2>

                        <div className="mt-6 h-px w-full bg-black/10" />

                        <div className="mt-8 space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-black/5 bg-white">
                                    <MapPin className="h-5 w-5 text-[#111]" />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-[0.24em] text-[#9a968f]">
                                        Адрес
                                    </p>
                                    <p className="mt-2 text-[17px] leading-7 text-[#2f2f2f]">
                                        г. Минск <br />
                                        ул. Примерная, 10
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-black/5 bg-white">
                                    <Phone className="h-5 w-5 text-[#111]" />
                                </div>

                                <div className="flex-1">
                                    <p className="text-xs uppercase tracking-[0.24em] text-[#9a968f]">
                                        Телефон
                                    </p>

                                    <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                                        <a
                                            href="tel:+375290000000"
                                            className="text-[17px] text-[#2f2f2f] transition hover:opacity-70"
                                        >
                                            +375 (29) 000-00-00
                                        </a>

                                        <div className="flex items-center gap-2">
                                            {socialLinks.map((item) => (
                                                <a
                                                    key={item.label}
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    aria-label={item.label}
                                                    className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-black/5 bg-white transition hover:-translate-y-1 hover:shadow-md"
                                                >
                                                    <img
                                                        src={item.img}
                                                        alt={item.label}
                                                        className={"h-6 w-6 object-contain"}
                                                    />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-black/5 bg-white">
                                    <Clock3 className="h-5 w-5 text-[#111]" />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-[0.24em] text-[#9a968f]">
                                        Часы работы
                                    </p>
                                    <p className="mt-2 text-[17px] leading-7 text-[#2f2f2f]">
                                        Пн–Пт: 9:00–20:00 <br />
                                        Сб–Вс: 10:00–18:00
                                    </p>
                                </div>
                            </div>
                        </div>

                        <a
                            href={mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-10 inline-flex h-14 w-full items-center justify-center gap-2 rounded-[16px] bg-black px-6 text-sm uppercase tracking-[0.08em] text-white transition hover:opacity-90"
                        >
                            Посмотреть на карте
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </aside>
                </div>
            </section>
        </main>
    )
}

export default AboutUs