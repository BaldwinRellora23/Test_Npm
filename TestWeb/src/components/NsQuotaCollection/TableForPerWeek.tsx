import {
  Box,
  Heading,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { data } from "../testData";
import React from "react";

export interface ITablePerWeek {
  Months: string;
  Advance: number;
  "1st Week": number;
  "2nd Week": number;
  "3rd Week": number;
  "4th Week": number;
  "Past Due": number;
}

interface Props {
  data: ITablePerWeek[];
}

const TableForPerWeek = ({ data }: Props) => {
  const sumOfAdvance = data.reduce((accu, data) => {
    return accu + data.Advance;
  }, 0);

  const sumOf1stWeek = data.reduce((accu, data) => {
    return accu + data["1st Week"];
  }, 0);
  const sumOf2ndWeek = data.reduce((accu, data) => {
    return accu + data["2nd Week"];
  }, 0);
  const sumOf3rdWeek = data.reduce((accu, data) => {
    return accu + data["3rd Week"];
  }, 0);
  const sumOf4thWeek = data.reduce((accu, data) => {
    return accu + data["4th Week"];
  }, 0);
  const sumOfPastDue = data.reduce((accu, data) => {
    return accu + data["Past Due"];
  }, 0);

  // const Variance = data.map((a) => {
  //   (a.NsTotal - a.Quota) / a.Quota;
  // });

  return (
    <>
      <Heading
        fontSize="lg"
        p={5}
        borderColor="gray.100"
        color="green.500"
        pr={4}
        overflow="auto"
        borderWidth="1px"
        justifyContent="space-between"
        alignItems="center"
        bgColor="white"
      >
        TOTAL COUNT PER WEEK
      </Heading>
      <Box maxH={600} overflow="auto">
        <Table variant="striped" colorScheme="teal" pl="28">
          <Thead position="sticky" top={0} zIndex="sticky" bgColor="white">
            <Tr>
              <Th p={5} fontSize="md">
                Month
              </Th>
              <Th isNumeric p={5} fontSize="md">
                Advance
              </Th>
              <Th isNumeric p={5} fontSize="md">
                1ST WEEK
              </Th>
              <Th isNumeric p={5} fontSize="md">
                2ND WEEK
              </Th>
              <Th isNumeric p={5} fontSize="md">
                3RD WEEK
              </Th>
              <Th isNumeric p={5} fontSize="md">
                4TH WEEK
              </Th>
              <Th isNumeric p={5} fontSize="md">
                PAST DUE
              </Th>
              {/* <Th>Total</Th> */}
            </Tr>
          </Thead>
          <Tbody h={300}>
            {data.map((a, index) => (
              <Tr key={index}>
                <Td fontSize="md">{a.Months}</Td>

                <Td isNumeric fontSize="md">
                  {a.Advance.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </Td>
                <Td isNumeric fontSize="md">
                  {a["1st Week"].toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </Td>
                <Td isNumeric fontSize="md">
                  {a["2nd Week"].toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </Td>
                <Td isNumeric fontSize="md">
                  {a["3rd Week"].toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </Td>
                <Td isNumeric fontSize="md">
                  {a["4th Week"].toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </Td>
                <Td isNumeric fontSize="md">
                  {a["Past Due"].toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th fontSize="sm">Grand Total</Th>

              <Th isNumeric fontSize="md" fontWeight="semibold">
                {sumOfAdvance.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Th>
              <Th isNumeric fontSize="md" fontWeight="semibold">
                {sumOf1stWeek.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Th>
              <Th isNumeric fontSize="md" fontWeight="semibold">
                {sumOf2ndWeek.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Th>
              <Th isNumeric fontSize="md" fontWeight="semibold">
                {sumOf3rdWeek.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Th>
              <Th isNumeric fontSize="md" fontWeight="semibold">
                {sumOf4thWeek.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Th>
              <Th isNumeric fontSize="md" fontWeight="semibold">
                {sumOfPastDue.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </>
  );
};

export default TableForPerWeek;
