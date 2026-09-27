import { Activity, Ambulance, ClipboardList } from "lucide-react";
import { useGetAmbulancesQuery } from "@/redux/ambulances/ambulances.api";
import { useGetMyRequestsQuery } from "@/redux/requests/requests.api";
import { useGetMyTripsQuery } from "@/redux/trips/trips.api";
import { Metric } from "../DashboardShared";

export default function PassengerOverview() {
  const { data: requests = [] } = useGetMyRequestsQuery();
  const { data: trips = [] } = useGetMyTripsQuery();
  const { data: ambulances = [] } = useGetAmbulancesQuery();

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-medium text-[#668078]">Your care, in motion</p>
        <h1 className="mt-1 text-2xl font-semibold text-[#17332f] sm:text-3xl">Passenger dashboard</h1>
        <p className="mt-2 text-sm text-[#71807b]">Request an ambulance and follow every ride from pickup to arrival.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Metric label="My requests" value={requests.length} detail="All-time ride requests" icon={ClipboardList} />
        <Metric label="In progress" value={trips.filter((trip) => trip.status === "ongoing").length} detail="Trips currently underway" icon={Activity} tone="orange" />
        <Metric label="Available nearby" value={ambulances.filter((unit) => unit.status === "available").length} detail="Units currently available" icon={Ambulance} tone="lime" />
      </div>
    </section>
  );
}