import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  HStack,
  Heading,
  List,
  ListItem,
  Radio,
  RadioGroup,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Cards from "./Charts/Cards";
import { AiOutlineBarChart } from "react-icons/ai";
import { LiaSaveSolid, LiaShareSquare } from "react-icons/lia";
import { MdIosShare } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import TableGraph from "./Charts/TableGraph";
import { data } from "./testData";
import BarGraph from "./Charts/BarGraph";
import PieGraph from "./Charts/PieGraph";
import BarGraphQuarter, { iQuarter } from "./NsOverQuota/BarGraphQuarter";
import LineGraph, { LineData } from "./Charts/LineGraph";
import { AreaChart } from "recharts";
import AreaGraph, { AreaData } from "./Charts/AreaGraph";
import { LiaDonateSolid, LiaBalanceScaleLeftSolid } from "react-icons/lia";
import { SlGraph } from "react-icons/sl";

interface iTable {
  AreaCode: string;
  Quota: number;
  NsTotal: number;
  Variance: number;
}
interface iBarGraph {
  Months: string;
  Quota: number;
  NsTotal: number;
  Variance: number;
}
interface iPieGraph {
  Category: string;
  NsTotal: number;
}

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

const YNMNotIncluded = ["2022", "2023", "Q1", "Q2", "Q3", "Q4"];
const AreaCdNotIncluded = ["COMPANY_YEAR", "COMPANY_MONTH", "COMPANY_QUARTER"];
const RefCategory = ["BRANCH", "REGION", "TERRITORY"];
const RefQuarter = ["Q1", "Q2", "Q3", "Q4"];
const RefQ1 = ["JANUARY", "FEBRUARY", "MARCH"];
const RefQ2 = ["APRIL", "MAY", "JUNE"];
const RefQ3 = ["JULY", "AUGUST", "SEPTEMBER"];
const RefQ4 = ["OCTOBER", "NOVEMBER", "DECEMBER"];
const RefMonths = [
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

const monthToQuarter: { [key: string]: string } = {
  JANUARY: "Q1",
  FEBRUARY: "Q1",
  MARCH: "Q1",
  APRIL: "Q2",
  MAY: "Q2",
  JUNE: "Q2",
  JULY: "Q3",
  AUGUST: "Q3",
  SEPTEMBER: "Q3",
  OCTOBER: "Q4",
  NOVEMBER: "Q4",
  DECEMBER: "Q4",
};

const NsOverQuota = () => {
  let filter;
  let FilterCards;

  const [quota, setQuota] = useState<number>();
  const [variance, setVariance] = useState<number>();
  const [actual, setActual] = useState<number>();
  const [tableREG, setTableREG] = useState<iTable[]>([]);
  const [clicked, setClicked] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(0);

  const [distYear, setDistYear] = useState<number[]>([]);
  const [distYnMonths, setdistYnMonths] = useState<String[]>([]);
  const [distTerritory, setdistTerritory] = useState<String[]>([]);
  const [distRegion, setdistRegion] = useState<String[]>([]);
  const [distCategory, setdistCategory] = useState<String[]>([]);
  const [filterMonths, setFilterMonths] = useState<String[]>([]);
  // const [filterTerritory, setFilterTerritory] = useState<String[]>([]);
  // const [filterRegion, setFilterRegion] = useState<String[]>([]);
  const [groupPerMonth, setGroupPerMonth] = useState<iBarGraph[]>([]);
  // const [groupPie, setGroupPie] = useState<iPieGraph[]>([]);
  const [graphQuarter, setGraphQuarter] = useState<iQuarter[]>([]);
  // const [dataLineGraph, setDataLineGraph] = useState<LineData[]>([]);
  const [dataAreaGraph, setDataAreaGraph] = useState<AreaData[]>([]);

  const [distBranch, setDistBranch] = useState<string[]>([]);
  const [territoryFilter, setterritoryFilter] = useState<string>("");
  const [regionFilter, setregionFilter] = useState<String>("");
  const [branchFilter, setBranchFilter] = useState<String>("");
  const curYear = new Date().getFullYear();

  useEffect(() => {
    setSelectedYear(selectedYear === 0 ? 2023 : selectedYear);
    if (territoryFilter === "" && regionFilter === "" && branchFilter === "") {
      const testFilter = data.filter(
        (item) => item.yrSale === selectedYear && item.category === "BRANCH"
      );
      filter = testFilter;
    } else if (
      territoryFilter !== "" &&
      regionFilter === "" &&
      branchFilter === ""
    ) {
      const testFilter = data.filter(
        (item) =>
          item.yrSale === selectedYear &&
          item.category === "BRANCH" &&
          item.territoryCode === territoryFilter
      );
      filter = testFilter;
    } else if (
      territoryFilter !== "" &&
      regionFilter !== "" &&
      branchFilter === ""
    ) {
      const testFilter = data.filter(
        (item) =>
          item.yrSale === selectedYear &&
          item.category === "BRANCH" &&
          item.territoryCode === territoryFilter &&
          item.regionCode === regionFilter
      );
      filter = testFilter;
    } else if (
      territoryFilter !== "" &&
      regionFilter !== "" &&
      branchFilter !== ""
    ) {
      console.log("branch");
      const testFilter = data.filter(
        (item) =>
          item.yrSale === selectedYear &&
          item.category === "BRANCH" &&
          item.territoryCode === territoryFilter &&
          item.areaCode === branchFilter
      );
      filter = testFilter;
    } else {
      // console.log("test filter Else Triggered");
      const testFilter = data.filter(
        (item) =>
          item.yrSale === selectedYear &&
          item.category === "BRANCH" &&
          item.territoryCode === territoryFilter &&
          item.regionCode === regionFilter &&
          item.areaCode === branchFilter
      );
      filter = testFilter;
    }

    //FILTER CONDITION FOR CARDS
    if (territoryFilter === "" && regionFilter === "") {
      // console.log("CARDS IF");
      const FilterForCards = data.filter(
        (item) =>
          item.yrSale === selectedYear && item.areaCode === "COMPANY_YEAR"
      );
      FilterCards = FilterForCards;
    } else if (territoryFilter !== "" && regionFilter === "") {
      FilterCards = filter;
    } else {
      FilterCards = filter;
    }

    // console.log(FilterCards);

    const SumQuota = FilterCards!.reduce((Accu, currentQuota) => {
      return Accu + currentQuota.quota;
    }, 0);
    setQuota(SumQuota);

    const sumActualSales = FilterCards!.reduce((sumActual, currentActual) => {
      return sumActual + currentActual.ns_Total;
    }, 0);
    setActual(sumActualSales);

    let Variance = ((sumActualSales - SumQuota) / SumQuota) * 100;
    setVariance(Variance);

    //====================================================START OF GRAPH FUNCTIONS=====================================================================

    // Define an interface for the monthSums object structure
    interface MonthSums {
      [quarter: string]: {
        Category: string;
        Quota: number;
        "NS TOTAL": number;
        VARIANCE: number;
      };
    }

    // Initialize monthSums as an empty object with the specified structure
    const monthSums: MonthSums = {};

    // Now you can use monthSums in the loop
    filter.forEach((item) => {
      const month = item.yearNMonthSale;
      const category = item.territoryCode;
      const quarter = monthToQuarter[month];

      if (!monthSums[quarter]) {
        monthSums[quarter] = {
          Category: category,
          Quota: 0,
          "NS TOTAL": 0,
          VARIANCE: 0,
        };
      }

      monthSums[quarter].Quota += item.quota;
      monthSums[quarter]["NS TOTAL"] += item.ns_Total;
      monthSums[quarter].VARIANCE += item.variance;
    });

    const monthSumsArray = Object.entries(monthSums);

    const quarterData = monthSumsArray.map(([quarter, data]) => ({
      Quarter: quarter,
      Quota: data.Quota,
      NsTotal: data["NS TOTAL"],
      Variance: data.VARIANCE,
    }));

    setGraphQuarter(
      quarterData.sort((a, b) => {
        return (
          YNMNotIncluded.indexOf(a.Quarter) - YNMNotIncluded.indexOf(b.Quarter)
        );
      })
    );

    //GRAPH PER MONTH
    let filterForPerMonth = filter;
    const groupedPerMonth = Array.from(
      new Set(filter.map((a) => a.yearNMonthSale))
    )
      .filter((yearNMonthSale) => !YNMNotIncluded.includes(yearNMonthSale))
      .map((yearNMonthSale) => ({
        Months: yearNMonthSale,
        Quota: filterForPerMonth
          .filter((a) => a.yearNMonthSale === yearNMonthSale)
          .reduce((sum, data) => sum + data.quota, 0),
        NsTotal: filterForPerMonth
          .filter((a) => a.yearNMonthSale === yearNMonthSale)
          .reduce((sum, data) => sum + data.ns_Total, 0),
        Variance: filterForPerMonth
          .filter((a) => a.yearNMonthSale === yearNMonthSale)
          .reduce((sum, data) => data.variance, 0),
      }));
    // .sort((a, b) => b.Variance - a.Variance)
    // .slice(0, 5);
    setGroupPerMonth(
      groupedPerMonth.sort((a, b) => {
        return monthOrder.indexOf(a.Months) - monthOrder.indexOf(b.Months);
      })
    );

    let filterForgraph = filter;
    const Territory = Array.from(new Set(filter.map((a) => a.areaCode)))
      .filter((areaCode) => areaCode)
      .map((areaCode) => ({
        AreaCode: areaCode,
        Quota: filterForgraph
          .filter((a) => a.areaCode == areaCode)
          .reduce((sum, data) => sum + data.quota, 0),
        NsTotal: filterForgraph
          .filter((a) => a.areaCode == areaCode)
          .reduce((sum, data) => sum + data.ns_Total, 0),
        Variance: filterForgraph
          .filter((a) => a.areaCode == areaCode)
          .reduce((sum, data) => sum + data.variance, 0),
      }))
      .sort((a, b) => b.Variance - a.Variance);

    // .slice(0, 5);
    setTableREG(Territory);

    //AREA CHART
    let filterForArea = filter;
    if (territoryFilter !== "" && regionFilter === "" && branchFilter === "") {
      const areaData = Array.from(new Set(filter.map((a) => a.regionCode))).map(
        (regionCode) => ({
          Category: regionCode,
          NsTotal: filterForArea
            .filter((b) => b.regionCode === regionCode)
            .reduce((sum, data) => sum + data.ns_Total, 0),
        })
      );
      setDataAreaGraph(areaData);
    } else if (
      territoryFilter !== "" &&
      regionFilter !== "" &&
      branchFilter === ""
    ) {
      const areaData = Array.from(new Set(filter.map((a) => a.areaCode))).map(
        (areaCode) => ({
          Category: areaCode,
          NsTotal: filterForArea
            .filter((b) => b.areaCode === areaCode)
            .reduce((sum, data) => sum + data.ns_Total, 0),
        })
      );
      setDataAreaGraph(areaData);
    } else if (
      territoryFilter !== "" &&
      regionFilter !== "" &&
      branchFilter !== ""
    ) {
      const areaData = Array.from(new Set(filter.map((a) => a.areaCode))).map(
        (areaCode) => ({
          Category: areaCode,
          NsTotal: filterForArea
            .filter((b) => b.areaCode === areaCode)
            .reduce((sum, data) => sum + data.ns_Total, 0),
        })
      );
      setDataAreaGraph(areaData);
    } else {
      console.log("else");
      const areaData = Array.from(
        new Set(filter.map((a) => a.territoryCode))
      ).map((territoryCode) => ({
        Category: territoryCode,
        NsTotal: filterForArea
          .filter((b) => b.territoryCode === territoryCode)
          .reduce((sum, data) => sum + data.ns_Total, 0),
      }));
      setDataAreaGraph(areaData);
    }
    //====================================================END OF EFFECT=====================================================================
  }, [selectedYear, territoryFilter, regionFilter, branchFilter]);

  useEffect(() => {
    if (selectedYear === 0) {
      setSelectedYear(curYear);
    }
  }, []);

  useEffect(() => {
    const distinctYear = [...new Set(data.map((item) => item.yrSale))];
    setDistYear(distinctYear);

    const containFilter = data.filter((item) => {
      return (
        (selectedYear === 0 && curYear === item.yrSale) ||
        (selectedYear! > 0 &&
          selectedYear === item.yrSale &&
          !YNMNotIncluded.includes(item.areaCode))
      );
    });

    const filteredData = data.filter((item) => selectedYear === item.yrSale);

    const FilterCards = data.filter(
      (item) => selectedYear === item.yrSale && item.areaCode === "COMPANY_YEAR"
    );

    const YearNMonths = [
      ...new Set(containFilter.map((item) => item.yearNMonthSale)),
    ];
    setdistYnMonths(
      YearNMonths.filter((a) => !YNMNotIncluded.includes(a)).sort((a, b) => {
        return monthOrder.indexOf(a) - monthOrder.indexOf(b);
      })
    );

    const distinctTerritory = [
      ...new Set(
        containFilter
          .filter((a) => a.territoryCode)
          .map((item) => item.territoryCode)
      ),
    ];
    setdistTerritory(distinctTerritory);

    const distRegion = [
      ...new Set(
        containFilter
          .filter(
            (a) => a.territoryCode !== "" && territoryFilter === a.territoryCode
          )
          .map((item) => item.regionCode)
      ),
    ];
    setdistRegion(distRegion.filter((a) => a !== ""));

    const BranchList = [
      ...new Set(
        containFilter
          .filter(
            (a) =>
              a.regionCode === regionFilter &&
              regionFilter.length !== 0 &&
              a.category === "BRANCH"
          )
          .map((item) => item.areaCode)
      ),
    ];
    setDistBranch(BranchList.filter((a) => a !== ""));

    const filteredQuota = data.filter((item) => selectedYear === item.yrSale);
  }, [selectedYear, filterMonths, territoryFilter, regionFilter]);

  const handleIsClickedYear = () => {
    setClicked(!clicked);
    setterritoryFilter("");
    setregionFilter("");
    setBranchFilter("");
  };

  const handleClickedYear = (year: number) => {
    setSelectedYear(year);
  };

  const handleCheckMonthsChange = (value: string) => {
    if (filterMonths.includes(value)) {
      setFilterMonths(filterMonths.filter((item) => item !== value));
    } else {
      setFilterMonths([...filterMonths, value]);
    }
  };

  return (
    <Box ml="60" bgColor="gray.50">
      <HStack h={200} pl={5}>
        <VStack
          // pl={15}
          // pb={10}
          p={5}
          w={330}
          h={130}
          mr={6}
          alignItems="flex-start"
          shadow="lg"
          bgColor="white"
          borderRadius={10}
        >
          <Heading fontSize="3xl" color="green.700">
            YEAR
          </Heading>
          <HStack spacing={3}>
            {distYear.map((year) => (
              <Button
                value={year}
                key={year}
                w={70}
                p={1}
                colorScheme="teal"
                bgColor={selectedYear === year ? "green.600" : "white"}
                color={selectedYear === year ? "white" : "green.600"}
                fontSize="lg"
                variant="outline"
                borderRadius={8}
                _hover={{
                  bgColor: "green.600",
                  color: "white",
                }}
                onClick={(a) => {
                  setSelectedYear(year);
                  // handleClickedYear(parseInt(a.currentTarget.value));
                  handleIsClickedYear();
                }}
              >
                {year}
              </Button>
            ))}
          </HStack>
        </VStack>
        <HStack
          w="100%"
          spacing={10}
          justifyContent="space-between"
          pr={5}
          pl={3}
        >
          <Cards
            TextHeader="QUOTA"
            color="#0088FE"
            data={quota!}
            Icon={LiaDonateSolid}
          />
          <Cards
            TextHeader="ACTUAL SALES"
            color="#FF8042"
            data={actual!}
            Icon={SlGraph}
          />
          <Cards
            TextHeader="VARIANCE"
            color="#1AC788"
            data={variance!}
            Icon={LiaBalanceScaleLeftSolid}
          />
        </HStack>
        <Stack
          h={120}
          // border="1px"
          // borderColor="red"
          mr={16}
          spacing={3}
          pt={3}
        >
          <Button
            w={100}
            fontSize={16}
            fontWeight="semibold"
            bgColor="green.500"
            color="white"
            borderRadius={6}
            _hover={{
              bgColor: "green.600",
            }}
          >
            SAVE
          </Button>
          <Button
            w={100}
            fontSize={16}
            fontWeight="semibold"
            alignItems="center"
            bgColor="green.500"
            color="white"
            borderRadius={6}
            _hover={{
              bgColor: "green.600",
            }}
          >
            SHARE
          </Button>
        </Stack>
      </HStack>

      <Flex ml={5} mb={10}>
        <Box w={300}>
          <VStack alignItems="flex-start" spacing={10} height="100%">
            {/* FILTER */}
            <Box
              overflow="auto"
              w={250}
              shadow="xl"
              p={3}
              height="100%"
              bgColor="white"
              borderRadius={10}
            >
              <Heading fontSize="2xl" color="green.700" pb={5} pl={2} pt={5}>
                FILTERS
              </Heading>
              <Stack spacing={3}>
                <Accordion allowMultiple>
                  <AccordionItem>
                    <AccordionButton>
                      <Box
                        flex="1"
                        textAlign="left"
                        color="green.700"
                        fontWeight="semibold"
                      >
                        Territory
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Stack spacing={[1, 5]} direction={["column", "row"]}>
                        <List>
                          <ListItem fontSize="xl">
                            <SimpleGrid column={1}>
                              <RadioGroup colorScheme="green">
                                <Stack direction="column">
                                  {distTerritory.map((Territory, Index) => (
                                    <Radio
                                      key={Index}
                                      value={Territory.toString()}
                                      onChange={(e) => {
                                        {
                                          setterritoryFilter(e.target.value);
                                          setregionFilter("");
                                          setBranchFilter("");
                                        }
                                      }}
                                    >
                                      {Territory}
                                    </Radio>
                                  ))}
                                </Stack>
                              </RadioGroup>
                            </SimpleGrid>
                          </ListItem>
                        </List>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <Accordion allowMultiple>
                  <AccordionItem>
                    <AccordionButton>
                      <Box
                        flex="1"
                        textAlign="left"
                        color="green.700"
                        fontWeight="semibold"
                      >
                        Region
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Stack spacing={[1, 5]} direction={["column", "row"]}>
                        <List>
                          <ListItem fontSize="xl">
                            <SimpleGrid column={1}>
                              <RadioGroup colorScheme="green">
                                <Stack direction="column">
                                  {distRegion.map((Region, index) => (
                                    <Radio
                                      key={index}
                                      value={Region.toString()}
                                      onChange={(e) => {
                                        setregionFilter(e.target.value);
                                        setBranchFilter("");
                                      }}
                                    >
                                      {Region}
                                    </Radio>
                                  ))}
                                </Stack>
                              </RadioGroup>
                            </SimpleGrid>
                          </ListItem>
                        </List>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <Accordion allowMultiple>
                  <AccordionItem>
                    <AccordionButton>
                      <Box
                        flex="1"
                        textAlign="left"
                        color="green.700"
                        fontWeight="semibold"
                      >
                        Branch
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Stack spacing={[1, 5]} direction={["column", "row"]}>
                        <List>
                          <ListItem fontSize="xl">
                            <SimpleGrid column={1}>
                              <RadioGroup colorScheme="green">
                                <Stack direction="column">
                                  {distBranch.map((Branch, index) => (
                                    <Radio
                                      key={index}
                                      value={Branch.toString()}
                                      onChange={(e) => {
                                        // setBranchFilter(e.target.value);
                                        setBranchFilter(e.target.value);
                                        // console.log(branchFilterTest);
                                        // console.log(e.target.value);
                                      }}
                                    >
                                      {Branch}
                                    </Radio>
                                  ))}
                                </Stack>
                              </RadioGroup>
                            </SimpleGrid>
                          </ListItem>
                        </List>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Stack>
            </Box>

            {/* NextComponent */}

            {/* NEXT COMPONENT */}
          </VStack>
        </Box>
        <Box w="100%">
          <Box w="70%" pl={10} pr="10" pb={5}>
            {/* <Heading
              fontSize="md"
              p={5}
              borderColor="gray.100"
              color="green.500"
              pr={4}
              bgColor="gray.50"
              borderWidth="1px"
              justifyContent="space-between"
              alignItems="center"
            >
              PER QUOTA
            </Heading> */}
            <BarGraphQuarter data={graphQuarter} />
          </Box>
          <Box w="100%">
            <Box w="70%" pl={10} pr="10" pb={5}>
              {/* <Heading
              fontSize="md"
              p={5}
              borderColor="gray.100"
              color="green.500"
              pr={4}
              bgColor="gray.50"
              borderWidth="1px"
              justifyContent="space-between"
              alignItems="center"
            >
              QUOTA PER MONTH
            </Heading> */}
              <BarGraph data={groupPerMonth} />
            </Box>
          </Box>
          <Box w="97%" pl={10}>
            <Box>
              <TableGraph data={tableREG} />
            </Box>
          </Box>
          <Flex>
            <Box mt={7} w="97%" justifyContent="center" shadow="xl" pl={10}>
              <Heading
                fontSize="md"
                p={5}
                borderColor="gray.100"
                color="green.500"
                pr={4}
                bgColor="gray.50"
                borderWidth="1px"
                justifyContent="space-between"
                alignItems="center"
              >
                NS TOTAL PER CATEGORY
              </Heading>
              {/* <LineGraph data={dataAreaGraph} /> */}
              <AreaGraph data={dataAreaGraph} />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default NsOverQuota;
