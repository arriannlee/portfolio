"use client";

import { useId, useState, KeyboardEvent } from "react";

type Props ={
  onEngineersClick?: () => void;
};

const TABS = [
  {
    id: "one",
    label: "Everyone",
    body: "Welcome! I’m Arriann, a designer and developer blending creativity and code to craft clean, meaningful digital work.",
  },
  {
    id: "two",
    label: "Recruiters",
    body: "I design and build interfaces that combine creativity with technical precision, delivering clean, accessible and reliable user experiences.",
  },
  {
    id: "three",
    label: "Mentors",
    body: "This portfolio demonstrates applied UX, accessibility, and responsive design principles across three breakpoints, ensuring clarity, consistency, and intuitive interaction throughout.",
  },
  {
    id: "four",
    label: "Engineers",
    body: "I’m creative coded, {!yet} a full engineer but fluent enough to build {this.site} and a few others along the way.",
  },
];

export default function HeroTabs({ onEngineersClick }: Props) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = TABS.length - 1;
    if (e.key === "ArrowRight") { setActive(a => (a === last ? 0 : a + 1)); e.preventDefault(); }
    if (e.key === "ArrowLeft")  { setActive(a => (a === 0 ? last : a - 1)); e.preventDefault(); }
    if (e.key === "Home")       { setActive(0); e.preventDefault(); }
    if (e.key === "End")        { setActive(last); e.preventDefault(); }
  }

  return (
    <div className="w-full">
      {/* Tablist */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        aria-label="Audience"
        onKeyDown={onKeyDown}
        className="flex items-center justify-start w-full gap-x-4 gap-y-2 mb-2 overflow-x-auto no-scrollbar snap-x snap-mandatory px-0
                   [mask-image:linear-gradient(to_right,black_92%,transparent_100%)]
                   md:overflow-visible md:snap-none md:flex-wrap md:[mask-image:none]"
      >
        {TABS.map((tab, i) => {
          const selected = i === active;
          const isEngineers = tab.id === "four";
          return (
            <button
              key={tab.id}
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => {
                setActive(i);
                if (isEngineers) onEngineersClick?.(); // 👈 trigger overlay
              }}
              className={[
                "role-tab py-2 px-2 first:pl-0 rounded-lg text-sm sm:text-base transition-all shrink-0 snap-start md:snap-none",
                selected
                  ? "text-[color:var(--color-accent)]"
                  : "text-[color:var(--color-text)] hover:text-[color:var(--color-accent-hover)]",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panels */}
      <div className="mt-2 sm:mt-3 min-h-[112px]">
        {TABS.map((tab, i) => {
          const selected = i === active;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`${baseId}-panel-${tab.id}`}
              aria-labelledby={`${baseId}-tab-${tab.id}`}
              hidden={!selected}
              className="mt-2 sm:mt-3"
            >
              {tab.id === "four" ? (
                <p className="font-body text-lg sm:text-xl leading-relaxed text-sub-text max-w-prose">
                  I’m creative coded, {"{!yet}"} a full engineer but fluent
                  enough to build {"{"}
                  {/* OPTION A: overlay button */}
                  <button
                    type="button"
                    onClick={onEngineersClick}
                    className="underline decoration-[color:var(--color-accent)] underline-offset-2 text-[color:var(--color-accent)]
                               hover:text-[color:var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2
                               focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 rounded transition-colors"
                  >
                    this.site
                  </button>
                  {"} "}
                  and a few others along the way.
                </p>
              ) : (
                <p className="font-body text-lg sm:text-xl leading-relaxed text-sub-text max-w-prose">
                  {tab.body}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
