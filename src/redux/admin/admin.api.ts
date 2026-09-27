import { baseApi, type ApiEndpointBuilder } from "../baseApi";

interface User {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface RegisterUser {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

interface Ambulance {
  id: number;
  ambulance_number: string;
  ambulance_type: string;
  model: string | null;
  capacity: number;
  status: string;
  driver_id: number | null;
  created_at: string;
}

interface CreateAmbulance {
  ambulance_number: string;
  ambulance_type: string;
  model?: string | null;
  capacity?: number;
  driver_id?: number | null;
}

interface ApiMessage {
  message: string;
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder: ApiEndpointBuilder) => ({
    createAdmin: builder.mutation<User, RegisterUser>({
      query: (data: RegisterUser) => ({
        url: "/admin/create-admin",
        method: "POST",
        data,
      }),
      invalidatesTags: ["USERS"],
    }),
    getAdminUsers: builder.query<User[], void>({
      query: () => ({ url: "/admin/users" }),
      providesTags: ["USERS"],
    }),
    getAdminUser: builder.query<User, number>({
      query: (id: number) => ({ url: `/admin/users/${id}` }),
      providesTags: ["USERS"],
    }),
    deactivateUser: builder.mutation<ApiMessage, number>({
      query: (id: number) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USERS"],
    }),
    createDriver: builder.mutation<User, RegisterUser>({
      query: (data: RegisterUser) => ({
        url: "/admin/drivers",
        method: "POST",
        data,
      }),
      invalidatesTags: ["USERS"],
    }),
    getDrivers: builder.query<User[], void>({
      query: () => ({ url: "/admin/drivers" }),
      providesTags: ["USERS"],
    }),
    createAmbulance: builder.mutation<Ambulance, CreateAmbulance>({
      query: (data: CreateAmbulance) => ({
        url: "/admin/ambulances",
        method: "POST",
        data,
      }),
      invalidatesTags: ["AMBULANCES"],
    }),
    updateAmbulance: builder.mutation<
      Ambulance,
      { id: number; data: CreateAmbulance }
    >({
      query: ({ id, data }: { id: number; data: CreateAmbulance }) => ({
        url: `/admin/ambulances/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["AMBULANCES"],
    }),
    deleteAmbulance: builder.mutation<ApiMessage, number>({
      query: (id: number) => ({
        url: `/admin/ambulances/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AMBULANCES"],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAdminUsersQuery,
  useGetAdminUserQuery,
  useDeactivateUserMutation,
  useCreateDriverMutation,
  useGetDriversQuery,
  useCreateAmbulanceMutation,
  useUpdateAmbulanceMutation,
  useDeleteAmbulanceMutation,
} = adminApi;