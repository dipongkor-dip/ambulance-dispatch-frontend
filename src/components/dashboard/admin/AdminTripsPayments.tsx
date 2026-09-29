import { useGetAllPaymentsQuery } from "../../../redux/payments/payments.api";
import { useGetAllTripsQuery } from "../../../redux/trips/trips.api";
import { EmptyState, SectionHeading, StatusBadge } from "../DashboardShared";

export default function AdminTripsPayments() {
  const { data: trips = [] } = useGetAllTripsQuery();
  const { data: paymentResult } = useGetAllPaymentsQuery();
  const payments = paymentResult?.payments ?? [];

  return (
    <section>
      <SectionHeading eyebrow="Operations records" title="Trips and payments" />
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-[#e3eae6] bg-white">
          <h3 className="border-b border-[#edf1ef] px-5 py-3 text-sm font-semibold text-[#253b36]">All trips</h3>
          {trips.length === 0 ? <EmptyState>No trips recorded.</EmptyState> : trips.map((trip) => <div key={trip.id} className="flex items-center justify-between gap-3 border-b border-[#edf1ef] px-5 py-3 last:border-0"><div><p className="text-sm font-medium text-[#253b36]">Trip #{trip.id} · Request #{trip.request_id}</p><p className="mt-1 text-xs text-[#84918d]">Passenger #{trip.passenger_id} · Driver #{trip.driver_id} · Fare {trip.fare.toFixed(2)}</p></div><StatusBadge status={trip.status} /></div>)}
        </div>
        <div className="overflow-hidden rounded-lg border border-[#e3eae6] bg-white">
          <h3 className="border-b border-[#edf1ef] px-5 py-3 text-sm font-semibold text-[#253b36]">All payments</h3>
          {payments.length === 0 ? <EmptyState>No payment records found.</EmptyState> : payments.map((payment) => <div key={payment.id} className="flex items-center justify-between gap-3 border-b border-[#edf1ef] px-5 py-3 last:border-0"><div><p className="text-sm font-medium text-[#253b36]">Payment #{payment.id} · Trip #{payment.trip_id}</p><p className="mt-1 text-xs text-[#84918d]">{payment.amount.toFixed(2)} BDT</p></div><StatusBadge status={payment.status} /></div>)}
        </div>
      </div>
    </section>
  );
}