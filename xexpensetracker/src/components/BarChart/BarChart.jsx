import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import styles from "./BarChart.module.css";

export default function BarChartComponent({ data }) {
  return (
    <div className={styles.expenseChart}>
      <h2>Top Expenses</h2>

      <div className={styles.barWrapper}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              hide
            />

            <YAxis
              type="category"
              dataKey="name"
              width={100}
              axisLine={false}
              tickLine={false}
            />

            <Bar
              dataKey="value"
              barSize={25}
              fill="#8884d8"
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
