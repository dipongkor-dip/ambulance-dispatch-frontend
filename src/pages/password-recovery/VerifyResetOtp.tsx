import { useState, type FormEvent } from "react";
import { ArrowRight, KeyRound } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "@/redux/auth/auth.api";
import RecoveryLayout, {
  getErrorMessage,
  inputClassName,
  RECOVERY_EMAIL_KEY,
} from "./RecoveryLayout";

const VerifyResetOtp = () => {
  const navigate = useNavigate();
  const email = window.sessionStorage.getItem(RECOVERY_EMAIL_KEY) ?? "";
  const [verifyOTP, { isLoading: isVerifying }] = useVerifyOTPMutation();
  const [sendOTP, { isLoading: isResending }] = useSendOTPMutation();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsError(false);
    const formData = new FormData(event.currentTarget);
    const otp = String(formData.get("otp") ?? "").trim();

    try {
      await verifyOTP({ email, otp }).unwrap();
      navigate("/reset-password");
    } catch (error) {
      setIsError(true);
      setMessage(getErrorMessage(error, "Could not verify that code."));
    }
  };

  const handleResend = async () => {
    setMessage("");
    setIsError(false);
    try {
      const response = await sendOTP({ email }).unwrap();
      setMessage(response.message || "A new verification code was sent.");
    } catch (error) {
      setIsError(true);
      setMessage(
        getErrorMessage(error, "Could not resend the verification code."),
      );
    }
  };

  if (!email) return <Navigate to="/forgot-password" replace />;

  return (
    <RecoveryLayout
      step={2}
      title="Verify your email"
      description={`Enter the six-digit code sent to ${email}. The code expires after five minutes.`}
    >
      <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-[#23445c]">
          Verification code
          <span className="relative block">
            <KeyRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#82918d]" />
            <input
              autoComplete="one-time-code"
              className={`${inputClassName} pl-10 tracking-[0.2em]`}
              inputMode="numeric"
              maxLength={6}
              minLength={6}
              name="otp"
              pattern="[0-9]{6}"
              placeholder="000000"
              required
              type="text"
            />
          </span>
        </label>
        {message && (
          <p
            className={`text-sm ${isError ? "text-[#a33b2b]" : "text-[#176b78]"}`}
            role={isError ? "alert" : "status"}
          >
            {message}
          </p>
        )}
        <Button
          className="h-11 w-full justify-between rounded-md bg-[#1c6256] px-4 text-white hover:bg-[#174f46]"
          disabled={isVerifying}
          type="submit"
        >
          {isVerifying ? "Verifying..." : "Verify code"}
          {!isVerifying && <ArrowRight className="size-4" />}
        </Button>
      </form>
      <div className="mt-5 flex items-center justify-between gap-4 text-sm">
        <Link
          to="/forgot-password"
          className="font-medium text-[#567086] hover:text-[#176b78]"
        >
          Change email
        </Link>
        <button
          className="font-medium text-[#176b78] hover:underline disabled:opacity-60"
          disabled={isResending}
          onClick={() => void handleResend()}
          type="button"
        >
          {isResending ? "Resending..." : "Resend code"}
        </button>
      </div>
    </RecoveryLayout>
  );
};

export default VerifyResetOtp;
