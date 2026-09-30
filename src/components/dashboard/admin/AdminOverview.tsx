import {
  Activity,
  Ambulance,
  Banknote,
  BadgeCheck,
  ClipboardList,
  Users,
} from "lucide-react";
import { useGetAdminUsersQuery } from "../../../redux/admin/admin.api";
import { useGetAmbulancesQuery } from "../../../redux/ambulances/ambulances.api";
import { useGetAllPaymentsQuery } from "../../../redux/payments/payments.api";
import { useGetAllRequestsQuery } from "../../../redux/requests/requests.api";
import { useGetAllTripsQuery } from "../../../redux/trips/trips.api";
import { Metric } from "../DashboardShared";

export default function AdminOverview() {
  const { data: users = [] } = useGetAdminUsersQuery();
  const { data: requests = [] } = useGetAllRequestsQuery();
  const { data: trips = [] } = useGetAllTripsQuery();
  const { data: ambulanceSummary } = useGetAmbulancesQuery({
    page: 1,
    page_size: 1,
  });
  const { data: availableAmbulanceSummary } = useGetAmbulancesQuery({
    page: 1,
    page_size: 1,
    status: "available",
  });
  const { data: paymentResult } = useGetAllPaymentsQuery();
  const payments = paymentResult?.payments ?? [];

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-medium text-[#176b78]">Operations snapshot</p>
        <h1 className="mt-1 text-2xl font-semibold text-[#102a43] sm:text-3xl">Command center</h1>
        <p className="mt-2 text-sm text-[#647b8b]">A live view of riders, dispatch, fleet, and payments.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Registered users" value={users.length} detail="Across all account roles" icon={Users} tone="blue" />
        <Metric label="Open requests" value={requests.filter((item) => item.status === "pending").length} detail="Waiting for a driver" icon={ClipboardList} tone="orange" />
        <Metric label="Active trips" value={trips.filter((item) => item.status === "ongoing").length} detail="Currently in progress" icon={Activity} />
        <Metric label="Available units" value={availableAmbulanceSummary?.total ?? 0} detail={`${ambulanceSummary?.total ?? 0} ambulances in fleet`} icon={Ambulance} tone="lime" />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Metric label="Completed trips" value={trips.filter((item) => item.status === "completed").length} detail="From all recorded trips" icon={BadgeCheck} />
        <Metric label="Payment records" value={payments.length} detail="Including pending and settled" icon={Banknote} tone="blue" />
      </div>
    </section>
  );
}