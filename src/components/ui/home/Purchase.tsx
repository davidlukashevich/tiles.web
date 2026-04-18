import { CreditCard, Truck, Store, RotateCcw, ShieldCheck, Wallet } from 'lucide-react';

const PurchaseInfo = () => {
    const purchaseItems = [
        {
            title: 'Рассрочка',
            description: 'Оформите покупку в рассрочку без лишних сложностей и переплат.',
            icon: Wallet,
        },
        {
            title: 'Оплата',
            description: 'Удобные способы оплаты: наличные, карта или безналичный расчёт.',
            icon: CreditCard,
        },
        {
            title: 'Доставка',
            description: 'Быстрая доставка по городу и регионам в удобное для вас время.',
            icon: Truck,
        },
        {
            title: 'Самовывоз',
            description: 'Заберите заказ самостоятельно со склада после подтверждения.',
            icon: Store,
        },
        {
            title: 'Прием и возврат товара',
            description: 'Простые и понятные условия возврата и обмена товара.',
            icon: RotateCcw,
        },
        {
            title: 'Гарантийное обслуживание',
            description: 'Мы предоставляем гарантию и поддерживаем вас после покупки.',
            icon: ShieldCheck,
        }
    ]

    return (
        <section className="px-4 md:px-6 xl:px-8">
            <div className="mx-auto max-w-[1280px]">
                <div className="rounded-[24px] bg-[#f3f1ec] p-6 md:p-10 lg:p-14">
                    <div className="max-w-[760px]">
                        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                            Информация о покупке
                        </p>
                        <h2 className="mt-3 text-3xl uppercase leading-tight md:text-4xl">
                            Всё, что важно знать перед покупкой
                        </h2>
                        <p className="mt-5 max-w-[620px] text-sm leading-7 text-gray-600 md:text-base">
                            Мы сделали процесс покупки простым и понятным. Ниже — основные этапы и условия,
                            которые помогут быстро сориентироваться перед оформлением заказа.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {purchaseItems.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-[20px] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 text-xl text-black">
                                    <item.icon className="w-5 h-5" />
                                </div>

                                <h3 className="mt-5 text-xl text-gray-800 md:text-2xl">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-start">
                        <a
                            href="/purchase-info"
                            className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm text-white transition hover:-translate-y-0.5 md:text-base"
                        >
                            Подробнее о покупке
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PurchaseInfo