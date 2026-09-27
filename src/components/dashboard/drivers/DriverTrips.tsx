import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompleteTripMutation, useGetDriverTripsQuery, useStartTripMutation, useUpdateTripFareMutation } from "@/redux/trips/trips.api";
import { EmptyState, getApiErrorMessage, SectionHeading, StatusBadge } from "../DashboardShared";

export default function DriverTrips() {
  const [message, setMessage] = useState("");
  const [fareValues, setFareValues] = useState<Record<number, string>>({});
  const { data: trips = [] } = useGetDriverTripsQuery();
  const [startTrip, { isLoading: isStarting }] = useStartTripMutation();
  const [completeTrip, { isLoading: isCompleting }] = useCompleteTripMutation();
  const [updateFare, { isLoading: isSavingFare }] = useUpdateTripFareMutation();

  const runAction = async (action: () => Promise<unknown>) => {
    setMessage("");
    try {
      await action();
    } catch (error) {
      setMessage(getApiErrorMessage(error, "That trip action could not be completed."));
    }
  };

  const submitFare = (event: FormEvent<HTMLFormElement>, tripId: number) => {
    event.preventDefault();
    const fare = Number(fareValues[tripId]);
    if (!Number.isFinite(fare) || fare < 0) {
      setMessage("Enter a valid non-negative fare.");
      return;
    }
    void runAction(() => updateFare({ id: tripId, fare }).unwrap());
  };

  return (
    <section>
      <SectionHeading eyebrow="On the road" title="My trips" />
      {message && <p className="mb-3 rounded-md border border-[#f0d2c1] bg-[#fff6ef] px-4 py-3 text-sm text-[#94552c]" role="alert">{message}</p>}
      <div className="overflow-hidden rounded-lg border border-[#e3eae6] bg-white">
        {trips.length === 0 ? <EmptyState>Accepted calls and assigned trips will show up here.</EmptyState> : trips.slice().reverse().map((trip) => (
          <div key={trip.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-[#edf1ef] px-5 py-4 last:border-0">
            <div><p className="text-sm font-semibold text-[#253b36]">Trip #{trip.id}</p><p className="mt-1 text-xs text-[#85918d]">Request #{trip.request_id} · Fare {trip.fare.toFixed(2)}</p></div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={trip.status} />
              {trip.status === "ongoing" && (trip.start_time ? <Button disabled={isCompleting} onClick={() => void runAction(() => completeTrip(trip.id).unwrap())} className="h-8 gap-1.5 rounded-md bg-[#1c6256] px-3 text-white hover:bg-[#174f46]">{isCompleting ? "Updating..." : "Complete trip"}<ArrowUpRight className="size-3.5" /></Button> : <Button disabled={isStarting} onClick={() => void runAction(() => startTrip(trip.id).unwrap())} className="h-8 gap-1.5 rounded-md bg-[#1c6256] px-3 text-white hover:bg-[#174f46]">{isStarting ? "Starting..." : "Start trip"}<ArrowUpRight className="size-3.5" /></Button>)}
              {trip.status === "ongoing" && <form onSubmit={(event) => submitFare(event, trip.id)} className="flex items-center gap-2"><label className="sr-only" htmlFor={`driver-fare-${trip.id}`}>Fare for trip {trip.id}</label><input id={`driver-fare-${trip.id}`} type="number" min="0" step="0.01" value={fareValues[trip.id] ?? String(trip.fare)} onChange={(event) => setFareValues((values) => ({ ...values, [trip.id]: event.target.value }))} className="h-8 w-24 rounded-md border border-[#d8e1dc] px-2 text-sm" /><Button type="submit" variant="outline" size="sm" disabled={isSavingFare}>{isSavingFare ? "Saving..." : "Set fare"}</Button></form>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}