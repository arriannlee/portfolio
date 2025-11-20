"use client";

import { useEffect, useState, ReactNode } from "react";
import { VscVscode } from "react-icons/vsc";

type OS = "mac" | "windows";

type OsWindowProps = {
  title: string;
  children: ReactNode;
  forceOs?: OS;         // optional override (e.g. always show mac)
  className?: string;   // extra classes for outer shell
};

// Very lightweight OS detection
function detectOS(): OS {
  if (typeof navigator === "undefined") return "windows";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "mac";
  return "windows";
}

export default function OsWindow({
  title,
  children,
  forceOs,
  className = "",
}: OsWindowProps) {
  const [os, setOs] = useState<OS>("windows");

  useEffect(() => {
    setOs(forceOs ?? detectOS());
  }, [forceOs]);


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

    // useEffect(() => {
    //   const auto = detectOS();
    //   const resolved = resolveOS(auto, forceOs);
    //   setOS(resolved);
    //   document.documentElement.setAttribute("data-os", resolved);
    // }, [forceOs]);


  return (
    <div
      className={[
        "rounded-2xl border border-white/20 bg-[#05070a]/95 shadow-2xl overflow-hidden",
        "backdrop-blur-sm",
        className,
      ].join(" ")}
    >
      {/* TITLE BAR */}
      {os === "windows" ? (
        <div
          className="relative w-full h-9 bg-[#2d2d2d] text-white border-b border-black/40 select-none flex items-center"
          style={{
            fontFamily: `"Segoe UI Variable", "Segoe UI", "Helvetica Neue", Arial, sans-serif`,
            fontSize: "13px",
            letterSpacing: "-0.2px",
          }}
        >
          {/* LEFT: VS Code icon + title */}
          <div className="flex items-center gap-2 pl-3">
            <VscVscode
              className="text-[#007ACC] text-lg shrink-0"
              aria-hidden
            />
            <div className="opacity-90 truncate max-w-[220px]">
              {title}
            </div>
          </div>

          {/* RIGHT: fake window controls */}
          <div className="absolute right-0 top-0 flex items-stretch">
            <div className="w-11 h-9 grid place-items-center hover:bg-[#3b3b3b] transition-colors">
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
            </div>
            <div className="w-11 h-9 grid place-items-center hover:bg-[#3b3b3b] transition-colors">
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
            </div>
            <div className="w-11 h-9 grid place-items-center hover:bg-[#c42b1c] hover:text-white transition-colors">
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path
                  d="M2 2l6 6M8 2L2 8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 h-9 px-3 bg-black/40 border-b border-white/10">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <div className="ml-3 font-mono text-xs text-white/60 truncate">
            {title}
          </div>
        </div>
      )}

      {/* CONTENT AREA */}
      <div className="bg-[#05070a]">{children}</div>
    </div>
  );
}
