import DriverDispatch from "./DriverDispatch";
import DriverOverview from "./DriverOverview";
import DriverTrips from "./DriverTrips";
import PaymentsHistory from "../PaymentsHistory";

export type DriverDashboardPage = "overview" | "dispatch" | "trips" | "payments";

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
    case "payments":
      return <PaymentsHistory />;
    case "overview":
    default:
      return <DriverOverview />;
  }
}