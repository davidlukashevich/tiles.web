const ContactForm = () => {
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

        <form className="mt-10 grid gap-4">
          <input
            type="text"
            placeholder="Ваше имя"
            className="h-14 rounded-[18px] border border-[#d9d3ca] px-5 text-[15px] outline-none placeholder:text-[#8f8a84] focus:border-[#bfb8ae]"
          />

          <input
            type="tel"
            placeholder="+375 (__) ___-__-__"
            className="h-14 rounded-[18px] border border-[#d9d3ca] px-5 text-[15px] outline-none placeholder:text-[#8f8a84] focus:border-[#bfb8ae]"
          />

          <input
            type="email"
            placeholder="Email"
            className="h-14 rounded-[18px] border border-[#d9d3ca] px-5 text-[15px] outline-none placeholder:text-[#8f8a84] focus:border-[#bfb8ae]"
          />

          <textarea
            rows={5}
            placeholder="Ваше сообщение"
            className="min-h-[160px] rounded-[18px] border border-[#d9d3ca] px-5 py-4 text-[15px] outline-none placeholder:text-[#8f8a84] resize-none focus:border-[#bfb8ae]"
          />

          <button
            type="submit"
            className="mt-4 h-14 rounded-[18px] bg-[#1f1f1f] text-white text-sm md:text-base transition hover:opacity-90"
          >
            Отправить заявку
          </button>

          <p className="text-xs text-[#8c867f] text-center">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </form>
      </div>
    </section>
  )
}

export default ContactForm