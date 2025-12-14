// Thisa component renders a full-screen developer mode overlay
// It simulates a code editor environment with a loading screen, file explorer, and code editor
// The overlay includes animations for loading, opening, and closing using GSAP
// Users can exit developer mode by pressing the ESC key or clicking the close button
// Each OS (Mac/Windows) immitates its respective window controls and styles which  can be overriden for testing using the forceOs prop

"use client";

import React, { JSX, useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaGitAlt, FaReact } from "react-icons/fa";
import { FaFolder, FaFolderOpen } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { IoLogoCss3, IoIosStar } from "react-icons/io";
import { VscVscode } from "react-icons/vsc";

// DETECT OS

type OS = "mac" | "windows";

function detectOS(): "mac" | "windows" {
  const uaData = (
    navigator as unknown as { userAgentData?: { platform?: string } }
  ).userAgentData;
  const uaDataPlatform = uaData?.platform?.toLowerCase() || "";
  // Fallback for older browsers
  const ua = navigator.userAgent.toLowerCase();
  const platform = uaDataPlatform || ua;
  // Detect macOS
  if (platform.includes("mac")) return "mac";
  // Default to Windows for everything else
  return "windows";
}

// Detect desktop viewport

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isDesktop;
}
// OS OVERRIDE CMD/CTRL + SHIFT + O

function resolveOS(auto: OS, forceProp?: OS): OS {
  if (forceProp) return forceProp;
  if (typeof window !== "undefined") {
    const q = new URLSearchParams(window.location.search).get("os");
    if (q === "windows" || q === "mac") return q;
    const saved = window.localStorage.getItem("devmode.os") as OS | null;
    if (saved === "windows" || saved === "mac") return saved;
  }
  return auto;
}

type DevModeOverlayProps = {
  open: boolean;
  onClose: () => void;
  forceOs?: OS; // FORCE OS FOR TESTING PURPOSES ONLY
};

// CONSOLE LOG MESSAGE

console.log(
  "%cHey there curious mind 👀",
  "color:#34D399; font-size:14px; font-weight:bold;"
);
console.log(
  "%cYou just unlocked Developer Mode 😉",
  "color:#FF5C5C;font-size:14px; font-weight:bold;"
);
console.log(
  "%cNot everything creative lives on screen 😎",
  "color:#facc15; font-size:14px; font-weight:bold;"
);

// Code highlighters

const K = (v: React.ReactNode): JSX.Element => (
  <span className="code-keyword">{v}</span>
);
const P = (v: React.ReactNode): JSX.Element => (
  <span className="code-prop">{v}</span>
);
const S = (v: React.ReactNode): JSX.Element => (
  <span className="code-string">{v}</span>
);
const C = (v: React.ReactNode): JSX.Element => (
  <span className="code-comment">{v}</span>
);
const N = (v: React.ReactNode): JSX.Element => (
  <span className="code-name">{v}</span>
);

const CodeLine: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="code-line">{children}</div>
);

const currentYear = new Date().getFullYear();

export default function DevModeOverlay({
  open,
  onClose,
  forceOs,
}: DevModeOverlayProps) {
  const [os, setOS] = useState<OS>("windows");
  const [phase, setPhase] = useState<Phase>("loading");
  const isDesktop = useIsDesktop();
  const root = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<HTMLDivElement | null>(null);
  const exitRef = useRef<HTMLDivElement | null>(null);
  const ideRef = useRef<HTMLDivElement | null>(null);

  // Lock scroll when open
  useEffect(() => {
    if (!open) return;
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = original;
    };
  }, [open]);

  // Detect OS
  useEffect(() => {
    const auto = detectOS();
    const resolved = resolveOS(auto, forceOs);
    setOS(resolved);
    document.documentElement.setAttribute("data-os", resolved);
  }, [forceOs]);

  // Expand animations
  const handleExpand = () => {
    if (!appRef.current) return;
    gsap.to(appRef.current, {
      scale: 1.03,
      duration: 0.2,
      ease: "power1.out",
      yoyo: true,
      repeat: 1,
      transformOrigin: "center center",
    });
  };

  // Minimise animation
  const handleMinimise = () => {
    if (!appRef.current) return;
    gsap.to(appRef.current, {
      scale: 0.97,
      duration: 0.2,
      ease: "power1.out",
      yoyo: true,
      repeat: 1,
      transformOrigin: "center center",
    });
  };

  // Exit flow
  const startExit = useCallback(() => {
    if (!open || phase === "exiting") return;
    setPhase("exiting");
  }, [open, phase]);

  // ESC to exit eventlistener
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        startExit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, startExit]);

  // OS MODE TESTING  TOGGLE OS WITH CMD/CTRL + SHIFT + O

  useEffect(() => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);

    const onKey = (e: KeyboardEvent) => {
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.shiftKey && e.key.toLowerCase() === "o") {
        e.preventDefault();
        const next = os === "windows" ? "mac" : "windows";
        localStorage.setItem("devmode.os", next);
        location.reload();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [os]);

  // GSAP sequence for loading + app
  useGSAP(() => {
    if (!open) return;

    gsap.set([loaderRef.current, appRef.current, exitRef.current], {
      autoAlpha: 0,
    });
    setPhase("loading");

    const tl = gsap.timeline();
    tl.set(loaderRef.current, { autoAlpha: 1 })
      .from(".boot-line", {
        yPercent: 30,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: "power2.out",
      })
      .from(
        ".boot-bar",
        { scaleX: 0, transformOrigin: "0% 50%", duration: 0.8 },
        "<0.2"
      )
      .to(
        ".boot-title",
        { skewX: 12, x: 5, duration: 0.06, yoyo: true, repeat: 3 },
        "<"
      )
      .to({}, { duration: 0.5 })
      .to(loaderRef.current, { autoAlpha: 0, duration: 0.3 })
      .call(() => setPhase("app"))
      .set(appRef.current, { autoAlpha: 1 })
      .from(".ide-shell", {
        scale: 0.98,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.out",
      })
      .from(
        ".ide-line",
        {
          x: -20,
          autoAlpha: 0,
          stagger: 0.03,
          duration: 0.25,
          ease: "power1.out",
        },
        "<0.05"
      );

    return () => tl.kill();
  }, [open]);

  // Loading screen boot lines animation
  useGSAP(() => {
    if (!open) return;

    const lines = gsap.utils.toArray<HTMLElement>(".boot-line");
    if (!lines.length) return;

    gsap.from(lines, {
      opacity: 0,
      y: 10,
      stagger: 0.5,
      duration: 1,
      ease: "power2.out",
    });
  }, [open]);

  // Exit animation
  useEffect(() => {
    if (phase !== "exiting") return;

    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
        setPhase("loading");
      },
    });

    tl.set(exitRef.current, { autoAlpha: 1 })
      .to(appRef.current, { autoAlpha: 0, duration: 0.4 })
      .fromTo(
        ".exit-scan",
        { y: "-100%" },
        { y: "100%", duration: 0.6, ease: "power2.in" }
      )
      .to(exitRef.current, { autoAlpha: 0, duration: 0.2 });

    return () => {
      tl.kill();
    };
  }, [phase, onClose]);

  if (!open) return null;
  if (!isDesktop) return null;

  return (
    <div
      ref={root}
      aria-modal="true"
      role="dialog"
      aria-label="Developer Mode"
      className="
        fixed inset-0 z-[1000]
        bg-black/90 backdrop-blur-sm
        text-[color:var(--color-text)]
      "
    >
      {/* LOADING SCREEN */}
      <div ref={loaderRef} className="absolute inset-0 grid place-items-center">
        <div className="w-[min(92vw,720px)] rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-6 shadow-xl">
          <div className="boot-title boot-line font-heading text-xl text-[color:var(--color-main)]">
            Booting Developer Mode…
          </div>
          <div className="mt-3 space-y-1 font-mono text-sm text-[color:var(--color-sub-text)]">
            <div className="boot-line">Preparing interface…</div>
            <div className="boot-line">Syncing animation modules…</div>
            <div className="boot-line">Applying theme settings…</div>
          </div>
          <div className="mt-5 h-2 w-full bg-[color:var(--color-border)]/40 rounded">
            <div className="boot-bar h-2 w-full bg-[color:var(--color-main)] rounded" />
          </div>
          <p className="mt-3 font-mono text-xs text-[color:var(--color-sub-text)] opacity-80">
            Press{" "}
            <kbd className="px-1 py-0.5 rounded bg-black/20 border border-[color:var(--color-border)]">
              Esc
            </kbd>{" "}
            to abort.
          </p>
        </div>
      </div>
      {/* APP  */}
      <div ref={appRef} className="absolute inset-0 p-4 sm:p-8">
        <div
          ref={ideRef}
          className="ide-shell h-full w-full rounded-2xl border border-[color:var(--color-border)] overflow-hidden bg-[#0a0a0a]"
        >
          {/* TITLE BAR */}
          <div
            className={[
              "flex items-center h-10 border-b border-[color:var(--color-border)]",
              os === "windows"
                ? "justify-between bg-[#f3f3f3]/90 text-black/75"
                : "gap-2 px-4 bg-black/40",
            ].join(" ")}
          >
            {os === "windows" ? (
              <>
                {/* WINDOWS TITLE BAR */}
                <div
                  className="relative w-full h-9 bg-[#2d2d2d] text-white border-b border-black/20 select-none flex items-center"
                  style={{
                    fontFamily: `"Segoe UI Variable", "Segoe UI", "Helvetica Neue", Arial, sans-serif`,
                    fontSize: "13px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  <div className="flex items-center gap-2 pl-3">
                    <VscVscode
                      className="text-[#007ACC] text-lg shrink-0"
                      aria-hidden
                    />
                    <div className="opacity-90">Developer Mode</div>
                  </div>

                  <div className="absolute right-0 top-0 flex items-stretch">
                    <button
                      type="button"
                      title="Minimise"
                      onClick={handleMinimise}
                      className="w-11 h-9 grid place-items-center hover:bg-[#3b3b3b] transition-colors"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <rect
                          x="1"
                          y="7"
                          width="8"
                          height="1.2"
                          rx=".6"
                          fill="currentColor"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      title="Maximize"
                      onClick={handleExpand}
                      className="w-11 h-9 grid place-items-center hover:bg-[#3b3b3b] transition-colors"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <rect
                          x="1.5"
                          y="1.5"
                          width="7"
                          height="7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      title="Close"
                      onClick={startExit}
                      className="w-11 h-9 grid place-items-center hover:bg-[#c42b1c] hover:text-white transition-colors"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <path
                          d="M2 2l6 6M8 2L2 8"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* MAC TITLE BAR */}
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-500 transition-colors"
                    title="Close Developer Mode"
                    onClick={startExit}
                  />
                  <span
                    className="h-3 w-3 rounded-full bg-yellow-500/80 cursor-pointer hover:bg-yellow-400 transition-colors"
                    title="Minimise Window"
                    onClick={handleMinimise}
                  />
                  <span
                    className="h-3 w-3 rounded-full bg-green-500/80 cursor-pointer hover:bg-green-500 transition-colors"
                    title="Expand Window"
                    onClick={handleExpand}
                  />
                  <div className="ml-3 font-mono text-xs text-white/60">
                    ~/DevMode.tsx
                  </div>
                </div>
                <div className="ml-auto pr-2 text-xs text-white/50">
                  Press Esc to exit
                </div>
              </>
            )}
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-12 h-[calc(100%-2.5rem)]">
            {/* EXPLORER SIDE BAR */}
            <aside className="col-span-3 lg:col-span-2 h-full border-r border-[color:var(--color-border)] bg-white/[0.02] p-3 overflow-y-auto">
              <div className="font-mono text-xs text-white/60 mb-2 flex items-center gap-2">
                explorer
              </div>
              <ul className="space-y-1 text-white/80 font-mono text-sm select-none">
                <li className="ide-line flex items-center gap-2">
                  <FaFolder className="text-[#F59E0B]" />
                  <span>.vscode</span>
                </li>
                <li className="ide-line flex items-center gap-2">
                  <FaFolder className="text-[#34D399]" />
                  <span>public</span>
                </li>
                <li className="ide-line flex items-center gap-2">
                  <FaFolderOpen className="text-[#60A5FA]" />
                  <span>src</span>
                </li>
                <li className="ide-line flex items-center gap-2 ml-5">
                  <FaFolderOpen className="text-[#9575cd]" />
                  <span>app</span>
                </li>
                <li className="ide-line flex items-center gap-2 ml-10">
                  <FaFolderOpen className="text-[#F472B6]" />
                  <span>components</span>
                </li>
                <li className="ide-line flex items-center gap-2 ml-14">
                  <FaReact className="text-[#61DBFB]" />
                  <span>Avatar.tsx</span>
                </li>
                <li className="ide-line flex items-center gap-2 ml-14">
                  <FaReact className="text-[#61DBFB]" />
                  <span>Contact.tsx</span>
                </li>
                <li className="ide-line ide-active flex items-center gap-2 ml-14">
                  <FaReact className="text-[#61DBFB]" />
                  <span>DevMode.tsx</span>
                </li>
                <li className="ide-line flex items-center gap-2 ml-14">
                  <FaReact className="text-[#61DBFB]" />
                  <span>Footer.tsx</span>
                </li>
                <li className="ide-line flex items-center gap-2 ml-14">
                  <FaReact className="text-[#61DBFB]" />
                  <span>Header.tsx</span>
                </li>
                <li className="ide-line flex items-center gap-2 ml-14">
                  <FaReact className="text-[#61DBFB]" />
                  <span>Hero.tsx</span>
                </li>
                <li className="ide-line flex items-center gap-2 ml-14">
                  <FaReact className="text-[#61DBFB]" />
                  <span>Project.tsx</span>
                </li>
                <li className="ide-line flex items-center gap-2 ml-10">
                  <FaFolder className="text-[#81c784]" />
                  <span>dev</span>
                </li>
                <li className="ide-line flex items-center gap-2 ml-10">
                  <IoIosStar className="text-[#FFC000]" />
                  <span>favicon.ico</span>
                </li>
                <li className="ide-line flex items-center gap-2 ml-10">
                  <IoLogoCss3 className="text-[#264de4]" />
                  <span>global.css</span>
                </li>
                <li className="ide-line flex items-center gap-2 ml-10">
                  <FaReact className="text-[#61DBFB]" />
                  <span>layout.tsx</span>
                </li>
                <li className="ide-line flex items-center gap-2 ml-10">
                  <FaReact className="text-[#61DBFB]" />
                  <span>page.tsx</span>
                </li>
                <li className="ide-line flex items-center gap-2">
                  <FaGitAlt className="text-[#f34f29]" />
                  <span>.gitignore</span>
                </li>
                <li className="ide-line flex items-center gap-2">
                  <IoIosInformationCircle className="text-[#64b5f6]" />
                  <span>README.md</span>
                </li>
              </ul>
            </aside>

            {/* EDITOR CONTENT */}
            <main className="col-span-9 lg:col-span-10 h-full relative bg-[#0b0f12]">
              <div className="p-4 overflow-auto h-[calc(100%-2.25rem)]">
                <pre className="font-mono text-[13px] sm:text-[14px] leading-[1.6] whitespace-pre text-white/85">
                  <code>
                    <CodeLine>
                      {C("/* ============================ */")}
                    </CodeLine>
                    <CodeLine>
                      {C("/* About Me                     */")}
                    </CodeLine>
                    <CodeLine>
                      {C("/* ============================ */")}
                    </CodeLine>

                    <CodeLine>
                      {K("const")} {N("developer")} {P("=")} {"{"}
                    </CodeLine>
                    <CodeLine>
                      {"\u00A0\u00A0"}
                      {P("name")}: {S('"Arriann Lee"')},{""}
                    </CodeLine>
                    <CodeLine>
                      {"\u00A0\u00A0"}
                      {P("role")}:{" "}
                      {S(
                        <span className="sparkle-text">
                          "Creative Technologist"
                        </span>
                      )}
                      {P(",")}
                    </CodeLine>
                    <CodeLine>
                      {"\u00A0\u00A0"}
                      {P("focus")}:{" "}
                      {S(
                        '"Translating imagination into digital experiences that look good, think smart, and feel alive."'
                      )}
                      ,
                    </CodeLine>
                    <CodeLine>
                      {"\u00A0\u00A0"}
                      {P("currentMode")}: {S('"DEVELOPER_MODE"')},
                    </CodeLine>
                    <CodeLine>
                      {"\u00A0\u00A0"}
                      {P("site")}: {S('"{this.build}"')}
                    </CodeLine>
                    <CodeLine>{"};"}</CodeLine>
                    <CodeLine />

                    <CodeLine>
                      {K("function")} {N("turnIdeasIntoExperiences")}
                      {P("(idea)")} {"{"}
                    </CodeLine>
                    <CodeLine>
                      {"\u00A0\u00A0"}
                      {K("return")} {N("idea")} {P("+")} {S('" → experience"')}
                      {P(";")}
                    </CodeLine>
                    <CodeLine>{P("}")}</CodeLine>
                    <CodeLine />

                    <CodeLine>
                      {C("/* ============================ */")}
                    </CodeLine>
                    <CodeLine>
                      {C("/* Latest Projects              */")}
                    </CodeLine>
                    <CodeLine>
                      {C("/* ============================ */")}
                    </CodeLine>

                    <CodeLine>
                      {K("const")} {N("projects")} {P("=")} {P("[")}
                    </CodeLine>

                    {[
                      {
                        title: "Beat The Bot",
                        type: "Mini Game",
                        stack: ['"HTML"', '"CSS"', '"JS"'],
                        repo: "https://github.com/arriannlee/rock_paper_scissors",
                      },
                      {
                        title: "ATL Pro FX",
                        type: "E-commerce",
                        stack: ['"WordPress"', '"WooCommerce"', '"PHP"'],
                        repo: "https://github.com/arriannlee/atlprofx",
                      },
                      {
                        title: "Beautique Salon",
                        type: "Small Business Site",
                        stack: ['"HTML"', '"CSS"', '"JavaScript"'],
                        repo: "https://github.com/arriannlee/beautique",
                      },
                    ].map((p, i, arr) => (
                      <CodeLine key={p.title}>
                        {"\u00A0\u00A0"}
                        {P("{")} {P("title")}: {S(`"${p.title}"`)}, {P("type")}:{" "}
                        {S(`"${p.type}"`)}, {P("stack")}: {P("[")}
                        <span className="text-[#34D399]">
                          {p.stack.join(", ")}
                        </span>
                        {P("]")}, {P("repo")}:{" "}
                        {S(
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-100 transition-opacity duration-200"
                          >
                            "{p.repo}"
                          </a>
                        )}{" "}
                        {P("}")}
                        {i < arr.length - 1 ? P(",") : null}
                      </CodeLine>
                    ))}

                    <CodeLine>
                      {P("]")}
                      {P(";")}
                    </CodeLine>
                    <CodeLine />

                    <CodeLine>
                      {C("/* ============================ */")}
                    </CodeLine>
                    <CodeLine>
                      {C("/* Get In Touch                 */")}
                    </CodeLine>
                    <CodeLine>
                      {C("/* ============================ */")}
                    </CodeLine>

                    <CodeLine>
                      {K("const")} {N("contact")} {P("=")} {P("{")}
                    </CodeLine>
                    <CodeLine>
                      {"\u00A0\u00A0"}
                      {P("email")}:{" "}
                      {S(
                        <a href="mailto:hello@arriannlee.xyz">
                          "hello@arriannlee.xyz"
                        </a>
                      )}
                      {P(",")}
                    </CodeLine>
                    <CodeLine>
                      {"\u00A0\u00A0"}
                      {P("linkedIn")}:{" "}
                      {S(
                        <a
                          href="https://www.linkedin.com/in/arriannlee/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          "https://linkedin.com/in/arriannlee/"
                        </a>
                      )}
                      {P(",")}
                    </CodeLine>

                    <CodeLine>
                      {"\u00A0\u00A0"}
                      {P("github")}:{" "}
                      {S(
                        <a
                          href="https://github.com/arriannlee"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          "https://github.com/arriannlee"
                        </a>
                      )}
                    </CodeLine>
                    <CodeLine>
                      {P("}")}
                      {P(";")}
                    </CodeLine>
                    <CodeLine />
                    <CodeLine>
                      {C(
                        `// © ${currentYear} Arriann Lee. All rights reserved.`
                      )}
                      <span className="inline-block w-2 h-5 bg-white/80 animate-pulse align-middle ml-2" />
                    </CodeLine>
                  </code>
                </pre>
              </div>

              {/* subtle scanline */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] bg-[length:100%_2px] opacity-40" />
            </main>
          </div>
        </div>
      </div>

      {/* EXITING OVERLAY */}
      <div ref={exitRef} className="absolute inset-0 grid place-items-center">
        <div className="relative w-full h-full">
          <div className="exit-scan absolute inset-x-0 h-24 bg-[color:var(--color-main)]/20 blur-md" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)]/90 px-6 py-4 shadow-lg">
              <p className="font-heading text-lg text-[color:var(--color-text)]">
                Exiting Developer Mode…
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
