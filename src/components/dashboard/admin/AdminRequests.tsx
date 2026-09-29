import { useGetAllRequestsQuery } from "../../../redux/requests/requests.api";
import { EmptyState, SectionHeading, StatusBadge } from "../DashboardShared";

export default function AdminRequests() {
  const { data: requests = [], isLoading } = useGetAllRequestsQuery();

  return (
    <section>
      <SectionHeading eyebrow="Dispatch activity" title="Ride requests" />
      <div className="overflow-hidden rounded-lg border border-[#e3eae6] bg-white">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 border-b border-[#e9eeeb] bg-[#f8faf9] px-5 py-3 text-[11px] font-semibold tracking-wide text-[#75837e] uppercase">
          <span>Route</span><span>Passenger</span><span>Status</span>
        </div>
        {isLoading ? <EmptyState>Loading requests...</EmptyState> : requests.length === 0 ? <EmptyState>No ride requests yet.</EmptyState> : requests.slice().reverse().map((item) => (
          <div key={item.id} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-4 border-b border-[#edf1ef] px-5 py-4 last:border-0">
            <div className="min-w-0"><p className="truncate text-sm font-medium text-[#253b36]">{item.pickup_location}</p><p className="mt-1 truncate text-xs text-[#85918d]">To {item.destination}</p></div>
            <p className="text-sm text-[#64716d]">Passenger #{item.passenger_id}</p>
            <StatusBadge status={item.status} />
          </div>
        ))}
      </div>
    </section>
  );
}