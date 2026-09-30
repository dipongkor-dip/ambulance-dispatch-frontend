import { Clock3, PhoneCall } from "lucide-react";
import { Link } from "react-router";

const BookingSection = () => (
  <section
    id="book"
    className="mx-auto max-w-7xl scroll-mt-6 px-5 py-16 sm:px-8 lg:px-10 lg:py-20"
  >
    <div className="grid gap-8 rounded-[1.75rem] border border-[#d7e4e9] bg-white p-6 shadow-[0_18px_50px_rgba(22,60,79,0.06)] sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#d62839]">
          Start a request
        </p>
        <h2 className="mt-3 max-w-sm text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#102a43] sm:text-4xl">
          Get the right care moving.
        </h2>
        <p className="mt-4 max-w-sm leading-7 text-[#647b8b]">
          Give our dispatch team a few details. We will take it from there.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href="tel:911"
          className="group flex items-center justify-between rounded-xl border border-[#d8e5ea] bg-[#f8fbfc] p-4 transition-colors hover:border-[#d62839] hover:bg-[#fff8f8]"
        >
          <span>
            <span className="block text-sm font-semibold text-[#102a43]">
              Emergency response
            </span>
            <span className="mt-1 block text-xs text-[#718797]">
              Immediate assistance
            </span>
          </span>
          <span className="flex size-10 items-center justify-center rounded-full bg-[#d62839] text-white">
            <PhoneCall className="size-4" />
          </span>
        </a>
        <Link
          to="/#scheduled"
          className="group flex items-center justify-between rounded-xl border border-[#d8e5ea] bg-[#f8fbfc] p-4 transition-colors hover:border-[#2a9d8f] hover:bg-[#f4fbf9]"
        >
          <span>
            <span className="block text-sm font-semibold text-[#102a43]">
              Schedule transport
            </span>
            <span className="mt-1 block text-xs text-[#718797]">
              Plan ahead with ease
            </span>
          </span>
          <span className="flex size-10 items-center justify-center rounded-full bg-[#dff3ef] text-[#208478]">
            <Clock3 className="size-4" />
          </span>
        </Link>
      </div>
    </div>
  </section>
);

export { BookingSection };
