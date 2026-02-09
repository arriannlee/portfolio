// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'

// type Stage = 'fade-in' | 'boot' | 'done'

// export default function DevLoading() {
//   const router = useRouter()
//   const search = useSearchParams()
//   const [stage, setStage] = useState<Stage>('fade-in')
//   const [line, setLine] = useState(0)

//   const from = search.get('from') || '/'

//   // Sequence: fade-in → boot lines → (optional) continue to terminal later
//   useEffect(() => {
//     // quick fade-in
//     const t1 = setTimeout(() => setStage('boot'), 200)

//     // boot lines cadence
//     const lines = 5
//     let i = 0
//     const t = setInterval(() => {
//       i++
//       setLine(i)
//       if (i >= lines) {
//         clearInterval(t)
//         setStage('done')
//       }
//     }, 350)

//     return () => {
//       clearTimeout(t1)
//       clearInterval(t)
//     }
//   }, [])

//   // ESC to exit back where user came from
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         if (window.history.length > 1) router.back()
//         else router.push(from)
//       }
//     }
//     window.addEventListener('keydown', onKey)
//     return () => window.removeEventListener('keydown', onKey)
//   }, [router, from])

//   return (
//     <div
//       className={[
//         "fixed inset-0 z-50",
//         "bg-[color:var(--color-bg)] text-[color:var(--color-text)]",
//         "dev-fade",             // fade-in class (see globals.css)
//       ].join(' ')}
//       role="dialog" aria-modal="true" aria-label="Developer mode loading"
//     >
//       {/* Top bar hint */}
//       <div className="px-4 py-3 border-b border-[color:var(--color-border)] flex items-center justify-between">
//         <div className="font-heading uppercase tracking-[0.08em] text-sm">Developer Mode</div>
//         <div className="text-[color:var(--color-sub-text)] text-xs">
//           Press <kbd className="px-1 py-0.5 rounded bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)]">Esc</kbd> to exit
//         </div>
//       </div>

//       {/* Centered boot text */}
//       <div className="h-[calc(100dvh-3rem)] w-full grid place-items-center p-6">
//         <div className="w-full max-w-2xl font-dev text-[13px] sm:text-[14px] leading-6">
//           <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-5 sm:p-6">
//             {/* Boot lines */}
//             <BootLine index={1} line={line} text="[ OK ] Initializing renderer…" />
//             <BootLine index={2} line={line} text="[ OK ] Loading components…" />
//             <BootLine index={3} line={line} text="[ OK ] Hooking event listeners…" />
//             <BootLine index={4} line={line} text="[ OK ] Spinning up dev shell…" />
//             <BootLine index={5} line={line} text="Launching…" pulse />

//             {/* Progress bar */}
//             <div className="mt-4 h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-[color:var(--color-accent)] dev-progress"
//                 style={{ width: `${Math.min(line * 20, 100)}%` }}
//               />
//             </div>

//             {/* Cursor hint */}
//             <div className="mt-4 text-[color:var(--color-sub-text)]">
//               Preparing terminal<span className="dev-dots" aria-hidden>...</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function BootLine({ index, line, text, pulse = false }: { index: number; line: number; text: string; pulse?: boolean }) {
//   const visible = line >= index
//   return (
//     <div className={["transition-opacity duration-300", visible ? "opacity-90" : "opacity-0"].join(' ')}>
//       <span className={pulse ? "motion-safe:animate-pulse" : ""}>{text}</span>
//     </div>
//   )
// }
