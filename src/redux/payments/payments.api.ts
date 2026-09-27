import { baseApi, type ApiEndpointBuilder } from "../baseApi";

interface PaymentInitialization {
	message: string;
	payment_id: number;
	transaction_id: string;
	payment_url: string;
}

interface PaymentRecord {
	id: number;
	trip_id: number;
	amount: number;
	status: string;
	payment_method?: string;
	transaction_id?: string;
	receipt_url?: string | null;
}

interface PaymentListResponse {
	message: string;
	payments: PaymentRecord[];
}

export const paymentsApi = baseApi.injectEndpoints({
	endpoints: (builder: ApiEndpointBuilder) => ({
		createPayment: builder.mutation<PaymentInitialization, number>({
			query: (tripId: number) => ({
				url: `/payments/create/${tripId}`,
				method: "POST",
			}),
			invalidatesTags: ["PAYMENTS"],
		}),
		getAllPayments: builder.query<PaymentListResponse, void>({
			query: () => ({ url: "/payments/all" }),
			providesTags: ["PAYMENTS"],
		}),
	}),
});

export const { useCreatePaymentMutation, useGetAllPaymentsQuery } = paymentsApi;
