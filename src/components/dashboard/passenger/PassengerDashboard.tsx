import PassengerBooking from "./PassengerBooking";
import PassengerOverview from "./PassengerOverview";
import PassengerRequests from "./PassengerRequests";
import PassengerTrips from "./PassengerTrips";

export type PassengerDashboardPage = "overview" | "booking" | "requests" | "trips";

export default function PassengerDashboard({
  page = "overview",
}: {
  page?: PassengerDashboardPage;
}) {
  switch (page) {
    case "booking":
      return <PassengerBooking />;
    case "requests":
      return <PassengerRequests />;
    case "trips":
      return <PassengerTrips />;
    case "overview":
    default:
      return <PassengerOverview />;
  }
}