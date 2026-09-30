import { baseApi, type ApiEndpointBuilder } from "../baseApi";
import type {
  Ambulance,
  AmbulanceQueryParams,
  PaginatedAmbulances,
} from "./ambulances.interface";

export const ambulancesApi = baseApi.injectEndpoints({
  endpoints: (builder: ApiEndpointBuilder) => ({
    getAmbulances: builder.query<PaginatedAmbulances, AmbulanceQueryParams>({
      query: ({ page, page_size, status, search }) => ({
        url: "/ambulances/",
        params: { page, page_size, status, search },
      }),
      transformResponse: (
        response: PaginatedAmbulances | Ambulance[],
        _meta,
        params,
      ): PaginatedAmbulances => {
        if (!Array.isArray(response)) return response;

        const normalizedSearch = params.search?.trim().toLowerCase() ?? "";
        const filtered = response.filter((ambulance) => {
          const matchesStatus =
            !params.status || ambulance.status === params.status;
          const searchableText = `${ambulance.ambulance_number} ${ambulance.ambulance_type} ${ambulance.model ?? ""}`.toLowerCase();
          return matchesStatus && searchableText.includes(normalizedSearch);
        });
        const start = (params.page - 1) * params.page_size;

        return {
          items: filtered.slice(start, start + params.page_size),
          total: filtered.length,
          page: params.page,
          page_size: params.page_size,
          pages: Math.ceil(filtered.length / params.page_size),
        };
      },
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
  useGetAmbulanceQuery,
  useGetMyAmbulanceQuery,
  useUpdateMyAmbulanceStatusMutation,
} = ambulancesApi;
