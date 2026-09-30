import { Link, Outlet } from "react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import { DashboardShell } from "../dashboard/DashboardShell";
import {
  DashboardLoadingSkeleton,
  type DashboardRole,
} from "../dashboard/DashboardShared";
import { useGetProfileQuery } from "../../redux/auth/auth.api";

function formatRole(role: string): DashboardRole | null {
  if (role === "superadmin") return "superadmin";
  if (role === "admin") return "admin";
  if (role === "passenger" || role === "driver") return role;
  return null;
}

const DashboardLayout = () => {
  const { data: user, isLoading, isError } = useGetProfileQuery();

  if (isLoading) {
    return <DashboardLoadingSkeleton />;
  }

  if (isError || !user) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f6f9fb] px-5">
        <section className="w-full max-w-md rounded-lg border border-[#d9e5ec] bg-white p-7 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-md bg-[#e3f1ef] text-[#176b78]">
            <ShieldCheck className="size-6" />
          </span>
          <h1 className="mt-4 text-xl font-semibold text-[#102a43]">
            Sign in to continue
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#647b8b]">
            Your dashboard is connected to your account. Sign in to see your
            role-specific workspace.
          </p>
          <Button
            render={<Link to="/" />}
            className="mt-5 h-10 rounded-md bg-[#176b78] px-4 text-white hover:bg-[#125762]"
          >
            Back to home <ArrowRight className="size-4" />
          </Button>
        </section>
      </main>
    );
  }

  const role = formatRole(user.role);
  if (!role) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f6f9fb] px-5 text-center text-sm text-[#647b8b]">
        This account does not have dashboard access.
      </main>
    );
  }

  return (
    <DashboardShell user={user} role={role}>
      <Outlet context={{ role }} />
    </DashboardShell>
  );
};

export default DashboardLayout;
