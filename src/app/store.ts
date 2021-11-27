import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import chartsReducer from "../redux/charts/chartsSlice";

export const store = configureStore({
  reducer: {
    charts: chartsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
