// This component displays a "Back to Top" button that appears when the #contact section is visible
// The button aligns vertically with the #contac element and scrolls the page to the top when clicked


"use client";

import { useEffect, useRef, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [top, setTop] = useState<number | undefined>(undefined);
  const rafRef = useRef<number | null>(null);

  // Show when #contact is visible
  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {
        threshold: 0.3,
      }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Align vertically with #contact-social
  useEffect(() => {
    const social = document.getElementById("contact-social");
    if (!social) return;
    const update = () => {
      const r = social.getBoundingClientRect();
      setTop(r.top + r.height / 2);
    };
    const onSR = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current!);
      rafRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onSR, { passive: true });
    window.addEventListener("resize", onSR);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current!);
      window.removeEventListener("scroll", onSR);
      window.removeEventListener("resize", onSR);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const wrapperStyle: React.CSSProperties =
    top !== undefined
      ? { top, transform: "translateY(-50%)" }
      : { top: "50%", transform: "translateY(-50%)" };

  return (
    <div
      className={`fixed right-3 md:right-5 z-50 transition-opacity duration-300 ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={wrapperStyle}
    >
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        className="
          px-1 font-heading uppercase tracking-[0.12em]
          text-[0.75rem] md:text-[0.8rem]
          text-[color:var(--color-text)] hover:text-[color:var(--color-main)]
          focus:outline-none focus-visible:underline
          bt-anim
        "
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }} /* vertical text */
      >
        Back To Top
      </button>
    </div>
  );
}
