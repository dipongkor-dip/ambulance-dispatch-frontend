import { useState } from "react";
import { Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreatePaymentMutation } from "@/redux/payments/payments.api";
import { useGetMyTripQuery, useGetMyTripsQuery } from "@/redux/trips/trips.api";
import { EmptyState, getApiErrorMessage, SectionHeading, StatusBadge } from "../DashboardShared";

export default function PassengerTrips() {
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const { data: trips = [] } = useGetMyTripsQuery();
  const { data: selectedTrip } = useGetMyTripQuery(selectedTripId ?? 0, {
    skip: selectedTripId === null,
  });
  const [createPayment, { isLoading: isStartingPayment }] = useCreatePaymentMutation();

  const handlePayment = async (tripId: number) => {
    setMessage("");
    try {
      const payment = await createPayment(tripId).unwrap();
      window.location.assign(payment.payment_url);
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Could not start payment."));
    }
  };

  return (
    <section>
      <SectionHeading eyebrow="Completed and active rides" title="My trips" />
      {message && <p className="mb-3 rounded-md border border-[#f0d2c1] bg-[#fff6ef] px-4 py-3 text-sm text-[#94552c]" role="alert">{message}</p>}
      <div className="overflow-hidden rounded-lg border border-[#e3eae6] bg-white">
        {trips.length === 0 ? <EmptyState>Trips will appear here when a request is accepted.</EmptyState> : trips.slice().reverse().map((trip) => (
          <div key={trip.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf1ef] px-5 py-4 last:border-0">
            <div><p className="text-sm font-semibold text-[#253b36]">Trip #{trip.id}</p><p className="mt-1 text-xs text-[#84918d]">Fare {trip.fare.toFixed(2)} · Ambulance #{trip.ambulance_id}</p></div>
            <div className="flex items-center gap-2">
              <StatusBadge status={trip.status} />
              <Button type="button" variant="outline" size="sm" onClick={() => setSelectedTripId(selectedTripId === trip.id ? null : trip.id)}>{selectedTripId === trip.id ? "Hide" : "Details"}</Button>
              {["ongoing", "completed"].includes(trip.status) && <Button type="button" disabled={isStartingPayment} onClick={() => void handlePayment(trip.id)} className="h-8 gap-1.5 rounded-md bg-[#1c6256] px-3 text-white hover:bg-[#174f46]"><Banknote className="size-4" />{isStartingPayment ? "Opening..." : "Pay"}</Button>}
            </div>
            {selectedTrip?.id === trip.id && <p className="w-full border-t border-[#edf1ef] pt-3 text-xs text-[#64716d]">Request #{selectedTrip.request_id} · Driver #{selectedTrip.driver_id} · {selectedTrip.start_time ? `Started ${new Date(selectedTrip.start_time).toLocaleString()}` : "Not started"} · {selectedTrip.end_time ? `Ended ${new Date(selectedTrip.end_time).toLocaleString()}` : "In progress"}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}