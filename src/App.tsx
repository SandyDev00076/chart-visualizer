import React, { useEffect } from "react";
import { getCharts } from "./api/chartsAPI";
import styles from "./App.module.scss";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import ChartTile from "./components/ChartTile";
import { setCharts } from "./redux/charts/chartsSlice";
import { ChartEntry } from "./types/chartEntry";
import { checkWhetherStateIsPersisted } from "./utils";

function App() {
  const dispatch = useAppDispatch();
  const chartsData = useAppSelector((state: RootState) => state.charts.entries);

  useEffect(() => {
    async function getChartValues() {
      dispatch(
        setCharts({
          charts: (await getCharts()) as ChartEntry[],
        })
      );
    }
    !checkWhetherStateIsPersisted() && getChartValues();
  }, [dispatch]);

  return (
    <section className={styles.container}>
      <div className={styles.intro}>
        <h2>Chart Visualizer</h2>
        <h1>
          By <strong>Sanjeet Tiwari</strong>, via <strong>Redux</strong>,{" "}
          <strong>Recharts</strong>
        </h1>
      </div>
      {chartsData.map((chart, index) => (
        <ChartTile key={index} chartIndex={index} chart={chart} />
      ))}
      <footer>
        If you want to know more about me, check out my website -{" "}
        <a
          href="https://sanjeettiwari.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sanjeet Tiwari
        </a>
      </footer>
    </section>
  );
}

export default App;
