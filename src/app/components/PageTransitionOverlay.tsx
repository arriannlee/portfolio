"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    if (!overlayRef.current) return;

    // Skip transition on very first load
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      gsap.set(overlayRef.current, {
        yPercent: 100,
        autoAlpha: 0,
        pointerEvents: "none",
      });
      return;
    }

    const overlay = overlayRef.current;

    // Kill anything mid-flight (fast clicking between pages)
    gsap.killTweensOf(overlay);

    const tl = gsap.timeline();

    // 1) Start off-screen at the bottom, visible
    tl.set(overlay, {
      yPercent: 100,
      autoAlpha: 1,
      pointerEvents: "none",
    });

    // 2) Slide up to cover (this feels like the contact panel move)
    tl.to(overlay, {
      yPercent: 0,
      duration: 0.45,
      ease: "power3.inOut",
    });

    // (Optional) tiny pause if you want a held “full colour” moment
    tl.to({}, { duration: 0.06 });

    // 3) Slide off the top, revealing the new page underneath
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.45,
      ease: "power3.inOut",
    });

    // 4) Reset for next time
    tl.set(overlay, {
      autoAlpha: 0,
      yPercent: 100,
    });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="
        fixed inset-0 z-[1200]
        bg-[color:var(--color-main)]
        pointer-events-none
      "
      style={{
        transform: "translateY(100%)",
        opacity: 0,
      }}
    />
  );
}
