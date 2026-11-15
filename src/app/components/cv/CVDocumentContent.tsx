export default function CVDocumentContent() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
      {/* Download toolbar */}
      <div className="flex shrink-0 items-center justify-end border-b border-gray-300 bg-gray-100 px-4 py-2">
        <a
          href="/documents/arriann-lee-cv.pdf"
          download="Arriann-Lee-CV.pdf"
          className="text-sm font-semibold text-blue-700 hover:underline"
        >
          Download PDF ↗
        </a>
      </div>

      {/* PDF viewer */}
      <iframe
        src="/documents/arriann-lee-cv.pdf"
        title="Arriann Lee Curriculum Vitae"
        className="min-h-0 w-full flex-1 border-0"
      />
    </div>
  );
}
