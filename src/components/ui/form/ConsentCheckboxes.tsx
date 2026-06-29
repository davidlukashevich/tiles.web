import { useEffect, useState } from "react"

// Версия политики, уходит в API как consent_policy_version
export const CONSENT_POLICY_VERSION = "2026-05-26"

export type ConsentState = {
  consent_personal_data: boolean
  consent_cross_border: boolean
  consent_policy_version: string
}

type Props = {
  // Вызывается при любом изменении: true, когда оба согласия отмечены
  onValidityChange?: (valid: boolean) => void
  // Полные значения согласий (для отправки в API)
  onChange?: (consent: ConsentState) => void
}

const ConsentCheckboxes = ({ onValidityChange, onChange }: Props) => {
  const [personalData, setPersonalData] = useState(false)
  const [crossBorder, setCrossBorder] = useState(false)

  useEffect(() => {
    onValidityChange?.(personalData && crossBorder)
    onChange?.({
      consent_personal_data: personalData,
      consent_cross_border: crossBorder,
      consent_policy_version: CONSENT_POLICY_VERSION,
    })
  }, [personalData, crossBorder, onValidityChange, onChange])

  return (
    <div className="grid gap-3">
      <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-neutral-500">
        <input
          type="checkbox"
          required
          checked={personalData}
          onChange={(event) => setPersonalData(event.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-black"
        />
        <span>
          Я согласен на обработку{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-black"
          >
            персональных данных
          </a>
        </span>
      </label>

      <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-neutral-500">
        <input
          type="checkbox"
          required
          checked={crossBorder}
          onChange={(event) => setCrossBorder(event.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-black"
        />
        <span>
          Я согласен на трансграничную передачу персональных данных
        </span>
      </label>
    </div>
  )
}

export default ConsentCheckboxes
