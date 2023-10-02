import {
  Box,
  Flex,
  Heading,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
} from "recharts";

export interface IAreaAccount {
  Months: string;
  Account: number;
}

interface Props {
  data: IAreaAccount[];
}

const BarGraphForAcct = ({ data }: Props) => {
  const [dataCount, setDataCount] = useState<number>();

  useEffect(() => {
    setDataCount(data.length);
    // console.log(monthLength);
  }, [data]);
  // console.log(dataCount.length);

  const tooltipFormatter = (value: number) => {
    if (value >= 1000000) {
      // Convert to millions and format with 2 decimal places
      const millionValue = (value / 1000000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      return `${millionValue}M`;
    }
  };

  const formatYAxisLabel = (value: number, index: number) => {
    if (value >= 1000000) {
      // Convert to millions and format with 2 decimal places
      const millionValue = (value / 1000000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      return `${millionValue}M`;
    }

    // For values less than a million, format with 2 decimal places
    return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  const formatXAxisLabel = (value: string, index: number) => {
    // console.log(dataCount);
    if (dataCount! >= 8) {
      return `${value.slice(0, 3)}`;
    }
    return value.toString();
  };

  const sumOfAccounts = data.reduce((accu, data) => {
    return accu + data.Account;
  }, 0);

  return (
    <>
      <Flex>
        <Box p={5} width="100%" bgColor="white" borderRadius={10}>
          <Heading
            fontSize="lg"
            color="green.500"
            justifyContent="space-between"
            alignItems="center"
          >
            MONTHLY NUMBER OF ACCOUNTS
          </Heading>
          <Box pr={5} pt={10} maxH={300}>
            <BarChart
              width={650}
              height={400}
              data={data}
              // style={{ padding: "0 100 0 0" }}
            >
              <XAxis dataKey="Months" tickFormatter={formatXAxisLabel} />
              <YAxis
                type="number"
                width={80}
                tickFormatter={formatYAxisLabel}
              />
              <Tooltip formatter={tooltipFormatter} />
              <Legend />
              <Bar dataKey="Account" fill="#8884d8" />
            </BarChart>
          </Box>
        </Box>
        <Spacer />
        <Box
          ml={5}
          overflowY="auto"
          minW={560}
          bgColor="white"
          borderRadius={10}
        >
          <TableContainer>
            <Table>
              <Thead h="16">
                <Tr>
                  <Th>MONTH</Th>
                  <Th isNumeric>NUMBER OF ACCOUNTS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr key={item.Months}>
                    <Td>{item.Months}</Td>
                    <Td isNumeric>
                      {item.Account.toLocaleString(undefined, {
                        maximumFractionDigits: 3,
                      })}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr />
                <Th fontSize="sm">Grand Total</Th>
                <Th isNumeric fontSize="sm">
                  {sumOfAccounts.toLocaleString(undefined, {
                    maximumFractionDigits: 3,
                  })}
                </Th>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </>
  );
};

export default BarGraphForAcct;
