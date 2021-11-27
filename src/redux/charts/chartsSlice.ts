import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartEntry } from "../../types/chartEntry";

export interface ChartsStateType {
  entries: ChartEntry[];
}

const initialState: ChartsStateType = {
  entries: [],
};

interface UpdateChartPayload {
  chartIndex: number;
  newElements: number[];
}

interface SetChartPayload {
  charts: ChartEntry[];
}

export const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    updateChart: (state, action: PayloadAction<UpdateChartPayload>) => {
      const chartsCopy = [...state.entries];
      chartsCopy[action.payload.chartIndex].elements =
        action.payload.newElements;
      state.entries = chartsCopy;
    },
    setCharts: (state, action: PayloadAction<SetChartPayload>) => {
      state.entries = [...action.payload.charts];
    },
  },
});

export const { updateChart, setCharts } = chartsSlice.actions;

export default chartsSlice.reducer;
