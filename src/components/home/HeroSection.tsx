import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  MapPin,
  Radio,
  Siren,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  getAccessToken,
  getLoginRequiredUrl,
  PASSENGER_BOOKING_PATH,
} from "../../lib/authSession";

const HeroSection = () => {
  const [showResponseSteps, setShowResponseSteps] = useState(false);
  const navigate = useNavigate();

  const requestAmbulance = () => {
    navigate(
      getAccessToken()
        ? PASSENGER_BOOKING_PATH
        : getLoginRequiredUrl(PASSENGER_BOOKING_PATH),
    );
  };

  return (
    <section className="relative border-b border-[#d9e5ec] bg-[#edf5f8]">
      <div className="absolute -right-32 -top-44 h-120 w-120 rounded-full bg-[#d8edf0]" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-tr-[5rem] bg-[#e1eef1]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 sm:gap-12 sm:px-8 sm:pb-20 sm:pt-12 lg:grid-cols-[1.04fr_0.96fr] lg:px-10 lg:pb-28 lg:pt-20">
        <div className="min-w-0 max-w-2xl">
          <div className="mb-7 flex flex-wrap items-center gap-4">
            <svg
              viewBox="0 0 72 72"
              role="img"
              aria-labelledby="callnow-logo-title"
              className="size-16 shrink-0 drop-shadow-[0_10px_14px_rgba(16,42,67,0.18)]"
            >
              <title id="callnow-logo-title">CallNow</title>
              <rect
                x="1.5"
                y="1.5"
                width="69"
                height="69"
                rx="21"
                fill="#102a43"
                stroke="#2a9d8f"
                strokeWidth="3"
              />
              <path
                className="callnow-logo-heart"
                d="M36 57S16.5 45.7 16.5 32.3A10.4 10.4 0 0 1 36 27a10.4 10.4 0 0 1 19.5 5.3C55.5 45.7 36 57 36 57Z"
                fill="#d62839"
                stroke="#ffb5bc"
                strokeWidth="1.2"
              />
              <path
                className="callnow-logo-ecg"
                d="M9 36h12l4-9 7 19 6-13h5l3 4h10"
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                strokeDasharray="80"
              />
            </svg>
            <div className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#b9d7df] bg-white/85 px-3.5 py-2 text-xs font-semibold text-[#176b78]">
              <span className="size-2 rounded-full bg-[#2a9d8f]" />
              Emergency response, made simple
            </div>
          </div>
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-[#102a43] sm:text-5xl lg:text-6xl xl:text-7xl">
            Help is closer than you think.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#567086] sm:text-lg sm:leading-8">
            CallNow connects patients with the right ambulance in minutes, so
            families can focus on care instead of coordination.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              onClick={requestAmbulance}
              className="h-auto bg-[#d62839] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(214,40,57,0.2)] hover:bg-[#b91f30]"
            >
              Request an ambulance <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<Link to="/#how-it-works" />}
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
        <div className="relative mx-auto w-full max-w-120 min-w-0 lg:ml-auto">
          <div className={`relative overflow-hidden rounded-[1.5rem] border-8 border-white bg-[#edf5f8] shadow-[0_24px_60px_rgba(22,60,79,0.16)] sm:rounded-[2rem] sm:border-10 ${showResponseSteps ? "aspect-[0.9] sm:aspect-[1.05] lg:aspect-[1.1]" : "aspect-[1.05] sm:aspect-[1.3]"}`}>
            <img
              src="/ambulancia.svg"
              alt="Animated ambulance driving on a road"
              className="absolute inset-0 h-full w-full object-contain p-2 sm:p-4"
            />
            <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-2 rounded-xl border border-white/25 bg-[#102a43]/80 px-2.5 py-2 text-white backdrop-blur-sm sm:left-5 sm:right-5 sm:top-5 sm:px-3 sm:py-2.5">
              <span className="flex items-center gap-2 text-xs font-semibold">
                <span className="flex size-6 items-center justify-center rounded-full bg-[#d62839]">
                  <Siren className="size-3.5" />
                </span>
                Dispatch preview
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#ffb5bc]">
                <span className="size-1.5 animate-pulse rounded-full bg-[#ef6b76]" />
                Example only
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/40 bg-white/95 p-3 shadow-lg backdrop-blur-sm sm:bottom-5 sm:left-5 sm:right-5 sm:p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#fff0f1] text-[#d62839]">
                    <HeartPulse className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6b8090]">
                      Example dispatch status
                    </p>
                    <p className="text-sm font-semibold text-[#102a43]">
                      Unit A-12 is en route
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#208478]">
                  <Radio className="size-3.5" />
                  Preview
                </span>
              </div>
              <div className="mt-3 flex flex-col items-start gap-1 border-t border-[#e4edf0] pt-3 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                <span className="flex items-center gap-1.5 text-[#647b8b]">
                  <MapPin className="size-3.5 text-[#d62839]" />
                  Central Medical District
                </span>
                <span className="font-semibold text-[#d62839]">ETA 08 min</span>
              </div>
              <button
                type="button"
                aria-expanded={showResponseSteps}
                onClick={() => setShowResponseSteps((isOpen) => !isOpen)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#176b78] hover:text-[#102a43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176b78]"
              >
                {showResponseSteps ? "Hide response steps" : "View response steps"}
                <ArrowRight
                  className={`size-3.5 transition-transform ${showResponseSteps ? "rotate-90" : ""}`}
                />
              </button>
              {showResponseSteps && (
                <ol className="mt-3 space-y-2 border-t border-[#e4edf0] pt-3 text-xs text-[#647b8b]">
                  <li className="flex items-center gap-2">
                    <span className="flex size-5 items-center justify-center rounded-full bg-[#e3f1ef] font-semibold text-[#208478]">1</span>
                    Request received by dispatch
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex size-5 items-center justify-center rounded-full bg-[#e3f1ef] font-semibold text-[#208478]">2</span>
                    An available ambulance is assigned
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex size-5 items-center justify-center rounded-full bg-[#e3f1ef] font-semibold text-[#208478]">3</span>
                    Arrival updates are shared with you
                  </li>
                </ol>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
