import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import {
  Activity,
  Ambulance,
  Banknote,
  CircleUserRound,
  ClipboardList,
  LayoutDashboard,
  Plus,
  Truck,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SheetClose } from "../ui/sheet";

export type DashboardRole = "superadmin" | "admin" | "passenger" | "driver";

export interface DashboardOutletContext {
  role: DashboardRole;
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (error && typeof error === "object" && "data" in error) {
    const data = error.data;
    if (data && typeof data === "object" && "detail" in data) {
      const detail = data.detail;
      if (typeof detail === "string") return detail;
    }
  }
  return fallback;
}

type NavItem = { label: string; href: string; icon: LucideIcon };

const adminNavigation: NavItem[] = [
  { label: "Overview", href: "overview", icon: LayoutDashboard },
  { label: "Ride requests", href: "requests", icon: ClipboardList },
  { label: "Fleet", href: "fleet", icon: Ambulance },
  { label: "People", href: "people", icon: CircleUserRound },
  { label: "Trips and payments", href: "trips", icon: Activity },
  { label: "Profile", href: "profile", icon: UserRound },
  { label: "Account", href: "account", icon: CircleUserRound },
];

const navigationByRole: Record<DashboardRole, NavItem[]> = {
  superadmin: adminNavigation,
  admin: adminNavigation,
  passenger: [
    { label: "Overview", href: "overview", icon: LayoutDashboard },
    { label: "Book a ride", href: "booking", icon: Plus },
    { label: "My requests", href: "requests", icon: ClipboardList },
    { label: "My trips", href: "trips", icon: Truck },
    { label: "My payments", href: "payments", icon: Banknote },
    { label: "Profile", href: "profile", icon: UserRound },
    { label: "Account", href: "account", icon: CircleUserRound },
  ],
  driver: [
    { label: "Overview", href: "overview", icon: LayoutDashboard },
    { label: "Dispatch queue", href: "dispatch", icon: Activity },
    { label: "My trips", href: "trips", icon: Truck },
    { label: "My payments", href: "payments", icon: Banknote },
    { label: "Profile", href: "profile", icon: UserRound },
    { label: "Account", href: "account", icon: CircleUserRound },
  ],
};

export function DashboardNav({
  role,
  mobile = false,
}: {
  role: DashboardRole;
  mobile?: boolean;
}) {
  const location = useLocation();
  return (
    <nav aria-label="Dashboard navigation" className="space-y-1">
      {navigationByRole[role].map(({ label, href, icon: Icon }) => {
        const target = `/dashboard/${role}/${href}`;
        const isActive = location.pathname === target;
        const link = (
          <Link
            to={target}
            aria-current={isActive ? "page" : undefined}
            className={`flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#d8f273] text-[#153b34]"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </Link>
        );

        return mobile ? (
          <SheetClose key={label} render={link} />
        ) : (
          <div key={label}>{link}</div>
        );
      })}
    </nav>
  );
}

export function Metric({
  label,
  value,
  detail,
  icon: Icon,
  tone = "green",
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
  tone?: "green" | "blue" | "orange" | "lime";
}) {
  const tones = {
    green: "bg-[#e5f4ee] text-[#26725c]",
    blue: "bg-[#e8f0f8] text-[#426b91]",
    orange: "bg-[#fff0e6] text-[#b76535]",
    lime: "bg-[#f0f5d9] text-[#657923]",
  };

  return (
    <article className="rounded-lg border border-[#e3eae6] bg-white p-5 shadow-[0_2px_10px_rgba(23,51,47,0.025)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#687773]">{label}</p>
          <p className="mt-3 text-3xl leading-none font-semibold tracking-normal text-[#17332f]">
            {value}
          </p>
        </div>
        <span
          className={`flex size-10 items-center justify-center rounded-md ${tones[tone]}`}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-4 text-xs text-[#84918d]">{detail}</p>
    </article>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.12em] text-[#668078] uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-lg font-semibold text-[#17332f]">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const tone = ["completed", "available", "success", "accepted"].includes(
    normalized,
  )
    ? "bg-[#e7f4ed] text-[#26725c]"
    : ["pending", "ongoing", "busy"].includes(normalized)
      ? "bg-[#fff1df] text-[#a96327]"
      : "bg-[#eef1ef] text-[#64716d]";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${tone}`}
    >
      {status}
    </span>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="px-5 py-10 text-center text-sm text-[#788782]">
      {children}
    </div>
  );
}

function SkeletonBlock({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-[#e3ebe7] ${className}`}
    />
  );
}

export function DashboardLoadingSkeleton() {
  return (
    <div
      className="min-h-screen bg-[#f3f7f5]"
      aria-busy="true"
      aria-label="Loading dashboard"
    >
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col gap-8 bg-[#123f3b] px-6 py-6 lg:flex">
        <SkeletonBlock className="h-10 w-36 bg-white/15" />
        <div className="space-y-3">
          <SkeletonBlock className="h-3 w-20 bg-white/10" />
          <SkeletonBlock className="h-10 w-full bg-white/15" />
          <SkeletonBlock className="h-10 w-full bg-white/10" />
          <SkeletonBlock className="h-10 w-full bg-white/10" />
        </div>
        <SkeletonBlock className="mt-auto h-10 w-full bg-white/10" />
      </aside>

      <div className="lg:pl-64">
        <header className="flex h-16 items-center justify-between border-b border-[#e0e9e4] bg-white px-4 sm:px-7 lg:px-9">
          <SkeletonBlock className="h-8 w-36" />
          <SkeletonBlock className="h-9 w-32 rounded-full" />
        </header>
        <main className="mx-auto max-w-[1440px] space-y-7 px-4 py-7 sm:px-7 sm:py-9 lg:px-9">
          <span className="sr-only">Loading dashboard...</span>
          <SkeletonBlock className="h-16 w-full" />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="rounded-lg border border-[#e3eae6] bg-white p-5"
              >
                <SkeletonBlock className="h-4 w-28" />
                <SkeletonBlock className="mt-4 h-8 w-16" />
                <SkeletonBlock className="mt-4 h-3 w-36" />
              </div>
            ))}
          </div>
          <section className="space-y-4">
            <div>
              <SkeletonBlock className="h-3 w-24" />
              <SkeletonBlock className="mt-2 h-6 w-48" />
            </div>
            <div className="overflow-hidden rounded-lg border border-[#e3eae6] bg-white">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 border-b border-[#edf1ef] px-5 py-4 last:border-0"
                >
                  <div className="min-w-0 flex-1">
                    <SkeletonBlock className="h-4 w-2/5" />
                    <SkeletonBlock className="mt-2 h-3 w-1/3" />
                  </div>
                  <SkeletonBlock className="h-6 w-20 rounded-full" />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
