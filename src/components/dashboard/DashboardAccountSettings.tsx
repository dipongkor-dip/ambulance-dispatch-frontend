import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import {
  useChangePasswordMutation,
  useDeleteMyAccountMutation,
  useGetPasswordStatusQuery,
  useLogoutMutation,
  useSetPasswordMutation,
} from "../../redux/auth/auth.api";
import { getApiErrorMessage, SectionHeading } from "./DashboardShared";

export default function DashboardAccountSettings() {
  const navigate = useNavigate();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
  const {
    data: passwordStatus,
    isLoading: isLoadingPasswordStatus,
    isError: isPasswordStatusError,
    refetch: refetchPasswordStatus,
  } = useGetPasswordStatusQuery();
  const [setPassword, { isLoading: isSettingPassword }] =
    useSetPasswordMutation();
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
      const newPassword = String(data.get("new_password") ?? "");
      if (passwordStatus?.has_password) {
        await changePassword({
          current_password: String(data.get("current_password") ?? ""),
          new_password: newPassword,
        }).unwrap();
        setFeedback("Password changed.");
      } else {
        await setPassword({ new_password: newPassword }).unwrap();
        setFeedback("Password set. You can now sign in with it.");
      }
      form.reset();
    } catch (error) {
      setFeedback(
        getApiErrorMessage(
          error,
          passwordStatus?.has_password
            ? "Could not change your password."
            : "Could not set your password.",
        ),
      );
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
        {isLoadingPasswordStatus ? (
          <p className="py-6 text-sm text-[#647b8b]" role="status">
            Checking password settings...
          </p>
        ) : isPasswordStatusError || !passwordStatus ? (
          <div className="rounded-lg border border-[#d9e5ec] bg-white p-5">
            <p className="text-sm text-[#647b8b]" role="alert">
              Could not check whether your account has a password.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-3"
              onClick={() => void refetchPasswordStatus()}
            >
              Check again
            </Button>
          </div>
        ) : (
          <form onSubmit={submitPassword} className="space-y-3 rounded-lg border border-[#e3eae6] bg-white p-5">
            <h3 className="text-sm font-semibold text-[#253b36]">
              {passwordStatus.has_password ? "Change password" : "Set a password"}
            </h3>
            {!passwordStatus.has_password && (
              <p className="text-xs leading-5 text-[#647b8b]">
                Your account does not have a password yet. Set one to sign in with your username and password.
              </p>
            )}
            {passwordStatus.has_password && (
              <label className="block text-xs font-medium text-[#64716d]">
                Current password
                <input name="current_password" type="password" required autoComplete="current-password" className="mt-1.5 h-9 w-full rounded-md border border-[#d8e1dc] px-3 text-sm font-normal text-[#253b36]" />
              </label>
            )}
            <label className="block text-xs font-medium text-[#64716d]">
              {passwordStatus.has_password ? "New password" : "Password"}
              <input name="new_password" type="password" required minLength={6} autoComplete="new-password" className="mt-1.5 h-9 w-full rounded-md border border-[#d8e1dc] px-3 text-sm font-normal text-[#253b36]" />
            </label>
            <Button
              type="submit"
              disabled={isChangingPassword || isSettingPassword}
              className="h-9 rounded-md bg-[#1c6256] px-3 text-white hover:bg-[#174f46]"
            >
              {isChangingPassword || isSettingPassword
                ? "Saving..."
                : passwordStatus.has_password
                  ? "Change password"
                  : "Set password"}
            </Button>
          </form>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#dfe8e3] pt-4">
        <p className="text-xs text-[#84918d]">Deactivating your account signs you out and disables access.</p>
        <Button type="button" variant="destructive" disabled={isDeletingAccount} onClick={() => void handleDeleteAccount()}>{isDeletingAccount ? "Deactivating..." : "Deactivate my account"}</Button>
      </div>
    </section>
  );
}