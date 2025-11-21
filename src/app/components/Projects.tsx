"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { PROJECTS, type Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  // GSAP SCROLLER – HORIZONTAL ON DESKTOP, VERTICAL ON TABLET/MOBILE
  useEffect(() => {
    if (!rootRef.current) return;

    const mm = gsap.matchMedia();

    // 💻 DESKTOP: HORIZONTAL SLIDER
    mm.add("(min-width: 1024px)", () => {
      const sections = gsap.utils.toArray<HTMLElement>(".panel");
      if (!sections.length) return;

      const firstPanel = sections[0];
      if (!firstPanel) return;

      gsap.set(sections, { xPercent: 0, yPercent: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + firstPanel.offsetWidth * (sections.length - 1),
          snap: {
            snapTo: (value) => {
              const step = 1 / (sections.length - 1);
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
          { xPercent: 100, yPercent: 0 },
          { xPercent: 0, yPercent: 0, duration: 1, ease: "none" },
          index - 1
        );
      });

      return () => {
        tl.kill();
      };
    });

    // 📱 TABLET & MOBILE: VERTICAL SLIDER
    mm.add("(max-width: 1023px)", () => {
      const sections = gsap.utils.toArray<HTMLElement>(".panel");
      if (!sections.length) return;

      const firstPanel = sections[0];
      if (!firstPanel) return;

      gsap.set(sections, { xPercent: 0, yPercent: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + window.innerHeight * (sections.length - 1),
          snap: {
            snapTo: (value) => {
              const step = 1 / (sections.length - 1);
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

      return () => {
        tl.kill();
      };
    });

    // cleanup all matchMedia stuff on unmount
    return () => mm.revert();
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
              panel
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
                lg:grid-cols-[1.3fr_1fr]
              "
            >
              {/* IMAGE – FIRST ON MOBILE SECOND ON DESKTOP */}
              <div className="w-full max-w-[520px] justify-self-center order-1 lg:order-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!project.link) return;

                    // MOBILE: OPEN DIRECTLY IN NEW TAB
                    if (window.innerWidth < 768) {
                      window.open(project.link, "_blank");
                      return;
                    }

                    // TABLET & DESKTOP: OPEN MODAL PREVIEW
                    setPreviewProject(project);
                  }}
                  className="
                    group relative w-full aspect-4/3
                    overflow-hidden rounded-3xl
                    bg-white/5 backdrop-blur-sm
                    ring-1 ring-white/20
                    shadow-[0_20px_40px_-10px_rgba(0,0,0,0.45)]
                    transition-transform duration-300
                    hover:-translate-y-1
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

              {/* TEXT – SECOND ON MOBILE, FIRST ON DESKTOP */}
              <div
                className="
    order-2 lg:order-1
    md:px-10
    md:py-6
    md:max-w-[600px]
  "
              >
                {" "}
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
      </div>

      {/* PREVIEW LIVE SITE MODAL */}
      {previewProject?.link && (
        <div
          className="
            fixed inset-0 z-[1200]
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
