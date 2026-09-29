import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, MapPin, PhoneCall } from "lucide-react";
import { Button } from "../components/ui/button";

const SUPPORT_EMAIL = "support@callnow.health";

const Contact = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const topic = String(formData.get("topic") ?? "General question");
    const details = String(formData.get("message") ?? "").trim();
    const subject = encodeURIComponent(`CallNow support: ${topic}`);
    const body = encodeURIComponent(`Name: ${name}\nReply to: ${email}\n\n${details}`);

    setMessage("Opening your email app with the message details. You can review and send it there.");
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="bg-[#f6f9fb] text-[#102a43]">
      <section className="border-b border-[#d9e5ec] bg-[#edf5f8]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#176b78] uppercase">Contact CallNow</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold text-[#102a43] sm:text-5xl">We’re here to help you move forward.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#567086]">Reach our support team with account or service questions. For immediate danger, contact your local emergency services.</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-14">
        <section>
          <p className="text-xs font-semibold tracking-[0.14em] text-[#176b78] uppercase">Reach our team</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#102a43]">Contact information</h2>
          <div className="mt-7 space-y-6">
            <a href={`mailto:${SUPPORT_EMAIL}`} className="group flex gap-4 border-b border-[#d9e5ec] pb-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-[#e3f1ef] text-[#176b78]"><Mail className="size-5" /></span>
              <span><span className="block text-xs text-[#6b8090]">Email support</span><span className="mt-1 block text-sm font-semibold text-[#18384c] group-hover:text-[#176b78]">{SUPPORT_EMAIL}</span></span>
            </a>
            <a id="emergency" href="tel:911" className="group flex gap-4 border-b border-[#d9e5ec] pb-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-[#fff0f1] text-[#d62839]"><PhoneCall className="size-5" /></span>
              <span><span className="block text-xs text-[#6b8090]">Emergency line</span><span className="mt-1 block text-sm font-semibold text-[#18384c] group-hover:text-[#d62839]">Call 911 for immediate danger</span></span>
            </a>
            <div className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-[#e3f1ef] text-[#176b78]"><MapPin className="size-5" /></span>
              <span><span className="block text-xs text-[#6b8090]">Service availability</span><span className="mt-1 block text-sm font-semibold text-[#18384c]">Local communities, around the clock</span></span>
            </div>
          </div>
          <p className="mt-8 max-w-sm text-xs leading-5 text-[#6b8090]">This contact form opens your email application. It does not send your message until you review and send it.</p>
        </section>

        <section className="border border-[#d9e5ec] bg-white p-5 sm:p-8">
          <h2 className="text-xl font-semibold text-[#102a43]">Send a message</h2>
          <p className="mt-2 text-sm leading-6 text-[#567086]">Share a few details and we’ll prepare an email to our support address.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-[#23445c]">Your name<input name="name" autoComplete="name" required className="mt-2 h-10 w-full rounded-md border border-[#cbd9df] bg-white px-3 text-sm font-normal outline-none focus:border-[#176b78] focus:ring-3 focus:ring-[#176b78]/15" /></label>
              <label className="block text-sm font-medium text-[#23445c]">Email address<input name="email" type="email" autoComplete="email" required className="mt-2 h-10 w-full rounded-md border border-[#cbd9df] bg-white px-3 text-sm font-normal outline-none focus:border-[#176b78] focus:ring-3 focus:ring-[#176b78]/15" /></label>
            </div>
            <label className="block text-sm font-medium text-[#23445c]">Topic<select name="topic" className="mt-2 h-10 w-full rounded-md border border-[#cbd9df] bg-white px-3 text-sm font-normal outline-none focus:border-[#176b78] focus:ring-3 focus:ring-[#176b78]/15"><option>General question</option><option>Account access</option><option>Ride request</option><option>Ambulance partnership</option></select></label>
            <label className="block text-sm font-medium text-[#23445c]">How can we help?<textarea name="message" required rows={5} className="mt-2 w-full resize-y rounded-md border border-[#cbd9df] bg-white px-3 py-2.5 text-sm font-normal leading-6 outline-none focus:border-[#176b78] focus:ring-3 focus:ring-[#176b78]/15" /></label>
            {message && <p className="text-sm text-[#176b78]" role="status">{message}</p>}
            <Button type="submit" className="h-10 gap-2 rounded-md bg-[#102a43] px-4 text-white hover:bg-[#1b4567]">Open email app <ArrowUpRight className="size-4" /></Button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Contact;