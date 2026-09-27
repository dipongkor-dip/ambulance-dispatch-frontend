import { CheckCircle2, ShieldCheck } from "lucide-react";
import { benefits } from "./homeData";

const TrustSection = () => (
  <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-10 lg:py-24">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#d62839]">
        Built for peace of mind
      </p>
      <h2 className="mt-3 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#102a43] sm:text-4xl">
        Reliable coordination when every minute matters.
      </h2>
      <p className="mt-5 max-w-lg leading-7 text-[#647b8b]">
        CallNow brings patients, families, dispatchers, and care teams onto one
        dependable platform.
      </p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <div
            key={benefit}
            className="flex items-center gap-3 text-sm font-medium text-[#35556b]"
          >
            <CheckCircle2 className="size-5 shrink-0 text-[#2a9d8f]" />
            {benefit}
          </div>
        ))}
      </div>
    </div>
    <div className="rounded-[1.75rem] bg-[#102a43] p-7 text-white sm:p-9">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-[#d62839]">
        <ShieldCheck className="size-6" />
      </div>
      <h3 className="mt-8 text-2xl font-semibold tracking-tight">
        A network you can trust.
      </h3>
      <p className="mt-3 leading-7 text-[#b6c8d3]">
        Every partner is reviewed for readiness, professionalism, and
        patient-first service before joining our network.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-5 border-t border-white/15 pt-6">
        <div>
          <p className="text-3xl font-semibold">24/7</p>
          <p className="mt-1 text-xs text-[#b6c8d3]">Dispatch coverage</p>
        </div>
        <div>
          <p className="text-3xl font-semibold">4.9/5</p>
          <p className="mt-1 text-xs text-[#b6c8d3]">Family rating</p>
        </div>
      </div>
    </div>
  </section>
);

export { TrustSection };
