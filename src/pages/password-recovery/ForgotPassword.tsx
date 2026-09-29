import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { getAccessToken } from "../../lib/authSession";
import { useSendOTPMutation } from "../../redux/auth/auth.api";
import RecoveryLayout, {
  getErrorMessage,
  inputClassName,
  RECOVERY_EMAIL_KEY,
} from "./RecoveryLayout";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [sendOTP, { isLoading }] = useSendOTPMutation();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  if (getAccessToken()) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsError(false);
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    try {
      await sendOTP({ email }).unwrap();
      window.sessionStorage.setItem(RECOVERY_EMAIL_KEY, email);
      navigate("/verify-otp");
    } catch (error) {
      setIsError(true);
      console.log(error)
      setMessage(getErrorMessage(error, "Could not send a verification code."));
    }
  };

  return (
    <RecoveryLayout
      step={1}
      title="Reset your password"
      description="Enter the email address on your account and we’ll send you a one-time verification code."
    >
      <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-[#23445c]">
          Email address
          <span className="relative block">
            <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#82918d]" />
            <input
              autoComplete="email"
              className={`${inputClassName} mt-0 pl-10`}
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </span>
        </label>
        {message && (
          <p
            className="text-sm text-[#a33b2b]"
            role={isError ? "alert" : "status"}
          >
            {message}
          </p>
        )}
        <Button
          className="h-11 w-full justify-between rounded-md bg-[#1c6256] px-4 text-white hover:bg-[#174f46]"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Sending code..." : "Send verification code"}
          {!isLoading && <ArrowRight className="size-4" />}
        </Button>
      </form>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#567086] hover:text-[#176b78]"
      >
        <ArrowLeft className="size-4" /> Back to sign in
      </Link>
    </RecoveryLayout>
  );
};

export default ForgotPassword;
