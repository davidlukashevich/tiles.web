import { useEffect, useState } from "react"

import RequestModal from "../../ui/modal/RequestModal"
import type { RequestErrors, RequestValues } from "../../ui/modal/RequestModal"
import type { ConsentState } from "../../ui/form/ConsentCheckboxes"
import { useSubmitLead } from "../../../hooks/useSubmitLead"
import {
  validateMessage,
  validateName,
  validatePhone,
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
  message: "",
}

const initialConsent: ConsentState = {
  consent_personal_data: false,
  consent_cross_border: false,
  consent_policy_version: "",
}

const validate = (values: RequestValues): RequestErrors => {
  const errors: RequestErrors = {}

  const name = validateName(values.name)
  if (name) errors.name = name

  const phone = validatePhone(values.phone)
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
  const [consent, setConsent] = useState<ConsentState>(initialConsent)
  const [honeypot, setHoneypot] = useState("")
  const [touched, setTouched] = useState<
    Partial<Record<keyof RequestValues, boolean>>
  >({})

  const { mutate, isPending, isSuccess, data, error, reset } = useSubmitLead()

  // Сброс при закрытии модалки
  useEffect(() => {
    if (!isOpen) {
      setValues(initialValues)
      setConsent(initialConsent)
      setHoneypot("")
      setTouched({})
      reset()
    }
  }, [isOpen, reset])

  const errors = validate(values)
  const isValid = Object.keys(errors).length === 0

  const consentValid =
    consent.consent_personal_data && consent.consent_cross_border

  const canSubmit = consentValid && !isPending

  const handleChange = (field: keyof RequestValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleBlur = (field: keyof RequestValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setTouched({ name: true, phone: true, message: true })

    if (!isValid || !consentValid || isPending) return

    mutate({
      customer_name: values.name.trim(),
      phone: values.phone.trim(),
      message: values.message.trim(),
      page_url: window.location.href,
      product_id: productId,
      product_name: productName,
      consent_personal_data: consent.consent_personal_data,
      consent_cross_border: consent.consent_cross_border,
      consent_policy_version: consent.consent_policy_version,
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

export default RequestModalContainer
