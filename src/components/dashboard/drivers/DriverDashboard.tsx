import DriverDispatch from "./DriverDispatch";
import DriverOverview from "./DriverOverview";
import DriverTrips from "./DriverTrips";

export type DriverDashboardPage = "overview" | "dispatch" | "trips";

export default function DriverDashboard({
  page = "overview",
}: {
  page?: DriverDashboardPage;
}) {
  switch (page) {
    case "dispatch":
      return <DriverDispatch />;
    case "trips":
      return <DriverTrips />;
    case "overview":
    default:
      return <DriverOverview />;
  }
}