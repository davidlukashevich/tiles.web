import { useEffect, useState } from "react"

import RequestModal from "../../ui/modal/RequestModal"
import type { RequestErrors, RequestValues } from "../../ui/modal/RequestModal"
import { useConsentField } from "../../../hooks/useConsentField"
import { useSubmitLead } from "../../../hooks/useSubmitLead"
import {
  validateMessage,
  validateName,
  validateEmail,
  validateMaskedPhone,
} from "../../../helpers/validation/lead"

type Props = {
  isOpen: boolean
  onClose: () => void
  productId?: string
  productName?: string
}

const initialValues: RequestValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
}

const validate = (values: RequestValues): RequestErrors => {
  const errors: RequestErrors = {}

  const name = validateName(values.name)
  if (name) errors.name = name

  const email = validateEmail(values.email)
  if (email) errors.email = email

  const phone = validateMaskedPhone(values.phone)
  if (phone) errors.phone = phone

  const message = validateMessage(values.message)
  if (message) errors.message = message

  return errors
}

const RequestModalContainer = ({
  isOpen,
  onClose,
  productId,
  productName,
}: Props) => {
  const [values, setValues] = useState<RequestValues>(initialValues)
  const [honeypot, setHoneypot] = useState("")
  const [touched, setTouched] = useState<
    Partial<Record<keyof RequestValues, boolean>>
  >({})

  const consent = useConsentField()
  const { mutate, isPending, isSuccess, data, error, reset } = useSubmitLead()

  const resetConsent = consent.reset

  // Сброс при закрытии модалки
  useEffect(() => {
    if (!isOpen) {
      setValues(initialValues)
      setHoneypot("")
      setTouched({})
      resetConsent()
      reset()
    }
  }, [isOpen, reset, resetConsent])

  const errors = validate(values)
  const isValid = Object.keys(errors).length === 0

  // Если тексты согласий не загрузились — consent.isValid всегда false.
  const canSubmit = consent.isValid && !isPending

  const handleChange = (field: keyof RequestValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleBlur = (field: keyof RequestValues) => {
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
      product_id: productId,
      product_name: productName,
      consent_personal_data: consent.value.consent_personal_data,
      consent_cross_border: consent.value.consent_cross_border,
      _hp: honeypot,
    })
  }

  return (
    <RequestModal
      isOpen={isOpen}
      onClose={onClose}
      values={values}
      honeypot={honeypot}
      errors={errors}
      touched={touched}
      productName={productName}
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

export default RequestModalContainer
