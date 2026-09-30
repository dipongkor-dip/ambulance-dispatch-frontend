import { useEffect, useState } from "react";
import { Ambulance as AmbulanceIcon, RefreshCw, Search } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { useGetAmbulancesQuery } from "../redux/ambulances/ambulances.api";
import type { AmbulanceStatus } from "../redux/ambulances/ambulances.interface";
import {
  getLoginRequiredUrl,
  getAccessToken,
  PASSENGER_BOOKING_PATH,
} from "../lib/authSession";
import { PaginationControls } from "../components/ui/pagination";

type FleetFilter = "all" | AmbulanceStatus;
const PAGE_SIZE_OPTIONS = [12, 24, 36];

const filters: { label: string; value: FleetFilter }[] = [
  { label: "All units", value: "all" },
  { label: "Available", value: "available" },
  { label: "Busy", value: "busy" },
  { label: "Maintenance", value: "maintenance" },
];

const statusStyles: Record<Exclude<FleetFilter, "all">, string> = {
  available: "bg-[#e3f1ef] text-[#176b78]",
  busy: "bg-[#fff1df] text-[#a96327]",
  maintenance: "bg-[#eef4f6] text-[#647b8b]",
};

const formatStatus = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

const Ambulances = () => {
  const [filter, setFilter] = useState<FleetFilter>("all");
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  useEffect(() => {
    const timeout = window.setTimeout(() => setSearchTerm(search.trim()), 300);
    return () => window.clearTimeout(timeout);
  }, [search]);
  const {
    currentData: ambulancePage,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAmbulancesQuery({
    page,
    page_size: pageSize,
    status: filter === "all" ? undefined : filter,
    search: searchTerm || undefined,
  });
  const ambulances = ambulancePage?.items ?? [];
  const total = ambulancePage?.total ?? 0;
  const pageCount = ambulancePage?.pages ?? 0;
  const firstItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastItem = Math.min(page * pageSize, total);
  const bookingUrl = getAccessToken()
    ? PASSENGER_BOOKING_PATH
    : getLoginRequiredUrl(PASSENGER_BOOKING_PATH);

  return (
    <main className="min-h-screen bg-[#f6f9fb] text-[#102a43]">
      <section className="border-b border-[#d9e5ec] bg-[#edf5f8]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-[#176b78] uppercase">
              CallNow network
            </p>
            <h1 className="mt-3 text-4xl leading-tight font-semibold text-[#102a43] sm:text-5xl">
              Ambulance fleet
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#567086]">
              Browse ambulance types and current fleet status across the
              network.
            </p>
          </div>
          <div className="grid w-full max-w-sm grid-cols-2 border-t border-[#cbdde4] pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <div className="border-r border-[#cbdde4] pr-5">
              <p className="text-3xl font-semibold text-[#102a43]">
                {isLoading || isFetching ? "--" : total}
              </p>
              <p className="mt-1 text-xs font-medium text-[#647b8b]">Matching units</p>
            </div>
            <div className="pl-5">
              <p className="text-3xl font-semibold text-[#176b78]">
                {filter === "all" ? "All" : formatStatus(filter)}
              </p>
              <p className="mt-1 text-xs font-medium text-[#647b8b]">Status filter</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12 lg:px-10">
        <div className="flex flex-col gap-5 border-b border-[#d9e5ec] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-[#176b78] uppercase">
              Fleet directory
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#102a43]">
              {firstItem}-{lastItem} of {total} {total === 1 ? "unit" : "units"}
            </h2>
          </div>
          <label className="relative block w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#6b8090]" />
            <input
              aria-label="Search ambulances"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search unit, type, or model"
              className="h-10 w-full rounded-md border border-[#cbd9df] bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#176b78] focus:ring-3 focus:ring-[#176b78]/15"
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter ambulances by status">
            {filters.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                aria-pressed={filter === value}
                onClick={() => {
                  setFilter(value);
                  setPage(1);
                }}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${filter === value ? "border-[#176b78] bg-[#176b78] text-white" : "border-[#cbd9df] bg-white text-[#456478] hover:bg-[#eaf1f3]"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-[#456478]">
            Per page
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
              className="h-9 rounded-md border border-[#cbd9df] bg-white px-3 text-sm text-[#102a43] outline-none focus:border-[#176b78] focus:ring-3 focus:ring-[#176b78]/15"
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>

        {isLoading || isFetching ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Loading ambulances">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="animate-pulse rounded-lg border border-[#d9e5ec] bg-white p-5">
                <div className="h-10 w-10 rounded-md bg-[#e4edf0]" />
                <div className="mt-5 h-5 w-2/5 rounded bg-[#e4edf0]" />
                <div className="mt-3 h-4 w-3/5 rounded bg-[#e4edf0]" />
                <div className="mt-6 h-px bg-[#edf2f4]" />
                <div className="mt-4 h-4 w-1/3 rounded bg-[#e4edf0]" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="border-y border-[#d9e5ec] py-12 text-center">
            <p className="text-lg font-semibold text-[#102a43]">Fleet information is unavailable</p>
            <p className="mt-2 text-sm text-[#647b8b]">Please check your connection and try again.</p>
            <Button type="button" variant="outline" className="mt-5" onClick={() => void refetch()}>
              <RefreshCw className="size-4" /> Try again
            </Button>
          </div>
        ) : ambulances.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {ambulances.map((unit) => (
                <article key={unit.id} className="rounded-lg border border-[#d9e5ec] bg-white p-5 shadow-[0_2px_10px_rgba(16,42,67,0.035)]">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-11 items-center justify-center rounded-md bg-[#e3f1ef] text-[#176b78]">
                      <AmbulanceIcon className="size-5" aria-hidden="true" />
                    </span>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[unit.status]}`}>
                      {formatStatus(unit.status)}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[#102a43]">
                    {unit.ambulance_number}
                  </h3>
                  <p className="mt-1 text-sm capitalize text-[#567086]">
                    {unit.ambulance_type}
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#edf2f4] pt-4 text-sm">
                    <div>
                      <p className="text-xs text-[#78909c]">Model</p>
                      <p className="mt-1 truncate font-medium text-[#35556b]">
                        {unit.model || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#78909c]">Capacity</p>
                      <p className="mt-1 font-medium text-[#35556b]">{unit.capacity}</p>
                    </div>
                  </div>
                </article>
            ))}
          </div>
        ) : (
          <div className="border-y border-[#d9e5ec] py-12 text-center">
            <p className="text-lg font-semibold text-[#102a43]">No ambulances match these filters</p>
            <p className="mt-2 text-sm text-[#647b8b]">Try another status or search term.</p>
          </div>
        )}
        <div className="mt-8">
          <PaginationControls
            page={page}
            pageCount={pageCount}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
          />
        </div>
      </section>

      <section className="bg-[#102a43]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="text-sm font-semibold text-[#7ecac0]">Need a ride?</p>
            <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
              Start an ambulance request.
            </h2>
          </div>
          <Button
            render={<Link to={bookingUrl} />}
            nativeButton={false}
            className="h-10 bg-[#d62839] px-4 text-white hover:bg-[#b91f30]"
          >
            Request an ambulance
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Ambulances;