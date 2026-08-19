import { phoneError } from "../phone"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateName = (value: string): string | undefined => {
  const name = value.trim()
  if (!name) return "Введите имя"
  if (name.length > 200) return "Не более 200 символов"
  return undefined
}

export const validateEmail = (value: string): string | undefined => {
  const email = value.trim()
  if (!email) return "Введите email"
  if (!EMAIL_RE.test(email)) return "Некорректный email"
  return undefined
}

export const validateMessage = (value: string): string | undefined => {
  if (!value.trim()) return "Заполните поле"
  if (value.length > 4000) return "Не более 4000 символов"
  return undefined
}

// Для поля с маской: требуемая длина определяется по коду страны,
// поэтому валидатору не нужно знать текущий режим поля (см. helpers/phone)
export const validateMaskedPhone = (value: string): string | undefined =>
  phoneError(value)
