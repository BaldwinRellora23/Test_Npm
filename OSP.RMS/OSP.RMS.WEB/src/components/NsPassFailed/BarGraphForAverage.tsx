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

export interface IBarPerMonthAverage {
  Months: string;
  Passed: number;
  Failed: number;
}

interface Props {
  data: IBarPerMonthAverage[];
}

const BarGraphForAverage = ({ data }: Props) => {
  const [dataCount, setDataCount] = useState<number>();

  useEffect(() => {
    setDataCount(data.length);
    // console.log(monthLength);
  }, [data]);
  // console.log(dataCount.length);

  const tooltipFormatter = (value: string) => {
    return `${parseInt(value).toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })}%`;
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

  //   const sumOfAgents = data.reduce((accu, data) => {
  //     return accu + data.Agents;
  //   }, 0);

  const MonthCount = data.length;
  //   console.log(MonthCount);

  const AvePassed = data.reduce((accu, data) => {
    return accu + data.Passed / MonthCount;
  }, 0);

  const AveFailed = data.reduce((accu, data) => {
    return accu + data.Failed / MonthCount;
  }, 0);

  //   const GrandVariance = ((sumNsTotal - sumQuota) / sumQuota) * 100;

  return (
    <>
      <Flex>
        {/* <Box w="100%" shadow="lg" bgColor="white" borderRadius={10}> */}
        <Box w="100%" p={5} bgColor="white" borderRadius={10} shadow="lg">
          <Heading
            fontSize="lg"
            // p={5}
            borderColor="gray.100"
            color="green.500"
            // bgColor="gray.100"
            // borderWidth="1px"
            justifyContent="space-between"
            alignItems="center"
          >
            MONTHLY PERCENTAGE OF PASSED AND FAILED
          </Heading>
          <Box pr={5} pt={10}>
            <BarChart
              width={660}
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
              {/* <Bar dataKey="Agents" fill="#8884d8" /> */}
              <Bar dataKey="Passed" fill="#8884d8" />
              <Bar dataKey="Failed" fill="#FFBB28" />
            </BarChart>
          </Box>
        </Box>
        {/* </Box> */}

        <Box
          h={500}
          ml={5}
          overflow="auto"
          minW={560}
          shadow="xl"
          bgColor="white"
          borderRadius={10}
        >
          <TableContainer overflowX="hidden">
            <Table>
              <Thead h="16">
                <Tr>
                  <Th>MONTH</Th>
                  <Th isNumeric>PERCENTAGE PASSED</Th>
                  <Th isNumeric>PERCENTAGE FAILED</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr key={item.Months}>
                    <Td>{item.Months}</Td>
                    {/* <Td isNumeric>
                      {item.Agents.toLocaleString(undefined, {
                        maximumFractionDigits: 3,
                      })}
                    </Td> */}
                    <Td isNumeric>
                      {item.Passed.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                      %
                    </Td>
                    <Td isNumeric>
                      {item.Failed.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                      %
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              {/* <Tfoot>
                <Tr>
                  <Th fontSize="sm">Grand Total</Th> */}

              {/* <Th
                    isNumeric
                    fontSize="md"
                    fontWeight="semibold"
                    color={sumOfAgents > 0 ? "black" : "red"}
                  >
                    {sumOfAgents.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </Th> */}

              {/* <Th
                    isNumeric
                    fontSize="md"
                    fontWeight="semibold"
                    color={AvePassed > 0 ? "black" : "red"}
                  >
                    {AvePassed.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                    %
                  </Th> */}

              {/* <Th
                    isNumeric
                    fontSize="md"
                    fontWeight="semibold"
                    color={AveFailed > 0 ? "black" : "red"}
                  >
                    {AveFailed.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                    %
                  </Th> */}
              {/* </Tr>
              </Tfoot> */}
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </>
  );
};

export default BarGraphForAverage;
