import AdminFleet from "./AdminFleet";
import AdminOverview from "./AdminOverview";
import AdminPeople from "./AdminPeople";
import AdminRequests from "./AdminRequests";
import AdminTripsPayments from "./AdminTripsPayments";

export type AdminDashboardPage =
  | "overview"
  | "requests"
  | "fleet"
  | "people"
  | "trips";

export default function AdminDashboard({
  canCreateAdmin = false,
  page = "overview",
}: {
  canCreateAdmin?: boolean;
  page?: AdminDashboardPage;
}) {
  switch (page) {
    case "requests":
      return <AdminRequests />;
    case "fleet":
      return <AdminFleet />;
    case "people":
      return <AdminPeople canCreateAdmin={canCreateAdmin} />;
    case "trips":
      return <AdminTripsPayments />;
    case "overview":
    default:
      return <AdminOverview />;
  }
}