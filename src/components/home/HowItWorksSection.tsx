import { steps } from "./homeData";

const HowItWorksSection = () => (
  <section
    id="how-it-works"
    className="scroll-mt-6 border-y border-[#d9e5ec] bg-white"
  >
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#208478]">
          How it works
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#102a43] sm:text-4xl">
          One clear path to help.
        </h2>
        <p className="mt-4 leading-7 text-[#647b8b]">
          From the first request to the moment care arrives, every step is
          designed to keep you informed.
        </p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map(({ number, icon: Icon, title, description }) => (
          <article
            key={number}
            className="rounded-2xl border border-[#d8e5ea] bg-[#f8fbfc] p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#e3f1f4] text-[#176b78]">
                <Icon className="size-5" />
              </div>
              <span className="text-sm font-semibold text-[#9ab0bb]">
                {number}
              </span>
            </div>
            <h3 className="mt-7 text-lg font-semibold text-[#102a43]">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#647b8b]">
              {description}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export { HowItWorksSection };
