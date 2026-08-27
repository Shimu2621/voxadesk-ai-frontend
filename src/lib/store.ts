import { configureStore } from "@reduxjs/toolkit";
import { voxadeskApi } from "@/lib/voxadesk-api";

export const makeStore = () =>
  configureStore({
    reducer: { [voxadeskApi.reducerPath]: voxadeskApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(voxadeskApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
