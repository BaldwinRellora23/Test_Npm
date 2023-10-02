import {
  Box,
  Flex,
  Heading,
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
} from "recharts";

interface ChartData {
  Months: string;
  Quota: number;
  NsTotal: number;
  Variance: number;
}

interface Props {
  data: ChartData[];
}

const BarGraph = ({ data }: Props) => {
  const [dataCount, setDataCount] = useState<number>();

  useEffect(() => {
    setDataCount(data.length);
    // console.log(monthLength);
  }, [data]);
  // console.log(dataCount.length);

  const tooltipFormatter = (value: string) => {
    return `${parseInt(value).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;
  };

  const formatYAxisLabel = (value: number, index: number) => {
    // if (value >= 1000) {
    return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    // }
    // return value.toString(); // Ensure it returns a string
  };

  const formatXAxisLabel = (value: string, index: number) => {
    // console.log(dataCount);
    if (dataCount! > 8) {
      return `${value.slice(0, 3)}`;
    }
    return value.toString();
  };

  const sumQuota = data.reduce((accu, data) => {
    return accu + data.Quota;
  }, 0);

  const sumNsTotal = data.reduce((accu, data) => {
    return accu + data.NsTotal;
  }, 0);

  const GrandVariance = ((sumNsTotal - sumQuota) / sumQuota) * 100;

  return (
    <>
      <Flex>
        <Box w="100%" shadow="lg" bgColor="white" borderRadius={10}>
          <Heading
            fontSize="md"
            // p={5}
            pl={5}
            pt={5}
            borderColor="gray.100"
            color="green.500"
            pr={4}
            // bgColor="gray.100"
            // borderWidth="1px"
            justifyContent="space-between"
            alignItems="center"
          >
            QUOTA PER MONTH
          </Heading>
          <Box pr={5} pt={10}>
            <BarChart
              width={700}
              height={350}
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
              {/* <CartesianGrid stroke="#f5f5f5" /> */}
              {/* <Bar dataKey="NsTraditional" fill="#8884d8" /> */}
              <Bar dataKey="Quota" fill="#8884d8" />
              <Bar dataKey="NsTotal" fill="#FFBB28" />
            </BarChart>
          </Box>
        </Box>

        <Box
          h={500}
          ml={5}
          overflowY="auto"
          minW={560}
          shadow="xl"
          bgColor="white"
          borderRadius={10}
        >
          <TableContainer>
            <Table>
              <Thead h="16">
                <Tr>
                  <Th>MONTH</Th>
                  <Th isNumeric>QUOTA</Th>
                  <Th isNumeric>NSTOTAL </Th>
                  <Th isNumeric>VARIANCE</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr key={item.Months}>
                    <Td>{item.Months}</Td>
                    <Td isNumeric>
                      {item.Quota.toLocaleString(undefined, {
                        maximumFractionDigits: 3,
                      })}
                    </Td>
                    <Td isNumeric>
                      {item.NsTotal.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </Td>
                    <Td
                      isNumeric
                      color={
                        ((item.NsTotal - item.Quota) / item.Quota) * 100 > 0
                          ? "black"
                          : "red"
                      }
                    >
                      {(
                        ((item.NsTotal - item.Quota) / item.Quota) *
                        100
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                      %
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th fontSize="sm">Grand Total</Th>

                  <Th
                    isNumeric
                    fontSize="md"
                    fontWeight="semibold"
                    color={sumQuota > 0 ? "black" : "red"}
                  >
                    {sumQuota.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </Th>

                  <Th
                    isNumeric
                    fontSize="md"
                    fontWeight="semibold"
                    color={sumNsTotal > 0 ? "black" : "red"}
                  >
                    {sumNsTotal.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </Th>

                  <Th
                    isNumeric
                    fontSize="md"
                    fontWeight="semibold"
                    color={GrandVariance > 0 ? "black" : "red"}
                  >
                    {GrandVariance.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                    %
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </>
  );
};

export default BarGraph;
