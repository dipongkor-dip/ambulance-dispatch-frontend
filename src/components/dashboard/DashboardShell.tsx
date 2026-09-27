import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowDownRight,
  CalendarClock,
  HeartPulse,
  LogOut,
  Menu,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useLogoutMutation } from "../../redux/auth/auth.api";
import { DashboardNav, type DashboardRole } from "./DashboardShared";

export interface DashboardUser {
  username: string;
  firstname: string;
  lastname: string;
  role: string;
}

const roleLabels: Record<DashboardRole, string> = {
  superadmin: "Superadmin",
  admin: "Administration",
  passenger: "Passenger",
  driver: "Driver",
};

export function DashboardShell({
  user,
  role,
  children,
}: {
  user: DashboardUser;
  role: DashboardRole;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const name =
    [user.firstname, user.lastname].filter(Boolean).join(" ") || user.username;
  const RoleIcon =
    role === "admin" || role === "superadmin"
      ? ShieldCheck
      : role === "driver"
        ? Stethoscope
        : HeartPulse;

  const handleLogout = async () => {
    await logout().unwrap();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f3f7f5] text-[#17332f]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col bg-[#123f3b] px-4 py-5 lg:flex">
        <Link to="/" className="mb-10 flex items-center gap-3 px-2">
          <span className="flex size-10 items-center justify-center rounded-md bg-[#d8f273] text-[#153b34]">
            <HeartPulse className="size-5" />
          </span>
          <span>
            <span className="block text-sm font-bold tracking-[0.08em] text-white">
              CALLNOW
            </span>
            <span className="mt-0.5 block text-[11px] text-white/55">
              Dispatch workspace
            </span>
          </span>
        </Link>
        <div className="mb-3 px-3 text-[10px] font-semibold tracking-[0.14em] text-white/45 uppercase">
          Workspace
        </div>
        <DashboardNav role={role} />
        <div className="mt-auto border-t border-white/10 pt-4">
          <Link
            to="/"
            className="flex h-10 items-center gap-3 rounded-md px-3 text-sm text-white/65 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowDownRight className="size-4" />
            Public home
          </Link>
          <button
            type="button"
            onClick={() => void handleLogout()}
            disabled={isLoggingOut}
            className="mt-1 flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm text-white/65 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <LogOut className="size-4" />
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-[#e0e9e4] bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-7 lg:px-9">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon"
                      className="lg:hidden"
                      aria-label="Open dashboard navigation"
                    />
                  }
                >
                  <Menu className="size-4" />
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="border-[#e0e9e4] bg-[#123f3b] text-white"
                >
                  <SheetHeader>
                    <SheetTitle className="text-white">
                      <span className="flex items-center gap-2">
                        <HeartPulse className="size-5 text-[#d8f273]" />
                        CALLNOW
                      </span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="px-4 pt-2">
                    <p className="mb-3 text-[10px] font-semibold tracking-[0.14em] text-white/45 uppercase">
                      Workspace
                    </p>
                    <DashboardNav role={role} mobile />
                  </div>
                  <div className="mt-auto px-4 pb-4">
                    <button
                      type="button"
                      onClick={() => void handleLogout()}
                      className="flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm text-white/70 hover:bg-white/10"
                    >
                      <LogOut className="size-4" />
                      Sign out
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
              <div>
                <p className="text-[11px] font-medium text-[#83908b]">
                  {roleLabels[role]} workspace
                </p>
                <p className="text-sm font-semibold text-[#253b36]">
                  {role === "admin" || role === "superadmin"
                    ? "Operations"
                    : role === "driver"
                      ? "Dispatch"
                      : "My rides"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-[#253b36]">{name}</p>
                <p className="mt-0.5 text-xs capitalize text-[#83908b]">
                  {user.role}
                </p>
              </div>
              <span className="flex size-9 items-center justify-center rounded-full bg-[#e5f4ee] text-[#26725c]">
                <UserRound className="size-4" />
              </span>
              <Button
                onClick={() => void handleLogout()}
                disabled={isLoggingOut}
                variant="ghost"
                size="icon"
                className="hidden text-[#65736e] hover:text-[#17332f] sm:inline-flex"
                aria-label="Sign out"
              >
                <LogOut className="size-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-4 py-7 sm:px-7 sm:py-9 lg:px-9">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#dce9e2] bg-[#eaf4ee] px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-md bg-white text-[#26725c]">
                <RoleIcon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#24463d]">
                  Welcome, {name}
                </p>
                <p className="mt-0.5 text-xs text-[#668078]">
                  Your {roleLabels[role].toLowerCase()} workspace is ready.
                </p>
              </div>
            </div>
            <div className="hidden items-center gap-1.5 text-xs font-medium text-[#668078] sm:flex">
              <CalendarClock className="size-3.5" />
              {new Date().toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
          {children}
          <footer className="mt-12 border-t border-[#dfe8e3] py-5 text-xs text-[#899590]">
            CALLNOW · Emergency transport coordination
          </footer>
        </main>
      </div>
    </div>
  );
}

export default DashboardShell;
