"use client";

import { useEffect, useRef, useState } from "react";
import RetroWindow from "./RetroWindow";
import ProfileContent from "./cv/ProfileContent";
import DesktopFolder from "./DesktopFolder";
import SkillsContent from "./cv/SkillsContent";
import WorkHistoryContent from "./cv/WorkHistoryContent";
import EducationContent from "./cv/EducationContent";
import LinkedInShortcut from "./LinkedInShortcut";
import GitHubShortcut from "./GitHubShortcut";
import PortfolioShortcut from "./PortfolioShortcut";
import RetroStartMenu from "./RetroStartMenu";
import EmailContent from "./cv/EmailContent";
import EmailShortcut from "./EmailShortcut";
import InternetContent from "./cv/InternetContent";
import InternetShortcut from "./InternetShortcut";
import CVWelcome from "./CVWelcome";
import CVDocumentContent from "./cv/CVDocumentContent";
import CVDocumentShortcut from "./CVDocumentShortcut";
import ClippyAssistant from "./ClippyAssistant";
import ProjectsExplorer from "./cv/ProjectsExplorer";
import ProjectsShortcut from "./ProjectsShortcut";
import Minesweeper from "./games/Minesweeper";


const windows = {
  profile: {
    title: "About",
    content: <ProfileContent />,
  },
  skills: {
    title: "Technical Skills",
    content: <SkillsContent />,
  },
  employment: {
    title: "Employment History",
    content: <WorkHistoryContent />,
  },
  education: {
    title: "Education",
    content: <EducationContent />,
  },
  email: {
    title: "New Message",
    content: null,
  },
  internet: {
    title: "Connect to Internet",
    content: <InternetContent />,
  },
  cv: {
    title: "My CV",
    content: <CVDocumentContent />,
  },
  projects: {
    title: "Projects",
    content: <ProjectsExplorer />,
  },
  minesweeper: {
    title: "Minesweeper",
    content: <Minesweeper />,
  },
};

type WindowId = keyof typeof windows;

type OpenWindow = {
  id: WindowId;
  minimised: boolean;
  maximised: boolean;
};

export default function CVDesktop() {
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [time, setTime] = useState("");

  const [wallpaper, setWallpaper] = useState(
    'url("/images/windows_landscape.webp")',
  );

  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);

  const activeId = openWindows.filter((window) => !window.minimised).at(-1)?.id;

  const [hasEntered, setHasEntered] = useState(false);

  const startupAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      startupAudioRef.current?.pause();
      startupAudioRef.current = null;
    };
  }, []);

  function enterDesktop() {
    const audio = new Audio("/sound/startup.wav");

    audio.volume = 0.5;
    startupAudioRef.current = audio;

    void audio.play().catch(() => {});

    setHasEntered(true);
  }

  useEffect(() => {
    function updateTime() {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  function openWindow(id: WindowId) {
    setOpenWindows((current) => {
      const existing = current.find((window) => window.id === id);

      return [
        ...current.filter((window) => window.id !== id),
        {
          id,
          minimised: false,
          maximised: existing?.maximised ?? false,
        },
      ];
    });
  }

  function minimiseWindow(id: WindowId) {
    setOpenWindows((current) =>
      current.map((window) =>
        window.id === id ? { ...window, minimised: true } : window,
      ),
    );
  }

  function closeWindow(id: WindowId) {
    setOpenWindows((current) => current.filter((window) => window.id !== id));
  }

  function toggleMaximise(id: WindowId) {
    setOpenWindows((current) =>
      current.map((window) =>
        window.id === id
          ? {
              ...window,
              maximised: !window.maximised,
            }
          : window,
      ),
    );
  }

  function logOut() {
    startupAudioRef.current?.pause();
    startupAudioRef.current = null;

    setOpenWindows([]);
    setIsShuttingDown(false);
    setHasEntered(false);
  }

  if (!hasEntered) {
    return (
      <CVWelcome
        onEnter={enterDesktop}
        pdfHref="/documents/arriann-lee-cv.pdf"
      />
    );
  }

  return (
    <div
      className={`cv-desktop${isShuttingDown ? " is-shutting-down" : ""}`}
      style={{
        backgroundColor: wallpaper.startsWith("url(") ? "#008080" : wallpaper,
        backgroundImage: wallpaper.startsWith("url(") ? wallpaper : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Shutdown overlay */}

      {isShuttingDown && (
        <div className="retro-shutdown-screen" role="status">
          <p>Arriann Lee CV is shutting down…</p>
        </div>
      )}

      {/* Desktop shortcuts */}

      <div className="retro-desktop-icons">
        <DesktopFolder
          label={windows.profile.title}
          onOpen={() => openWindow("profile")}
        />

        <DesktopFolder
          label={windows.employment.title}
          onOpen={() => openWindow("employment")}
        />

        <DesktopFolder
          label={windows.education.title}
          onOpen={() => openWindow("education")}
        />

        <DesktopFolder
          label={windows.skills.title}
          onOpen={() => openWindow("skills")}
        />

        <ProjectsShortcut onOpen={() => openWindow("projects")} />

        <CVDocumentShortcut onOpen={() => openWindow("cv")} />

        <PortfolioShortcut />

        <LinkedInShortcut />

        <GitHubShortcut />

        <EmailShortcut onOpen={() => openWindow("email")} />

        <InternetShortcut onOpen={() => openWindow("internet")} />
      </div>

      {/* Open application windows */}

      <div className="retro-window-area">
        {openWindows.map((window, index) => (
          <div
            key={window.id}
            className="retro-window-layer"
            style={{ zIndex: index + 1 }}
            hidden={window.minimised}
          >
            <RetroWindow
              title={windows[window.id].title}
              isActive={activeId === window.id}
              isMaximised={window.maximised}
              variant={window.id === "minesweeper" ? "compact" : "default"}
              allowMaximise={window.id !== "minesweeper"}
              showScrollbar={["skills", "employment"].includes(window.id)}
              onFocus={() => {
                if (activeId !== window.id) {
                  openWindow(window.id);
                }
              }}
              onClose={() => closeWindow(window.id)}
              onMinimise={() => minimiseWindow(window.id)}
              onToggleMaximise={() => toggleMaximise(window.id)}
            >
              {window.id === "email" ? (
                <EmailContent onSent={() => closeWindow("email")} />
              ) : (
                windows[window.id].content
              )}
            </RetroWindow>
          </div>
        ))}
      </div>

      {/* Office-style desktop assistant */}

      {!isShuttingDown && <ClippyAssistant />}

      {/* Bottom taskbar */}

      <footer className="retro-taskbar">
        <RetroStartMenu
          onOpenWindow={openWindow}
          onWallpaperChange={setWallpaper}
          onShutdownStart={() => setIsShuttingDown(true)}
          onLogOut={logOut}
        />

        <div className="retro-taskbar-divider" />

        {openWindows.map((window) => (
          <button
            key={window.id}
            type="button"
            className={`retro-taskbar-window ${
              activeId === window.id ? "is-active" : ""
            }`}
            onClick={() => {
              if (activeId === window.id) {
                minimiseWindow(window.id);
              } else {
                openWindow(window.id);
              }
            }}
          >
            {windows[window.id].title}
          </button>
        ))}

        <div className="retro-taskbar-space" />

        <time className="retro-clock">{time}</time>
      </footer>
    </div>
  );
}
