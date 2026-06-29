const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateName = (value: string): string | undefined => {
  const name = value.trim()
  if (!name) return "Введите имя"
  if (name.length > 200) return "Не более 200 символов"
  return undefined
}

export const validatePhone = (value: string): string | undefined => {
  if (!value.trim()) return "Введите телефон"
  if (value.replace(/\D/g, "").length < 7) return "Минимум 7 цифр"
  return undefined
}

export const validateEmail = (value: string): string | undefined => {
  const email = value.trim()
  if (email && !EMAIL_RE.test(email)) return "Некорректный email"
  return undefined
}

export const validateMessage = (value: string): string | undefined => {
  if (value.length > 4000) return "Не более 4000 символов"
  return undefined
}
