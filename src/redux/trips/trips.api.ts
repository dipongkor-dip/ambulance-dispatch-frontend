import { baseApi, type ApiEndpointBuilder } from "../baseApi";
import type { Trip } from "./trips.interface";

export const tripsApi = baseApi.injectEndpoints({
  endpoints: (builder: ApiEndpointBuilder) => ({
    getMyTrips: builder.query<Trip[], void>({
      query: () => ({ url: "/trips/my" }),
      providesTags: ["TRIPS"],
    }),
    getMyTrip: builder.query<Trip, number>({
      query: (id: number) => ({ url: `/trips/my/${id}` }),
      providesTags: ["TRIPS"],
    }),
    getDriverTrips: builder.query<Trip[], void>({
      query: () => ({ url: "/trips/driver/my" }),
      providesTags: ["TRIPS"],
    }),
    startTrip: builder.mutation<Trip, number>({
      query: (id: number) => ({
        url: `/trips/${id}/start`,
        method: "POST",
      }),
      invalidatesTags: ["TRIPS"],
    }),
    completeTrip: builder.mutation<Trip, number>({
      query: (id: number) => ({
        url: `/trips/${id}/complete`,
        method: "POST",
      }),
      invalidatesTags: ["TRIPS", "REQUESTS", "AMBULANCES"],
    }),
    updateTripFare: builder.mutation<Trip, { id: number; fare: number }>({
      query: ({ id, fare }: { id: number; fare: number }) => ({
        url: `/trips/${id}/fare`,
        method: "PUT",
        data: { fare },
      }),
      invalidatesTags: ["TRIPS"],
    }),
    getAllTrips: builder.query<Trip[], void>({
      query: () => ({ url: "/trips/admin/all" }),
      providesTags: ["TRIPS"],
    }),
  }),
});

export const {
  useGetMyTripsQuery,
  useGetMyTripQuery,
  useGetDriverTripsQuery,
  useStartTripMutation,
  useCompleteTripMutation,
  useUpdateTripFareMutation,
  useGetAllTripsQuery,
} = tripsApi;
