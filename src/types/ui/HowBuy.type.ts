export type HowBuyInfoItem = {
  title: string
  text: string
}

export type HowBuySection = {
  id: string
  label: string
  title: string
  text: string
  items: HowBuyInfoItem[]
}