import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type DashboardSummary = {
  organization: { id: string; name: string };
  metrics: {
    totalConversations: number;
    bookingRate: number;
    qualifiedLeads: number;
    unresolvedTasks: number;
    averageDurationSeconds: number;
    estimatedCost: string;
  };
};
export type AnalyticsSummary = {
  totalConversations: number;
  outcomes: Array<{ outcome: string; count: number }>;
  averageDurationSeconds: number;
  estimatedCost: string;
  unresolvedTasks: number;
};

export type Organization = {
  id: string;
  name: string;
  legalName?: string | null;
  category?: string | null;
  timezone: string;
  locale: string;
  contactEmail?: string | null;
  website?: string | null;
  onboardingStep: number;
  onboardingCompletedAt?: string | null;
};
export type Agent = {
  id: string;
  name: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  draftConfig: Record<string, unknown>;
  activeVersion?: { id: string; version: number } | null;
};
export type KnowledgeSource = {
  id: string;
  name: string;
  type: string;
  status: string;
  error?: string | null;
  updatedAt: string;
};
export type Conversation = {
  id: string;
  status: string;
  channel: string;
  outcome?: string | null;
  summary?: string | null;
  durationSeconds?: number | null;
  createdAt: string;
  agent: { name: string };
  messages?: Array<{
    id: string;
    role: string;
    content: string;
    timestamp: string;
  }>;
  toolExecutions: Array<{
    id: string;
    toolName: string;
    status: string;
    createdAt: string;
  }>;
};
export type Appointment = {
  id: string;
  startAt: string;
  endAt: string;
  timezone: string;
  status: string;
  syncStatus: string;
  contact: { name?: string | null };
  location: { name: string };
};
export type InboxTask = {
  id: string;
  type: string;
  priority: string;
  status: string;
  dueAt?: string | null;
  contact?: { name?: string | null } | null;
  notes: Array<{ id: string; body: string }>;
};
const csrfToken = () =>
  typeof document === "undefined"
    ? undefined
    : document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("voxadesk_csrf="))
        ?.split("=")
        .slice(1)
        .join("=");

export const voxadeskApi = createApi({
  reducerPath: "voxadeskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = csrfToken();
      if (token) headers.set("x-csrf-token", decodeURIComponent(token));
      return headers;
    },
  }),
  tagTypes: [
    "Dashboard",
    "Organization",
    "Agent",
    "Knowledge",
    "Conversation",
    "Appointment",
    "Inbox",
    "Integration",
    "Team",
    "Billing",
    "Operations",
  ],
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardSummary, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
    getAnalytics: builder.query<{ data: AnalyticsSummary }, void>({
      query: () => "/analytics",
      providesTags: ["Dashboard"],
    }),
    getOrganization: builder.query<{ data: Organization }, void>({
      query: () => "/organization",
      providesTags: ["Organization"],
    }),
    updateOrganization: builder.mutation<
      { data: Organization },
      Partial<Organization> & { name: string; timezone: string }
    >({
      query: (body) => ({ url: "/organization", method: "PATCH", body }),
      invalidatesTags: ["Organization"],
    }),
    getAgents: builder.query<{ data: Agent[] }, void>({
      query: () => "/agents",
      providesTags: ["Agent"],
    }),
    createAgent: builder.mutation<{ data: Agent }, Record<string, unknown>>({
      query: (body) => ({ url: "/agents", method: "POST", body }),
      invalidatesTags: ["Agent"],
    }),
    publishAgent: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/agents/${id}/publish`, method: "POST" }),
      invalidatesTags: ["Agent"],
    }),
    createSignedSession: builder.mutation<
      { data: { conversationId: string; token: string; expiresAt: string } },
      string
    >({
      query: (id) => ({ url: `/agents/${id}/signed-session`, method: "POST" }),
    }),
    getKnowledge: builder.query<{ data: KnowledgeSource[] }, void>({
      query: () => "/knowledge",
      providesTags: ["Knowledge"],
    }),
    createKnowledge: builder.mutation<
      { data: KnowledgeSource },
      { type: "TEXT"; name: string; content: string }
    >({
      query: (body) => ({ url: "/knowledge", method: "POST", body }),
      invalidatesTags: ["Knowledge"],
    }),
    syncKnowledge: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/knowledge/${id}/sync`, method: "POST" }),
      invalidatesTags: ["Knowledge"],
    }),
    archiveKnowledge: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/knowledge/${id}/archive`, method: "POST" }),
      invalidatesTags: ["Knowledge"],
    }),
    getConversations: builder.query<
      { data: Conversation[]; nextCursor?: string | null },
      void
    >({ query: () => "/conversations", providesTags: ["Conversation"] }),
    getConversation: builder.query<
      { data: Conversation; appointments: Appointment[] },
      string
    >({
      query: (id) => `/conversations/${id}`,
      providesTags: ["Conversation"],
    }),
    getAppointments: builder.query<{ data: Appointment[] }, void>({
      query: () => "/appointments",
      providesTags: ["Appointment"],
    }),
    updateAppointment: builder.mutation<
      unknown,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/appointments/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Appointment"],
    }),
    getInbox: builder.query<{ data: InboxTask[] }, void>({
      query: () => "/inbox",
      providesTags: ["Inbox"],
    }),
    updateInbox: builder.mutation<unknown, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/inbox/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Inbox"],
    }),
    getIntegrations: builder.query<
      { data: Array<{ id: string; type: string; status: string }> },
      void
    >({ query: () => "/integrations", providesTags: ["Integration"] }),
    connectIntegration: builder.mutation<
      unknown,
      { type: string; mode: string }
    >({
      query: ({ type, mode }) => ({
        url: `/integrations/${mode}/${type}`,
        method: "POST",
        body:
          type === "GOOGLE_CALENDAR"
            ? { calendarId: "primary", label: "Mock calendar" }
            : { label: `Mock ${type}` },
      }),
      invalidatesTags: ["Integration"],
    }),
    getTeam: builder.query<
      {
        data: {
          members: Array<{
            id: string;
            role: string;
            user: { name?: string | null; email: string };
          }>;
          invitations: Array<{
            id: string;
            email: string;
            role: string;
            expiresAt: string;
          }>;
        };
      },
      void
    >({ query: () => "/team", providesTags: ["Team"] }),
    inviteMember: builder.mutation<unknown, { email: string; role: string }>({
      query: (body) => ({ url: "/invitations", method: "POST", body }),
      invalidatesTags: ["Team"],
    }),
    getBilling: builder.query<
      {
        data: {
          planCode: string;
          entitlements: Record<string, number>;
          subscription?: { status: string } | null;
          providerMode: string;
        };
      },
      void
    >({ query: () => "/billing", providesTags: ["Billing"] }),
    createCheckout: builder.mutation<{ data: { url: string } }, string>({
      query: (planCode) => ({
        url: "/billing/checkout",
        method: "POST",
        body: { planCode, returnUrl: `${window.location.origin}/app/settings` },
      }),
    }),
    getOperationsHealth: builder.query<
      {
        data: {
          providers: Array<{
            id: string;
            provider: string;
            status: string;
            latencyMs?: number | null;
            checkedAt: string;
          }>;
          queues: Array<{
            queue: string;
            waiting: number;
            active: number;
            delayed: number;
            failed: number;
          }>;
        };
      },
      void
    >({ query: () => "/operations/health", providesTags: ["Operations"] }),
    getWebhookDeliveries: builder.query<
      {
        data: Array<{
          id: string;
          eventType: string;
          status: string;
          attemptCount: number;
          responseStatus?: number | null;
          createdAt: string;
        }>;
        nextCursor?: string | null;
      },
      void
    >({
      query: () => "/operations/webhook-deliveries",
      providesTags: ["Operations"],
    }),
    replayWebhookDelivery: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/operations/webhook-deliveries/${id}/replay`,
        method: "POST",
      }),
      invalidatesTags: ["Operations"],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetAnalyticsQuery,
  useGetOrganizationQuery,
  useUpdateOrganizationMutation,
  useGetAgentsQuery,
  useCreateAgentMutation,
  usePublishAgentMutation,
  useCreateSignedSessionMutation,
  useGetKnowledgeQuery,
  useCreateKnowledgeMutation,
  useSyncKnowledgeMutation,
  useArchiveKnowledgeMutation,
  useGetConversationsQuery,
  useGetConversationQuery,
  useGetAppointmentsQuery,
  useUpdateAppointmentMutation,
  useGetInboxQuery,
  useUpdateInboxMutation,
  useGetIntegrationsQuery,
  useConnectIntegrationMutation,
  useGetTeamQuery,
  useInviteMemberMutation,
  useGetBillingQuery,
  useCreateCheckoutMutation,
  useGetOperationsHealthQuery,
  useGetWebhookDeliveriesQuery,
  useReplayWebhookDeliveryMutation,
} = voxadeskApi;
