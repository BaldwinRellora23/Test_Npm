import {
  Box,
  Flex,
  HStack,
  Heading,
  Select,
  SimpleGrid,
  TagLeftIcon,
  TagRightIcon,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LineGraph from "./Charts/LineGraph";
import BarGraph from "./Charts/BarGraph";
import Cards from "./Charts/Cards";
import { AiOutlineBarChart } from "react-icons/ai";
import TableGraph from "./Charts/TableGraph";
import { data } from "./testData";
import PieGraph from "./Charts/PieGraph";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Numeric } from "d3-array";
import AreaGraph from "./Charts/AreaGraph";

const data1 = [
  { name: "Category 1", value: 10 },
  { name: "Category 2", value: 20 },
  { name: "Category 3", value: 15 },
  // Add more data as needed
];

interface ChartData {
  Category: string;
  Sum: number;
}

interface Graph2 {
  category: string;
  NsTraditional: number;
  NsEstore: number;
}

interface PieGraph {
  Category: string;
  NsTotal: number;
}

interface iBarGraph {
  months: string;
  Quota: number;
  NsTotal: number;
}

interface iTable {
  areaCode: string;
  quota: number;
  variance: number;
}

// interface Props {
//   data: ChartData[];
// }

const NsSummaryCompany = () => {
  const [distYear, setDistYear] = useState<number[]>([]);
  const [distCategory, setDistCategory] = useState<string[]>([]);
  const [distAreaCode, setAreaCode] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [sumTraditional, setSumTraditional] = useState<number>();
  const [sumEstore, setSumEstore] = useState<number>();
  const [sumNsTotal, setSumNsTotal] = useState<number>();
  const [groupEstore, setgroupEstore] = useState<ChartData[]>([]);
  const [groupGraph2, setGroupGraph2] = useState<Graph2[]>([]);
  const [groupPie, setGroupPie] = useState<PieGraph[]>([]);

  const monthOrder = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const [quota, setQuota] = useState<number>();
  const [variance, setVariance] = useState<number>();
  const [groupPerMonth, setGroupPerMonth] = useState<iBarGraph[]>([]);
  const [tableTH, setTableTH] = useState<iTable[]>([]);
  const [tableREG, setTableREG] = useState<iTable[]>([]);
  const [tableBRANCH, setTableBRANCH] = useState<iTable[]>([]);
  // FILTER BY YEAR GRAPH FOR ESTORE
  useEffect(() => {
    // Filter data based on selected category

    const filteredData = data.filter(
      (item) => item.yrSale.toString() === selectedYear
    );

    const SumQuota = filteredData.reduce((SumQuota, currentQuota) => {
      return SumQuota + currentQuota.quota;
    }, 0);
    setQuota(SumQuota);

    const sumVariance = filteredData.reduce((sumVariance, currentVariance) => {
      return sumVariance + currentVariance.variance;
    }, 0);
    setVariance(sumVariance);

    const groupedBar = Array.from(
      new Set(filteredData.map((item) => item.yearNMonthSale))
    )
      .filter((yearNMonthSale) => !yearNMonthSale.includes(selectedYear))
      .map((yearNMonthSale) => ({
        months: yearNMonthSale, // Use "name" for the category
        Quota: filteredData
          .filter((item) => item.yearNMonthSale === yearNMonthSale)
          .reduce((sum, item) => sum + item.quota, 0), // Use "value" for the sum
        NsTotal: filteredData
          .filter((item) => item.yearNMonthSale === yearNMonthSale)
          .reduce((sum, item) => sum + item.ns_Total, 0),
      }))
      .sort((a, b) => {
        return monthOrder.indexOf(a.months) - monthOrder.indexOf(b.months);
      });

    setGroupPerMonth(groupedBar);
    console.log(groupedBar);

    // const Territory = Array.from(
    //   new Set(filteredData.map((item) => item.areaCode))
    // )
    //   .filter((areaCode) => areaCode)
    //   .map((areaCode) => ({
    //     areaCode: areaCode, // Use "name" for the category
    //     quota: filteredData
    //       .filter((item) => item.category === "TERRITORY")
    //       .reduce((sum, item) => sum + item.variance, 0),
    //     variance: filteredData
    //       .filter((item) => item.category === "TERRITORY")
    //       .reduce((sum, item) => sum + item.quota, 0), // Use "value" for the sum
    //   }));

    const TerritoryFilter = filteredData.filter(
      (data) => data.category === "TERRITORY"
    );
    const Territory = Array.from(
      new Set(TerritoryFilter.map((a) => a.areaCode))
    )
      .filter((areaCode) => areaCode)
      .map((areaCode) => ({
        areaCode: areaCode,
        quota: TerritoryFilter.filter((a) => a.areaCode == areaCode).reduce(
          (sum, data) => sum + data.quota,
          0
        ),
        variance: TerritoryFilter.filter((a) => a.areaCode == areaCode).reduce(
          (sum, data) => sum + data.variance,
          0
        ),
      }))
      .sort((a, b) => b.variance - a.variance)
      .slice(0, 5);
    setTableTH(Territory);

    const RegionalFilter = filteredData.filter(
      (data) => data.category === "REGION"
    );
    const Regional = Array.from(new Set(RegionalFilter.map((a) => a.areaCode)))
      .filter((areaCode) => areaCode)
      .map((areaCode) => ({
        areaCode: areaCode,
        quota: RegionalFilter.filter((a) => a.areaCode == areaCode).reduce(
          (sum, data) => sum + data.quota,
          0
        ),
        variance: RegionalFilter.filter((a) => a.areaCode == areaCode).reduce(
          (sum, data) => sum + data.variance,
          0
        ),
      }))
      .sort((a, b) => b.variance - a.variance)
      .slice(0, 5);
    setTableREG(Regional);

    const BranchFilter = filteredData.filter(
      (data) => data.category === "REGION"
    );
    const Branch = Array.from(new Set(RegionalFilter.map((a) => a.areaCode)))
      .filter((areaCode) => areaCode)
      .map((areaCode) => ({
        areaCode: areaCode,
        quota: BranchFilter.filter((a) => a.areaCode == areaCode).reduce(
          (sum, data) => sum + data.quota,
          0
        ),
        variance: BranchFilter.filter((a) => a.areaCode == areaCode).reduce(
          (sum, data) => sum + data.variance,
          0
        ),
      }))
      .sort((a, b) => b.variance - a.variance)
      .slice(0, 5);
    setTableBRANCH(Branch);

    // Calculate the sum of "value" for the filtered data
    //sum = is the accumulator or the holder of the sum value
    //0 = is the initial value of sum
    //item = data that will be sum

    // Group the data by category and calculate the sum for each group
    const groupedEstore = Array.from(
      new Set(filteredData.map((item) => item.category))
    ).map((category) => ({
      Category: category, // Use "name" for the category
      Sum: filteredData
        .filter((item) => item.category === category)
        .reduce((sum, item) => sum + item.ns_From_Estore, 0), // Use "value" for the sum
    }));

    const GrouopedPie = Array.from(
      new Set(filteredData.map((item) => item.category))
    ).map((category) => ({
      Category: category, // Use "name" for the category
      NsTotal: filteredData
        .filter((item) => item.category === category)
        .reduce((sum, item) => sum + item.ns_Traditional, 0), // Use "value" for the sum
    }));

    const groupedGraph2 = Array.from(
      new Set(filteredData.map((item) => item.category))
    ).map((category) => ({
      category: category, // Use "name" for the category
      NsTraditional: filteredData
        .filter((item) => item.category === category)
        .reduce((sum, item) => sum + item.ns_Traditional, 0), // Use "value" for the sum
      NsEstore: filteredData
        .filter((item) => item.category === category)
        .reduce((sum, item) => sum + item.ns_From_Estore, 0), // Use "value" for the sum
    }));

    setgroupEstore(groupedEstore);
    setGroupGraph2(groupedGraph2);
    setGroupPie(GrouopedPie);
  }, [selectedYear, data]);

  // FILTER BY YEAR GRAPH FOR ESTORE {END}

  useEffect(() => {
    const distinctYear = [...new Set(data.map((item) => item.yrSale))];
    const distinctAreaCode = [...new Set(data.map((item) => item.areaCode))];
    const distinctCategory = [...new Set(data.map((item) => item.category))];

    setDistYear(distinctYear);
    setAreaCode(distinctAreaCode);
    setDistCategory(distinctCategory);
  }, [data]);

  useEffect(() => {
    const filteredData = data.filter(
      (data) => data.yrSale.toString() === selectedYear
    );
    const traditionalSum = filteredData.reduce((nsTraditional, currentItem) => {
      return nsTraditional + currentItem.ns_Traditional;
    }, 0);

    const estoreSum = filteredData.reduce((estoreSum, currentItem) => {
      return estoreSum + currentItem.ns_From_Estore;
    }, 0);

    const estoreNsTotal = filteredData.reduce((estoreNsTotal, currentItem) => {
      return estoreNsTotal + currentItem.ns_Total;
    }, 0);

    setSumTraditional(traditionalSum);
    setSumEstore(estoreSum);
    setSumNsTotal(estoreNsTotal);
  }, [selectedYear, data]);

  return (
    <>
      <Box ml={60}>
        {/* First Column  */}
        {/* <Box border="1px"> */}
        <Box>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Select
              borderColor="green.700"
              mt={5}
              w={150}
              placeholder="YEAR"
              mr={8}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {distYear.map((a, index) => (
                <option key={index}>{a}</option>
              ))}
            </Select>
          </Box>
          <SimpleGrid spacing="9" columns={4} pl={7} pt={5}>
            <Cards
              TextHeader="SUM OF QUOTA"
              color="#0088FE"
              data={quota!}
              Icon={AiOutlineBarChart}
            />
            <Cards
              TextHeader="SUM OF ACTUAL SALES"
              color="#FF8042"
              data={0}
              Icon={AiOutlineBarChart}
            />
            <Cards
              TextHeader="SUM OF VARIANCE"
              color="#1AC788"
              data={variance!}
              Icon={AiOutlineBarChart}
            />
            <Cards
              TextHeader="TEST HEADER"
              color="#FFBB28"
              data={0}
              Icon={AiOutlineBarChart}
            />
          </SimpleGrid>
        </Box>

        <Box w="100%" pt={10} pr={8} pl={7}>
          {/* <Box h="100%" bgColor="red"> */}
          <SimpleGrid spacing={5} columns={3}>
            <Box>
              <Flex
                pr={4}
                bgColor="gray.50"
                borderWidth="1px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading
                  fontSize="md"
                  p={5}
                  borderColor="gray.100"
                  color="green.500"
                >
                  TOP 5 TERRITORY HEAD
                </Heading>
                <TagRightIcon
                  color="gray.500"
                  as={BiDotsVerticalRounded}
                  boxSize={5}
                />
              </Flex>
              {/* <TableGraph data={tableTH} /> */}
            </Box>

            <Box>
              <Flex
                pr={4}
                bgColor="gray.50"
                borderWidth="1px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading
                  fontSize="md"
                  p={5}
                  borderColor="gray.100"
                  color="green.500"
                >
                  TOP 5 REGIONAL MANAGER
                </Heading>
                <TagRightIcon
                  color="gray.500"
                  as={BiDotsVerticalRounded}
                  boxSize={5}
                />
              </Flex>
              {/* <TableGraph data={tableREG} /> */}
            </Box>

            <Box>
              <Flex
                pr={4}
                bgColor="gray.50"
                borderWidth="1px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading
                  fontSize="md"
                  p={5}
                  borderColor="gray.100"
                  color="green.500"
                >
                  TOP 5 BRANCH MANAGER
                </Heading>
                <TagRightIcon
                  color="gray.500"
                  as={BiDotsVerticalRounded}
                  boxSize={5}
                />
              </Flex>
              {/* <TableGraph data={tableBRANCH} /> */}
            </Box>
          </SimpleGrid>
        </Box>
        <Box
          flexDirection="column"
          shadow="lg"
          w="100%"
          pt={10}
          pr={8}
          pl={7}
          pb={10}
        >
          <Heading
            fontSize="md"
            bgColor="gray.50"
            borderWidth="1px"
            borderColor="gray.100"
            color="green.500"
            p={5}
            display="flex"
            alignItems="center"
          >
            MONTHLY GRAPH
          </Heading>
          <Box shadow="xl">
            {/* <BarGraph data={groupPerMonth} /> */}
            {/* <AreaGraph data={groupPerMonth} /> */}
            {/* <LineGraph data={groupPerMonth}/> */}
          </Box>
        </Box>
      </Box>
    </>
  );

  {
    /* Graph */
  }
  {
    /* impleGrid columns={1} p={10} spacing={10}>
            <Flex>
              <Box
                flexDirection="column"
                shadow="lg"
                borderColor="gray.200"
                borderWidth="1px"
                width={720}
              >
                <Heading
                  fontSize="md"
                  p={5}
                  bgColor="gray.50"
                  borderWidth="1px"
                  borderColor="gray.100"
                  color="green.500"
                >
                  NS ESTORE PER CATEGORY
                </Heading>
                <LineGraph data={groupEstore} />
              </Box>

              <Box
                flexDirection="column"
                shadow="lg"
                borderColor="gray.200"
                borderWidth="1px"
                width={450}
                ml={5}
              >
                <Heading
                  fontSize="md"
                  p={5}
                  bgColor="gray.50"
                  borderWidth="1px"
                  borderColor="gray.100"
                  color="green.500"
                >
                  NS TOTAL PER CATEGORY
                </Heading>
                <PieGraph data={groupPie} />
                {/* <LineGraph data={groupEstore} /> */
  }
  {
    /* </Box> */
  }
  {
    /* </Flex> */
  }

  {
    /* <Box
              flexDirection="column"
              shadow="lg"
              borderColor="gray.200"
              borderWidth="1px"
              w={1112}
            >
              <Heading
                fontSize="md"
                p={5}
                bgColor="gray.50"
                borderWidth="1px"
                borderColor="gray.100"
                color="green.500"
              >
                NS ESTORE AND TRADITIONAL PER CATEGORY
              </Heading>
              <BarGraph data={groupGraph2} />
            </Box>
            <Box
              flexDirection="column"
              shadow="lg"
              borderColor="gray.200"
              borderWidth="1px"
            >
              <Heading
                fontSize="md"
                p={5}
                bgColor="gray.50"
                borderWidth="1px"
                borderColor="gray.100"
                color="green.500"
              >
                TITLE OF GRAPH
              </Heading>
              {/* <LineGraph data={data1} /> */
  }
  {
    /* </Box> */
  }
  {
    /* </SimpleGrid> */
  }

  {
    /* Second Column */
  }
  {
    /* <Box w={500} pt="12" pr={5} pl={3}> */
  }
  {
    /* <Box h="100%" bgColor="red"> */
  }
  {
    /* <Box h="100%"> */
  }
  {
    /* <Flex
              pr={4}
              bgColor="gray.50"
              borderWidth="1px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading
                fontSize="md"
                p={5}
                borderColor="gray.100"
                color="green.500"
              >
                TOP PERFORMING
              </Heading>
              <TagRightIcon
                color="gray.500"
                as={BiDotsVerticalRounded}
                boxSize={5}
              />
            </Flex> */
  }

  {
    /* <TableGraph /> */
  }
  {
    /* </Box> */
  }
  {
    /* </Box> */
  }

  //   return (
  //     <>
  //       <Box ml={60}>
  //         <Heading
  //           color="green.500"
  //           fontSize="2xl"
  //           pl={10}
  //           pt={5}
  //           pb={5}
  //           borderWidth="1px"
  //           borderColor="gray.200"
  //           shadow="sm"
  //         >
  //           Ns Summary Company Report
  //         </Heading>
  //       </Box>
  //       <Box
  //         ml={60}
  //         // width={'100%'}
  //         // overflow={'hidden'}
  //         mr={350}
  //         borderRight="1px"
  //       >
  //         <SimpleGrid columns={4}>
  //           <Cards
  //             TextHeader="TEST HEADER"
  //             color="green"
  //             data="Test Data"
  //             Icon={AiOutlineBarChart}
  //           />
  //           <Cards
  //             TextHeader="TEST HEADER"
  //             color="red"
  //             data="Test Data2"
  //             Icon={AiOutlineBarChart}
  //           />
  //           <Cards
  //             TextHeader="TEST HEADER"
  //             color="blue"
  //             data="Test Data3"
  //             Icon={AiOutlineBarChart}
  //           />
  //           <Cards
  //             TextHeader="TEST HEADER"
  //             color="pink"
  //             data="Test Data4"
  //             Icon={AiOutlineBarChart}
  //           />
  //         </SimpleGrid>
  //         <SimpleGrid columns={1} p={10} spacing={10}>
  //           <Box
  //             flexDirection="column"
  //             shadow="lg"
  //             borderColor="gray.200"
  //             borderWidth="1px"
  //           >
  //             <Heading
  //               fontSize="md"
  //               p={5}
  //               bgColor="gray.50"
  //               borderWidth="1px"
  //               borderColor="gray.100"
  //               color="green.500"
  //             >
  //               TITLE OF GRAPH
  //             </Heading>
  //             <LineGraph data={data} />
  //           </Box>
  //           <Box
  //             flexDirection="column"
  //             shadow="lg"
  //             borderColor="gray.200"
  //             borderWidth="1px"
  //           >
  //             <Heading
  //               fontSize="md"
  //               p={5}
  //               bgColor="gray.50"
  //               borderWidth="1px"
  //               borderColor="gray.100"
  //               color="green.500"
  //             >
  //               TITLE OF GRAPH
  //             </Heading>
  //             <BarGraph data={data} />
  //           </Box>
  //           <Box
  //             flexDirection="column"
  //             shadow="lg"
  //             borderColor="gray.200"
  //             borderWidth="1px"
  //           >
  //             <Heading
  //               fontSize="md"
  //               p={5}
  //               bgColor="gray.50"
  //               borderWidth="1px"
  //               borderColor="gray.100"
  //               color="green.500"
  //             >
  //               TITLE OF GRAPH
  //             </Heading>
  //             <LineGraph data={data} />
  //           </Box>
  //         </SimpleGrid>
  //       </Box>
  //     </>
  //   );
};

export default NsSummaryCompany;
