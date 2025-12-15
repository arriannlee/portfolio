// This coimponent renders the projects section of the website
// It features a horizontal scrolling effect on desktop and vertical scrolling on mobile/tablet
// Each project panel includes an image, title, tech stack, and description
// Clicking a project image opens a live preview on desktop or a new tab on mobile/mobile
// Clicking on project title opens the live site in a new tab
// The final panel contains contact information with a typewriter effect

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import Image from "next/image";
import { PROJECTS, type Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Projects() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  const typeRef = useRef<HTMLSpanElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);

  // GSAP SCROLLER – HORIZONTAL ON DESKTOP, VERTICAL ON TABLET/MOBILE
  useEffect(() => {
    if (!rootRef.current) return;

    const mm = gsap.matchMedia();

    // DESKTOP HORIZONTAL SLIDER
    mm.add("(min-width: 1201px)", () => {
      const sections = gsap.utils.toArray<HTMLElement>(".project-panel");
      const contact =
        rootRef.current?.querySelector<HTMLElement>("#contact-panel");

      if (!sections.length || !contact) return;

      const firstPanel = sections[0];
      if (!firstPanel) return;

      gsap.set(sections, { xPercent: 0, yPercent: 0 });
      gsap.set(contact, { yPercent: 100 }); // contact starts off-screen at bottom

      const totalSteps = sections.length + 1; // projects + contact

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + firstPanel.offsetWidth * (totalSteps - 1),
          snap: {
            snapTo: (value) => {
              const step = 1 / (totalSteps - 1);
              return Math.round(value / step) * step;
            },
            duration: 0.3,
            delay: 0,
            ease: "power1.out",
          },
        },
      });

      // horizontal slide for project panels
      sections.forEach((panel, index) => {
        if (index === 0) return;

        tl.fromTo(
          panel,
          { xPercent: 100, yPercent: 0 },
          { xPercent: 0, yPercent: 0, duration: 1, ease: "none" },
          index - 1
        );
      });
      // Contact slides up over last project
      tl.fromTo(
        contact,
        { yPercent: 100 },
        { yPercent: 0, duration: 1, ease: "none" },
        sections.length - 1
      );

      return () => {
        tl.kill();
      };
    });

    // TABLET & MOBILE VERTICAL SLIDER
    mm.add("(max-width: 1200px)", () => {
      const sections = gsap.utils.toArray<HTMLElement>(".project-panel");
      const contact =
        rootRef.current?.querySelector<HTMLElement>("#contact-panel");

      if (!sections.length || !contact) return;

      const firstPanel = sections[0];
      if (!firstPanel) return;

      gsap.set(sections, { xPercent: 0, yPercent: 0 });
      gsap.set(contact, { yPercent: 100 });

      const totalSteps = sections.length + 1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + window.innerHeight * (totalSteps - 1),
          snap: {
            snapTo: (value) => {
              const step = 1 / (totalSteps - 1);
              return Math.round(value / step) * step;
            },
            duration: 0.3,
            delay: 0,
            ease: "power1.out",
          },
        },
      });

      sections.forEach((panel, index) => {
        if (index === 0) return;

        tl.fromTo(
          panel,
          { yPercent: 100, xPercent: 0 },
          { yPercent: 0, xPercent: 0, duration: 1, ease: "none" },
          index - 1
        );
      });

      // contact slides up over last project
      tl.fromTo(
        contact,
        { yPercent: 100 },
        { yPercent: 0, duration: 1, ease: "none" },
        sections.length - 1
      );

      return () => {
        tl.kill();
      };
    });

    // CLEAN UP MATCHMEDIA
    return () => mm.revert();
  }, []);

  // TYPEWRITER EFFECT FOR CONTACT LINE
  useEffect(() => {
    if (!typeRef.current || !cursorRef.current) return;

    const phrases = ["Design it.", "Code it.", "Make it real."];

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

    // Blink cursor forever
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 0.8,
    });

    phrases.forEach((text) => {
      // Slower typing + deleting
      const typeDuration = Math.max(0.9, text.length * 0.12); // type duration
      const deleteDuration = Math.max(1.0, text.length * 0.14); // delete duration

      // Type it
      tl.to(typeRef.current, {
        text,
        duration: typeDuration,
        ease: "none",
      });

      // Pause duration to show full text before deleting
      tl.to({}, { duration: 0.9 });

      // Delete
      tl.to(typeRef.current, {
        text: "",
        duration: deleteDuration,
        ease: "none",
      });
      tl.to({}, { duration: 1 });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="
        relative h-screen w-screen
        overflow-hidden text-white
      "
    >
      {/* STACK PANELS ON TOP OF EACH OTHER */}
      <div className="relative h-full w-full">
        {PROJECTS.map((project: Project, index) => (
          <div
            key={project.id}
            className="
              panel project-panel
              absolute inset-0
              flex items-center justify-center
              px-6 py-10
              lg:px-8 lg:py-0
            "
            style={{
              background: project.color,
              zIndex: index,
            }}
          >
            <div
              className="
              max-w-[1000px] w-full
              grid gap-8 items-center
              grid-cols-1
              justify-items-center
              xl:grid-cols-[1.3fr_1fr]
              xl:justify-items-stretch
            "
            >
              {/* IMAGE – FIRST ON MOBILE SECOND ON DESKTOP */}
              <div className="w-full max-w-[520px] justify-self-center order-1 xl:order-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!project.link) return;

                    // MOBILE OPEN DIRECTLY IN NEW TAB
                    if (window.innerWidth < 768) {
                      window.open(project.link, "_blank");
                      return;
                    }

                    // TABLET & DESKTOP OPEN PREVIEW
                    setPreviewProject(project);
                  }}
                  className="
                    group relative w-full aspect-4/3
                    overflow-hidden rounded-3xl
                    bg-white/5 backdrop-blur-sm
                    ring-1 ring-white/20
                    shadow-[0_20px_40px_-10px_rgba(0,0,0,0.45)]
                    transition-transform duration-300
                    hover:scale-[1.03]
                    hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]
                    cursor-pointer
                  "
                >
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 520px"
                      className="
                        object-cover
                        transition-transform duration-500
                      "
                      priority={index === 0}
                    />
                  )}
                </button>
              </div>

              {/* TEXT SECOND ON MOBILE, FIRST ON DESKTOP */}
              <div
                className="
                order-2 xl:order-1
                md:px-10
                md:py-6
                md:max-w-[600px]
              "
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    block
                    transition-transform
                    duration-300
                    cursor-pointer
                    hover:scale-[1.03]
                    hover:-translate-y-0.5
                  "
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    marginBottom: "0.5rem",
                    color: "white",
                    display: "inline-block",
                  }}
                >
                  {project.title}
                </a>

                {/* TECH STACK */}
                <div
                  className="tech-stack"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.35rem",
                    marginBottom: "1.2rem",
                    opacity: 0.7,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {project.stack.map((item, i) => (
                    <span key={item}>
                      {item}
                      {i < project.stack.length - 1 && (
                        <span style={{ margin: "0 0.25rem" }}>•</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* DESCRIPTION */}
                <p
                  style={{
                    fontSize: "1.1rem",
                    marginBottom: "1.25rem",
                    opacity: 0.9,
                    maxWidth: "48ch",
                  }}
                >
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* CONTACT PANEL – SLIDES UP OVER LAST PROJECT */}
        <div
          id="contact-panel"
          className="
            absolute inset-0
            flex items-center justify-center
            px-6 sm:px-8 lg:px-16
            bg-[color:var(--color-bg-secondary)]
          "
          style={{
            zIndex: PROJECTS.length,
          }}
        >
          <div
            id="contact" 
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
              <span className="text-[color:var(--color-main)]">TOGETHER</span>
            </h2>

            {/* SUBLINE */}
            <p className="font-body text-[color:var(--color-sub-text)] mt-4 text-base sm:text-lg">
              <span ref={typeRef} className="font-mono tracking-wide" />
              <span
                ref={cursorRef}
                aria-hidden="true"
                className="
                  inline-block ml-1 align-middle
                  w-[0.6ch] h-[1.1em]
                  bg-[color:var(--color-main)]
                "
              />
            </p>

            {/* ICONS */}
            <div className="flex gap-6 sm:gap-8 mt-10">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/arriannlee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[color:var(--color-main)] hover:text-[color:var(--color-accent)] transition-colors motion-safe:hover:-translate-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.98h5V24H0V8.98zM8.54 8.98h4.78v2.05h.07c.67-1.25 2.31-2.56 4.76-2.56C22.54 8.47 24 10.83 24 14.75V24h-5v-8.35c0-1.99-.04-4.55-2.77-4.55-2.77 0-3.2 2.16-3.2 4.39V24H8.54V8.98z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/arriannlee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[color:var(--color-main)] hover:text-[color:var(--color-accent)] transition-colors motion-safe:hover:-translate-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                >
                  <path d="M12 0a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.23c-3.34 .73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.76 .08-.74 .08-.74 1.22 .08 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.31 3.52 1 .1-.8 .42-1.31 .76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31 .47-2.38 1.25-3.22-.12-.3-.54-1.52 .12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23 .66 1.66 .24 2.88 .12 3.18 .78 .84 1.25 1.91 1.25 3.22 0 4.61-2.8 5.63-5.47 5.93 .43 .37 .81 1.09 .81 2.2v3.26c0 .32 .22 .69 .83 .57A12 12 0 0012 0z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:arriann.lee@hotmail.com?subject=Website%20Contact"
                aria-label="Email"
                className="text-[color:var(--color-main)] hover:text-[color:var(--color-accent)] transition-colors motion-safe:hover:-translate-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                >
                  <path d="M1.5 4.5A2.5 2.5 0 014 2h16a2.5 2.5 0 012.5 2.5v15a2.5 2.5 0 01-2.5 2.5H4a2.5 2.5 0 01-2.5-2.5v-15zm18.3 0H4.2l7.9 6.3 7.7-6.3zm.7 1.1l-8.1 6.7a1 1 0 01-1.3 0L3 5.6V20h18V5.6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* PREVIEW LIVE SITE */}
      {previewProject?.link && (
        <div
          className="
            fixed inset-0 z-1200
            bg-black/80 backdrop-blur-sm
            flex items-center justify-center
            p-4
          "
          onClick={() => setPreviewProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${previewProject.title} live preview`}
        >
          <div
            className="
              relative w-full max-w-6xl h-[90vh]
              bg-black rounded-2xl overflow-hidden
              border border-white/30
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewProject(null)}
              className="btn btn-icon absolute top-3 right-3 bg-black/70 text-white z-10"
            >
              ✕
            </button>

            <iframe
              src={previewProject.link}
              title={previewProject.title}
              className="w-full h-full border-none"
            />
          </div>
        </div>
      )}
    </section>
  );
}
