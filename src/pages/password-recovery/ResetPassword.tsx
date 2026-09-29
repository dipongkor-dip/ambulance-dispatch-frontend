import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { showSuccessToast } from "../../lib/toast";
import { useResetPasswordMutation } from "../../redux/auth/auth.api";
import RecoveryLayout, {
  getErrorMessage,
  inputClassName,
  RECOVERY_EMAIL_KEY,
} from "./RecoveryLayout";

const ResetPassword = () => {
  const navigate = useNavigate();
  const email = window.sessionStorage.getItem(RECOVERY_EMAIL_KEY) ?? "";
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const newPassword = String(formData.get("new-password") ?? "");
    const confirmPassword = String(formData.get("confirm-password") ?? "");

    if (newPassword !== confirmPassword) {
      setMessage("The passwords do not match.");
      return;
    }

    try {
      await resetPassword({ email, new_password: newPassword }).unwrap();
      window.sessionStorage.removeItem(RECOVERY_EMAIL_KEY);
      showSuccessToast("Password reset successfully.");
      navigate("/dashboard");
    } catch (error) {
      setMessage(getErrorMessage(error, "Could not reset your password."));
    }
  };

  if (!email) return <Navigate to="/forgot-password" replace />;

  return (
    <RecoveryLayout
      step={3}
      title="Choose a new password"
      description={`Set a new password for ${email}.`}
    >
      <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-[#23445c]">
          New password
          <input
            autoComplete="new-password"
            className={inputClassName}
            minLength={6}
            name="new-password"
            placeholder="At least 6 characters"
            required
            type="password"
          />
        </label>
        <label className="block text-sm font-medium text-[#23445c]">
          Confirm new password
          <input
            autoComplete="new-password"
            className={inputClassName}
            minLength={6}
            name="confirm-password"
            placeholder="Enter the password again"
            required
            type="password"
          />
        </label>
        {message && (
          <p className="text-sm text-[#a33b2b]" role="alert">
            {message}
          </p>
        )}
        <Button
          className="h-11 w-full justify-between rounded-md bg-[#1c6256] px-4 text-white hover:bg-[#174f46]"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Updating password..." : "Reset password"}
          {!isLoading && <ArrowRight className="size-4" />}
        </Button>
      </form>
      <Link
        to="/forgot-password"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#567086] hover:text-[#176b78]"
      >
        <ArrowLeft className="size-4" /> Start over
      </Link>
    </RecoveryLayout>
  );
};

export default ResetPassword;