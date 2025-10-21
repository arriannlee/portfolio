export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-dvh w-full flex flex-col items-center justify-center 
                 px-6 sm:px-8 lg:px-16 
                 bg-[color:var(--color-bg-secondary)] text-center"
    >
      {/* HEADLINE */}
      <h2 className="font-heading uppercase tracking-tight text-3xl sm:text-4xl lg:text-5xl font-semibold text-[color:var(--color-text)]">
        LET’S BUILD SOMETHING{" "}
        <span className="text-[color:var(--color-accent)]">TOGETHER</span>
      </h2>

      {/* SUBLINE */}
      <p className="font-body text-[color:var(--color-sub-text)] mt-4 text-base sm:text-lg">
        Design it. Code it. Make it real.
      </p>

      {/* ICONS / CIRCLES */}
      <div className="flex gap-6 sm:gap-8 mt-10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[color:var(--color-accent)] bg-[color:var(--color-bg)]" />
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[color:var(--color-accent)] bg-[color:var(--color-bg)]" />
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[color:var(--color-accent)] bg-[color:var(--color-bg)]" />
      </div>

    </section>
  )
}