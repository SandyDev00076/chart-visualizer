import { useState, useMemo } from "react";
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

  /**
   * Written this logic to generate the band of colors
   * for this chart just once on render, to prevent all the colors getting
   * changed on every input update.
   */
  const bandOfColors = useMemo(() => {
    return [...Array(chart.elements.length)].map(() => generateRandomColor());
  }, [chart.elements.length]);

  /**
   * Setting up the data that I need to feed recharts
   * UI components
   */
  const chartValues = chart.elements.map((ele, index) => ({
    name: index + 1,
    value: ele,
    fill: bandOfColors[index],
  }));

  function onValuesSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    /**
     * Taking all but last one (the hidden input with type - submit) elements
     * and forming it into an array
     *
     */
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
          {/* Hidden submit input so that values are recorded in onSubmit listener on pressing Enter */}
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
