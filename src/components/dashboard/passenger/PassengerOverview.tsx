import { Activity, Ambulance, ClipboardList } from "lucide-react";
import { useGetAmbulancesQuery } from "../../../redux/ambulances/ambulances.api";
import { useGetMyRequestsQuery } from "../../../redux/requests/requests.api";
import { useGetMyTripsQuery } from "../../../redux/trips/trips.api";
import { Metric } from "../DashboardShared";

export default function PassengerOverview() {
  const { data: requests = [] } = useGetMyRequestsQuery();
  const { data: trips = [] } = useGetMyTripsQuery();
  const { data: availableAmbulanceSummary } = useGetAmbulancesQuery({
    page: 1,
    page_size: 1,
    status: "available",
  });

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-medium text-[#176b78]">Your care, in motion</p>
        <h1 className="mt-1 text-2xl font-semibold text-[#102a43] sm:text-3xl">Passenger dashboard</h1>
        <p className="mt-2 text-sm text-[#647b8b]">Request an ambulance and follow every ride from pickup to arrival.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Metric label="My requests" value={requests.length} detail="All-time ride requests" icon={ClipboardList} />
        <Metric label="In progress" value={trips.filter((trip) => trip.status === "ongoing").length} detail="Trips currently underway" icon={Activity} tone="orange" />
        <Metric label="Available nearby" value={availableAmbulanceSummary?.total ?? 0} detail="Units currently available" icon={Ambulance} tone="lime" />
      </div>
    </section>
  );
}