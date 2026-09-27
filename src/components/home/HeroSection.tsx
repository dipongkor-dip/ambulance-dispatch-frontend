import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  HeartPulse,
  MapPin,
  Radio,
  Siren,
} from "lucide-react";
import heroImage from "@/assets/hero.png";
import { Button } from "../ui/button";

const HeroSection = () => (
  <section className="relative border-b border-[#d9e5ec] bg-[#edf5f8]">
    <div className="absolute -right-32 -top-44 h-120 w-120 rounded-full bg-[#d8edf0]" />
    <div className="absolute bottom-0 left-0 h-32 w-32 rounded-tr-[5rem] bg-[#e1eef1]" />
    <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:px-10 lg:pb-28 lg:pt-20">
      <div className="max-w-2xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b9d7df] bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#176b78]">
          <span className="h-2 w-2 rounded-full bg-[#2a9d8f]" />
          Emergency response, made simple
        </div>
        <h1 className="max-w-xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#102a43] sm:text-6xl lg:text-7xl">
          Help is closer than you think.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-8 text-[#567086] sm:text-xl">
          CallNow connects patients with the right ambulance in minutes, so
          families can focus on care instead of coordination.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            render={<a href="#book" />}
            nativeButton={false}
            className="h-auto bg-[#d62839] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(214,40,57,0.2)] hover:bg-[#b91f30]"
          >
            Request an ambulance <ArrowRight className="size-4" />
          </Button>
          <Button
            render={<a href="#how-it-works" />}
            nativeButton={false}
            variant="outline"
            className="h-auto border-[#b9ccd5] bg-white/70 px-5 py-3.5 text-sm font-semibold text-[#23445c] hover:bg-white"
          >
            See how it works
          </Button>
        </div>
        <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#567086]">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="size-4 text-[#2a9d8f]" />
            Verified providers
          </span>
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="size-4 text-[#2a9d8f]" />
            24/7 availability
          </span>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-120 lg:ml-auto">
        <div className="relative aspect-[0.94] overflow-hidden rounded-[2rem] border-10 border-white bg-[#dcebef] shadow-[0_24px_60px_rgba(22,60,79,0.16)]">
          <img
            src={heroImage}
            alt="Ambulance responding to an emergency"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#102a43]/75 via-[#102a43]/5 to-[#102a43]/20" />
          <div className="absolute left-5 right-5 top-5 flex items-center justify-between rounded-xl border border-white/25 bg-[#102a43]/80 px-3 py-2.5 text-white backdrop-blur-sm">
            <span className="flex items-center gap-2 text-xs font-semibold">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#d62839]">
                <Siren className="size-3.5" />
              </span>
              Priority response
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#ffb5bc]">
              <span className="size-1.5 animate-pulse rounded-full bg-[#ef6b76]" />
              Emergency active
            </span>
          </div>
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/40 bg-white/95 p-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#fff0f1] text-[#d62839]">
                  <HeartPulse className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#6b8090]">
                    Ambulance dispatched
                  </p>
                  <p className="text-sm font-semibold text-[#102a43]">
                    Unit A-12 is en route
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#208478]">
                <Radio className="size-3.5" />
                Live
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-[#e4edf0] pt-3 text-xs">
              <span className="flex items-center gap-1.5 text-[#647b8b]">
                <MapPin className="size-3.5 text-[#d62839]" />
                Central Medical District
              </span>
              <span className="font-semibold text-[#d62839]">ETA 08 min</span>
            </div>
          </div>
        </div>
        <div className="absolute -left-5 top-10 hidden w-44 rounded-2xl border border-[#d3e4e9] bg-white p-4 shadow-[0_14px_35px_rgba(22,60,79,0.12)] sm:block">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-[#6b8090]">
              Average response
            </span>
            <Clock3 className="size-4 text-[#d62839]" />
          </div>
          <p className="text-2xl font-semibold tracking-tight text-[#102a43]">
            12 min
          </p>
          <p className="mt-1 text-xs text-[#6b8090]">in covered zones</p>
        </div>
      </div>
    </div>
  </section>
);

export { HeroSection };
