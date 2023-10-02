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

export interface IBarPerMonthComm {
  Months: string;
  "Com 30 days": number;
  "Com 60 days": number;
  "Com 90 days": number;
}

interface Props {
  data: IBarPerMonthComm[];
}

const BarGraphForComm = ({ data }: Props) => {
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
    // return `${parseInt(value).toLocaleString(undefined, {
    //   maximumFractionDigits: 2,
    // })}`;
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
    if (dataCount! > 8) {
      return `${value.slice(0, 3)}`;
    }
    return value.toString();
  };

  const sumOfQ30 = data.reduce((accu, data) => {
    return accu + data["Com 30 days"];
  }, 0);

  const sumofQ60 = data.reduce((accu, data) => {
    return accu + data["Com 60 days"];
  }, 0);

  const sumofQ90 = data.reduce((accu, data) => {
    return accu + data["Com 90 days"];
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
            justifyContent="space-between"
            alignItems="center"
          >
            MONTHLY QUOTA COM
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
              <Bar dataKey="Com 30 days" fill="#8884d8" />
              <Bar dataKey="Com 60 days" fill="#FFBB28" />
              <Bar dataKey="Com 90 days" fill="#82ca9d" />
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
                  <Th isNumeric>COM QUOTA 30 DAYS</Th>
                  <Th isNumeric>COM QUOTA 60 DAYS</Th>
                  <Th isNumeric>COM QUOTA 90 DAYS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr key={item.Months}>
                    <Td>{item.Months}</Td>
                    <Td isNumeric>
                      {item["Com 30 days"].toLocaleString(undefined, {
                        maximumFractionDigits: 3,
                      })}
                    </Td>
                    <Td isNumeric>
                      {item["Com 60 days"].toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </Td>
                    <Td isNumeric>
                      {item["Com 90 days"].toLocaleString(undefined, {
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

export default BarGraphForComm;
