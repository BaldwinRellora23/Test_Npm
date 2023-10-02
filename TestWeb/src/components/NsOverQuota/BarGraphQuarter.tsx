import {
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

export interface iQuarter {
  Quarter: string;
  Quota: number;
  NsTotal: number;
  Variance: number;
}

interface Props {
  data: iQuarter[];
}

const BarGraphQuarter = ({ data }: Props) => {
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

  const SumQuota = data.reduce((accu, data) => {
    return accu + data.Quota;
  }, 0);

  const SumNsTotal = data.reduce((accu, data) => {
    return accu + data.NsTotal;
  }, 0);

  const GrandVariance = ((SumNsTotal - SumQuota) / SumQuota) * 100;
  // const GrandVariance = data.reduce((accu, data) => {
  //   return accu + data.Variance;
  // }, 0);

  return (
    <>
      <Flex>
        <Box pb={10} w="100%" shadow="md" bgColor="white" borderRadius={10}>
          {/* BarChart */}
          <Heading
            fontSize="md"
            p={5}
            borderColor="gray.200"
            color="green.500"
            pr={4}
            // bgColor="gray.100"
            // borderWidth="1px"
            justifyContent="space-between"
            alignItems="center"
            mb={5}
            borderBottom="InactiveBorder"
          >
            QUOTA PER QUARTER
          </Heading>

          <Box pr={5}>
            <BarChart width={700} height={300} data={data}>
              <XAxis dataKey="Quarter" tickFormatter={formatXAxisLabel} />
              <YAxis
                type="number"
                width={90}
                tickFormatter={formatYAxisLabel}
              />
              <Tooltip formatter={tooltipFormatter} />
              <Legend />
              {/* <CartesianGrid stroke="#f5f5f5" /> */}
              <Bar dataKey="Quota" fill="#8884d8" />
              <Bar dataKey="NsTotal" fill="#FFBB28" />
            </BarChart>
          </Box>

          {/* Table for Variance */}
        </Box>
        <Box h={300} pl={5}>
          <TableContainer
            mx="auto"
            w={560}
            h={420}
            shadow="xl"
            bgColor="white"
            borderRadius={10}
          >
            <Table>
              <Thead h="16">
                <Tr>
                  <Th>Quarter</Th>
                  <Th isNumeric>Quota</Th>
                  <Th isNumeric>NsTotal</Th>
                  <Th isNumeric>Variance</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr key={item.Quarter}>
                    <Td>{item.Quarter}</Td>
                    <Td isNumeric>
                      {item.Quota.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </Td>
                    <Td isNumeric>
                      {item.NsTotal.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </Td>
                    <Td isNumeric color={item.Variance > 0 ? "black" : "red"}>
                      {(
                        ((item.NsTotal - item.Quota) / item.Quota) *
                        100
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      %
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th> Grand Total </Th>
                  <Th
                    isNumeric
                    fontSize="md"
                    fontWeight="semibold"
                    color={SumQuota > 0 ? "black" : "red"}
                  >
                    {SumQuota.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </Th>

                  <Th
                    isNumeric
                    fontSize="md"
                    fontWeight="semibold"
                    color={SumNsTotal > 0 ? "black" : "red"}
                  >
                    {SumNsTotal.toLocaleString(undefined, {
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
export default BarGraphQuarter;
