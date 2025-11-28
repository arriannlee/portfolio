"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [active, setActive] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-16 md:h-20 p-4 md:p-6 z-40">
      <Link
        href="/"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="inline-block font-heading text-2xl md:text-3xl tracking-tight text-accent select-none transition-all duration-300 focus:outline-none"
      >
        <span className="inline-block font-heading overflow-hidden transition-all duration-500 ease-in-out">
          {active ? (
            <span className="opacity-100 transition-opacity duration-300">
              arriann lee
            </span>
          ) : (
            <span className="opacity-100 transition-opacity duration-300">
              a.
            </span>
          )}
        </span>
      </Link>
    </header>
  );
}
