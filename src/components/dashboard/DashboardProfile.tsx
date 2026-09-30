import { useEffect, useState, type FormEvent } from "react";
import { UserRound } from "lucide-react";
import { Button } from "../ui/button";
import {
  useCheckUsernameAvailabilityQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/auth/auth.api";
import { getApiErrorMessage, SectionHeading, StatusBadge } from "./DashboardShared";

export default function DashboardProfile() {
  const { data: user, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [feedback, setFeedback] = useState("");
  const [username, setUsername] = useState("");
  const [usernameToCheck, setUsernameToCheck] = useState("");

  useEffect(() => {
    if (user) setUsername(user.username);
  }, [user?.id, user?.username]);

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setUsernameToCheck(username.trim()),
      300,
    );
    return () => window.clearTimeout(timeout);
  }, [username]);

  const normalizedUsername = username.trim();
  const isCurrentUsername = Boolean(
    user && normalizedUsername === user.username,
  );
  const shouldCheckUsername =
    normalizedUsername.length >= 3 && !isCurrentUsername;
  const {
    currentData: usernameAvailability,
    isFetching: isCheckingUsername,
    isError: isUsernameCheckError,
  } = useCheckUsernameAvailabilityQuery(usernameToCheck, {
    skip: !shouldCheckUsername || usernameToCheck !== normalizedUsername,
  });
  const isUsernameAvailable =
    isCurrentUsername ||
    (usernameAvailability?.available === true &&
      !isCheckingUsername &&
      !isUsernameCheckError &&
      usernameToCheck === normalizedUsername);

  const submitProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setFeedback("");
    if (!isUsernameAvailable) {
      setFeedback("Choose a username confirmed as available before saving.");
      return;
    }
    try {
      await updateProfile({
        username: normalizedUsername,
        firstname: String(data.get("firstname") ?? "").trim(),
        lastname: String(data.get("lastname") ?? "").trim(),
        email: String(data.get("email") ?? "").trim(),
      }).unwrap();
      setFeedback("Profile updated.");
    } catch (error) {
      setFeedback(getApiErrorMessage(error, "Could not update your profile."));
    }
  };

  if (isLoading || !user) {
    return <div className="py-10 text-sm text-[#647b8b]">Loading profile...</div>;
  }

  const fullName = [user.firstname, user.lastname].filter(Boolean).join(" ") || user.username;

  return (
    <section className="space-y-6">
      <SectionHeading eyebrow="Your account" title="Profile" />
      {feedback && <p className="rounded-md border border-[#dce9e2] bg-white px-4 py-3 text-sm text-[#315844]" role="status">{feedback}</p>}

      <div className="flex flex-wrap items-center gap-4 border-b border-[#dfe8e3] pb-6">
        <span className="flex size-14 items-center justify-center rounded-full bg-[#e3f1ef] text-[#176b78]"><UserRound className="size-6" /></span>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-semibold text-[#102a43]">{fullName}</h1>
          <p className="mt-1 text-sm text-[#647b8b]">@{user.username}</p>
        </div>
        <StatusBadge status={user.is_active ? "active" : "inactive"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <dl className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="border-b border-[#e3eae6] pb-3"><dt className="text-xs font-medium text-[#84918d]">Username</dt><dd className="mt-1 text-sm font-medium text-[#253b36]">{user.username}</dd></div>
          <div className="border-b border-[#e3eae6] pb-3"><dt className="text-xs font-medium text-[#84918d]">Role</dt><dd className="mt-1 text-sm font-medium capitalize text-[#253b36]">{user.role}</dd></div>
          <div className="border-b border-[#e3eae6] pb-3"><dt className="text-xs font-medium text-[#84918d]">Member since</dt><dd className="mt-1 text-sm font-medium text-[#253b36]">{new Date(user.created_at).toLocaleDateString()}</dd></div>
          <div className="border-b border-[#e3eae6] pb-3"><dt className="text-xs font-medium text-[#84918d]">Account status</dt><dd className="mt-1 text-sm font-medium capitalize text-[#253b36]">{user.is_active ? "Active" : "Inactive"}</dd></div>
        </dl>

        <form onSubmit={submitProfile} className="space-y-4 rounded-lg border border-[#e3eae6] bg-white p-5">
          <div><h2 className="text-sm font-semibold text-[#253b36]">Edit personal information</h2><p className="mt-1 text-xs text-[#84918d]">Your username must be unique. Role is managed by your administrator.</p></div>
          <label className="block text-xs font-medium text-[#64716d]">Username<input name="username" required minLength={3} maxLength={100} autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} className="mt-1.5 h-10 w-full rounded-md border border-[#d8e1dc] px-3 text-sm font-normal text-[#253b36]" /></label>
          {normalizedUsername !== user.username && normalizedUsername.length > 0 && (
            <p
              className={`-mt-3 text-xs ${
                isUsernameAvailable
                  ? "text-[#176b78]"
                  : isCheckingUsername || usernameToCheck !== normalizedUsername
                    ? "text-[#647b8b]"
                    : "text-[#b42318]"
              }`}
              role="status"
              aria-live="polite"
            >
              {normalizedUsername.length < 3
                ? "Enter at least 3 characters."
                : usernameToCheck !== normalizedUsername || isCheckingUsername
                  ? "Checking username availability..."
                  : isUsernameCheckError
                    ? "Could not check this username. Try editing it again."
                    : usernameAvailability?.available
                      ? "Username is available."
                      : "That username is already taken."}
            </p>
          )}
          <label className="block text-xs font-medium text-[#64716d]">First name<input name="firstname" required defaultValue={user.firstname} className="mt-1.5 h-10 w-full rounded-md border border-[#d8e1dc] px-3 text-sm font-normal text-[#253b36]" /></label>
          <label className="block text-xs font-medium text-[#64716d]">Last name<input name="lastname" required defaultValue={user.lastname} className="mt-1.5 h-10 w-full rounded-md border border-[#d8e1dc] px-3 text-sm font-normal text-[#253b36]" /></label>
          <label className="block text-xs font-medium text-[#64716d]">Email address<input name="email" type="email" required defaultValue={user.email ?? ""} className="mt-1.5 h-10 w-full rounded-md border border-[#d8e1dc] px-3 text-sm font-normal text-[#253b36]" /></label>
          <Button type="submit" disabled={isSaving || !isUsernameAvailable} className="h-9 rounded-md bg-[#1c6256] px-4 text-white hover:bg-[#174f46]">{isSaving ? "Saving..." : "Save profile"}</Button>
        </form>
      </div>
    </section>
  );
}