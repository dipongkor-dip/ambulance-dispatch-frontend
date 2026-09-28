import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router";

export const RECOVERY_EMAIL_KEY = "callnow_password_recovery_email";
export const inputClassName =
  "mt-2 h-11 w-full rounded-md border border-[#cbd9df] bg-white px-3 text-sm outline-none focus:border-[#176b78] focus:ring-3 focus:ring-[#176b78]/15";

export function getErrorMessage(error: unknown, fallback: string) {
  if (error && typeof error === "object" && "data" in error) {
    const data = error.data;
    if (data && typeof data === "object" && "detail" in data) {
      const detail = data.detail;
      if (typeof detail === "string") return detail;
    }
  }
  return fallback;
}

export default function RecoveryLayout({
  step,
  title,
  description,
  children,
}: {
  step: number;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const steps = ["Email", "Verify", "Password"];

  return (
    <main className="bg-[#f6f9fb] px-5 py-10 text-[#102a43] sm:py-14">
      <section className="mx-auto max-w-lg border border-[#d9e5ec] bg-white p-6 shadow-sm sm:p-9">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#176b78] uppercase"
        >
          <ShieldCheck className="size-4" /> CallNow account recovery
        </Link>
        <ol
          className="mt-7 grid grid-cols-3 border-b border-[#d9e5ec] pb-4"
          aria-label="Password recovery steps"
        >
          {steps.map((label, index) => (
            <li
              key={label}
              aria-current={step === index + 1 ? "step" : undefined}
              className={`text-xs font-medium ${step === index + 1 ? "text-[#176b78]" : index + 1 < step ? "text-[#23445c]" : "text-[#8a9aa5]"}`}
            >
              <span className="mb-2 block h-1 w-full bg-[#e5ecef]">
                <span
                  className={`block h-full ${index + 1 <= step ? "bg-[#2a9d8f]" : "bg-transparent"}`}
                />
              </span>
              {label}
            </li>
          ))}
        </ol>
        <h1 className="mt-7 text-2xl font-semibold text-[#102a43]">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-[#567086]">{description}</p>
        {children}
      </section>
    </main>
  );
}
