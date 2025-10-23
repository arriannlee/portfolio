export default function Contact() {
  return (
    <section
      id="contact"
      className="
        min-h-dvh w-full 
        flex items-center justify-center
        bg-[color:var(--color-bg-secondary)]
        px-6 sm:px-8 lg:px-16
      "
    >
      <div
        className="
          flex flex-col items-center text-center
          translate-y-4 sm:translate-y-6 md:translate-y-8
        "
      >
        {/* HEADLINE */}
        <h2
          className="
            font-heading uppercase tracking-wide font-semibold
            text-3xl sm:text-4xl lg:text-5xl
            leading-[1.4] sm:leading-[1.6] md:leading-[1.3]
            text-[color:var(--color-text)]
          "
        >
          LET’S BUILD SOMETHING{" "}
          <span className="text-[color:var(--color-accent)]">TOGETHER</span>
        </h2>

        {/* SUBLINE */}
        <p className="font-body text-[color:var(--color-sub-text)] mt-4 text-base sm:text-lg">
          Design it. Code it. Make it real.
        </p>

        {/* ICONS */}
        <div className="flex gap-6 sm:gap-8 mt-10">
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/arriannlee"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[color:var(--color-accent)] hover:text-[color:var(--color-accent-hover)] transition-colors motion-safe:hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8">
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.98h5V24H0V8.98zM8.54 8.98h4.78v2.05h.07c.67-1.25 2.31-2.56 4.76-2.56C22.54 8.47 24 10.83 24 14.75V24h-5v-8.35c0-1.99-.04-4.55-2.77-4.55-2.77 0-3.2 2.16-3.2 4.39V24H8.54V8.98z"/>
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/arriannlee"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[color:var(--color-accent)] hover:text-[color:var(--color-accent-hover)] transition-colors motion-safe:hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8">
              <path d="M12 0a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.23c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.76.08-.74.08-.74 1.22.08 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.31 3.52 1 .1-.8.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.25-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.78.84 1.25 1.91 1.25 3.22 0 4.61-2.8 5.63-5.47 5.93.43.37.81 1.09.81 2.2v3.26c0 .32.22.69.83.57A12 12 0 0012 0z"/>
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:arriann.lee@hotmail.com?subject=Website%20Contact"
            aria-label="Email"
            className="text-[color:var(--color-accent)] hover:text-[color:var(--color-accent-hover)] transition-colors motion-safe:hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8">
              <path d="M1.5 4.5A2.5 2.5 0 014 2h16a2.5 2.5 0 012.5 2.5v15a2.5 2.5 0 01-2.5 2.5H4a2.5 2.5 0 01-2.5-2.5v-15zm18.3 0H4.2l7.9 6.3 7.7-6.3zm.7 1.1l-8.1 6.7a1 1 0 01-1.3 0L3 5.6V20h18V5.6z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}