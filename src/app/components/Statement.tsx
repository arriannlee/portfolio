const WORDS = ["TURNING", "IDEAS", "INTO", "EXPERIENCES"]

export default function Statement() {
  return (
    <section className="min-h-dvh w-full flex items-center justify-center px-4 sm:px-8">
      <div
        className="
          max-w-7xl mx-auto
          font-heading uppercase font-semibold tracking-tight
          text-center
          flex flex-col justify-center
          /* line spacing tuned per viewport */
          leading-[1.25] sm:leading-[1.3] lg:leading-[1.15]
          gap-[0.8em] sm:gap-[1em] lg:gap-[0.7em]
        "
      >
        {WORDS.map((word, i) => (
          <span
            key={word}
            className={[
              // ✨ font scaling tuned per viewport
              "block text-[clamp(2.8rem,11vw,9.5rem)] sm:text-[clamp(3.5rem,9vw,11rem)] lg:text-[clamp(4rem,8vw,12rem)]",
              i === WORDS.length - 1
                ? "text-[color:var(--color-accent)]"
                : "text-[color:var(--color-text)]",
            ].join(" ")}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  )
}