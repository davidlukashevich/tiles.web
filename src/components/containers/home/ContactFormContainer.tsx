import { useState } from "react"

import ContactForm from "../../ui/home/ContactForm"
import type { ContactErrors, ContactValues } from "../../ui/home/ContactForm"
import type { ConsentState } from "../../ui/form/ConsentCheckboxes"
import { useSubmitLead } from "../../../hooks/useSubmitLead"
import {
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
} from "../../../helpers/validation/lead"

const initialValues: ContactValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
}

const initialConsent: ConsentState = {
  consent_personal_data: false,
  consent_cross_border: false,
  consent_policy_version: "",
}

const validate = (values: ContactValues): ContactErrors => {
  const errors: ContactErrors = {}

  const name = validateName(values.name)
  if (name) errors.name = name

  const phone = validatePhone(values.phone)
  if (phone) errors.phone = phone

  const email = validateEmail(values.email)
  if (email) errors.email = email

  const message = validateMessage(values.message)
  if (message) errors.message = message

  return errors
}

const ContactFormContainer = () => {
  const [values, setValues] = useState<ContactValues>(initialValues)
  const [consent, setConsent] = useState<ConsentState>(initialConsent)
  const [honeypot, setHoneypot] = useState("")
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactValues, boolean>>
  >({})

  const { mutate, isPending, isSuccess, data, error } = useSubmitLead()

  const errors = validate(values)
  const isValid = Object.keys(errors).length === 0

  const consentValid =
    consent.consent_personal_data && consent.consent_cross_border

  // Кнопка блокируется только согласиями и процессом отправки.
  // Ошибки полей показываем инлайн, чтобы было понятно, что исправить.
  const canSubmit = consentValid && !isPending

  const handleChange = (field: keyof ContactValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleBlur = (field: keyof ContactValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setTouched({ name: true, phone: true, email: true, message: true })

    if (!isValid || !consentValid || isPending) return

    mutate({
      customer_name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      page_url: window.location.href,
      consent_personal_data: consent.consent_personal_data,
      consent_cross_border: consent.consent_cross_border,
      consent_policy_version: consent.consent_policy_version,
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
      onConsentChange={setConsent}
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
