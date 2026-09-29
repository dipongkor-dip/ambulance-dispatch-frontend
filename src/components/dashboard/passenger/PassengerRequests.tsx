import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useCancelRequestMutation, useGetMyRequestQuery, useGetMyRequestsQuery } from "@/redux/requests/requests.api";
import { EmptyState, getApiErrorMessage, SectionHeading, StatusBadge } from "../DashboardShared";

export default function PassengerRequests() {
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const { data: requests = [], isLoading } = useGetMyRequestsQuery();
  const { data: selectedRequest } = useGetMyRequestQuery(selectedRequestId ?? 0, {
    skip: selectedRequestId === null,
  });
  const [cancelRequest, { isLoading: isCancelling }] = useCancelRequestMutation();

  const handleCancel = async (requestId: number) => {
    setMessage("");
    try {
      await cancelRequest(requestId).unwrap();
      setMessage(`Request #${requestId} cancelled.`);
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Could not cancel this request."));
    }
  };

  return (
    <section>
      <SectionHeading eyebrow="Ride history" title="Your requests" />
      {message && <p className="mb-3 rounded-md border border-[#dce9e2] bg-white px-4 py-3 text-sm text-[#315844]" role="status">{message}</p>}
      <div className="overflow-hidden rounded-lg border border-[#e3eae6] bg-white">
        {isLoading ? <EmptyState>Loading your requests...</EmptyState> : requests.length === 0 ? <EmptyState>Your ride requests will appear here.</EmptyState> : requests.slice().reverse().map((item) => (
          <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf1ef] px-5 py-4 last:border-0">
            <div className="min-w-0"><p className="truncate text-sm font-medium text-[#253b36]">{item.pickup_location} <ArrowRight className="mx-1 inline size-3 text-[#8a9792]" /> {item.destination}</p><p className="mt-1 text-xs text-[#85918d]">Request #{item.id} · {new Date(item.request_time).toLocaleDateString()}</p></div>
            <div className="flex items-center gap-2">
              <StatusBadge status={item.status} />
              <Button type="button" variant="outline" size="sm" onClick={() => setSelectedRequestId(selectedRequestId === item.id ? null : item.id)}>{selectedRequestId === item.id ? "Hide" : "Details"}</Button>
              {item.status === "pending" && <Button type="button" variant="ghost" size="sm" disabled={isCancelling} onClick={() => void handleCancel(item.id)}>{isCancelling ? "Cancelling..." : "Cancel"}</Button>}
            </div>
            {selectedRequest?.id === item.id && <p className="w-full border-t border-[#edf1ef] pt-3 text-xs text-[#64716d]">Request #{selectedRequest.id} · Ambulance {selectedRequest.ambulance_id ?? "not assigned"} · {new Date(selectedRequest.request_time).toLocaleString()}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}