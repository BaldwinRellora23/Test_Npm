import {
  Box,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { data } from "./testData";

const Vw_nsSummarycomp = () => {
  const [groupByValue, setGroupByValue] = useState("SPLIT");
  const [filter, setFilter] = useState("");
  const [distinctValues, setDistinctValues] = useState<number[]>([]);

  useEffect(() => {
    const uniqueYears = [...new Set(data.map((item) => item.yrSale))];
    setDistinctValues(uniqueYears);
  }, []);

  const combineData = () => {
    const combinedData = distinctValues.map((year) => {
      const filteredByYear = data.filter((data) => data.yrSale === year);
      const sumQuota = filteredByYear.reduce(
        (total, item) => total + item.quota,
        0
      );
      const sumVariance = filteredByYear.reduce(
        (total, item) => total + item.variance,
        0
      );

      return {
        yrSale: year,
        quota: sumQuota,
        variance: sumVariance,
        total: sumQuota + sumVariance,
      };
    });

    return combinedData;
  };

  const filteredData = groupByValue === "SPLIT" ? data : combineData();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupByValue(e.target.value);
  };

  return (
    <Box>
      <Select
        // placeholder="Select Grouping"
        value={groupByValue}
        onChange={handleChange}
      >
        <option value="SPLIT">SPLIT</option>
        <option value="COMBINE">COMBINE</option>
      </Select>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Actual (YEAR)</Th>
            <Th>Quota</Th>
            <Th>Variance</Th>
            {/* <Th>Total</Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((item, index) => (
            <Tr key={index}>
              <Td>{item.yrSale}</Td>
              <Td>{item.quota}</Td>
              <Td>{item.variance}</Td>
              {/* <Td>{item.total}</Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Vw_nsSummarycomp;
