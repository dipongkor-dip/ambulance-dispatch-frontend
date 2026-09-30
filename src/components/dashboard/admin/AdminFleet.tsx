import { useState, type FormEvent } from "react";
import { Ambulance, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  useCreateAmbulanceMutation,
  useDeleteAmbulanceMutation,
  useGetDriversQuery,
  useUpdateAmbulanceMutation,
} from "../../../redux/admin/admin.api";
import { useGetAmbulancesQuery } from "../../../redux/ambulances/ambulances.api";
import { getApiErrorMessage, SectionHeading, StatusBadge } from "../DashboardShared";
import { PaginationControls } from "../../ui/pagination";

const PAGE_SIZE = 6;

interface AmbulancePayload {
  ambulance_number: string;
  ambulance_type: string;
  model: string | null;
  capacity: number;
  driver_id: number | null;
}

export default function AdminFleet() {
  const [feedback, setFeedback] = useState("");
  const [editingAmbulanceId, setEditingAmbulanceId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const { currentData: ambulancePage, isFetching } = useGetAmbulancesQuery({
    page,
    page_size: PAGE_SIZE,
  });
  const ambulances = ambulancePage?.items ?? [];
  const { data: drivers = [] } = useGetDriversQuery();
  const [createAmbulance, { isLoading: isCreating }] = useCreateAmbulanceMutation();
  const [updateAmbulance, { isLoading: isUpdating }] = useUpdateAmbulanceMutation();
  const [deleteAmbulance] = useDeleteAmbulanceMutation();

  const submitAmbulance = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const driverId = String(data.get("driver_id") ?? "");
    const payload: AmbulancePayload = {
      ambulance_number: String(data.get("ambulance_number") ?? "").trim(),
      ambulance_type: String(data.get("ambulance_type") ?? "").trim(),
      model: String(data.get("model") ?? "").trim() || null,
      capacity: Number(data.get("capacity")) || 1,
      driver_id: driverId ? Number(driverId) : null,
    };
    const current = ambulances.find((item) => item.id === editingAmbulanceId);
    try {
      if (current) {
        await updateAmbulance({ id: current.id, data: payload }).unwrap();
        setFeedback("Ambulance details updated.");
        setEditingAmbulanceId(null);
      } else {
        await createAmbulance(payload).unwrap();
        setFeedback("Ambulance added to the fleet.");
        setPage(1);
        form.reset();
      }
    } catch (error) {
      setFeedback(getApiErrorMessage(error, "Could not save ambulance details."));
    }
  };

  const removeAmbulance = async (unitId: number, unitNumber: string) => {
    if (!window.confirm(`Delete ${unitNumber}?`)) return;
    try {
      await deleteAmbulance(unitId).unwrap();
      setFeedback("Ambulance deleted.");
      if (ambulances.length === 1 && page > 1) setPage(page - 1);
    } catch (error) {
      setFeedback(getApiErrorMessage(error, "Could not delete this ambulance."));
    }
  };

  const editingUnit = ambulances.find((item) => item.id === editingAmbulanceId);

  return (
    <section>
      <SectionHeading eyebrow="Fleet status" title="Ambulance fleet" />
      {feedback && <p className="mb-4 rounded-md border border-[#dce9e2] bg-white px-4 py-3 text-sm text-[#315844]" role="status">{feedback}</p>}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {ambulances.map((unit) => (
          <article key={unit.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#e3eae6] bg-white p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#e3f1ef] text-[#176b78]"><Ambulance className="size-5" /></span>
              <div className="min-w-0"><p className="truncate text-sm font-semibold text-[#102a43]">{unit.ambulance_number}</p><p className="mt-1 truncate text-xs capitalize text-[#647b8b]">{unit.ambulance_type} · {unit.model ?? "No model"}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={unit.status} />
              <Button type="button" variant="ghost" size="icon-sm" aria-label={`Edit ${unit.ambulance_number}`} title="Edit ambulance" onClick={() => setEditingAmbulanceId(unit.id)}><Pencil /></Button>
              <Button type="button" variant="ghost" size="icon-sm" aria-label={`Delete ${unit.ambulance_number}`} title="Delete ambulance" onClick={() => void removeAmbulance(unit.id, unit.ambulance_number)}><Trash2 /></Button>
            </div>
          </article>
        ))}
        {ambulancePage?.total === 0 && <div className="col-span-full rounded-lg border border-dashed border-[#d8e2dd] bg-white px-5 py-8 text-center text-sm text-[#788782]">No fleet units registered.</div>}
      </div>
      {isFetching && !ambulancePage && (
        <p className="py-6 text-center text-sm text-[#647b8b]" role="status">
          Loading fleet units...
        </p>
      )}
      <PaginationControls
        page={page}
        pageCount={ambulancePage?.pages ?? 0}
        pageSize={PAGE_SIZE}
        total={ambulancePage?.total ?? 0}
        onPageChange={setPage}
      />

      <form key={editingAmbulanceId ?? "new-ambulance"} onSubmit={submitAmbulance} className="mt-5 rounded-lg border border-[#e3eae6] bg-white p-5">
        <h3 className="text-sm font-semibold text-[#253b36]">{editingUnit ? `Edit ${editingUnit.ambulance_number}` : "Add ambulance"}</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <label className="text-xs font-medium text-[#64716d]">Unit number<input name="ambulance_number" required defaultValue={editingUnit?.ambulance_number ?? ""} placeholder="AMB-012" className="mt-1.5 h-9 w-full rounded-md border border-[#d8e1dc] px-2.5 text-sm text-[#253b36]" /></label>
          <label className="text-xs font-medium text-[#64716d]">Type<input name="ambulance_type" required defaultValue={editingUnit?.ambulance_type ?? ""} placeholder="Basic life support" className="mt-1.5 h-9 w-full rounded-md border border-[#d8e1dc] px-2.5 text-sm text-[#253b36]" /></label>
          <label className="text-xs font-medium text-[#64716d]">Model<input name="model" defaultValue={editingUnit?.model ?? ""} placeholder="Vehicle model" className="mt-1.5 h-9 w-full rounded-md border border-[#d8e1dc] px-2.5 text-sm text-[#253b36]" /></label>
          <label className="text-xs font-medium text-[#64716d]">Capacity<input name="capacity" type="number" min="1" defaultValue={editingUnit?.capacity ?? 1} className="mt-1.5 h-9 w-full rounded-md border border-[#d8e1dc] px-2.5 text-sm text-[#253b36]" /></label>
          <label className="text-xs font-medium text-[#64716d]">Assigned driver<select name="driver_id" defaultValue={editingUnit?.driver_id ?? ""} className="mt-1.5 h-9 w-full rounded-md border border-[#d8e1dc] bg-white px-2.5 text-sm text-[#253b36]"><option value="">Unassigned</option>{drivers.map((driver) => <option key={driver.id} value={driver.id}>{driver.firstname} {driver.lastname} (#{driver.id})</option>)}</select></label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="submit" disabled={isCreating || isUpdating} className="h-9 rounded-md bg-[#1c6256] px-3 text-white hover:bg-[#174f46]"><Plus className="size-4" />{editingUnit ? "Save ambulance" : isCreating ? "Adding..." : "Add ambulance"}</Button>
          {editingUnit && <Button type="button" variant="outline" onClick={() => setEditingAmbulanceId(null)}>Cancel edit</Button>}
        </div>
      </form>
    </section>
  );
}