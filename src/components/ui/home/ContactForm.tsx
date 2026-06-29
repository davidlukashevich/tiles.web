import ConsentCheckboxes from "../form/ConsentCheckboxes"
import type { ConsentState } from "../form/ConsentCheckboxes"

export type ContactValues = {
  name: string
  phone: string
  email: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>

type Props = {
  values: ContactValues
  honeypot: string
  errors: ContactErrors
  touched: Partial<Record<keyof ContactValues, boolean>>
  onChange: (field: keyof ContactValues, value: string) => void
  onBlur: (field: keyof ContactValues) => void
  onHoneypotChange: (value: string) => void
  onConsentChange: (consent: ConsentState) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  canSubmit: boolean
  isSubmitting: boolean
  isSuccess: boolean
  leadNumber: number | null
  errorMessage: string | null
}

const baseField =
  "h-14 rounded-[18px] border px-5 text-[15px] outline-none placeholder:text-[#8f8a84] focus:border-[#bfb8ae]"

const fieldClass = (hasError: boolean) =>
  `${baseField} ${hasError ? "border-red-400 focus:border-red-400" : "border-[#d9d3ca]"}`

const ContactForm = ({
  values,
  honeypot,
  errors,
  touched,
  onChange,
  onBlur,
  onHoneypotChange,
  onConsentChange,
  onSubmit,
  canSubmit,
  isSubmitting,
  isSuccess,
  leadNumber,
  errorMessage,
}: Props) => {
  const showError = (field: keyof ContactValues) =>
    touched[field] ? errors[field] : undefined

  return (
    <section className="px-4 py-10 md:px-6 xl:px-8">
      <div className="mx-auto max-w-[900px]">

        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#9a968f]">
            Обратная связь
          </p>

          <h2 className="mt-4 text-3xl md:text-4xl uppercase text-[#2f2f2f]">
            Свяжитесь с нами
          </h2>

          <p className="mt-5 text-sm md:text-base text-[#66615b] max-w-[600px] mx-auto leading-7">
            Оставьте заявку — мы поможем подобрать плитку, рассчитать количество
            и проконсультируем по всем вопросам.
          </p>
        </div>

        {isSuccess ? (
          <div className="mt-10 rounded-[18px] border border-[#d9d3ca] bg-[#f3f1ec] px-6 py-10 text-center">
            <p className="text-xl font-semibold text-[#2f2f2f]">
              Заявка отправлена{leadNumber ? ` №${leadNumber}` : ""}
            </p>
            <p className="mt-3 text-sm text-[#66615b]">
              Мы свяжемся с вами в ближайшее время.
            </p>
          </div>
        ) : (
          <form className="mt-10 grid gap-4" onSubmit={onSubmit} noValidate>
            <div className="grid gap-1.5">
              <input
                type="text"
                maxLength={200}
                value={values.name}
                onChange={(event) => onChange("name", event.target.value)}
                onBlur={() => onBlur("name")}
                placeholder="Ваше имя"
                aria-invalid={Boolean(showError("name"))}
                className={fieldClass(Boolean(showError("name")))}
              />
              {showError("name") && (
                <span className="px-1 text-xs text-red-600">
                  {showError("name")}
                </span>
              )}
            </div>

            <div className="grid gap-1.5">
              <input
                type="tel"
                value={values.phone}
                onChange={(event) => onChange("phone", event.target.value)}
                onBlur={() => onBlur("phone")}
                placeholder="+375 (__) ___-__-__"
                aria-invalid={Boolean(showError("phone"))}
                className={fieldClass(Boolean(showError("phone")))}
              />
              {showError("phone") && (
                <span className="px-1 text-xs text-red-600">
                  {showError("phone")}
                </span>
              )}
            </div>

            <div className="grid gap-1.5">
              <input
                type="email"
                value={values.email}
                onChange={(event) => onChange("email", event.target.value)}
                onBlur={() => onBlur("email")}
                placeholder="Email"
                aria-invalid={Boolean(showError("email"))}
                className={fieldClass(Boolean(showError("email")))}
              />
              {showError("email") && (
                <span className="px-1 text-xs text-red-600">
                  {showError("email")}
                </span>
              )}
            </div>

            <div className="grid gap-1.5">
              <textarea
                rows={5}
                maxLength={4000}
                value={values.message}
                onChange={(event) => onChange("message", event.target.value)}
                onBlur={() => onBlur("message")}
                placeholder="Ваше сообщение"
                aria-invalid={Boolean(showError("message"))}
                className={`min-h-[160px] rounded-[18px] border px-5 py-4 text-[15px] outline-none placeholder:text-[#8f8a84] resize-none focus:border-[#bfb8ae] ${
                  showError("message")
                    ? "border-red-400 focus:border-red-400"
                    : "border-[#d9d3ca]"
                }`}
              />
              {showError("message") && (
                <span className="px-1 text-xs text-red-600">
                  {showError("message")}
                </span>
              )}
            </div>

            {/* HONEYPOT: скрыт от людей, заполняется ботами */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={honeypot}
              onChange={(event) => onHoneypotChange(event.target.value)}
              className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
            />

            <ConsentCheckboxes onChange={onConsentChange} />

            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="mt-4 inline-flex h-14 items-center justify-center rounded-[18px] border border-black/10 bg-[#f3f1ec] px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-black transition-all duration-200 hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-black/10 disabled:hover:bg-[#f3f1ec] disabled:hover:text-black enabled:cursor-pointer"
            >
              {isSubmitting ? "Отправка..." : "Отправить заявку"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default ContactForm
