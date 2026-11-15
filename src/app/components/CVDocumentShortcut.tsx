type CVDocumentShortcutProps = {
  onOpen: () => void;
};

export default function CVDocumentShortcut({
  onOpen,
}: CVDocumentShortcutProps) {
  return (
    <button
      type="button"
      className="retro-desktop-folder"
      onClick={onOpen}
      aria-label="Open My CV"
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        style={{ imageRendering: "pixelated" }}
      >
        {/* Document shadow */}
        <path d="M10 5H33L40 12V44H10V5Z" fill="#808080" />

        {/* Paper */}
        <path
          d="M8 3H31L38 10V42H8V3Z"
          fill="#FFFFFF"
          stroke="#202020"
          strokeWidth="1.5"
        />

        {/* Folded corner */}
        <path
          d="M31 3V10H38"
          fill="#D6D6D6"
          stroke="#202020"
          strokeWidth="1.5"
        />

        {/* Notepad header */}
        <rect x="12" y="14" width="22" height="5" fill="#000080" />

        {/* Text lines */}
        <path
          d="M13 24H32M13 29H32M13 34H27"
          stroke="#606060"
          strokeWidth="2"
        />
      </svg>

      <span>My CV</span>
    </button>
  );
}
