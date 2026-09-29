import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useCreateRequestMutation } from "../../../redux/requests/requests.api";
import { getApiErrorMessage, SectionHeading } from "../DashboardShared";

export default function PassengerBooking() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [message, setMessage] = useState("");
  const [createRequest, { isLoading }] = useCreateRequestMutation();

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    try {
      await createRequest({ pickup_location: pickup, destination }).unwrap();
      setPickup("");
      setDestination("");
      setMessage("Your ride request was sent to dispatch.");
    } catch (error) {
      setMessage(getApiErrorMessage(error, "We could not submit your request."));
    }
  };

  return (
    <section>
      <SectionHeading eyebrow="New request" title="Where do you need to go?" />
      <form onSubmit={submitRequest} className="grid gap-4 rounded-lg border border-[#dce9e2] bg-white p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="block text-sm font-medium text-[#354842]">Pickup location<input required value={pickup} onChange={(event) => setPickup(event.target.value)} placeholder="Street, landmark, or address" className="mt-2 h-10 w-full rounded-md border border-[#d8e1dc] bg-white px-3 text-sm font-normal outline-none transition focus:border-[#3e8375] focus:ring-3 focus:ring-[#3e8375]/15" /></label>
        <label className="block text-sm font-medium text-[#354842]">Destination<input required value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Hospital or destination" className="mt-2 h-10 w-full rounded-md border border-[#d8e1dc] bg-white px-3 text-sm font-normal outline-none transition focus:border-[#3e8375] focus:ring-3 focus:ring-[#3e8375]/15" /></label>
        <Button type="submit" disabled={isLoading} className="h-10 gap-2 rounded-md bg-[#1c6256] px-4 text-white hover:bg-[#174f46]"><Plus className="size-4" />{isLoading ? "Sending..." : "Request ambulance"}</Button>
        {message && <p className="text-sm text-[#26725c] sm:col-span-3" role="status">{message}</p>}
      </form>
    </section>
  );
}