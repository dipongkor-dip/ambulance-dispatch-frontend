import { CreditCard, LockKeyhole, ClipboardCheck } from "lucide-react";

const policies = [
    {
        icon: LockKeyhole,
        title: "Your information",
        description:
            "Information shared in a request helps coordinate the trip. Only provide details relevant to arranging care and reaching the patient.",
    },
    {
        icon: ClipboardCheck,
        title: "Booking and dispatch",
        description:
            "A submitted request starts the dispatch process. Availability and arrival estimates can change; follow the latest updates shown for your booking.",
    },
    {
        icon: CreditCard,
        title: "Payments",
        description:
            "Review the displayed fare and payment details before confirming. Keep your receipt or payment confirmation for any follow-up questions.",
    },
];

const PoliciesSection = () => (
    <section
        id="policies"
        className="border-y border-[#d9e5ec] bg-white"
    >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#208478] sm:text-sm">
                    Clear expectations
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#102a43] sm:text-4xl">
                    Our service policies.
                </h2>
                <p className="mt-4 leading-7 text-[#647b8b]">
                    A few important points to keep in mind when arranging ambulance
                    transport through CallNow.
                </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
                {policies.map(({ icon: Icon, title, description }) => (
                    <article
                        key={title}
                        className="border-t-2 border-[#2a9d8f] bg-[#f8fbfc] p-6"
                    >
                        <div className="flex size-11 items-center justify-center rounded-xl bg-[#e3f1f4] text-[#176b78]">
                            <Icon className="size-5" />
                        </div>
                        <h3 className="mt-6 text-base font-semibold text-[#102a43] sm:text-lg">
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

export { PoliciesSection };