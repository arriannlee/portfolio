'use client'

import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react' // eslint-disable-line no-unused-vars
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Project = {
  id: string
  title: string
  blurb: string
  link: string
}
const PROJECTS: Project[] = [
  { id: 'p1', title: 'Project One', blurb: 'description', link: 'https://project.com'},
  { id: 'p2', title: 'Project Two', blurb: 'description', link: 'https://project.com' },
  { id: 'p3', title: 'Project Three', blurb: 'description', link: 'https://project.com' },
  { id: 'p4', title: 'Project Four', blurb: 'description', link: 'https://project.com' },
]

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null)

  // desktop: map vertical wheel → horizontal scroll (natural feel)
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY
        e.preventDefault()
      }
    }

    const mql = window.matchMedia('(min-width: 1024px)')
    const enable = () => el.addEventListener('wheel', onWheel, { passive: false })
    const disable = () => el.removeEventListener('wheel', onWheel)
    if (mql.matches) enable()
    const onChange = () => (mql.matches ? enable() : disable())
    mql.addEventListener('change', onChange)
    return () => {
      disable()
      mql.removeEventListener('change', onChange)
    }
  }, [])

  return (
    <section className="px-4 sm:px-6 lg:px-0 py-16 lg:py-0 lg:min-h-dvh lg:flex lg:items-center">
      {/* Heading (kept visible for all) */}
      <h2 className="sr-only">Selected Work</h2>

      {/* Mobile/Tablet: vertical list */}
      <div className="grid gap-8 lg:hidden">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {/* Desktop: horizontal scroller */}
<div
  ref={trackRef}
  role="region"
  aria-label="Projects"
  tabIndex={0}
  className="
    hidden lg:flex lg:items-center
    overflow-x-auto no-scrollbar
    snap-x snap-mandatory
    gap-[8.333vw]
    /* this creates 1 extra column of space before the first card */
    px-[calc(8.333vw*2)]  /* twice the gap = about one extra col */
    w-full
  "
>
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            className="
              /* each slide = 8/12 viewport width = 66.666vw */
              w-[66.666vw] flex-none snap-start
            "
          >
            <ProjectCard project={p} tall />
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, tall = false }: { project: Project; tall?: boolean }) {
  return (
    <article
      className={[
        "project-card", // 👈 hook
        "rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] overflow-hidden",
        tall ? "h-[70dvh]" : "aspect-video",
      ].join(" ")}
    >
      <div className="grid grid-cols-5 h-full">
        <div className="col-span-5 md:col-span-2 p-6 flex flex-col justify-end">
          <h3 className="font-heading text-2xl text-[color:var(--color-main)]">
            {project.title}
          </h3>
          <p className="mt-2 font-body text-sub-text leading-relaxed">
            {project.blurb}
          </p>
        </div>
        <div className="col-span-5 md:col-span-3">
          <div
            aria-hidden
            className="
              parallax-pane  /* 👈 hook for parallax */
              w-full h-full bg-[color:var(--color-bg)]
              border-t md:border-t-0 md:border-l border-[color:var(--color-border)]
            "
          />
        </div>
      </div>
    </article>
  );
}
