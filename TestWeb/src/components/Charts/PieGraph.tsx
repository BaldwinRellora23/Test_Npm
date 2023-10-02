import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface PieData {
  Category: string;
  NsTotal: number;
}

interface Props {
  data: PieData[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#FF33FF",
  "#66FF99",
];

const PieGraph = ({ data }: Props) => {
  const formatYAxisLabel = (value: number, index: number) => {
    // if (value >= 1000) {
    return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    // }
    // return value.toString(); // Ensure it returns a string
  };

  return (
    <Box justifyContent="center" display="flex" pl={10}>
      <PieChart width={500} height={380}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label
          dataKey="NsTotal"
          nameKey={"Category"}
        >
          {/* key={`cell-${entry}`} */}
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={formatYAxisLabel} />
        <Legend />
      </PieChart>
    </Box>
  );
};

export default PieGraph;
