"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react"; // eslint-disable-line no-unused-vars
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["TURNING", "IDEAS", "INTO", "EXPERIENCES"];

export default function Statement() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const prefersReduced = matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      // Select only words inside this section
      const words = gsap.utils.toArray<HTMLElement>("[data-word]");

      words.forEach((el) => {
        gsap.fromTo(
          el,
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -90,
            transformOrigin: "top center",
          },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            ease: "power4.out",
            duration: 0.9,
            scrollTrigger: {
              trigger: el,
              start: "top 80%", // when THIS word hits 80% of viewport
              end: "top 80%",
              once: true, // animate only the first time
              // scrub: true,     // <- uncomment for scroll-scrub “roll in”
            },
          }
        );
      });
    },
    { scope: sectionRef } // scopes selectors to this section
  );


  return (
    <section
      ref={sectionRef}
      className="min-h-dvh w-full flex items-center justify-center px-4 sm:px-8"
    >
      <div
        className="
          max-w-7xl mx-auto
          font-heading uppercase font-semibold tracking-tight
          text-center flex flex-col justify-center
          leading-[1.25] sm:leading-[1.3] lg:leading-[1.15]
          gap-[0.8em] sm:gap-[1em] lg:gap-[0.7em]
          will-change-transform
        "
      >
        {WORDS.map((word, i) => (
          <span
            key={word}
            data-word
            className={[
              "block text-[clamp(2.8rem,11vw,9.5rem)] sm:text-[clamp(3.5rem,9vw,11rem)] lg:text-[clamp(4rem,8vw,12rem)] transition-colors duration-300",
              i === WORDS.length - 1
                ? "text-[color:var(--color-accent)] hover:text-[color:var(--color-accent-hover)]"
                : "text-[color:var(--color-text)]",
            ].join(" ")}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
