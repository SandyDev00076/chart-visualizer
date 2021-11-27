import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartEntry } from "../types/chartEntry";
import { generateRandomColor } from "../utils";
import { updateChart } from "../redux/charts/chartsSlice";
import { useAppDispatch } from "../app/hooks";

import styles from "./ChartTile.module.scss";

interface Props {
  chartIndex: number;
  chart: ChartEntry;
}
const ChartTile = ({ chartIndex, chart }: Props) => {
  const dispatch = useAppDispatch();
  const [tipVisibility, showTip] = useState(false);

  const chartValues = chart.elements.map((ele, index) => ({
    name: index + 1,
    value: ele,
    fill: generateRandomColor(),
  }));

  function onValuesSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputs = Array.from(e.currentTarget.elements).slice(
      0,
      -1
    ) as HTMLInputElement[];
    const newElements = inputs.map((inp) => parseInt(inp.value));
    dispatch(
      updateChart({
        chartIndex,
        newElements,
      })
    );
    showTip(false);
  }

  return (
    <section className={styles.container}>
      <ResponsiveContainer width="90%" height={400}>
        {chart.type === "Bar" ? (
          <BarChart data={chartValues}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={chartValues}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
            />
            <Tooltip />
          </PieChart>
        )}
      </ResponsiveContainer>
      <section className={styles.controls}>
        <h1>Inputs</h1>
        <form className={styles.inputs} onSubmit={onValuesSubmit}>
          {chart.elements.map((ele, index) => (
            <div key={index} className={styles.inputBox}>
              <label className={styles.inpLabel}>{index + 1}</label>
              <input
                className={styles.inp}
                defaultValue={ele}
                onChange={() => showTip(true)}
              />
            </div>
          ))}
          <input type="submit" style={{ display: "none" }} />
        </form>
        {tipVisibility && (
          <p>
            <em>Hit Enter to apply the changes</em>
          </p>
        )}
      </section>
    </section>
  );
};

export default ChartTile;
