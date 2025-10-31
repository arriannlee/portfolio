"use client";

import React, { JSX } from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaGitAlt, FaReact } from "react-icons/fa";
import { FaFolder, FaFolderOpen } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { IoLogoCss3, IoIosStar } from "react-icons/io";

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
type DevModeOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const currentYear = new Date().getFullYear();

type Phase = "loading" | "app" | "exiting";

export default function DevModeOverlay({ open, onClose }: DevModeOverlayProps) {
  const root = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>("loading");
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

  const handleMinimize = () => {
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
  // lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = original;
    };
  }, [open]);

  // ESC to exit
  const startExit = useCallback(() => {
    if (!open || phase === "exiting") return;
    setPhase("exiting");
  }, [open, phase]);

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

  // GSAP sequences
  useGSAP(() => {
    if (!open) return;

    // reset visibilities
    gsap.set([loaderRef.current, appRef.current, exitRef.current], {
      autoAlpha: 0,
    });
    setPhase("loading");

    // LOADING IN
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
      // tiny glitch
      .to(
        ".boot-title",
        { skewX: 12, x: 5, duration: 0.06, yoyo: true, repeat: 3 },
        "<"
      )
      .to({}, { duration: 0.5 }) // hold a beat
      // TRANSITION TO APP
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

  // EXIT timeline
  useEffect(() => {
    if (phase !== "exiting") return;
    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
        // reset for next open
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
    return () => tl.kill();
  }, [phase, onClose]);

  if (!open) return null;

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
          <div className="boot-title boot-line font-heading text-xl text-[color:var(--color-accent)]">
            Booting Developer Mode…
          </div>
          <div className="mt-3 space-y-1 font-mono text-sm text-[color:var(--color-sub-text)]">
            <div className="boot-line">Initialising modules</div>
            <div className="boot-line">Loading shaders</div>
            <div className="boot-line">Spinning up sandboxes</div>
          </div>
          <div className="mt-5 h-2 w-full bg-[color:var(--color-border)]/40 rounded">
            <div className="boot-bar h-2 w-full bg-[color:var(--color-accent)] rounded" />
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
      {/* APP (FAKE IDE) */}
      return ({/* APP (FAKE IDE) */}
      <div ref={appRef} className="absolute inset-0 p-4 sm:p-8">
        <div className="ide-shell h-full w-full rounded-2xl border border-[color:var(--color-border)] overflow-hidden bg-[#0a0a0a]">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 h-10 border-b border-[color:var(--color-border)] bg-black/40">
            <span
              className="h-3 w-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-500 transition-colors"
              title="Close Developer Mode"
              onClick={startExit}
            />{" "}
            <span
              className="h-3 w-3 rounded-full bg-yellow-500/80 cursor-pointer hover:bg-yellow-400 transition-colors"
              title="Minimize Window"
              onClick={handleMinimize}
            />{" "}
            <span
              className="h-3 w-3 rounded-full bg-green-500/80 cursor-pointer hover:bg-green-500 transition-colors"
              title="Expand Window"
              onClick={handleExpand}
            />{" "}
            <div className="ml-3 font-mono text-xs text-white/60">
              ~/DevMode.tsx
            </div>
            <div className="ml-auto text-xs text-white/50">
              Press Esc to exit
            </div>
          </div>

          {/* Body split */}
          <div className="grid grid-cols-12 h-[calc(100%-2.5rem)]">
            {/* Sidebar */}
            {/* Sidebar */}
            <aside className="col-span-3 lg:col-span-2 h-full border-r border-[color:var(--color-border)] bg-white/[0.02] p-3 overflow-y-auto">
              <div className="font-mono text-xs text-white/60 mb-2 flex items-center gap-2">
                explorer
              </div>
              <ul className="space-y-1 text-white/80 font-mono text-sm select-none">
                {/* public folder */}
                <li className="ide-line flex items-center gap-2">
                  <FaFolder className="text-[#F59E0B]" />
                  <span>.vscode</span>
                </li>
                <li className="ide-line flex items-center gap-2">
                  <FaFolder className="text-[#34D399]" />
                  <span>public</span>
                </li>

                {/* src folder */}
                <li className="ide-line flex items-center gap-2">
                  <FaFolderOpen className="text-[#60A5FA]" />
                  <span>src</span>
                </li>

                {/* └── app folder */}
                <li className="ide-line flex items-center gap-2 ml-5">
                  <FaFolderOpen className="text-[#9575cd]" />
                  <span>app</span>
                </li>

                {/* └── components folder */}
                <li className="ide-line flex items-center gap-2 ml-10">
                  <FaFolderOpen className="text-[#F472B6]" />
                  <span>components</span>
                </li>

                {/* files under components */}
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
            {/* Editor */}
            <main className="col-span-9 lg:col-span-10 h-full relative bg-[#0b0f12]">
              {/* <div className="h-9 border-b border-[color:var(--color-border)] flex items-center px-4 gap-4 text-white/70 text-sm">
                <span className="ide-line">Avatar.tsx</span>
                <span className="ide-line">Statement.tsx</span>
                <span className="ide-line">Projects.tsx</span>
              </div> */}

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
                        type: "Web Game",
                        stack: ['"HTML"', '"CSS"', '"JS"'],
                        repo: "https://github.com/arriannlee/rock_paper_scissors",
                      },
                      {
                        title: "ATL Pro FX",
                        type: "E-Commerce Site",
                        stack: ['"WordPress"', '"WooCommerce"', '"PHP"'],
                        repo: "https://github.com/arriannlee/atlprofx",
                      },
                      {
                        title: "Beautique Salon",
                        type: "Service Website",
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
                        <a href="mailto:hello@arriannlee.dev">
                          "hello@arriannlee.dev"
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
                          "https://www.linkedin.com/in/arriannlee/"
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
                    {/* <CodeLine>{C("// Press ESC to exit DEV_MODE")}</CodeLine> */}
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
          <div className="exit-scan absolute inset-x-0 h-24 bg-[color:var(--color-accent)]/20 blur-md" />
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
