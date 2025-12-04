"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Statement() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useGSAP(() => {
    const split = new SplitText(headingRef.current, {
      type: "chars",
      reduceWhiteSpace: true,
    });

    // Starts blury and scattered
    gsap.set(split.chars, {
      y: 120,
      filter: "blur(12px)",
      rotateX: 45,
      opacity: 0,
    });

    // Epic scroll reveal
    gsap.to(split.chars, {
      scrollTrigger: {
        trigger: sectionRef.current,
        // markers: true,
        start: "top 90%",
        end: "bottom 80%",
        scrub: 1,
      },
      y: 0,
      opacity: 1,
      rotateX: 0,
      filter: "blur(0px)",
      ease: "power4.out",
      stagger: {
        each: 0.02,
        from: "random",
      },
    });

    return () => split.revert();
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-dvh w-full flex items-center justify-center px-4"
    >
      <h2
        ref={headingRef}
        className="statementText font-heading uppercase text-center tracking-tight
        text-[clamp(2.8rem,11vw,9.5rem)] leading-none"
      >
        Turning Ideas
        <br /> Into
        <br /> Experiences
      </h2>
    </section>
  );
}
