import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const questions = [
  {
    category: "Requesting a ride",
    question: "How do I request an ambulance?",
    answer: "Sign in to your passenger dashboard, enter the pickup location and destination, then submit the request. Dispatch can then match it with an available ambulance.",
  },
  {
    category: "Requesting a ride",
    question: "Can I request a ride for another person?",
    answer: "Yes. Enter the patient's pickup location and destination. Keep your phone available so you can share any additional details with the response team.",
  },
  {
    category: "Requests and trips",
    question: "Where can I see the status of my request?",
    answer: "Open your dashboard and check the recent requests section. It shows the latest status returned by dispatch.",
  },
  {
    category: "Requests and trips",
    question: "Can I cancel a request?",
    answer: "A pending request can be cancelled from your account. Once dispatch has accepted it, contact the team so they can help coordinate the change.",
  },
  {
    category: "Your account",
    question: "I cannot sign in. What should I check?",
    answer: "Use your account username and password. If the credentials still do not work, contact support and include the email address associated with the account.",
  },
  {
    category: "Your account",
    question: "How do I change my account details?",
    answer: "Sign in and contact support if you need to update your profile information. Account settings are being expanded.",
  },
];

const HelpCenter = () => {
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase();
  const filteredQuestions = questions.filter((item) =>
    `${item.category} ${item.question} ${item.answer}`.toLowerCase().includes(query),
  );
  const categories = [...new Set(filteredQuestions.map((item) => item.category))];

  return (
    <main className="min-h-[70vh] bg-[#f6f9fb] text-[#102a43]">
      <section className="border-b border-[#d9e5ec] bg-[#edf5f8]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#176b78] uppercase">CallNow support</p>
          <h1 className="mt-3 text-4xl leading-tight font-semibold text-[#102a43] sm:text-5xl">How can we help?</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#567086]">Find answers about requesting ambulance transport, checking request status, and managing your account.</p>
          <label className="relative mt-7 block max-w-xl">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#6b8090]" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search help topics" className="h-12 w-full rounded-md border border-[#cbd9df] bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[#176b78] focus:ring-3 focus:ring-[#176b78]/15" />
          </label>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-10 lg:py-14">
        <div className="space-y-9">
          {categories.length ? categories.map((category) => (
            <section key={category}>
              <h2 className="mb-3 text-sm font-semibold text-[#176b78]">{category}</h2>
              <Accordion className="overflow-hidden rounded-lg border border-[#d9e5ec] bg-white">
                {filteredQuestions.filter((item) => item.category === category).map((item) => (
                  <AccordionItem key={item.question} value={item.question} className="border-b border-[#e5edf0] px-5 last:border-0">
                    <AccordionTrigger className="py-4 text-left text-sm font-semibold text-[#18384c] hover:no-underline">{item.question}</AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-6 text-[#567086]">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )) : (
            <div className="border-y border-[#d9e5ec] py-10 text-center text-sm text-[#567086]">No help topics match your search.</div>
          )}
        </div>

        <aside className="h-fit border-t-2 border-[#2a9d8f] bg-white p-5 sm:p-6">
          <p className="text-xs font-semibold tracking-[0.12em] text-[#176b78] uppercase">Still need a hand?</p>
          <h2 className="mt-2 text-xl font-semibold text-[#102a43]">Talk with our team</h2>
          <p className="mt-2 text-sm leading-6 text-[#567086]">For account or request questions, send us a note and include the details that will help us find your request.</p>
          <Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#176b78] hover:text-[#102a43]">Contact support <ArrowRight className="size-4" /></Link>
        </aside>
      </div>
    </main>
  );
};

export default HelpCenter;