import { baseApi, type ApiEndpointBuilder } from "../baseApi";
import type {
  PaymentInitialization,
  PaymentListResponse,
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
  }),
});

export const { useCreatePaymentMutation, useGetAllPaymentsQuery } = paymentsApi;
