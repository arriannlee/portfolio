type EmailShortcutProps = {
  onOpen: () => void;
};

export default function EmailShortcut({
  onOpen,
}: EmailShortcutProps) {
  return (
    <button
      type="button"
      className="retro-desktop-folder"
      onClick={onOpen}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-hidden="true"
        shapeRendering="crispEdges"
      >
        {/* Shadow */}
        <path fill="#404040" d="M4 12h43v30H4z" />

        {/* Envelope */}
        <path fill="#fff" d="M1 9h43v30H1z" />
        <path
          fill="none"
          stroke="#000"
          strokeWidth="2"
          d="M2 10h41v28H2z"
        />

        {/* Folded lower corners */}
        <path
          fill="#ddd"
          stroke="#808080"
          strokeWidth="2"
          d="M3 37l15-14h9l15 14"
        />

        {/* Top flap */}
        <path
          fill="#f5f5f5"
          stroke="#000"
          strokeWidth="2"
          d="M3 11l19 16 20-16"
        />

        {/* Highlight */}
        <path
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          d="M4 13l18 15 18-14"
        />
      </svg>

      <span className="retro-folder-label">Email</span>
    </button>
  );
}
