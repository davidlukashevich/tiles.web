import { useEffect, useState } from "react"

import ProjectModal from "../../ui/modal/ProjectModal"
import type { ProjectErrors, ProjectValues } from "../../ui/modal/ProjectModal"
import type { ConsentState } from "../../ui/form/ConsentCheckboxes"
import { useSubmitLead } from "../../../hooks/useSubmitLead"
import { validateName, validatePhone } from "../../../helpers/validation/lead"

type Props = {
  isOpen: boolean
  onClose: () => void
}

const initialValues: ProjectValues = {
  name: "",
  phone: "",
}

const initialConsent: ConsentState = {
  consent_personal_data: false,
  consent_cross_border: false,
  consent_policy_version: "",
}

const validate = (values: ProjectValues): ProjectErrors => {
  const errors: ProjectErrors = {}

  const name = validateName(values.name)
  if (name) errors.name = name

  const phone = validatePhone(values.phone)
  if (phone) errors.phone = phone

  return errors
}

const ProjectModalContainer = ({ isOpen, onClose }: Props) => {
  const [values, setValues] = useState<ProjectValues>(initialValues)
  const [consent, setConsent] = useState<ConsentState>(initialConsent)
  const [honeypot, setHoneypot] = useState("")
  const [touched, setTouched] = useState<
    Partial<Record<keyof ProjectValues, boolean>>
  >({})

  const { mutate, isPending, isSuccess, data, error, reset } = useSubmitLead()

  // Сброс формы при закрытии, чтобы при повторном открытии
  // не висел экран успеха и старые значения.
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

  const handleChange = (field: keyof ProjectValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleBlur = (field: keyof ProjectValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setTouched({ name: true, phone: true })

    if (!isValid || !consentValid || isPending) return

    mutate({
      customer_name: values.name.trim(),
      phone: values.phone.trim(),
      message: "Заявка на бесплатный 3D-проект",
      page_url: window.location.href,
      consent_personal_data: consent.consent_personal_data,
      consent_cross_border: consent.consent_cross_border,
      consent_policy_version: consent.consent_policy_version,
      _hp: honeypot,
    })
  }

  return (
    <ProjectModal
      isOpen={isOpen}
      onClose={onClose}
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

export default ProjectModalContainer
