import PassengerBooking from "./PassengerBooking";
import PassengerOverview from "./PassengerOverview";
import PassengerRequests from "./PassengerRequests";
import PassengerTrips from "./PassengerTrips";
import PaymentsHistory from "../PaymentsHistory";

export type PassengerDashboardPage = "overview" | "booking" | "requests" | "trips" | "payments";

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
    case "payments":
      return <PaymentsHistory />;
    case "overview":
    default:
      return <PassengerOverview />;
  }
}