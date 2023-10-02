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
// import { PassFailedData } from "../NsPassFailed/PassFailedData";
import { LiaDonateSolid } from "react-icons/lia";
import { TbSum } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import CardsNsPass from "../NsPassFailed/CardsNsPass";
import BarGraphForPassFailed, {
  IBarPerMonth,
} from "../NsPassFailed/BarGraphForPassFailed";
import BarGraphForAverage, {
  IBarPerMonthAverage,
} from "../NsPassFailed/BarGraphForAverage";
import BarGraphForNs, {
  IBarNsClassCount,
} from "../NsClassification/BarGraphForNs";
import BarGraphForRate, {
  IBarPerMonthRate,
} from "../NsClassification/BarGraphForRate";
import { NsQuotaCollData } from "./NsQuotaCollectionData";
import CardsNsQuotaCol from "./CardsNsQuotaCol";
import BarGraphForComm, { IBarPerMonthComm } from "./BarGraphForComm";
import BarGraphForNComm, { IBarPerMonthNComm } from "./BarGraphForNComm";
import TableForPerWeek, { ITablePerWeek } from "./TableForPerWeek";
import BarGraphForAcct, { IAreaAccount } from "./BarGraphForAcct";

// import CardsNsClassification from "../CardsNsClassification";
// import { NsClassificationData } from "./NsClassificationData";
// import BarGraphForNs, { IBarNsClassCount } from "./BarGraphForNs";
// import BarGraphForRate, { IBarPerMonthRate } from "./BarGraphForRate";

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

const NsQuotaCollection = () => {
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
  const [totalCount, settotalCount] = useState<number>();
  const [totalCommQ, settotalCommQ] = useState<number>();
  const [totalNCommQ, settotalNCommQ] = useState<number>();
  const [noOf4UpSales, setnoOf4UpSales] = useState<number>();
  const [averageFailed, setAverageFailed] = useState<number>();
  const [resetFilter, setResetFilter] = useState(null);
  //#endregion

  //#region STATE FOR GRAPH
  const [barGraphcommQ, setBarGraphcommQ] = useState<IBarPerMonthComm[]>([]);
  const [barGraphNcommQ, setBarGraphNcommQ] = useState<IBarPerMonthNComm[]>([]);
  const [tablePerWeek, settablePerWeek] = useState<ITablePerWeek[]>([]);
  const [barAccount, setbarAccount] = useState<IAreaAccount[]>([]);
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
    const distinctYear = [...new Set(NsQuotaCollData.map((item) => item.year))];
    setDistYear(distinctYear);

    //#endregion

    //#region FILTER DATA
    if (territoryFilter === "" && regionFilter === "" && branchFilter === "") {
      const testFilter = NsQuotaCollData.filter(
        (item) => item.year === selectedYear //&& item.category === "BRANCH"
      );
      filter = testFilter;
    } else if (
      territoryFilter !== "" &&
      regionFilter === "" &&
      branchFilter === ""
    ) {
      const testFilter = NsQuotaCollData.filter(
        (item) =>
          item.year === selectedYear &&
          // item.category === "BRANCH" &&
          item.territoryCode === territoryFilter
      );
      filter = testFilter;
    } else if (
      territoryFilter !== "" &&
      regionFilter !== "" &&
      branchFilter === ""
    ) {
      const testFilter = NsQuotaCollData.filter(
        (item) =>
          item.year === selectedYear &&
          // item.category === "BRANCH" &&
          item.territoryCode === territoryFilter &&
          item.regionCode === regionFilter
      );
      filter = testFilter;
    } else if (
      territoryFilter !== "" &&
      regionFilter !== "" &&
      branchFilter !== ""
    ) {
      const testFilter = NsQuotaCollData.filter(
        (item) =>
          item.year === selectedYear &&
          // item.category === "BRANCH" &&
          item.territoryCode === territoryFilter &&
          item.branchCode === branchFilter
      );
      filter = testFilter;
    } else {
      // console.log("test filter Else Triggered");
      const testFilter = NsQuotaCollData.filter(
        (item) =>
          item.year === selectedYear &&
          // item.category === "BRANCH" &&
          item.territoryCode === territoryFilter &&
          item.regionCode === regionFilter &&
          item.branchCode === branchFilter
      );
      filter = testFilter;
    }

    //#endregion

    //#region FETCH DISTINCT DATA
    let distinctFilter = NsQuotaCollData.filter((item) => {
      return (
        (selectedYear === 0 && curYear === item.year) ||
        (selectedYear! > 0 && selectedYear === item.year)
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
      distinctTerritory!.sort((a, b) => {
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
      distRegion!
        .filter((a) => a !== "")
        .sort((a, b) => {
          return a.localeCompare(b);
        })
    );

    const BranchList = [
      ...new Set(
        distinctFilter!
          .filter(
            (a) => a.regionCode === regionFilter && regionFilter.length !== 0
            // &&
            // // a.category === "BRANCH"
          )
          .map((item) => item.branchCode)
      ),
    ];
    setDistBranch(
      BranchList.filter((a) => a !== "").sort((a, b) => {
        return a.localeCompare(b);
      })
    );

    //#endregion

    //#region FETCH CARDS DATA

    const SumCnt = filter!.reduce((Accu, data) => {
      return Accu + data.cnt!;
    }, 0);
    settotalCount(SumCnt);

    const TotalCommQ = filter!.reduce((Accu, data) => {
      return Accu + (data.commQ30 + data.commQ60 + data.commQ90);
    }, 0);
    settotalCommQ(TotalCommQ);

    const TotalNCommQ = filter!.reduce((Accu, data) => {
      return Accu + (data.nCommQ30 + data.nCommQ60 + data.ncommQ90);
    }, 0);
    settotalNCommQ(TotalNCommQ);

    // const NoOf4upSales = filter!.reduce((Accu, data) => {
    //   return Accu + data.fourUp!;
    // }, 0);
    // setnoOf4UpSales(NoOf4upSales);

    //#endregion

    //#region FETCH GRAPH DATA
    let filterBar = filter;
    const BarPerMonthComm = Array.from(new Set(filter.map((a) => a.month)))
      .filter((months) => RefMonths.includes(months))
      .map((months) => ({
        Months: months,
        "Com 30 days": filterBar
          .filter((a) => a.month == months)
          .reduce((sum, data) => sum + data.commQ30!, 0),
        "Com 60 days": filterBar
          .filter((a) => a.month == months)
          .reduce((sum, data) => sum + data.commQ60, 0),
        "Com 90 days": filterBar
          .filter((a) => a.month == months)
          .reduce((sum, data) => sum + data.commQ90, 0),
      }));
    setBarGraphcommQ(
      BarPerMonthComm.sort((a, b) => {
        return RefMonths.indexOf(a.Months) - RefMonths.indexOf(b.Months);
      })
    );

    const BarPerMonthNComm = Array.from(new Set(filter.map((a) => a.month)))
      .filter((months) => RefMonths.includes(months))
      .map((months) => ({
        Months: months,
        "NCom 30 days": filterBar
          .filter((a) => a.month == months)
          .reduce((sum, data) => sum + data.nCommQ30!, 0),
        "NCom 60 days": filterBar
          .filter((a) => a.month == months)
          .reduce((sum, data) => sum + data.nCommQ60!, 0),
        "NCom 90 days": filterBar
          .filter((a) => a.month == months)
          .reduce((sum, data) => sum + data.ncommQ90!, 0),
      }));
    setBarGraphNcommQ(
      BarPerMonthNComm.sort((a, b) => {
        return RefMonths.indexOf(a.Months) - RefMonths.indexOf(b.Months);
      })
    );

    const TableGraphPerWeek = Array.from(new Set(filter.map((a) => a.month)))
      .filter((months) => RefMonths.includes(months))
      .map((months) => ({
        Months: months,
        Advance: filterBar
          .filter((a) => a.month == months && a.trxWeek === 0)
          .reduce((sum, data) => sum + data.cnt, 0),
        "1st Week": filterBar
          .filter((a) => a.month == months && a.trxWeek === 1)
          .reduce((sum, data) => sum + data.cnt!, 0),
        "2nd Week": filterBar
          .filter((a) => a.month == months && a.trxWeek === 2)
          .reduce((sum, data) => sum + data.cnt!, 0),
        "3rd Week": filterBar
          .filter((a) => a.month == months && a.trxWeek === 3)
          .reduce((sum, data) => sum + data.cnt!, 0),
        "4th Week": filterBar
          .filter((a) => a.month == months && a.trxWeek === 4)
          .reduce((sum, data) => sum + data.cnt!, 0),
        "Past Due": filterBar
          .filter((a) => a.month == months && a.trxWeek === 5)
          .reduce((sum, data) => sum + data.cnt!, 0),
      }));
    settablePerWeek(
      TableGraphPerWeek.sort((a, b) => {
        return RefMonths.indexOf(a.Months) - RefMonths.indexOf(b.Months);
      })
    );

    const AreaAccounts = Array.from(new Set(filter.map((a) => a.month)))
      .filter((months) => RefMonths.includes(months))
      .map((months) => ({
        Months: months,
        Account: filterBar
          .filter((a) => a.month == months)
          .reduce((sum, data) => sum + data.cnt, 0),
      }));
    setbarAccount(
      AreaAccounts.sort((a, b) => {
        return RefMonths.indexOf(a.Months) - RefMonths.indexOf(b.Months);
      })
    );
    //#endregion
  }, [selectedYear, territoryFilter, regionFilter, branchFilter]);

  return (
    <Box ml="60" bgColor="gray.50" h="100%" pb={5}>
      <HStack h={200} pl={5}>
        <VStack
          pl={15}
          pb={10}
          w={270}
          h={130}
          mr={5}
          alignItems="flex-start"
          shadow="lg"
          bgColor="white"
          borderRadius={10}
        >
          <Heading pt={3} fontSize="3xl" color="green.700">
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
          p={5}
          spacing={3}
          justifyContent="space-between"
          pr={5}
          justifyItems="center"
        >
          <Box
            w={350}
            h={130}
            shadow="lg"
            borderRadius={5}
            bgColor="white"
            borderLeft={`7px solid #2F855A`}
          >
            <CardsNsQuotaCol
              TextHeader="Total number of count"
              color="#2F855A"
              data={totalCount!}
              Icon={TbSum}
            />
          </Box>

          <Box
            w={350}
            h={130}
            shadow="lg"
            borderRadius={5}
            bgColor="white"
            borderLeft={`7px solid #FF8042`}
          >
            <CardsNsQuotaCol
              TextHeader="Total Quota of Com"
              color="#FF8042"
              data={totalCommQ!}
              Icon={GiReceiveMoney}
            />
          </Box>

          <Box
            w={350}
            h={130}
            shadow="lg"
            borderRadius={5}
            bgColor="white"
            borderLeft={`7px solid #00B7FE`}
          >
            <CardsNsQuotaCol
              TextHeader="Total Quota of NCom"
              color="#00B7FE"
              data={totalNCommQ!}
              Icon={LiaDonateSolid}
            />
          </Box>

          {/* <Box
            w={260}
            h={130}
            shadow="lg"
            borderRadius={5}
            bgColor="white"
            borderLeft={`7px solid #8884D8`}
          >
            <TableForPerWeek data={tablePerWeek} />
          </Box> */}

          {/* <Box
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
                Icon={LiaDonateSolid}
              />
            </Box> */}
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
        <Box w="70%">
          <Box>
            <BarGraphForComm data={barGraphcommQ} />
          </Box>
          <Box mr="16" pt={5}>
            <BarGraphForNComm data={barGraphNcommQ} />
          </Box>
          <Box mt={5} shadow="xl" borderRadius={10} w={1300}>
            <BarGraphForAcct data={barAccount} />
          </Box>
          <Box mt={5} shadow="xl" borderRadius={10} w={1300}>
            <TableForPerWeek data={tablePerWeek} />
          </Box>
          <Flex></Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default NsQuotaCollection;
