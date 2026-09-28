import { useAppSelector } from "../../redux/store";

const NetworkProgressBar = () => {
  const isFetching = useAppSelector((state) => {
    const apiState = state.baseApi;
    const hasPendingQuery = Object.values(apiState.queries).some(
      (query) => query?.status === "pending",
    );
    const hasPendingMutation = Object.values(apiState.mutations).some(
      (mutation) => mutation?.status === "pending",
    );

    return hasPendingQuery || hasPendingMutation;
  });

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-0 z-100 h-0.25 transition-opacity duration-200 ${isFetching ? "opacity-100" : "opacity-0"}`}
      role="progressbar"
      aria-label="Loading data"
      aria-valuetext={isFetching ? "Fetching data" : "Idle"}
      aria-hidden={!isFetching}
    >
      <span
        className={`network-progress-indicator block h-full w-full bg-[#2bc110] ${isFetching ? "network-progress-indicator--active" : ""}`}
      />
    </div>
  );
};

export default NetworkProgressBar;
