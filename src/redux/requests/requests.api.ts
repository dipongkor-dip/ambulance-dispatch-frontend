import { baseApi, type ApiEndpointBuilder } from "../baseApi";

interface AmbulanceRequest {
	id: number;
	passenger_id: number;
	ambulance_id: number | null;
	pickup_location: string;
	destination: string;
	status: string;
	request_time: string;
}

interface CreateRequestPayload {
	pickup_location: string;
	destination: string;
}

export const requestsApi = baseApi.injectEndpoints({
	endpoints: (builder: ApiEndpointBuilder) => ({
		createRequest: builder.mutation<AmbulanceRequest, CreateRequestPayload>({
			query: (data: CreateRequestPayload) => ({
				url: "/requests/",
				method: "POST",
				data,
			}),
			invalidatesTags: ["REQUESTS"],
		}),
		getMyRequests: builder.query<AmbulanceRequest[], void>({
			query: () => ({ url: "/requests/my" }),
			providesTags: ["REQUESTS"],
		}),
		getMyRequest: builder.query<AmbulanceRequest, number>({
			query: (id: number) => ({ url: `/requests/my/${id}` }),
			providesTags: ["REQUESTS"],
		}),
		cancelRequest: builder.mutation<AmbulanceRequest, number>({
			query: (id: number) => ({
				url: `/requests/${id}/cancel`,
				method: "POST",
			}),
			invalidatesTags: ["REQUESTS", "TRIPS"],
		}),
		getPendingRequests: builder.query<AmbulanceRequest[], void>({
			query: () => ({ url: "/requests/pending" }),
			providesTags: ["REQUESTS"],
		}),
		acceptRequest: builder.mutation<AmbulanceRequest, number>({
			query: (id: number) => ({
				url: `/requests/${id}/accept`,
				method: "POST",
			}),
			invalidatesTags: ["REQUESTS", "TRIPS", "AMBULANCES"],
		}),
		rejectRequest: builder.mutation<AmbulanceRequest, number>({
			query: (id: number) => ({
				url: `/requests/${id}/reject`,
				method: "POST",
			}),
			invalidatesTags: ["REQUESTS"],
		}),
		getAllRequests: builder.query<AmbulanceRequest[], void>({
			query: () => ({ url: "/requests/admin/all" }),
			providesTags: ["REQUESTS"],
		}),
	}),
});

export const {
	useCreateRequestMutation,
	useGetMyRequestsQuery,
	useGetMyRequestQuery,
	useCancelRequestMutation,
	useGetPendingRequestsQuery,
	useAcceptRequestMutation,
	useRejectRequestMutation,
	useGetAllRequestsQuery,
} = requestsApi;
