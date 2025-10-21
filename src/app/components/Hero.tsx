import HeroTabs from "./HeroTabs"

export default function Hero() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:items-center gap-y-8 xl:gap-y-0 xl:gap-x-16">
        {/* IMAGE */}
        <div className="order-1 xl:order-2 flex items-start xl:items-center justify-center xl:justify-start">
          <div className="w-full pt-12 pb-8 sm:pt-8 sm:pb-10 xl:py-0 flex justify-center">
            <div
              className="
                aspect-square shrink-0
                w-[88vw] sm:w-[72vw] lg:w-[680px] xl:w-[560px]
                max-w-[680px]
                rounded-2xl border border-[color:var(--color-border)]
                bg-[color:var(--color-bg-secondary)]
              "
            />
          </div>
        </div>

        {/* TABS + DESCRIPTION */}
        <div className="order-2 xl:order-1 flex justify-center xl:justify-end items-start xl:items-center xl:pl-12">
          <div className="w-full max-w-xl">
            <HeroTabs />
          </div>
        </div>
      </div>
    </section>
  )
}