import { useState } from "react";
import { Activity, ClipboardList, Truck } from "lucide-react";
import { useGetMyAmbulanceQuery, useUpdateMyAmbulanceStatusMutation } from "@/redux/ambulances/ambulances.api";
import { useGetPendingRequestsQuery } from "../../../redux/requests/requests.api";
import { useGetDriverTripsQuery } from "../../../redux/trips/trips.api";
import { getApiErrorMessage, Metric } from "../DashboardShared";

export default function DriverOverview() {
  const { data: requests = [] } = useGetPendingRequestsQuery();
  const { data: trips = [] } = useGetDriverTripsQuery();
  const { data: ambulance } = useGetMyAmbulanceQuery();
  const [message, setMessage] = useState("");
  const [updateStatus, { isLoading }] = useUpdateMyAmbulanceStatusMutation();

  const changeStatus = async (status: string) => {
    setMessage("");
    try {
      await updateStatus(status).unwrap();
      setMessage("Vehicle status updated.");
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Could not update vehicle status."));
    }
  };

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-medium text-[#668078]">Driver workspace</p>
        <h1 className="mt-1 text-2xl font-semibold text-[#17332f] sm:text-3xl">Good to have you on shift.</h1>
        <p className="mt-2 text-sm text-[#71807b]">Review calls, manage your trips, and keep your unit ready.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Metric label="Dispatch queue" value={requests.length} detail="Requests waiting for a driver" icon={ClipboardList} tone="orange" />
        <Metric label="My active trips" value={trips.filter((trip) => trip.status === "ongoing").length} detail="Trips assigned to you" icon={Activity} />
        <Metric label="Assigned unit" value={ambulance?.ambulance_number ?? "—"} detail={ambulance ? `${ambulance.ambulance_type} · ${ambulance.status}` : "No ambulance assigned"} icon={Truck} tone="blue" />
      </div>
      {ambulance && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#e3eae6] bg-white px-5 py-4">
          <div><p className="text-sm font-semibold text-[#253b36]">Unit {ambulance.ambulance_number}</p><p className="mt-1 text-xs text-[#84918d]">Update your availability for new calls.</p></div>
          <label className="flex items-center gap-2 text-sm font-medium text-[#354842]">Vehicle status
            <select value={ambulance.status} disabled={isLoading} onChange={(event) => void changeStatus(event.target.value)} className="h-9 rounded-md border border-[#d8e1dc] bg-white px-3 text-sm capitalize">
              <option value="available">Available</option><option value="busy">Busy</option><option value="maintenance">Maintenance</option>
            </select>
          </label>
          {message && <p className="w-full text-sm text-[#315844]" role="status">{message}</p>}
        </div>
      )}
    </section>
  );
}