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
import { PassFailedData } from "../NsPassFailed/PassFailedData";
import { LiaDonateSolid } from "react-icons/lia";
import { BsPeople, BsPersonCheck, BsPersonX } from "react-icons/bs";
import { LuPercent } from "react-icons/lu";
import Cards from "../Charts/Cards";
import CardsNsPass from "./CardsNsPass";
import BarGraphForPassFailed, { IBarPerMonth } from "./BarGraphForPassFailed";
import BarGraphForAverage, { IBarPerMonthAverage } from "./BarGraphForAverage";

const YNMNotIncluded = ["2022", "2023", "Q1", "Q2", "Q3", "Q4"];
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

const NsPassFailed = () => {
  //#region STATE FOR DISTINCT

  const [distYear, setDistYear] = useState<number[]>([]);
  const [distTerritory, setdistTerritory] = useState<String[]>([]);
  const [distRegion, setDistRegion] = useState<String[]>([]);
  const [distBranch, setDistBranch] = useState<String[]>([]);

  //#endregion

  //#region STATE FOR SELECTED ITEMS
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [clicked, setClicked] = useState(false);
  //#endregion

  //#region STATE FOR FILTER
  const [territoryFilter, setterritoryFilter] = useState<string>("");
  const [regionFilter, setregionFilter] = useState<String>("");
  const [branchFilter, setBranchFilter] = useState<String>("");
  //#endregion

  //#region STATE FOR CARDS
  const [noOfAgent, setNoOfAgent] = useState<number>();
  const [noOfPassed, setNoOfPassed] = useState<number>();
  const [noOfFailed, setNoOfFailed] = useState<number>();
  const [averagePassed, setAveragePassed] = useState<number>();
  const [averageFailed, setAverageFailed] = useState<number>();
  const [resetFilter, setResetFilter] = useState(null);
  //#endregion

  //#region STATE FOR GRAPH
  const [barPerMonth, setBarPerMonth] = useState<IBarPerMonth[]>([]);
  const [barPerMonthAverage, setBarPerMonthAverage] = useState<
    IBarPerMonthAverage[]
  >([]);
  //#endregion

  //#region RANDOM VARIABLE
  let filter;
  const curYear = new Date().getFullYear();
  //#endregion

  //#region  DISTINCT YEAR
  const handleIsClickedYear = () => {
    setClicked(!clicked);
    setterritoryFilter("");
  };

  useEffect(() => {
    if (selectedYear === 0) {
      setSelectedYear(curYear);
    }
  }, []);

  useEffect(() => {
    const distinctYear = [
      ...new Set(PassFailedData.map((item) => item.yrSale)),
    ];
    setDistYear(distinctYear);

    //#endregion

    //#region FILTER DATA
    if (territoryFilter === "" && regionFilter === "" && branchFilter === "") {
      const testFilter = PassFailedData.filter(
        (item) => item.yrSale === selectedYear && item.category === "BRANCH"
      );
      filter = testFilter;
    } else if (
      territoryFilter !== "" &&
      regionFilter === "" &&
      branchFilter === ""
    ) {
      const testFilter = PassFailedData.filter(
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
      const testFilter = PassFailedData.filter(
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
      const testFilter = PassFailedData.filter(
        (item) =>
          item.yrSale === selectedYear &&
          item.category === "BRANCH" &&
          item.territoryCode === territoryFilter &&
          item.areaCode === branchFilter
      );
      filter = testFilter;
    } else {
      // console.log("test filter Else Triggered");
      const testFilter = PassFailedData.filter(
        (item) =>
          item.yrSale === selectedYear &&
          item.category === "BRANCH" &&
          item.territoryCode === territoryFilter &&
          item.regionCode === regionFilter &&
          item.areaCode === branchFilter
      );
      filter = testFilter;
    }

    //#endregion

    //#region FETCH DISTINCT DATA
    let distinctFilter = PassFailedData.filter((item) => {
      return (
        (selectedYear === 0 && curYear === item.yrSale) ||
        (selectedYear! > 0 && selectedYear === item.yrSale)
      );
    });

    const distinctTerritory = [
      ...new Set(
        distinctFilter!
          .filter((a) => a.territoryCode)
          .map((item) => item.territoryCode)
      ),
    ];
    setdistTerritory(
      distinctTerritory.sort((a, b) => {
        return a.localeCompare(b);
      })
    );

    const distRegion = [
      ...new Set(
        distinctFilter!
          .filter(
            (a) => a.territoryCode !== "" && territoryFilter === a.territoryCode
          )
          .map((item) => item.regionCode)
      ),
    ];
    setDistRegion(
      distRegion
        .filter((a) => a !== "")
        .sort((a, b) => {
          return a.localeCompare(b);
        })
    );

    const BranchList = [
      ...new Set(
        distinctFilter!
          .filter(
            (a) =>
              a.regionCode === regionFilter &&
              regionFilter.length !== 0 &&
              a.category === "BRANCH"
          )
          .map((item) => item.areaCode)
      ),
    ];
    setDistBranch(
      BranchList.filter((a) => a !== "").sort((a, b) => {
        return a.localeCompare(b);
      })
    );

    //#endregion

    //#region FETCH CARDS DATA

    const SumNoOfAgents = filter!.reduce((Accu, data) => {
      return Accu + data.noOfAgents!;
    }, 0);
    setNoOfAgent(SumNoOfAgents);

    const NoOfPassed = filter!.reduce((Accu, data) => {
      return Accu + data.passed!;
    }, 0);
    setNoOfPassed(NoOfPassed);

    const NoOfFailed = filter!.reduce((Accu, data) => {
      return Accu + data.failed!;
    }, 0);
    setNoOfFailed(NoOfFailed);

    const AveragePassed = NoOfPassed / SumNoOfAgents;
    setAveragePassed(AveragePassed * 100);

    const AverageFailed = NoOfFailed / SumNoOfAgents;
    setAverageFailed(AverageFailed * 100);

    //#endregion

    //#region FETCH GRAPH DATA
    let filterBarPerMonth = filter;
    const BarPerMonthData = Array.from(
      new Set(filter.map((a) => a.yearNMonthSale))
    )
      .filter((months) => RefMonths.includes(months))
      .map((months) => ({
        Months: months,
        Agents: filterBarPerMonth
          .filter((a) => a.yearNMonthSale == months)
          .reduce((sum, data) => sum + data.noOfAgents!, 0),
        Passed: filterBarPerMonth
          .filter((a) => a.yearNMonthSale == months)
          .reduce((sum, data) => sum + data.passed, 0),
        Failed: filterBarPerMonth
          .filter((a) => a.yearNMonthSale == months)
          .reduce((sum, data) => sum + data.failed, 0),
      }));

    // .slice(0, 5);
    setBarPerMonth(
      BarPerMonthData.sort((a, b) => {
        return RefMonths.indexOf(a.Months) - RefMonths.indexOf(b.Months);
      })
    );

    const BarPerMonthAverage = Array.from(
      new Set(filter.map((a) => a.yearNMonthSale))
    )
      .filter((months) => RefMonths.includes(months))
      .map((months) => ({
        Months: months,
        Agents: filterBarPerMonth
          .filter((a) => a.yearNMonthSale == months)
          .reduce((sum, data) => sum + data.noOfAgents!, 0),
        Passed: filterBarPerMonth
          .filter((a) => a.yearNMonthSale == months)
          .reduce((sum, data) => (data.passed / data.noOfAgents!) * 100, 0),
        Failed: filterBarPerMonth
          .filter((a) => a.yearNMonthSale == months)
          .reduce((sum, data) => (data.failed / data.noOfAgents!) * 100, 0),
      }));

    // .slice(0, 5);
    setBarPerMonthAverage(
      BarPerMonthAverage.sort((a, b) => {
        return RefMonths.indexOf(a.Months) - RefMonths.indexOf(b.Months);
      })
    );
    //#endregion
  }, [selectedYear, territoryFilter, regionFilter, branchFilter]);

  return (
    <Box ml="60" bgColor="gray.50" h="100%" pb={5}>
      <HStack h={200} pl={5}>
        <VStack
          // pl={15}
          // pb={10}
          w={270}
          h={130}
          mr={5}
          alignItems="flex-start"
          shadow="lg"
          bgColor="white"
          borderRadius={10}
          p={4}
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
          w={1300}
          spacing={3}
          justifyContent="space-between"
          pr={5}
          justifyItems="center"
        >
          <Box
            w={225}
            h={130}
            shadow="lg"
            borderRadius={5}
            bgColor="white"
            borderLeft={`7px solid #2F855A`}
          >
            <CardsNsPass
              TextHeader="Number of Agents"
              color="#2F855A"
              data={noOfAgent!}
              Icon={BsPeople}
            />
          </Box>

          <Box
            w={225}
            h={130}
            shadow="lg"
            borderRadius={5}
            bgColor="white"
            borderLeft={`7px solid #FF8042`}
          >
            <CardsNsPass
              TextHeader="Average Passing Agents"
              color="#FF8042"
              data={noOfPassed!}
              Icon={BsPersonCheck}
            />
          </Box>

          <Box
            w={225}
            h={130}
            shadow="lg"
            borderRadius={5}
            bgColor="white"
            borderLeft={`7px solid #00B7FE`}
          >
            <CardsNsPass
              TextHeader="Average Failed Agents"
              color="#00B7FE"
              data={noOfFailed!}
              Icon={BsPersonX}
            />
          </Box>

          <Box
            w={225}
            h={130}
            shadow="lg"
            borderRadius={5}
            bgColor="white"
            borderLeft={`7px solid #8884D8`}
          >
            <CardsNsPass
              TextHeader="Percentage Passed"
              color="#8884D8"
              data={averagePassed!}
              Icon={LuPercent}
            />
          </Box>

          <Box
            w={225}
            h={130}
            shadow="lg"
            borderRadius={5}
            bgColor="white"
            borderLeft={`7px solid #FFBB28`}
          >
            <CardsNsPass
              TextHeader="Percentage Failed"
              color="#FFBB28"
              data={averageFailed!}
              Icon={LuPercent}
            />
          </Box>
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
          <Box ml={6} mr="16">
            <BarGraphForPassFailed data={barPerMonth} />
          </Box>
          <Box ml={6} mr="16" pt={5}>
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
            <BarGraphForAverage data={barPerMonthAverage} />
          </Box>
          <Box w="97%" pl={10}>
            <Box>{/* <TableGraph data={tableREG} /> */}</Box>
          </Box>
          <Flex>
            {/* <Box mt={7} w="97%" justifyContent="center" shadow="xl" pl={10}> */}
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
                NS TOTAL PER CATEGORY
              </Heading> */}
            {/* <LineGraph data={dataAreaGraph} /> */}
            {/* <AreaGraph data={dataAreaGraph} /> */}
            {/* </Box> */}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
  // return (
  //   <Box ml="60" bgColor="gray.50" h="100vh">
  //     <Box flex={1}>
  //       <HStack bgColor="gray.300">
  //         <VStack bgColor="gray.100" w={300} p={5} alignItems="flex-start">
  //           <Box bgColor="red">Box 1</Box>
  //           <Box bgColor="red">Box 2</Box>
  //           <Box bgColor="red">Box 3</Box>
  //           <Box bgColor="red">Box 4</Box>
  //         </VStack>

  //         <HStack>
  //           <Box bgColor="red">Box 1</Box>
  //           <Box bgColor="red">Box 2</Box>
  //           <Box bgColor="red">Box 3</Box>
  //           <Box bgColor="red">Box 4</Box>
  //         </HStack>
  //       </HStack>
  //     </Box>
  //   </Box>
  // );
};

export default NsPassFailed;
