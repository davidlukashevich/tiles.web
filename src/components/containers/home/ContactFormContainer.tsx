import { useState } from "react"

import ContactForm from "../../ui/home/ContactForm"
import type { ContactErrors, ContactValues } from "../../ui/home/ContactForm"
import { useConsentField } from "../../../hooks/useConsentField"
import { useSubmitLead } from "../../../hooks/useSubmitLead"
import {
  validateEmail,
  validateMessage,
  validateName,
  validateMaskedPhone,
} from "../../../helpers/validation/lead"

const initialValues: ContactValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
}

const validate = (values: ContactValues): ContactErrors => {
  const errors: ContactErrors = {}

  const name = validateName(values.name)
  if (name) errors.name = name

  const phone = validateMaskedPhone(values.phone)
  if (phone) errors.phone = phone

  const email = validateEmail(values.email)
  if (email) errors.email = email

  const message = validateMessage(values.message)
  if (message) errors.message = message

  return errors
}

const ContactFormContainer = () => {
  const [values, setValues] = useState<ContactValues>(initialValues)
  const [honeypot, setHoneypot] = useState("")
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactValues, boolean>>
  >({})

  const consent = useConsentField()
  const { mutate, isPending, isSuccess, data, error } = useSubmitLead()

  const errors = validate(values)
  const isValid = Object.keys(errors).length === 0

  // Кнопка блокируется согласиями и процессом отправки. Если тексты согласий
  // не загрузились — consent.isValid всегда false, отправка недоступна.
  // Ошибки полей показываем инлайн, чтобы было понятно, что исправить.
  const canSubmit = consent.isValid && !isPending

  const handleChange = (field: keyof ContactValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleBlur = (field: keyof ContactValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setTouched({ name: true, phone: true, email: true, message: true })

    if (!isValid || !consent.isValid || isPending) return

    mutate({
      customer_name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      page_url: window.location.href,
      consent_personal_data: consent.value.consent_personal_data,
      consent_cross_border: consent.value.consent_cross_border,
      _hp: honeypot,
    })
  }

  return (
    <ContactForm
      values={values}
      honeypot={honeypot}
      errors={errors}
      touched={touched}
      onChange={handleChange}
      onBlur={handleBlur}
      onHoneypotChange={setHoneypot}
      consent={consent.props}
      onSubmit={handleSubmit}
      canSubmit={canSubmit}
      isSubmitting={isPending}
      isSuccess={isSuccess}
      leadNumber={data?.lead_number ?? null}
      errorMessage={
        error ? "Не удалось отправить заявку. Попробуйте ещё раз." : null
      }
    />
  )
}

export default ContactFormContainer
