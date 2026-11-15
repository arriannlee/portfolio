"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import RetroScreensaver from "./RetroScreensaver";

type WindowId =
  | "profile"
  | "employment"
  | "education"
  | "skills"
  | "email"
  | "internet"
  | "cv"
  | "projects"
  | "minesweeper";

type Category = "cv" | "programs" | "links" | "settings";
type IconName =
  | "folder"
  | "programs"
  | "globe"
  | "settings"
  | "email"
  | "screensaver"
  | "shutdown"
  | "logout"
  | "document";

type RetroStartMenuProps = {
  onOpenWindow: (id: WindowId) => void;
  onWallpaperChange: (value: string) => void;
  onShutdownStart: () => void;
  onLogOut: () => void;
};

const cvItems: { id: WindowId; label: string }[] = [
  { id: "profile", label: "About" },
  { id: "employment", label: "Employment History" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Technical Skills" },
];

const links = [
  { label: "Portfolio", href: "https://arriannlee.com/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arriannlee/",
  },
  { label: "GitHub", href: "https://github.com/arriannlee" },
];

const wallpapers = [
  {
    label: "Green Hills",
    value: 'url("/images/windows_landscape.webp")',
  },
  { label: "Classic Teal", value: "#008080" },
  { label: "Midnight Blue", value: "#000080" },
  { label: "Plum", value: "#580040" },
];

const categories: {
  id: Category;
  label: string;
  icon: IconName;
}[] = [
  { id: "programs", label: "Programs", icon: "programs" },
  { id: "cv", label: "CV", icon: "folder" },
  { id: "links", label: "Links", icon: "globe" },
  { id: "settings", label: "Settings", icon: "settings" },
];

/* Small illustrated icons with hard edges and period colours */
function MenuIcon({ name }: { name: IconName }) {
  return (
    <svg
      className="retro-menu-icon"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      aria-hidden="true"
      shapeRendering="crispEdges"
      fill="none"
      stroke="#222"
      strokeWidth="1"
    >
      {(name === "folder" || name === "programs") && (
        <>
          <path fill="#d5aa32" d="M2 8V4h11l3 4h14v20H2z" />
          <path fill="#ffe479" d="M2 11h28l-3 18H2z" />
          <path stroke="#fff5ba" d="M4 13h23M4 14v12" />

          {name === "programs" && (
            <>
              <path fill="#eee" d="M11 9h19v17H11z" />
              <path fill="#000080" d="M12 10h17v4H12z" />
              <path fill="#ef5350" d="M14 17h4v4h-4z" />
              <path fill="#4b9c43" d="M22 17h4v4h-4z" />
            </>
          )}
        </>
      )}

      {name === "globe" && (
        <>
          <circle cx="16" cy="16" r="13" fill="#176ce0" />
          <path fill="#61bd35" d="M7 6l8-2 3 5-4 4-5-1-3 5-3-4z" />
          <path fill="#61bd35" d="M19 15l7-3 3 7-5 3-3 6-4-4z" />
          <path stroke="#8bd5ff" d="M6 19h21M8 8l16 17" />
        </>
      )}

      {name === "settings" && (
        <>
          <path fill="#eee" d="M7 2h19v26H7z" />
          <path fill="#000080" d="M10 5h13v4H10z" />
          <path stroke="#666" d="M11 13h11M11 17h11" />
          <path
            fill="#d6be3c"
            d="M10 17l3 2 4-1 1 4 4 2-2 3-1 4h-4l-3-2-4 1-1-4-4-2 2-3 1-4z"
          />
          <circle cx="12" cy="24" r="4" fill="#808080" />
        </>
      )}

      {name === "email" && (
        <>
          <path fill="#808080" d="M3 9h28v20H3z" />
          <path fill="#fff" d="M1 7h28v20H1z" />
          <path fill="#ddd" d="M2 26l12-11h3l11 11z" />
          <path fill="#f5f5f5" d="M2 8l13 11L28 8z" />
        </>
      )}

      {(name === "shutdown" || name === "screensaver") && (
        <>
          <path fill="#808080" d="M4 3h23l3 3v19H4z" />
          <path fill="#c0c0c0" d="M1 2h25v22H1z" />
          <path fill="#000080" d="M4 5h19v15H4z" />
          <path fill="#c0c0c0" d="M11 24h7v4h7v3H5v-3h6z" />

          {name === "shutdown" ? (
            <path stroke="#fff" strokeWidth="2" d="M13 7v6M9 9a6 6 0 1 0 8 0" />
          ) : (
            <path
              stroke="#ff00a8"
              strokeWidth="2"
              d="M7 16l5-8 5 8M9 13h6M18 8v8h3"
            />
          )}
        </>
      )}
      {name === "logout" && (
        <>
          <path fill="#eee" d="M4 3h17v27H4z" />
          <path fill="#d6ab45" d="M7 6h11v24H7z" />
          <path stroke="#fff0a0" d="M9 8v19" />
          <path fill="#ffe479" d="M16 13h8V8l7 9-7 9v-5h-8z" />
        </>
      )}
      {name === "document" && (
        <>
          <path fill="#808080" d="M7 3h20l3 3v25H7z" />
          <path fill="#fff" d="M4 1h19l5 5v23H4z" />
          <path fill="#c0c0c0" d="M23 1v5h5z" />
          <path fill="#000080" d="M8 10h16v4H8z" />
          <path stroke="#606060" d="M8 18h16M8 22h16M8 26h11" />
        </>
      )}
    </svg>
  );
}

export default function RetroStartMenu({
  onOpenWindow,
  onWallpaperChange,
  onShutdownStart,
  onLogOut,
}: RetroStartMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submenu, setSubmenu] = useState<Category | null>(null);
  const [screensaverActive, setScreensaverActive] = useState(false);
  const shutdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const shutdownAudioRef = useRef<HTMLAudioElement | null>(null);
  const shuttingDownRef = useRef(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  useEffect(() => {
    return () => {
      const audio = shutdownAudioRef.current;

      if (audio) {
        audio.onended = null;
        audio.onerror = null;
        audio.pause();
      }
      if (shutdownTimerRef.current !== null) {
        clearTimeout(shutdownTimerRef.current);
      }
      shutdownAudioRef.current = null;
    };
  }, []);

  function shutDown() {
    if (shuttingDownRef.current) return;

    shuttingDownRef.current = true;
    setIsShuttingDown(true);
    closeMenu();
    onShutdownStart();

    const audio = new Audio("/sound/shutdown.wav");
    audio.volume = 0.5;
    shutdownAudioRef.current = audio;

    let finished = false;

    function finishShutdown() {
      if (finished) return;
      finished = true;

      audio.onended = null;
      audio.onerror = null;
      audio.pause();

      router.push("/");
    }

    audio.onended = finishShutdown;
    audio.onerror = finishShutdown;

    void audio.play().catch(finishShutdown);
  }

  function closeMenu() {
    setIsOpen(false);
    setSubmenu(null);
  }

  function openApp(id: WindowId) {
    onOpenWindow(id);
    closeMenu();
  }

  return (
    <div
      className="retro-start-container"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeMenu();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          closeMenu();

          event.currentTarget
            .querySelector<HTMLButtonElement>(".retro-start")
            ?.focus();
        }
      }}
    >
      {screensaverActive && (
        <RetroScreensaver onExit={() => setScreensaverActive(false)} />
      )}

      {isOpen && (
        <>
          <div className="retro-start-backdrop" onPointerDown={closeMenu} />

          <nav
            id="desktop-start-menu"
            className="retro-start-menu"
            aria-label="Desktop navigation"
          >
            <div className="retro-start-brand" aria-hidden="true">
              <span>
                <strong>Arriann</strong> Lee
              </span>
            </div>

            <div className="retro-start-options">
              <button
                type="button"
                className="retro-menu-item"
                onMouseEnter={() => setSubmenu(null)}
                onFocus={() => setSubmenu(null)}
                onClick={() => openApp("cv")}
              >
                <MenuIcon name="document" />
                <span className="retro-menu-label">My CV</span>
              </button>

              <div className="retro-menu-separator" />

              {categories.map((category) => (
                <div
                  key={category.id}
                  className="retro-start-category"
                  onMouseEnter={() => setSubmenu(category.id)}
                >
                  <button
                    type="button"
                    className="retro-menu-item"
                    aria-expanded={submenu === category.id}
                    aria-controls={`start-${category.id}-options`}
                    onFocus={() => setSubmenu(category.id)}
                    onClick={() => setSubmenu(category.id)}
                  >
                    <MenuIcon name={category.icon} />
                    <span className="retro-menu-label">{category.label}</span>
                    <span className="retro-menu-chevron" aria-hidden="true">
                      ▸
                    </span>
                  </button>

                  {submenu === category.id && (
                    <div
                      id={`start-${category.id}-options`}
                      className="retro-start-submenu"
                    >
                      {category.id === "cv" &&
                        cvItems.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            className="retro-menu-item"
                            onClick={() => openApp(item.id)}
                          >
                            {item.label}
                          </button>
                        ))}

                      {category.id === "programs" && (
                        <>
                          <button
                            type="button"
                            className="retro-menu-item"
                            onClick={() => openApp("email")}
                          >
                            <MenuIcon name="email" />
                            <span>Email</span>
                          </button>

                          <button
                            type="button"
                            className="retro-menu-item"
                            onClick={() => openApp("internet")}
                          >
                            <MenuIcon name="globe" />
                            <span>Connect to Internet</span>
                          </button>

                          <button
                            type="button"
                            className="retro-menu-item"
                            onClick={() => openApp("minesweeper")}
                          >
                            <span
                              aria-hidden="true"
                              style={{
                                width: 32,
                                height: 32,
                                display: "grid",
                                placeItems: "center",
                                fontSize: 24,
                              }}
                            >
                              💣
                            </span>
                            <span>Minesweeper</span>
                          </button>
                        </>
                      )}

                      {category.id === "links" &&
                        links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="retro-menu-item"
                            aria-label={`${link.label} (opens in a new tab)`}
                            onClick={closeMenu}
                          >
                            {link.label}
                          </a>
                        ))}

                      {category.id === "settings" && (
                        <>
                          <div className="retro-menu-heading">
                            Desktop background
                          </div>

                          {wallpapers.map((wallpaper) => {
                            const isImage = wallpaper.value.startsWith("url(");

                            return (
                              <button
                                key={wallpaper.value}
                                type="button"
                                className="retro-menu-item"
                                onClick={() => {
                                  onWallpaperChange(wallpaper.value);
                                  closeMenu();
                                }}
                              >
                                <span
                                  className="retro-wallpaper-swatch"
                                  style={{
                                    backgroundColor: isImage
                                      ? "#008080"
                                      : wallpaper.value,
                                    backgroundImage: isImage
                                      ? wallpaper.value
                                      : "none",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                  }}
                                  aria-hidden="true"
                                />
                                <span>{wallpaper.label}</span>
                              </button>
                            );
                          })}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="retro-menu-item"
                onMouseEnter={() => setSubmenu(null)}
                onFocus={() => setSubmenu(null)}
                onClick={() => {
                  closeMenu();
                  setScreensaverActive(true);
                }}
              >
                <MenuIcon name="screensaver" />
                <span className="retro-menu-label">Start Screensaver</span>
              </button>

              <div className="retro-menu-separator" />
              <button
                type="button"
                className="retro-menu-item"
                onMouseEnter={() => setSubmenu(null)}
                onFocus={() => setSubmenu(null)}
                onClick={() => {
                  closeMenu();
                  onLogOut();
                }}
              >
                <MenuIcon name="logout" />
                <span className="retro-menu-label">Log Out…</span>
              </button>
              <button
                type="button"
                className="retro-menu-item"
                disabled={isShuttingDown}
                onMouseEnter={() => setSubmenu(null)}
                onFocus={() => setSubmenu(null)}
                onClick={shutDown}
              >
                <MenuIcon name="shutdown" />
                <span className="retro-menu-label">Shut Down…</span>
              </button>
            </div>
          </nav>
        </>
      )}

      <button
        type="button"
        className={`retro-start ${isOpen ? "is-open" : ""}`}
        aria-expanded={isOpen}
        aria-controls="desktop-start-menu"
        onClick={() => {
          if (isOpen) {
            closeMenu();
          } else {
            setIsOpen(true);
          }
        }}
      >
        <span className="retro-start-icon" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
        Start
      </button>
    </div>
  );
}
