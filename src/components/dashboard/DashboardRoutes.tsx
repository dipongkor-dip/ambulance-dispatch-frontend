import { Navigate, Outlet, useOutletContext, useParams } from "react-router";
import DashboardAccountSettings from "./DashboardAccountSettings";
import DashboardProfile from "./DashboardProfile";
import AdminDashboard, { type AdminDashboardPage } from "./admin/AdminDashboard";
import DriverDashboard, { type DriverDashboardPage } from "./drivers/DriverDashboard";
import PassengerDashboard, { type PassengerDashboardPage } from "./passenger/PassengerDashboard";
import type { DashboardOutletContext, DashboardRole } from "./DashboardShared";

export function DashboardIndexRoute() {
  const { role } = useOutletContext<DashboardOutletContext>();
  return <Navigate to={`/dashboard/${role}/overview`} replace />;
}

function RoleProtectedDashboard({ role: requiredRole }: { role: DashboardRole }) {
  const outletContext = useOutletContext<DashboardOutletContext>();
  const { role } = outletContext;

  if (role !== requiredRole) {
    return <Navigate to={`/dashboard/${role}`} replace />;
  }

  return <Outlet context={outletContext} />;
}

export function DashboardSectionRoute() {
  const { role } = useOutletContext<DashboardOutletContext>();
  const { section } = useParams();

  if (section === "profile") return <DashboardProfile />;
  if (section === "account") return <DashboardAccountSettings />;

  if (role === "admin" || role === "superadmin") {
    const adminPages: AdminDashboardPage[] = ["overview", "requests", "fleet", "people", "trips"];
    if (!adminPages.includes(section as AdminDashboardPage)) {
      return <Navigate to={`/dashboard/${role}/overview`} replace />;
    }
    return (
      <AdminDashboard
        page={section as AdminDashboardPage}
        canCreateAdmin={role === "superadmin"}
      />
    );
  }

  if (role === "passenger") {
    const passengerPages: PassengerDashboardPage[] = ["overview", "booking", "requests", "trips", "payments"];
    if (!passengerPages.includes(section as PassengerDashboardPage)) {
      return <Navigate to={`/dashboard/${role}/overview`} replace />;
    }
    return <PassengerDashboard page={section as PassengerDashboardPage} />;
  }

  const driverPages: DriverDashboardPage[] = ["overview", "dispatch", "trips", "payments"];
  if (!driverPages.includes(section as DriverDashboardPage)) {
    return <Navigate to={`/dashboard/${role}/overview`} replace />;
  }
  return <DriverDashboard page={section as DriverDashboardPage} />;
}

export function AdminDashboardRoute() {
  return <RoleProtectedDashboard role="admin" />;
}

export function SuperadminDashboardRoute() {
  return <RoleProtectedDashboard role="superadmin" />;
}

export function PassengerDashboardRoute() {
  return <RoleProtectedDashboard role="passenger" />;
}

export function DriverDashboardRoute() {
  return <RoleProtectedDashboard role="driver" />;
}
