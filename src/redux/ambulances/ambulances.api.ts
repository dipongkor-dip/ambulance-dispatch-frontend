import { baseApi, type ApiEndpointBuilder } from "../baseApi";
import type { Ambulance } from "./ambulances.interface";

export const ambulancesApi = baseApi.injectEndpoints({
  endpoints: (builder: ApiEndpointBuilder) => ({
    getAmbulances: builder.query<Ambulance[], void>({
      query: () => ({ url: "/ambulances/" }),
      providesTags: ["AMBULANCES"],
    }),
    getAvailableAmbulances: builder.query<Ambulance[], void>({
      query: () => ({ url: "/ambulances/available" }),
      providesTags: ["AMBULANCES"],
    }),
    getAmbulance: builder.query<Ambulance, number>({
      query: (id: number) => ({ url: `/ambulances/${id}` }),
      providesTags: ["AMBULANCES"],
    }),
    getMyAmbulance: builder.query<Ambulance, void>({
      query: () => ({ url: "/ambulances/my/ambulance" }),
      providesTags: ["AMBULANCES"],
    }),
    updateMyAmbulanceStatus: builder.mutation<Ambulance, string>({
      query: (newStatus: string) => ({
        url: "/ambulances/my/ambulance/status",
        method: "PUT",
        params: { new_status: newStatus },
      }),
      invalidatesTags: ["AMBULANCES"],
    }),
  }),
});

export const {
  useGetAmbulancesQuery,
  useGetAvailableAmbulancesQuery,
  useGetAmbulanceQuery,
  useGetMyAmbulanceQuery,
  useUpdateMyAmbulanceStatusMutation,
} = ambulancesApi;
