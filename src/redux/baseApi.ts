import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["USER", "USERS", "PAYMENTS", "AMBULANCES", "REQUESTS", "TRIPS"],
  endpoints: () => ({}),
});

export type ApiEndpointBuilder = Parameters<
  Parameters<typeof baseApi.injectEndpoints>[0]["endpoints"]
>[0];
