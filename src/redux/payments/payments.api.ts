import { baseApi, type ApiEndpointBuilder } from "../baseApi";
import type {
  PaymentInitialization,
  PaymentListResponse,
  PaymentRecord,
} from "./payments.interface";

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
    getMyPayments: builder.query<PaymentListResponse, void>({
      query: () => ({ url: "/payments/my" }),
      providesTags: ["PAYMENTS"],
    }),
    getPaymentByTransactionId: builder.query<PaymentRecord, string>({
      query: (transactionId: string) => ({
        url: `/payments/transaction/${encodeURIComponent(transactionId)}`,
      }),
      providesTags: ["PAYMENTS"],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetAllPaymentsQuery,
  useGetMyPaymentsQuery,
  useGetPaymentByTransactionIdQuery,
} = paymentsApi;
