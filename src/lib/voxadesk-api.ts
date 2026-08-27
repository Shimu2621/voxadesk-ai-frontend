import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type DashboardSummary = {
  organization: { id: string; name: string };
  metrics: {
    totalConversations: number;
    bookingRate: number;
    qualifiedLeads: number;
    unresolvedTasks: number;
  };
};

export const voxadeskApi = createApi({
  reducerPath: "voxadeskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1",
    credentials: "include",
  }),
  tagTypes: ["Dashboard", "Agent", "Conversation", "Appointment", "Inbox"],
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardSummary, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardQuery } = voxadeskApi;
