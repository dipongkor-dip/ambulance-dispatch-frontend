import { useState, type FormEvent } from "react";
import { Button } from "../../../components/ui/button";
import {
  useCreateAdminMutation,
  useCreateDriverMutation,
  useDeactivateUserMutation,
  useGetAdminUserQuery,
  useGetAdminUsersQuery,
  useGetDriversQuery,
} from "../../../redux/admin/admin.api";
import { EmptyState, getApiErrorMessage, SectionHeading, StatusBadge } from "../DashboardShared";

interface NewUserPayload {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

function readNewUser(form: HTMLFormElement): NewUserPayload {
  const data = new FormData(form);
  return {
    username: String(data.get("username") ?? "").trim(),
    email: String(data.get("email") ?? "").trim(),
    firstname: String(data.get("firstname") ?? "").trim(),
    lastname: String(data.get("lastname") ?? "").trim(),
    password: String(data.get("password") ?? ""),
  };
}

export default function AdminPeople({ canCreateAdmin = false }: { canCreateAdmin?: boolean }) {
  const [feedback, setFeedback] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { data: users = [] } = useGetAdminUsersQuery();
  const { data: drivers = [] } = useGetDriversQuery();
  const { data: selectedUser } = useGetAdminUserQuery(selectedUserId ?? 0, { skip: selectedUserId === null });
  const [createAdmin, { isLoading: isCreatingAdmin }] = useCreateAdminMutation();
  const [createDriver, { isLoading: isCreatingDriver }] = useCreateDriverMutation();
  const [deactivateUser] = useDeactivateUserMutation();

  const submitUser = async (event: FormEvent<HTMLFormElement>, kind: "admin" | "driver") => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = readNewUser(form);
    setFeedback("");
    try {
      if (kind === "admin") await createAdmin(payload).unwrap();
      else await createDriver(payload).unwrap();
      form.reset();
      setFeedback(kind === "admin" ? "Admin account created." : "Driver account created.");
    } catch (error) {
      setFeedback(getApiErrorMessage(error, `Could not create ${kind} account.`));
    }
  };

  const handleDeactivate = async (userId: number, username: string) => {
    if (!window.confirm(`Deactivate ${username}?`)) return;
    setFeedback("");
    try {
      await deactivateUser(userId).unwrap();
      setFeedback("User deactivated.");
    } catch (error) {
      setFeedback(getApiErrorMessage(error, "Could not deactivate this user."));
    }
  };

  return (
    <section>
      <SectionHeading eyebrow="Team and access" title="People management" />
      {feedback && <p className="mb-4 rounded-md border border-[#dce9e2] bg-white px-4 py-3 text-sm text-[#315844]" role="status">{feedback}</p>}
      <div className="grid gap-4 xl:grid-cols-2">
        {canCreateAdmin && <UserCreationForm kind="admin" isLoading={isCreatingAdmin} onSubmit={(event) => void submitUser(event, "admin")} />}
        <UserCreationForm kind="driver" isLoading={isCreatingDriver} onSubmit={(event) => void submitUser(event, "driver")} />
      </div>
      <div className="mt-4 overflow-hidden rounded-lg border border-[#e3eae6] bg-white">
        <div className="flex items-center justify-between border-b border-[#edf1ef] px-5 py-3"><h3 className="text-sm font-semibold text-[#253b36]">All users</h3><span className="text-xs text-[#84918d]">{users.length} accounts</span></div>
        {users.length === 0 ? <EmptyState>No user accounts found.</EmptyState> : users.map((user) => (
          <div key={user.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf1ef] px-5 py-3 last:border-0">
            <div className="min-w-0"><p className="truncate text-sm font-medium text-[#253b36]">{user.firstname} {user.lastname} <span className="font-normal text-[#84918d]">· @{user.username}</span></p><p className="mt-1 text-xs text-[#84918d]">{user.email} · <span className="capitalize">{user.role}</span> · {user.is_active ? "Active" : "Inactive"}</p></div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setSelectedUserId(selectedUserId === user.id ? null : user.id)}>{selectedUserId === user.id ? "Hide details" : "Details"}</Button>
              {user.is_active && <Button type="button" variant="ghost" size="sm" onClick={() => void handleDeactivate(user.id, user.username)}>Deactivate</Button>}
            </div>
          </div>
        ))}
        {selectedUser && <div className="border-t border-[#dce9e2] bg-[#f8faf9] px-5 py-4 text-sm text-[#64716d]"><p className="font-semibold text-[#253b36]">Account #{selectedUser.id}: {selectedUser.firstname} {selectedUser.lastname}</p><p className="mt-1">{selectedUser.email} · @{selectedUser.username} · <span className="capitalize">{selectedUser.role}</span></p><p className="mt-1">Created {new Date(selectedUser.created_at).toLocaleDateString()} · {selectedUser.is_active ? "Active" : "Inactive"}</p></div>}
      </div>
      <div className="mt-4 overflow-hidden rounded-lg border border-[#e3eae6] bg-white">
        <h3 className="border-b border-[#edf1ef] px-5 py-3 text-sm font-semibold text-[#253b36]">Drivers</h3>
        {drivers.length === 0 ? <EmptyState>No drivers registered.</EmptyState> : drivers.map((driver) => <div key={driver.id} className="flex items-center justify-between gap-3 border-b border-[#edf1ef] px-5 py-3 last:border-0"><div><p className="text-sm font-medium text-[#253b36]">{driver.firstname} {driver.lastname}</p><p className="mt-1 text-xs text-[#84918d]">{driver.email} · @{driver.username}</p></div><StatusBadge status={driver.is_active ? "active" : "inactive"} /></div>)}
      </div>
    </section>
  );
}

function UserCreationForm({
  kind,
  isLoading,
  onSubmit,
}: {
  kind: "admin" | "driver";
  isLoading: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const title = kind === "admin" ? "Create admin" : "Add driver";
  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-lg border border-[#e3eae6] bg-white p-5">
      <div><h3 className="text-sm font-semibold text-[#253b36]">{title}</h3><p className="mt-1 text-xs text-[#84918d]">Create a {kind} account for dispatch.</p></div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="username" required minLength={3} placeholder="Username" aria-label={`${kind} username`} className="h-9 rounded-md border border-[#d8e1dc] px-3 text-sm" />
        <input name="email" required type="email" placeholder="Email" aria-label={`${kind} email`} className="h-9 rounded-md border border-[#d8e1dc] px-3 text-sm" />
        <input name="firstname" required placeholder="First name" aria-label={`${kind} first name`} className="h-9 rounded-md border border-[#d8e1dc] px-3 text-sm" />
        <input name="lastname" required placeholder="Last name" aria-label={`${kind} last name`} className="h-9 rounded-md border border-[#d8e1dc] px-3 text-sm" />
        <input name="password" required minLength={6} type="password" placeholder="Temporary password" aria-label={`${kind} temporary password`} className="h-9 rounded-md border border-[#d8e1dc] px-3 text-sm sm:col-span-2" />
      </div>
      <Button type="submit" disabled={isLoading} className="h-9 rounded-md bg-[#1c6256] px-3 text-white hover:bg-[#174f46]">{isLoading ? "Creating..." : title}</Button>
    </form>
  );
}