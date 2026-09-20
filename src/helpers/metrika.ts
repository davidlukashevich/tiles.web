// Яндекс.Метрика. Счётчик подключается в index.html, здесь — обёртки,
// чтобы остальной код не знал ни про номер, ни про глобальный ym.
//
// Все вызовы безопасны, если счётчик не загрузился: блокировщик рекламы,
// офлайн или пререндер (там запросы к mc.yandex.ru отключены намеренно).

export const METRIKA_ID = 112835414

type YandexMetrika = (
    id: number,
    action: string,
    ...args: unknown[]
) => void

const ym = (): YandexMetrika | undefined =>
    (window as unknown as { ym?: YandexMetrika }).ym

// Просмотр страницы при переходе внутри SPA: сам счётчик засчитывает
// только первую загрузку, дальше переходы делает роутер без перезагрузки.
export const trackPageView = (url: string, title?: string) => {
    ym()?.(METRIKA_ID, "hit", url, { title })
}

// Цель — в Метрике создаётся вручную с этим же идентификатором
export const trackGoal = (goal: string, params?: Record<string, unknown>) => {
    ym()?.(METRIKA_ID, "reachGoal", goal, params)
}

export const GOAL_LEAD_SENT = "lead_sent"
