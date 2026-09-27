import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  HeartPulse,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

export type AuthMode = "login" | "register";

interface LoginProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

const Login = ({ mode, onModeChange }: LoginProps) => {
  const [message, setMessage] = useState("");
  const isRegistering = mode === "register";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(
      "Authentication is not connected yet. Your form is ready for backend integration.",
    );

    console.log(event)
  };

  return (
    <div className="grid md:grid-cols-[0.85fr_1.15fr]">
      <aside className="relative hidden min-h-[520px] flex-col justify-between overflow-hidden bg-[#123f3b] p-9 text-white md:flex">
        <div className="absolute -right-20 -bottom-16 size-72 rounded-full border border-white/10" />
        <div className="absolute -right-8 -bottom-4 size-48 rounded-full border border-white/10" />
        <div className="relative flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-[#d4f26a] text-[#163b32]">
            <HeartPulse className="size-5" />
          </span>
          <span className="text-sm font-semibold tracking-wide">CALLNOW</span>
        </div>
        <div className="relative max-w-xs">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-[#d4f26a] uppercase">
            Care that moves
          </p>
          <p className="text-3xl leading-tight font-semibold">
            Every second matters. Getting help should feel simple.
          </p>
          <p className="mt-4 text-sm leading-6 text-white/70">
            Sign in to manage your rides and stay connected to the care you
            need.
          </p>
        </div>
        <p className="relative text-xs text-white/55">
          Here for you, every step of the way.
        </p>
      </aside>

      <section className="px-6 py-9 sm:px-10 sm:py-11">
        <div
          className="mb-7 flex gap-1 rounded-lg bg-[#f1f5f2] p-1"
          role="tablist"
          aria-label="Choose account action"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!isRegistering}
            onClick={() => {
              setMessage("");
              onModeChange("login");
            }}
            className={`h-9 flex-1 rounded-md px-3 text-sm font-medium transition-colors ${!isRegistering ? "bg-white text-[#163b32] shadow-sm" : "text-[#61716d] hover:text-[#163b32]"}`}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isRegistering}
            onClick={() => {
              setMessage("");
              onModeChange("register");
            }}
            className={`h-9 flex-1 rounded-md px-3 text-sm font-medium transition-colors ${isRegistering ? "bg-white text-[#163b32] shadow-sm" : "text-[#61716d] hover:text-[#163b32]"}`}
          >
            Create account
          </button>
        </div>

        <div className="mb-6">
          <DialogTitle className="text-2xl tracking-normal text-[#17332f]">
            {isRegistering ? "Join CallNow" : "Welcome back"}
          </DialogTitle>
          <DialogDescription className="mt-2 leading-5">
            {isRegistering
              ? "Create an account to book and manage your medical rides."
              : "Sign in to continue to your CallNow account."}
          </DialogDescription>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isRegistering && (
            <label className="block space-y-1.5 text-sm font-medium text-[#273c38]">
              Full name
              <span className="relative block">
                <UserRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#82918d]" />
                <input
                  autoComplete="name"
                  className="h-11 w-full rounded-md border border-[#d8e1dc] bg-white pr-3 pl-10 text-sm outline-none transition focus:border-[#3e8375] focus:ring-3 focus:ring-[#3e8375]/15"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </span>
            </label>
          )}

          <label className="block space-y-1.5 text-sm font-medium text-[#273c38]">
            Email address
            <span className="relative block">
              <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#82918d]" />
              <input
                autoComplete="email"
                className="h-11 w-full rounded-md border border-[#d8e1dc] bg-white pr-3 pl-10 text-sm outline-none transition focus:border-[#3e8375] focus:ring-3 focus:ring-[#3e8375]/15"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </span>
          </label>

          <label className="block space-y-1.5 text-sm font-medium text-[#273c38]">
            Password
            <span className="relative block">
              <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#82918d]" />
              <input
                autoComplete={
                  isRegistering ? "new-password" : "current-password"
                }
                className="h-11 w-full rounded-md border border-[#d8e1dc] bg-white pr-3 pl-10 text-sm outline-none transition focus:border-[#3e8375] focus:ring-3 focus:ring-[#3e8375]/15"
                minLength={8}
                name="password"
                placeholder="At least 8 characters"
                required
                type="password"
              />
            </span>
          </label>

          {message && (
            <p
              className="rounded-md bg-[#eef5e6] px-3 py-2 text-sm leading-5 text-[#315844]"
              role="status"
            >
              {message}
            </p>
          )}

          <Button
            className="h-11 w-full justify-between rounded-md bg-[#1c6256] px-4 text-white hover:bg-[#174f46]"
            type="submit"
          >
            <span>{isRegistering ? "Create account" : "Sign in"}</span>
            <ArrowRight className="size-4" />
          </Button>
        </form>

        <p className="mt-5 text-center text-xs leading-5 text-[#788782]">
          By continuing, you agree to our terms of service and privacy policy.
        </p>
      </section>
    </div>
  );
};

export default Login;
