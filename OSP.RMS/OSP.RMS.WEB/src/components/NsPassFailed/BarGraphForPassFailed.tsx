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

export interface IBarPerMonth {
  Months: string;
  Agents: number;
  Passed: number;
  Failed: number;
}

interface Props {
  data: IBarPerMonth[];
}

const BarGraphForPassFailed = ({ data }: Props) => {
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

  const sumOfAgents = data.reduce((accu, data) => {
    return accu + data.Agents;
  }, 0);

  const sumOfPassed = data.reduce((accu, data) => {
    return accu + data.Passed;
  }, 0);

  const sumOfFailed = data.reduce((accu, data) => {
    return accu + data.Failed;
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
            MONTHLY PASSED AND FAILED
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
                  <Th isNumeric>AGENTS</Th>
                  <Th isNumeric>PASSED</Th>
                  <Th isNumeric>FAILED</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr key={item.Months}>
                    <Td>{item.Months}</Td>
                    <Td isNumeric>
                      {item.Agents.toLocaleString(undefined, {
                        maximumFractionDigits: 3,
                      })}
                    </Td>
                    <Td isNumeric>
                      {item.Passed.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </Td>
                    <Td isNumeric>
                      {item.Failed.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              {/* <Tfoot>
                <Tr>
                  <Th fontSize="sm">Grand Total</Th>

                  <Th
                    isNumeric
                    fontSize="md"
                    fontWeight="semibold"
                    color={sumOfAgents > 0 ? "black" : "red"}
                  >
                    {sumOfAgents.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </Th>

                  <Th
                    isNumeric
                    fontSize="md"
                    fontWeight="semibold"
                    color={sumOfPassed > 0 ? "black" : "red"}
                  >
                    {sumOfPassed.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </Th>

                  <Th
                    isNumeric
                    fontSize="md"
                    fontWeight="semibold"
                    color={sumOfFailed > 0 ? "black" : "red"}
                  >
                    {sumOfFailed.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </Th>
                </Tr>
              </Tfoot> */}
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </>
  );
};

export default BarGraphForPassFailed;
