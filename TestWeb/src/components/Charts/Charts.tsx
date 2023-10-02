import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface BarChartProps {
  data: ChartData[];
}

const Charts = ({ data }: BarChartProps) => {
  return (
    <BarChart width={600} height={400} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid stroke="#f5f5f5" />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

export default Charts;
