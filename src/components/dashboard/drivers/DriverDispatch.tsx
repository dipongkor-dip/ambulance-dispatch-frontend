import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useGetMyAmbulanceQuery } from "../../../redux/ambulances/ambulances.api";
import { useAcceptRequestMutation, useGetPendingRequestsQuery, useRejectRequestMutation } from "@/redux/requests/requests.api";
import { EmptyState, getApiErrorMessage, SectionHeading } from "../DashboardShared";

export default function DriverDispatch() {
  const [message, setMessage] = useState("");
  const { data: requests = [], isLoading } = useGetPendingRequestsQuery();
  const { data: ambulance } = useGetMyAmbulanceQuery();
  const [acceptRequest, { isLoading: isAccepting }] = useAcceptRequestMutation();
  const [rejectRequest, { isLoading: isRejecting }] = useRejectRequestMutation();

  const runAction = async (action: () => Promise<unknown>, success: string) => {
    setMessage("");
    try {
      await action();
      setMessage(success);
    } catch (error) {
      setMessage(getApiErrorMessage(error, "That request could not be completed."));
    }
  };

  return (
    <section>
      <SectionHeading eyebrow="New calls" title="Dispatch queue" />
      {message && <p className="mb-3 rounded-md border border-[#dce9e2] bg-white px-4 py-3 text-sm text-[#315844]" role="status">{message}</p>}
      <div className="overflow-hidden rounded-lg border border-[#e3eae6] bg-white">
        {isLoading ? <EmptyState>Checking the dispatch queue...</EmptyState> : requests.length === 0 ? <EmptyState>You're all caught up. New calls will appear here.</EmptyState> : requests.map((request) => (
          <article key={request.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-[#edf1ef] px-5 py-4 last:border-0">
            <div className="min-w-0"><p className="text-xs font-medium text-[#647b8b]">Request #{request.id}</p><p className="mt-1 truncate text-sm font-semibold text-[#102a43]">{request.pickup_location}</p><p className="mt-1 truncate text-sm text-[#647b8b]">Destination: {request.destination}</p></div>
            <div className="flex gap-2">
              <Button disabled={isAccepting || !ambulance || ambulance.status !== "available"} onClick={() => void runAction(() => acceptRequest(request.id).unwrap(), `Request #${request.id} accepted.`)} className="h-9 gap-2 rounded-md bg-[#1c6256] px-3 text-white hover:bg-[#174f46]"><Check className="size-4" />Accept</Button>
              <Button variant="outline" disabled={isRejecting} onClick={() => void runAction(() => rejectRequest(request.id).unwrap(), `Request #${request.id} rejected.`)} className="h-9 gap-2 rounded-md"><X className="size-4" />Reject</Button>
            </div>
          </article>
        ))}
      </div>
      {!ambulance && !isLoading && <p className="mt-3 text-sm text-[#a96327]">No ambulance is assigned to your account; accepting calls is disabled.</p>}
    </section>
  );
}