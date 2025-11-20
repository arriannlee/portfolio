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
    // const split = new SplitText(headingRef.current, { type: "chars" });
    // split.chars is now an array of <span> wrapped characters
    const split = SplitText.create(".statementText", {
      type: "chars, words, lines",
    });

    gsap.from(split.words, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        markers: true,
      },
      duration: 1,
      ease: "power2.out",
      y: 100,
      autoAlpha: 0,
      stagger: 0.05,
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
        text-[clamp(2.8rem,11vw,9.5rem)]"
      >
        Turning Ideas Into Experiences
      </h2>
    </section>
  );
}
