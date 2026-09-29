import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  HeartPulse,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../redux/auth/auth.api";
import config from "../../config/venv";

export type AuthMode = "login" | "register";

interface LoginProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: () => void;
  notice?: string;
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error && typeof error === "object" && "data" in error) {
    const data = error.data;
    if (data && typeof data === "object" && "detail" in data) {
      const detail = data.detail;
      if (typeof detail === "string") return detail;
    }
  }
  return fallback;
}

const Login = ({
  mode,
  onModeChange,
  onOpenChange,
  onAuthSuccess,
  notice,
}: LoginProps) => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [register, { isLoading: isRegisteringAccount }] = useRegisterMutation();
  const isRegistering = mode === "register";
  const isSubmitting = isLoggingIn || isRegisteringAccount;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsError(false);

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (isRegistering) {
      const fullName = String(formData.get("name") ?? "").trim();
      const [firstname = "", ...lastnameParts] = fullName.split(/\s+/);

      try {
        await register({
          username,
          email: String(formData.get("email") ?? "").trim(),
          firstname,
          lastname: lastnameParts.join(" "),
          password,
        }).unwrap();
        setMessage("Account created. Sign in with your username and password.");
        onModeChange("login");
      } catch (error) {
        setIsError(true);
        setMessage(getErrorMessage(error, "Could not create your account."));
      }
      return;
    }

    try {
      await login({ username, password }).unwrap();
      onAuthSuccess();
    } catch (error) {
      setIsError(true);
      setMessage(
        getErrorMessage(error, "Unable to sign in. Check your credentials."),
      );
    }
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
              setIsError(false);
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
              setIsError(false);
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
          {notice && (
            <p
              className="mt-3 rounded-md border border-[#b9d7df] bg-[#edf5f8] px-3 py-2 text-sm text-[#23445c]"
              role="status"
            >
              {notice}
            </p>
          )}
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
            Username
            <span className="relative block">
              <UserRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#82918d]" />
              <input
                autoComplete="username"
                className="h-11 w-full rounded-md border border-[#d8e1dc] bg-white pr-3 pl-10 text-sm outline-none transition focus:border-[#3e8375] focus:ring-3 focus:ring-[#3e8375]/15"
                name="username"
                placeholder="Your username"
                required
                minLength={3}
                type="text"
              />
            </span>
          </label>

          {isRegistering && (
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
          )}

          <label className="block space-y-1.5 text-sm font-medium text-[#273c38]">
            Password
            <span className="relative block">
              <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#82918d]" />
              <input
                autoComplete={
                  isRegistering ? "new-password" : "current-password"
                }
                className="h-11 w-full rounded-md border border-[#d8e1dc] bg-white pr-3 pl-10 text-sm outline-none transition focus:border-[#3e8375] focus:ring-3 focus:ring-[#3e8375]/15"
                minLength={6}
                name="password"
                placeholder="At least 6 characters"
                required
                type="password"
              />
            </span>
          </label>

          {!isRegistering && (
            <div className="-mt-2 flex justify-end">
              <Link
                to="/forgot-password"
                onClick={() => onOpenChange(false)}
                className="text-sm font-medium text-[#1c6256] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          )}

          {message && (
            <p
              className={`rounded-md px-3 py-2 text-sm leading-5 ${isError ? "bg-[#fff0ec] text-[#a33b2b]" : "bg-[#eef5e6] text-[#315844]"}`}
              role={isError ? "alert" : "status"}
            >
              {message}
            </p>
          )}

          <Button
            disabled={isSubmitting}
            className="h-11 w-full justify-between rounded-md bg-[#1c6256] px-4 text-white hover:bg-[#174f46]"
            type="submit"
          >
            <span>
              {isSubmitting
                ? "Please wait..."
                : isRegistering
                  ? "Create account"
                  : "Sign in"}
            </span>
            {!isSubmitting && <ArrowRight className="size-4" />}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-[#82918d]">
          <span className="h-px flex-1 bg-[#e2e9e5]" />
          or continue with
          <span className="h-px flex-1 bg-[#e2e9e5]" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-10 rounded-md border-[#d8e1dc] bg-white text-[#273c38]"
            onClick={() => window.location.assign(`${config.googleAuthUrl}/auth/google`)}
          >
            <span aria-hidden="true" className="text-base leading-none font-bold text-[#4285f4]">
              G
            </span>
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-10 rounded-md border-[#d8e1dc] bg-white text-[#273c38]"
            onClick={() => window.location.assign(`${config.baseUrl}/auth/facebook`)}
          >
            <span className="text-base leading-none font-bold text-[#1877f2]">f</span>
            Facebook
          </Button>
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-[#788782]">
          By continuing, you agree to our terms of service and privacy policy.
        </p>
      </section>
    </div>
  );
};

export default Login;
