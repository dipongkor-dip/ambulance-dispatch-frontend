import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import {
  getAccessToken,
  getLoginRequiredUrl,
  PASSENGER_BOOKING_PATH,
} from "../../lib/authSession";
import { Button } from "../ui/button";

const FinalCtaSection = () => (
  <section id="scheduled" className="bg-[#e6f2f4]">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#176b78]">
          Ready when you are
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#102a43] sm:text-3xl">
          Make your next step a little easier.
        </h2>
      </div>
      <Button
        render={
          <Link
            to={
              getAccessToken()
                ? PASSENGER_BOOKING_PATH
                : getLoginRequiredUrl(PASSENGER_BOOKING_PATH)
            }
          />
        }
        nativeButton={false}
        className="h-auto shrink-0 bg-[#102a43] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#1b4567]"
      >
        Request an ambulance <ArrowRight className="size-4" />
      </Button>
    </div>
  </section>
);

export { FinalCtaSection };
