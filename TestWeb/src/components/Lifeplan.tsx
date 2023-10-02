import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import React from "react";

const Lifeplan = () => {
  return (
    <>
      <Box
        ml={{ base: 0, md: 60 }}
        // width={'100%'}
        // overflow={'hidden'}
      >
        <Heading>LIFEPLAN</Heading>
        {/* content */}
        <Box
          backgroundColor={"gray.200"}
          // h='100%'
          // templateColumns='500px 1fr 300px'
          // templateColumns='  '

          gap={3}
          className="main-box"
        >
          <GridItem
            rowSpan={1}
            // bg='lightgreen'
            // width={'100%'}
          >
            <Grid
              height={"100%"}
              // templateRows='1fr 1fr 1fr'
              gap={3}
            >
              <GridItem bg={"white"} className="gridBox">
                {/* <SamplePieChart /> */}
              </GridItem>
              <GridItem bg={"white"} className="gridBox">
                {/* <SampleAreaChart /> */}
              </GridItem>
              <GridItem bg={"white"} className="gridBox">
                {/* <SamplePieChart /> */}
                {/* <SampleChart /> */}
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem
            rowSpan={1}
            // bg='papayawhip'
          >
            <Grid row={2} height={"100%"} gap={3}>
              <Box bg={"white"} height={"1fr"} className="gridBox">
                {/* <SampleChart /> */}
              </Box>
              <Box bg={"white"} height={"1fr"} className="gridBox">
                {/* <SampleChart /> */}
              </Box>
            </Grid>
          </GridItem>
          <GridItem
            rowSpan={1}
            // bg='papayawhip'
          >
            <Grid h="100%" templateRows="250px 1fr" gap={3}>
              <Box bg={"white"} className="gridBox">
                {" "}
                1
              </Box>
              <Box bg={"white"} className="gridBox">
                2{" "}
              </Box>
            </Grid>
          </GridItem>
        </Box>
      </Box>
    </>
  );
};

export default Lifeplan;
