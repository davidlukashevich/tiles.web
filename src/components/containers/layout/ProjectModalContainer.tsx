import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

import ProjectModal from "../../ui/modal/ProjectModal"
import type { ProjectErrors, ProjectValues } from "../../ui/modal/ProjectModal"
import { useConsentField } from "../../../hooks/useConsentField"
import { useSubmitLead } from "../../../hooks/useSubmitLead"
import {
  validateMaskedPhone,
  validateName,
  validateEmail,
} from "../../../helpers/validation/lead"

type Props = {
  isOpen: boolean
  onClose: () => void
}

const initialValues: ProjectValues = {
  name: "",
  phone: "",
  email: "",
}

const validate = (values: ProjectValues): ProjectErrors => {
  const errors: ProjectErrors = {}

  const name = validateName(values.name)
  if (name) errors.name = name

  const email = validateEmail(values.email)
  if (email) errors.email = email

  const phone = validateMaskedPhone(values.phone)
  if (phone) errors.phone = phone

  return errors
}

const ProjectModalContainer = ({ isOpen, onClose }: Props) => {
  const [values, setValues] = useState<ProjectValues>(initialValues)
  const [honeypot, setHoneypot] = useState("")
  const [touched, setTouched] = useState<
    Partial<Record<keyof ProjectValues, boolean>>
  >({})

  // Модалка монтируется в Header, то есть вне <Outlet />, и смену маршрута
  // переживает. Закрываем сами, иначе она остаётся висеть над новой
  // страницей — например при переходе в политику из галочки согласия.
  const location = useLocation()
  const pathnameRef = useRef(location.pathname)

  useEffect(() => {
    if (pathnameRef.current === location.pathname) return
    pathnameRef.current = location.pathname
    if (isOpen) onClose()
  }, [location.pathname, isOpen, onClose])

  const consent = useConsentField()
  const { mutate, isPending, isSuccess, data, error, reset } = useSubmitLead()

  const resetConsent = consent.reset

  // Сброс формы при закрытии, чтобы при повторном открытии
  // не висел экран успеха и старые значения.
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

  const handleChange = (field: keyof ProjectValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleBlur = (field: keyof ProjectValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setTouched({ name: true, phone: true, email: true })

    if (!isValid || !consent.isValid || isPending) return

    mutate({
      customer_name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      message: "Заявка на бесплатный 3D-проект",
      page_url: window.location.href,
      consent_personal_data: consent.value.consent_personal_data,
      consent_cross_border: consent.value.consent_cross_border,
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

export default ProjectModalContainer
