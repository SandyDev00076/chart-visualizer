import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import chartsReducer, { ChartsStateType } from "../redux/charts/chartsSlice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "charts",
  storage,
};

const persistedReducer = persistReducer<ChartsStateType>(
  persistConfig,
  chartsReducer
);

export const store = configureStore({
  reducer: {
    charts: persistedReducer,
  },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
