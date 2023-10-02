import { Box, Spacer } from "@chakra-ui/react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export interface LineData {
  Category: string;
  NsTotal: number;
}

interface Props {
  data: LineData[];
}

const LineGraph = ({ data }: Props) => {
  return (
    <Box p={10} shadow="xl">
      <LineChart width={1250} height={450} data={data}>
        <XAxis dataKey="Category" />
        <YAxis />
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="NsTotal" stroke="#8884d8" />
      </LineChart>
    </Box>
  );
};

export default LineGraph;
