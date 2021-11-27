import React, { useEffect } from "react";
import { getCharts } from "./api/chartsAPI";
import styles from "./App.module.scss";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import ChartTile from "./components/ChartTile";
import { setCharts } from "./redux/charts/chartsSlice";
import { ChartEntry } from "./types/chartEntry";

function App() {
  const dispatch = useAppDispatch();
  const chartsData = useAppSelector((state: RootState) => state.charts.entries);
  console.log(chartsData);

  useEffect(() => {
    async function getChartValues() {
      dispatch(
        setCharts({
          charts: (await getCharts()) as ChartEntry[],
        })
      );
    }
    getChartValues();
  }, [dispatch]);

  return (
    <section className={styles.container}>
      <div className={styles.intro}>
        <h2>Chart Visualizer</h2>
        <h1>
          By <strong>Sanjeet Tiwari</strong>, via <strong>Recharts</strong>
        </h1>
      </div>
      {chartsData.map((chart, index) => (
        <ChartTile key={index} chartIndex={index} chart={chart} />
      ))}
    </section>
  );
}

export default App;
