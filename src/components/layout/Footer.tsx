import { ArrowUpRight, Clock3, Mail, MapPin, PhoneCall } from "lucide-react";
import callNowIcon from "@/assets/callnow.svg";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#102a43] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <a href="/" className="inline-flex items-center gap-3" aria-label="CallNow home">
              <img src={callNowIcon} alt="" className="size-11" />
              <span className="text-xl font-semibold tracking-tight">CallNow</span>
            </a>
            <p className="mt-5 text-sm leading-6 text-[#b6c8d3]">Connecting patients with dependable ambulance care when every minute matters.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-[#91b1bf]"><span className="size-2 rounded-full bg-[#2a9d8f]" />Dispatch network online</div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Platform</h2>
            <nav className="mt-5 flex flex-col items-start gap-3 text-sm text-[#b6c8d3]" aria-label="Platform links">
              <a href="#how-it-works" className="transition-colors hover:text-white">How it works</a>
              <a href="#book" className="transition-colors hover:text-white">Request an ambulance</a>
              <a href="#scheduled" className="transition-colors hover:text-white">Schedule transport</a>
              <a href="#" className="transition-colors hover:text-white">For ambulance partners</a>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Company</h2>
            <nav className="mt-5 flex flex-col items-start gap-3 text-sm text-[#b6c8d3]" aria-label="Company links">
              <a href="#" className="transition-colors hover:text-white">About CallNow</a>
              <a href="#" className="transition-colors hover:text-white">Safety and trust</a>
              <a href="#" className="transition-colors hover:text-white">Help center</a>
              <a href="#" className="transition-colors hover:text-white">Privacy policy</a>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Reach our team</h2>
            <div className="mt-5 space-y-4 text-sm text-[#b6c8d3]">
              <p className="flex items-start gap-3"><PhoneCall className="mt-0.5 size-4 shrink-0 text-[#ef6b76]" /><span><span className="block text-xs text-[#91b1bf]">Emergency line</span><a href="tel:911" className="mt-1 block font-semibold text-white hover:text-[#f7a0a7]">Call 911 for immediate danger</a></span></p>
              <p className="flex items-start gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-[#7ecac0]" /><a href="mailto:support@callnow.health" className="hover:text-white">support@callnow.health</a></p>
              <p className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-[#7ecac0]" /><span>Serving local communities<br />around the clock</span></p>
            </div>
            <Button render={<a href="tel:911" />} nativeButton={false} className="mt-6 h-auto w-full justify-between bg-[#d62839] px-4 py-3 text-sm font-semibold text-white hover:bg-[#b91f30]">Emergency assistance <ArrowUpRight className="size-4" /></Button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-[#91b1bf] sm:flex-row sm:items-center sm:justify-between"><p>© 2026 CallNow. Built for safer, faster patient transport.</p><p className="inline-flex items-center gap-2"><Clock3 className="size-3.5" />Available 24 hours a day, 7 days a week</p></div>
      </div>
    </footer>
  );
};

export default Footer;