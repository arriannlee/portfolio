"use client";

import React, { JSX } from "react";
import { useEffect, useRef, useState, useCallback } from "react";
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

type CanvasWithCleanup = HTMLCanvasElement & { _cleanup?: () => void };

// CONSOLE LOG MESSAGE

console.log(
  "%cHey there, curious mind 👀",
  "color:#34D399; font-size:14px; font-weight:bold;"
);
console.log(
  "%cYou just unlocked Developer Mode. Not everything creative lives on screen 😉",
  "color:#FF5C5C;"
);
console.log(
  "%cPsst... there's a deeper layer. Can you find HACKER_MODE? 🤫",
  "color:#facc15; font-style:italic;"
);

// CODE HIGHLIGHTERS

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

// CURRENT YEAR

const currentYear = new Date().getFullYear();

// PHASE TYPE

type Phase = "loading" | "app" | "exiting";

// COMPONENT

export default function DevModeOverlay({
  open,
  onClose,
  forceOs,
}: DevModeOverlayProps) {
  const [os, setOS] = useState<OS>("windows");
  const [phase, setPhase] = useState<Phase>("loading");
  const [hacker, setHacker] = useState(false);
  const [stranger, setStranger] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [cmd, setCmd] = useState("");
  const [log, setLog] = useState<string[]>([
    "> Welcome operator. Try 'party' or 'matrix'. Type 'help' for more.",
  ]);

  const DEFAULT_LOG = [
    "> Welcome operator. Try 'party' or 'matrix'. Type 'help' for more.",
  ];

  const resetHackerState = useCallback(() => {
    setHacker(false);
    setShowTerminal(false);
    setStranger(false);
    setCmd("");
    setLog(DEFAULT_LOG);

    stopMatrix();
    stopParty();
    stopEmojiRain();

    if (appRef.current) {
      gsap.killTweensOf(appRef.current);
      gsap.set(appRef.current, {
        rotation: 0,
        filter: "none",
        clearProps: "transform,filter",
      });
    }

    localStorage.setItem("devmode.hacker", "0");
  }, [DEFAULT_LOG]);

  const glitchOnce = useCallback(() => {
    if (!appRef.current) return;
    const el = appRef.current;

    // quick scanline overlay (auto-removed)
    const bars = document.createElement("div");
    Object.assign(bars.style, {
      position: "absolute",
      inset: "0",
      pointerEvents: "none",
      background:
        "repeating-linear-gradient(180deg, rgba(255,255,255,0.06) 0 2px, transparent 2px 4px)",
      mixBlendMode: "screen",
      opacity: "0",
      zIndex: "2000",
    });
    el.appendChild(bars);

    const tl = gsap.timeline({
      defaults: { duration: 0.075, ease: "power2.out" },
      onComplete: () => bars.remove(),
    });

    tl
      // flash bars + punch contrast
      .to(bars, { opacity: 1 }, 0)
      .to(el, { filter: "contrast(1.25) saturate(1.15) hue-rotate(8deg)" }, 0)

      // whip left, then right (skew + slight scale)
      .to(el, { x: -6, skewX: -4, scale: 1.005 })
      .to(el, { x: 7, skewX: 3 })

      // tiny vertical nudge + micro-rotation
      .to(el, { x: 0, y: -3, rotation: -0.3, skewX: 0 })
      .to(el, { y: 0, rotation: 0 })

      // fade bars, clear filter
      .to(bars, { opacity: 0, duration: 0.12 })
      .to(el, { filter: "none", clearProps: "filter", duration: 0.06 }, "<");
  }, []);
  // choose what to flip:

  // RESTORE HACKER MODE FROM LOCALSTORAGE ON MOUNT
  useEffect(() => {
    const saved = localStorage.getItem("devmode.hacker");
    if (saved === "1") {
      setHacker(true);
      setShowTerminal(true);
    }
  }, []);

  // TOGGLE HACKER MODE WITH CMD/CTRL + SHIFT + H
  useEffect(() => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);

    const onKey = (e: KeyboardEvent) => {
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.shiftKey && e.key.toLowerCase() === "h") {
        e.preventDefault();

        const next = !hacker;
        setHacker(next);
        localStorage.setItem("devmode.hacker", next ? "1" : "0");

        if (next) {
          // Play the glitch first
          glitchOnce();
          setShowTerminal(false);

          // Then show the terminal after a short delay
          setTimeout(() => setShowTerminal(true), 600); // match glitch duration
        } else {
          setShowTerminal(false);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hacker, glitchOnce]);

  // OS MODE TESTING (Cmd/Ctrl + Shift + O)
  useEffect(() => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);

    const onKey = (e: KeyboardEvent) => {
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.shiftKey && e.key.toLowerCase() === "o") {
        e.preventDefault();
        const next = os === "windows" ? "mac" : "windows";
        localStorage.setItem("devmode.os", next);

        // Simple hard reload so styles/branches flip cleanly
        location.reload();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [os]);

  useEffect(() => {
    const auto = detectOS();
    const resolved = resolveOS(auto, forceOs);
    setOS(resolved);
    document.documentElement.setAttribute("data-os", resolved);
  }, [forceOs]);

  // CYCLE SEASON MODE (Cmd/Ctrl + Shift + S)
  useEffect(() => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
    const onKey = (e: KeyboardEvent) => {
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();

        // Get current override (or current season)
        const seasons: Season[] = [
          "christmas",
          "winter",
          "spring",
          "summer",
          "autumn",
        ];
        const current =
          (localStorage.getItem("devmode.season") as Season) ||
          getSeasonFromMonth(new Date().getMonth());
        const nextIndex = (seasons.indexOf(current) + 1) % seasons.length;
        const next = seasons[nextIndex];

        // Store override and reload emoji layer
        localStorage.setItem("devmode.season", next);
        stopEmojiRain();
        startEmojiRain();

        // --- Visual Feedback Banner ---
        const banner = document.createElement("div");
        banner.textContent = `${next.toUpperCase()} MODE ACTIVE`;
        Object.assign(banner.style, {
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            next === "christmas"
              ? "rgba(255, 0, 0, 0.8)"
              : next === "winter"
                ? "rgba(0,120,255,0.8)"
                : next === "spring"
                  ? "rgba(100,255,150,0.8)"
                  : next === "summer"
                    ? "rgba(255,220,40,0.8)"
                    : "rgba(255,120,0,0.8)", // autumn
          color: "white",
          padding: "8px 18px",
          borderRadius: "8px",
          fontFamily: "monospace",
          fontSize: "14px",
          letterSpacing: "2px",
          zIndex: "9999",
          pointerEvents: "none",
          opacity: "0",
        });
        document.body.appendChild(banner);

        gsap.to(banner, {
          opacity: 1,
          duration: 0.4,
          y: 10,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(banner, {
              opacity: 0,
              duration: 0.6,
              delay: 1.5,
              onComplete: () => banner.remove(),
            });
          },
        });

        console.log(`🌦️ Seasonal mode switched → ${next.toUpperCase()}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const root = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const matrixRAF = useRef<number | null>(null);
  const confettiWrapRef = useRef<HTMLDivElement | null>(null);
  const ideRef = useRef<HTMLDivElement>(null);
  const targetRef = ideRef; // or ideRef or root

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    gsap.set(el, { willChange: "transform", backfaceVisibility: "hidden" });
    gsap.to(el, {
      rotation: stranger ? 180 : 0, // <-- use rotation
      filter: stranger ? "hue-rotate(-20deg) contrast(1.15)" : "none",
      duration: 1.2,
      ease: "power2.inOut",
      transformOrigin: "50% 50%",
      force3D: true,
    });
  }, [stranger]);

  const handleExpand = () => {
    if (!appRef.current) return;

    // EXPAND ANIMATION
    gsap.to(appRef.current, {
      scale: 1.03,
      duration: 0.2,
      ease: "power1.out",
      yoyo: true,
      repeat: 1,
      transformOrigin: "center center",
    });
  };

  // MINIMIZE ANIMATION
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

  // LOCK SCROLLING WHEN OPEN
  useEffect(() => {
    if (!open) return;
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = original;
    };
  }, [open]);

  // ESC TO EXIT
  const startExit = useCallback(() => {
    if (!open || phase === "exiting") return;
    resetHackerState();
    setPhase("exiting");
  }, [open, phase, resetHackerState]);

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

  // GSAP SEQUENCE
  useGSAP(() => {
    if (!open) return;

    // RESET VISIBILITIES
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

      // GLITCH EFFECT
      .to(
        ".boot-title",
        { skewX: 12, x: 5, duration: 0.06, yoyo: true, repeat: 3 },
        "<"
      )
      .to({}, { duration: 0.5 })

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

  // EXIT
  useEffect(() => {
    if (phase !== "exiting") return; // exits early cleanly

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
  // ---------- HACKER MODE: state, helpers, commands, effects ----------
  const println = (line: string) => setLog((prev) => [...prev, line]);
  const partyTimerRef = useRef<number | null>(null);
  const getHost = () => root.current ?? document.body;
  const emojiCanvasRef = useRef<CanvasWithCleanup | null>(null);
  const emojiRAF = useRef<number | null>(null);

  const runCommand = useCallback((raw: string) => {
    const input = raw.trim().toLowerCase();
    if (!input) return;

    println(`$ ${raw}`);

    switch (input) {
      case "help":
        println(
          "Commands: help, party, party off, matrix, matrix off, seasonal, seasonal off, stranger things, stranger things off, clear"
        );
        break;
      case "clear":
        setLog([]);
        break;
      case "party":
        startParty();
        println("🎉 Party mode ON");
        break;
      case "party off":
        stopParty();
        println("🎈 Party mode OFF");
        break;
      case "matrix":
        startMatrix();
        println("🟢 Matrix rain ON");
        break;
      case "matrix off":
        stopMatrix();
        println("🖤 Matrix rain OFF");
        break;
      case "seasonal":
        startEmojiRain();
        println("🌤️ Seasonal effect active — reacting to current season!");
        break;

      case "seasonal off":
        stopEmojiRain();
        println("❌ Seasonal effect OFF");
        break;
      case "stranger things":
      case "stranger":
      case "stranger on":
        setStranger(true);
        println("😱 WHOAAAA.... YOU'RE IN THE UPSIDE DOWN....!");
        break;

      case "stranger things off":
        setStranger(false);
        println("🙃 Leaving the UPSIDE DOWN.... PHEWWWW.....");
        break;
      default:
        println(`Unknown: ${raw}. Try 'help'`);
    }
    setCmd("");
  }, []);

  // Matrix effect
  const startMatrix = () => {
    if (matrixCanvasRef.current) return; // already running
    const canvas = document.createElement("canvas");
    matrixCanvasRef.current = canvas;
    // was: canvas.className = "fixed inset-0 pointer-events-none z-[1200]";
    canvas.className = "fixed inset-0 pointer-events-none";
    canvas.style.zIndex = "90"; // under party / over IDE
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.mixBlendMode = "screen";
    // was: host.appendChild(canvas);
    getHost().appendChild(canvas);

    const ctx = canvas.getContext("2d")!;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 16;
    const columns = Math.ceil(window.innerWidth / fontSize);
    const drops = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      ctx.fillStyle = "#00ff66";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // OLD: const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        const text = Math.random() > 0.5 ? "1" : "0"; // NEW: binary matrix

        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        if (y > window.innerHeight && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      matrixRAF.current = requestAnimationFrame(draw);
    };
    draw();

    (canvas as any)._cleanup = () => {
      window.removeEventListener("resize", resize);
      if (matrixRAF.current) cancelAnimationFrame(matrixRAF.current);
    };
  };

  const stopMatrix = () => {
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    if ((canvas as any)._cleanup) (canvas as any)._cleanup();
    canvas.remove();
    matrixCanvasRef.current = null;
    matrixRAF.current = null;
  };

  // --- PARTY (confetti) ---
  const startParty = () => {
    if (confettiWrapRef.current) return; // already running

    const wrap = document.createElement("div");
    confettiWrapRef.current = wrap;
    // higher than terminal (z-[111]) and matrix bg
    wrap.className = "fixed inset-0 pointer-events-none"; // no dynamic z class
    wrap.style.zIndex = "1200"; // inline z-index = guaranteed
    getHost().appendChild(wrap);

    const colors = ["#FF5C5C", "#00C2B2", "#FACC15", "#34D399", "#60A5FA"];

    // spawn N particles per tick
    const spawn = (count = 10) => {
      for (let i = 0; i < count; i++) {
        const p = document.createElement("div");
        p.style.position = "absolute";
        const size = Math.random() < 0.35 ? 12 : 8;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `-24px`;
        p.style.background = colors[(Math.random() * colors.length) | 0];
        p.style.borderRadius = Math.random() < 0.5 ? "2px" : "50%";
        p.style.opacity = "0.95";
        wrap.appendChild(p);

        const fall = 2.2 + Math.random() * 1.8;
        const xDrift = (Math.random() - 0.5) * 320;
        const spin = 180 + Math.random() * 900;

        gsap.fromTo(
          p,
          { y: -24, x: 0, rotation: 0 },
          {
            y: window.innerHeight + 48,
            x: xDrift,
            rotation: spin,
            ease: "power1.in",
            duration: fall,
            onComplete: () => p.remove(),
          }
        );
      }
    };

    // continuous emitter
    partyTimerRef.current = window.setInterval(() => spawn(12), 120);

    // subtle shimmer on the whole layer
    gsap.to(wrap, {
      opacity: 0.98,
      yoyo: true,
      repeat: -1,
      duration: 1.2,
      ease: "sine.inOut",
    });
  };

  const stopParty = () => {
    if (partyTimerRef.current) {
      clearInterval(partyTimerRef.current);
      partyTimerRef.current = null;
    }
    const wrap = confettiWrapRef.current;
    if (!wrap) return;

    // kill tweens on all children then remove
    gsap.killTweensOf(wrap.querySelectorAll("*"));
    gsap.killTweensOf(wrap);
    wrap.remove();
    confettiWrapRef.current = null;
  };

  // ===== Seasonal Helper =====
  type Season = "christmas" | "winter" | "spring" | "summer" | "autumn";

  // Determine current season from month number
  const getSeasonFromMonth = (m: number): Season =>
    [11].includes(m)
      ? "christmas"
      : [0, 1].includes(m)
        ? "winter"
        : [2, 3, 4].includes(m)
          ? "spring"
          : [5, 6, 7].includes(m)
            ? "summer"
            : "autumn";

  // Get emoji set for a specific season
  const getSeasonalEmojis = (season: Season): string[] => {
    switch (season) {
      case "christmas":
        return ["🎄", "🎅", "🤶", "🦌", "🎁", "⭐", "🕯️", "🍪", "🧦", "🎶"];
      case "winter":
        return ["❄️", "☃️", "🌨️", "🧊", "🔥", "🧣", "🧤", "⛷️", "🏂"];
      case "spring":
        return ["🌸", "🌷", "🌼", "🌿", "🐝", "🦋", "🐇"];
      case "summer":
        return ["☀️", "🌻", "🍉", "🕶️", "🌴", "🏖️", "🍦"];
      case "autumn":
        return ["🍁", "🍂", "🎃", "🌰", "🪵", "🔥", "🧣"];
    }
  };
  // ===== SEASONAL EMOJI FLOAT + MOUSE REPEL =====
  const startEmojiRain = () => {
    if (emojiCanvasRef.current) return;

    // Decide season: local override -> current month
    const override = localStorage.getItem("devmode.season") as Season | null;
    const season = override || getSeasonFromMonth(new Date().getMonth());
    const emojis = getSeasonalEmojis(season);

    const canvas = document.createElement("canvas") as CanvasWithCleanup;
    emojiCanvasRef.current = canvas;
    canvas.className = "fixed inset-0 pointer-events-none";
    canvas.style.zIndex = "90";
    getHost().appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ---- Tunables ----
    const baseSize = 34; // px
    const count = Math.min(50, Math.round(window.innerWidth / 26));
    const wanderAmp = 18; // px/s^2 (how strongly they meander)
    const wanderFreq = 0.9; // Hz-ish feel
    const drag = 0.996; // velocity damping
    const maxSpeed = 240; // px/s clamp
    const spinSpeed = 0.5; // rad/s scaling
    const repelRadius = 240; // px
    const repelStrength = 1200; // px/s^2 at R→0 (falls off to 0 at R)

    // Hi-DPI setup
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    let width = 0,
      height = 0;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking (repel)
    const mouse = { x: 0, y: 0, active: false };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    // Particles
    type Ball = {
      e: string;
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      vr: number;
      s: number;
      seedX: number;
      seedY: number;
    };
    const rand = () => Math.random();
    const balls: Ball[] = Array.from({ length: count }, () => {
      const s = baseSize * (0.9 + rand() * 0.6);
      return {
        e: emojis[(rand() * emojis.length) | 0],
        x: rand() * width,
        y: rand() * height,
        vx: (rand() - 0.5) * 60,
        vy: (rand() - 0.5) * 60,
        r: rand() * Math.PI * 2,
        vr: (rand() - 0.5) * spinSpeed,
        s,
        seedX: rand() * 1000,
        seedY: rand() * 1000,
      };
    });

    // Animation loop
    let last = performance.now();
    let raf: number | null = null;
    const loop = () => {
      const now = performance.now();
      const dt = Math.min(0.032, (now - last) / 1000); // clamp dt
      last = now;

      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const b of balls) {
        // Wander “noise” (cheap sin/cos drift)
        const t = now / 1000;
        const axW =
          Math.cos((t + b.seedX) * wanderFreq * 2 * Math.PI) * wanderAmp;
        const ayW =
          Math.sin((t + b.seedY) * wanderFreq * 2 * Math.PI) * wanderAmp;

        // Mouse repel
        let axR = 0,
          ayR = 0;
        if (mouse.active) {
          const dx = b.x - mouse.x;
          const dy = b.y - mouse.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          if (d < repelRadius) {
            const falloff = 1 - d / repelRadius; // 0..1
            const force = repelStrength * Math.pow(falloff, 3); // cubic falloff = harder push near mouse
            axR = (dx / d) * force;
            ayR = (dy / d) * force;
          }
        }

        // Integrate
        b.vx += (axW + axR) * dt;
        b.vy += (ayW + ayR) * dt;

        // Drag and clamp
        b.vx *= drag;
        b.vy *= drag;
        const sp = Math.hypot(b.vx, b.vy);
        if (sp > maxSpeed) {
          const k = maxSpeed / sp;
          b.vx *= k;
          b.vy *= k;
        }

        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // Edge handling: soft bounce
        const half = b.s * 0.5;
        if (b.x < half) {
          b.x = half;
          b.vx = Math.abs(b.vx) * 0.85;
        }
        if (b.x > width - half) {
          b.x = width - half;
          b.vx = -Math.abs(b.vx) * 0.85;
        }
        if (b.y < half) {
          b.y = half;
          b.vy = Math.abs(b.vy) * 0.85;
        }
        if (b.y > height - half) {
          b.y = height - half;
          b.vy = -Math.abs(b.vy) * 0.85;
        }

        // Spin + draw
        b.r += b.vr * dt;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.r);
        ctx.font = `${b.s}px system-ui, Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif`;
        ctx.fillText(b.e, 0, 0);
        ctx.restore();
      }

      raf = requestAnimationFrame(loop);
    };
    loop();

    canvas._cleanup = () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove as any);
      window.removeEventListener("pointerleave", onLeave as any);
    };
  };

  const stopEmojiRain = () => {
    const canvas = emojiCanvasRef.current;
    if (!canvas) return;
    canvas._cleanup?.();
    canvas.remove();
    emojiCanvasRef.current = null;
    emojiRAF.current = null;
  };
  // clean up on unmount
  useEffect(() => {
    return () => {
      stopMatrix();
      stopParty();
      stopEmojiRain();
    };
  }, []);

  useEffect(() => {
    if (hacker) {
      gsap.fromTo(
        ".animate-fadeIn",
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: "power2.out" }
      );
    }
  }, [hacker]);

  // ---------- END HACKER MODE BLOCK ----------

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
          <div className="boot-title boot-line font-heading text-xl text-[color:var(--color-main)]">
            Booting Developer Mode…
          </div>
          <div className="mt-3 space-y-1 font-mono text-sm text-[color:var(--color-sub-text)]">
            <div className="boot-line">Initialising modules</div>
            <div className="boot-line">Loading shaders</div>
            <div className="boot-line">Spinning up sandboxes</div>
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

      {/* APP (FAKE IDE) */}

      <div ref={appRef} className="absolute inset-0 p-4 sm:p-8">
        <div
          ref={ideRef}
          className="ide-shell h-full w-full rounded-2xl border border-[color:var(--color-border)] overflow-hidden bg-[#0a0a0a]"
        >
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
                {/* ---------- WINDOWS TITLE BAR ---------- */}
                <div
                  className="relative w-full h-9 bg-[#2d2d2d] text-white border-b border-black/20 select-none flex items-center"
                  style={{
                    fontFamily: `"Segoe UI Variable", "Segoe UI", "Helvetica Neue", Arial, sans-serif`,
                    fontSize: "13px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {/* LEFT: VS CODE ICON + TITLE */}
                  <div className="flex items-center gap-2 pl-3">
                    <VscVscode
                      className="text-[#007ACC] text-lg shrink-0"
                      aria-hidden
                    />
                    <div className="opacity-90">Developer Mode</div>
                  </div>

                  {/* RIGHT: WINDOW CONTROL BUTTONS */}
                  <div className="absolute right-0 top-0 flex items-stretch">
                    {/* MINIMISE */}
                    <button
                      type="button"
                      title="Minimize"
                      onClick={handleMinimize}
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

                    {/* MAXIMISE */}
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
                    {/* CLOSE */}
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
                {/* ---------- MAC TITLE BAR ---------- */}
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-500 transition-colors"
                    title="Close Developer Mode"
                    onClick={startExit}
                  />
                  <span
                    className="h-3 w-3 rounded-full bg-yellow-500/80 cursor-pointer hover:bg-yellow-400 transition-colors"
                    title="Minimize Window"
                    onClick={handleMinimize}
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

          {hacker && stranger && (
            <div className="fixed inset-0 z-[112] pointer-events-none">
              <div className="absolute inset-0 bg-red-900/35 mix-blend-overlay animate-flicker" />
            </div>
          )}

          {hacker && (
            <div
              className="absolute top-0 left-0 w-full h-10 flex items-center justify-center z-[9999] font-mono text-[12px] uppercase tracking-wider select-none"
              style={{
                background: stranger
                  ? "linear-gradient(90deg, #3b0000 0%, #7a0000 100%)"
                  : "linear-gradient(90deg, #001900 0%, #004c00 100%)",
                color: stranger ? "#ffbfbf" : "#b7ffbf",
                borderBottom: stranger
                  ? "1px solid rgba(255,0,0,0.25)"
                  : "1px solid rgba(0,255,102,0.15)",
                boxShadow: stranger
                  ? "inset 0 -2px 6px rgba(255,0,0,0.25)"
                  : "inset 0 -2px 6px rgba(0,255,100,0.2)",
                letterSpacing: "0.15em",
                transition: "all 0.4s ease",
              }}
              title="Hacker Mode Override"
            >
              {stranger
                ? "SYSTEM OVERRIDE: UPSIDE DOWN ACTIVE"
                : "SYSTEM OVERRIDE: HACKER MODE ACTIVE"}
            </div>
          )}
          {/* CONTAINER */}
          <div className="grid grid-cols-12 h-[calc(100%-2.5rem)]">
            {/* EXPLORER SIDE BAR */}
            <aside className="col-span-3 lg:col-span-2 h-full border-r border-[color:var(--color-border)] bg-white/[0.02] p-3 overflow-y-auto">
              <div className="font-mono text-xs text-white/60 mb-2 flex items-center gap-2">
                explorer
              </div>
              <ul className="space-y-1 text-white/80 font-mono text-sm select-none">
                {/* FOLDERS */}
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
            {/* EDITOR TABS */}
            <main className="col-span-9 lg:col-span-10 h-full relative bg-[#0b0f12]">
              {/* <div className="h-9 border-b border-[color:var(--color-border)] flex items-center px-4 gap-4 text-white/70 text-sm">
                <span className="ide-line">Avatar.tsx</span>
                <span className="ide-line">Statement.tsx</span>
                <span className="ide-line">Projects.tsx</span>
              </div> */}
              {/* EDITOR CONTENT */}
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
                        // type: "Web Game",
                        stack: ['"HTML"', '"CSS"', '"JS"'],
                        repo: "https://github.com/arriannlee/rock_paper_scissors",
                      },
                      {
                        title: "ATL Pro FX",
                        // type: "E-Commerce Site",
                        stack: ['"WordPress"', '"WooCommerce"', '"PHP"'],
                        repo: "https://github.com/arriannlee/atlprofx",
                      },
                      {
                        title: "Beautique Salon",
                        // type: "Service Website",
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
                      {C("// ")}
                      <span className="relative group">
                        <span className="hidden-hint text-transparent bg-[color:var(--color-bg-accent)] bg-clip-text transition-colors duration-300 group-hover:text-[color:var(--color-accent)]">
                          Press CMD + SHIFT + H to open HACKER MODE 😎
                        </span>
                      </span>
                    </CodeLine>
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

      {hacker && showTerminal && (
        <>
          {hacker && (
            <>
              <div className="hacker-matrix fixed inset-0 pointer-events-none z-[110]" />

              <div
                role="dialog"
                aria-label="Hacker Mode Terminal"
                className="fixed inset-0 z-[111] flex items-center justify-center p-4"
              >
                <div
                  className="w-[520px] max-w-[95%] rounded-md border border-[#00ff66]/30
                   bg-black/95 p-4 shadow-xl animate-fadeIn"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
                    <div className="text-xs font-mono text-white/80">
                      Hacker Mode
                    </div>
                    <button
                      onClick={() => {
                        setHacker(false);
                        setStranger(false); // reset upside-down
                        localStorage.setItem("devmode.hacker", "0");
                        stopMatrix();
                        stopParty();
                        if (appRef.current) {
                          gsap.to(appRef.current, {
                            rotate: 0,
                            filter: "none",
                            duration: 0.4,
                            ease: "power2.out",
                          });
                        }
                      }}
                      className="ml-auto text-xs text-white/40 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="font-mono text-sm text-[#b8f7d0] min-h-[140px]">
                    <div className="space-y-1 overflow-y-auto max-h-[280px] pr-1">
                      {log.map((line, idx) => (
                        <div key={idx} className="whitespace-pre-wrap">
                          {line}
                        </div>
                      ))}
                    </div>

                    <form
                      className="mt-3 flex items-center gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        runCommand(cmd);
                      }}
                    >
                      <span className="text-[#00ff66]">&gt;</span>
                      <input
                        autoFocus
                        value={cmd}
                        onChange={(e) => setCmd(e.target.value)}
                        placeholder="type a command…"
                        className="flex-1 bg-transparent outline-none text-[#eafff2] placeholder:text-[#83cfa1]/60"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
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
