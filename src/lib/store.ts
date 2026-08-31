import { configureStore } from "@reduxjs/toolkit";
import { voxadeskApi } from "@/lib/voxadesk-api";
import { uiReducer } from "@/lib/ui-slice";

export const makeStore = () =>
  configureStore({
    reducer: { [voxadeskApi.reducerPath]: voxadeskApi.reducer, ui: uiReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(voxadeskApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
