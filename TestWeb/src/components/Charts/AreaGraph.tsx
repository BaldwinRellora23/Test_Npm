import { Box } from "@chakra-ui/react";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface AreaData {
  Category: string;
  NsTotal: number;
}

interface Props {
  data: AreaData[];
}

const AreaGraph = ({ data }: Props) => {
  const tooltipFormatter = (value: string) => {
    return `${parseInt(value).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <Box p={10} shadow="xl" borderRadius={10}>
      <AreaChart width={1200} height={450} data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="Category" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip formatter={tooltipFormatter} />
        <Area
          type="monotone"
          dataKey="NsTotal"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </Box>
  );
};

export default AreaGraph;
