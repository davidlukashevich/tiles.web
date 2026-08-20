import { NavLink } from "react-router-dom"

import bedroom from "../../../assets/bedroom.jpg"

const AboutUs = () => {
    return (
        <section className="px-4 pb-10 md:px-6 xl:px-8">
            <div className="mx-auto max-w-[1440px]">
                <div className="relative overflow-hidden rounded-2xl bg-[#f3f1ec]">

                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-0">
                        <div className="p-6 md:p-10 lg:p-14">
                            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                                О нас
                            </p>

                            <h2 className="mt-3 text-3xl md:text-4xl uppercase leading-tight">
                                Почему выбирают нас
                            </h2>

                            <p className="mt-5 text-sm md:text-base text-gray-600 leading-7 max-w-[520px]">
                                Мы помогаем подобрать плитку под любой интерьер — от минимализма до
                                премиальных решений. Работаем быстро, честно и с вниманием к деталям.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3 text-sm md:text-base">
                                <div className="px-4 py-2 bg-white rounded-xl">Большой выбор</div>
                                <div className="px-4 py-2 bg-white rounded-xl">Консультация</div>
                                <div className="px-4 py-2 bg-white rounded-xl">Доставка</div>
                            </div>

                            <NavLink
                                to="/about"
                                className="inline-flex mt-8 items-center justify-center rounded-xl bg-black text-white px-6 py-3 text-sm md:text-base transition hover:-translate-y-0.5"
                            >
                                Подробнее о нас
                            </NavLink>
                        </div>

                        <div
                            className="min-h-[260px] bg-cover bg-center md:min-h-[320px] lg:min-h-full"
                            style={{ backgroundImage: `url(${bedroom})` }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs