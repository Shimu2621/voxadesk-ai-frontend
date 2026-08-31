import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  organizationId?: string;
  conversationFilters: {
    channel?: string;
    outcome?: string;
    includeTests: boolean;
  };
  providerDegraded: boolean;
  toasts: Array<{
    id: string;
    message: string;
    kind: "info" | "success" | "error";
  }>;
};
const initialState: UiState = {
  conversationFilters: { includeTests: false },
  providerDegraded: false,
  toasts: [],
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    selectOrganization: (state, action: PayloadAction<string>) => {
      state.organizationId = action.payload;
    },
    setConversationFilters: (
      state,
      action: PayloadAction<UiState["conversationFilters"]>,
    ) => {
      state.conversationFilters = action.payload;
    },
    setProviderDegraded: (state, action: PayloadAction<boolean>) => {
      state.providerDegraded = action.payload;
    },
    addToast: (state, action: PayloadAction<UiState["toasts"][number]>) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },
  },
});
export const uiReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;
