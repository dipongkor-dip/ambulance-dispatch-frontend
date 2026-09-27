import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import {
  useChangePasswordMutation,
  useDeleteMyAccountMutation,
  useLogoutMutation,
} from "../../redux/auth/auth.api";
import { getApiErrorMessage, SectionHeading } from "./DashboardShared";

export default function DashboardAccountSettings() {
  const navigate = useNavigate();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
  const [deleteAccount, { isLoading: isDeletingAccount }] =
    useDeleteMyAccountMutation();
  const [logout] = useLogoutMutation();
  const [feedback, setFeedback] = useState("");

  const submitPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setFeedback("");
    try {
      await changePassword({
        current_password: String(data.get("current_password") ?? ""),
        new_password: String(data.get("new_password") ?? ""),
      }).unwrap();
      form.reset();
      setFeedback("Password changed.");
    } catch (error) {
      setFeedback(getApiErrorMessage(error, "Could not change your password."));
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Deactivate your account? You will be signed out.")) {
      return;
    }
    try {
      await deleteAccount().unwrap();
      await logout().unwrap();
      navigate("/", { replace: true });
    } catch (error) {
      setFeedback(getApiErrorMessage(error, "Could not deactivate your account."));
    }
  };

  return (
    <section id="account" className="space-y-6">
      <SectionHeading eyebrow="Account" title="Security and account access" />
      {feedback && (
        <p className="mb-4 rounded-md border border-[#dce9e2] bg-white px-4 py-3 text-sm text-[#315844]" role="status">
          {feedback}
        </p>
      )}
      <div className="grid gap-4 lg:grid-cols-2">
        <form onSubmit={submitPassword} className="space-y-3 rounded-lg border border-[#e3eae6] bg-white p-5">
          <h3 className="text-sm font-semibold text-[#253b36]">Change password</h3>
          <label className="block text-xs font-medium text-[#64716d]">Current password<input name="current_password" type="password" required autoComplete="current-password" className="mt-1.5 h-9 w-full rounded-md border border-[#d8e1dc] px-3 text-sm font-normal text-[#253b36]" /></label>
          <label className="block text-xs font-medium text-[#64716d]">New password<input name="new_password" type="password" required minLength={6} autoComplete="new-password" className="mt-1.5 h-9 w-full rounded-md border border-[#d8e1dc] px-3 text-sm font-normal text-[#253b36]" /></label>
          <Button type="submit" disabled={isChangingPassword} className="h-9 rounded-md bg-[#1c6256] px-3 text-white hover:bg-[#174f46]">{isChangingPassword ? "Changing..." : "Change password"}</Button>
        </form>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#dfe8e3] pt-4">
        <p className="text-xs text-[#84918d]">Deactivating your account signs you out and disables access.</p>
        <Button type="button" variant="destructive" disabled={isDeletingAccount} onClick={() => void handleDeleteAccount()}>{isDeletingAccount ? "Deactivating..." : "Deactivate my account"}</Button>
      </div>
    </section>
  );
}