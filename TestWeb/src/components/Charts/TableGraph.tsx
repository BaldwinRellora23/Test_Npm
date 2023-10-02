import {
  Box,
  Heading,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { data } from "../testData";
import React from "react";

const data1 = [
  {
    areaCode: "COMPANY_YEAR",
    yearNMonthSale: "2022",
    quota: 835400,
    ns_Traditional: 738334,
    nS_From_Estore: 4502,
    nS_Total: 742836,
    category: "PERYEAR",
    yrSale: 2022,
    variance: -11.080201101268,
  },
  {
    areaCode: "COMPANY_YEAR",
    yearNMonthSale: "2023",
    quota: 487125,
    ns_Traditional: 462083,
    nS_From_Estore: 4740,
    nS_Total: 466823,
    category: "PERYEAR",
    yrSale: 2023,
    variance: -4.167718758018,
  },
  {
    areaCode: "COMPANY_MONTH",
    yearNMonthSale: "FEBRUARY",
    quota: 70075,
    ns_Traditional: 49817,
    nS_From_Estore: 244,
    nS_Total: 50061,
    category: "PERMONTH",
    yrSale: 2022,
    variance: -28.560827684623,
  },
  {
    areaCode: "COMPANY_MONTH",
    yearNMonthSale: "JULY",
    quota: 69475,
    ns_Traditional: 59939,
    nS_From_Estore: 330,
    nS_Total: 60269,
    category: "PERMONTH",
    yrSale: 2023,
    variance: -13.250809643756,
  },
  {
    areaCode: "COMPANY_MONTH",
    yearNMonthSale: "MARCH",
    quota: 69675,
    ns_Traditional: 53900,
    nS_From_Estore: 246,
    nS_Total: 54146,
    category: "PERMONTH",
    yrSale: 2022,
    variance: -22.287764621456,
  },
];

interface TH {
  AreaCode: string;
  Quota: number;
  NsTotal: number;
  Variance: number;
}

interface Props {
  data: TH[];
}

const TableGraph = ({ data }: Props) => {
  // const Variance = data.map((a) => {
  //   (a.NsTotal - a.Quota) / a.Quota;
  // });

  return (
    // h={640}
    <Box
      shadow="xl"
      borderWidth="1px"
      h={450}
      overflow="auto"
      borderRadius={10}
    >
      <Heading
        fontSize="md"
        p={5}
        borderColor="gray.100"
        color="green.500"
        pr={4}
        // bgColor="gray.50"
        borderWidth="1px"
        justifyContent="space-between"
        alignItems="center"
        bgColor="white"
      >
        NS PER AREA CODE
      </Heading>
      <Table variant="striped" colorScheme="teal" pl="28">
        <Thead position="sticky" top={0} zIndex="sticky" bgColor="white">
          <Tr>
            <Th p={5} fontSize="lg">
              Area Code
            </Th>
            <Th isNumeric p={5} fontSize="lg">
              Quota
            </Th>
            <Th isNumeric p={5} fontSize="lg">
              NS Total
            </Th>
            <Th isNumeric p={5} fontSize="lg">
              Variance
            </Th>
            {/* <Th>Total</Th> */}
          </Tr>
        </Thead>
        <Tbody h={300}>
          {data.map((a, index) => (
            <Tr key={index}>
              <Td fontSize="md">{a.AreaCode}</Td>
              <Td isNumeric fontSize="md">
                {a.Quota.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Td>
              <Td isNumeric fontSize="md">
                {a.NsTotal.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Td>
              <Td
                color={(a.NsTotal - a.Quota) / a.Quota < 0 ? "red" : "black"}
                isNumeric
                fontSize="md"
              >
                {((a.NsTotal - a.Quota) / a.Quota).toLocaleString(undefined, {
                  maximumFractionDigits: 3,
                })}
                %
              </Td>
              {/* <Td>{item.total}</Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableGraph;
