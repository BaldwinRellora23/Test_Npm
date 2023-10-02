import {
  Box,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiBuilding4Fill } from "react-icons/ri";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaMapMarked } from "react-icons/fa";
import { BiSolidMap } from "react-icons/bi";

const LifePlanHome = () => {
  return (
    <Box ml="60" bgColor="gray.50" h="89vh" pb={5}>
      {/* <Flex> */}
      {/* //w="80%" for BOX */}
      <Box pt={5}>
        <Box>
          <SimpleGrid
            pr={5}
            pl={5}
            columns={5}
            h={250}
            justifyItems="center"
            alignItems="center"
          >
            <Box
              h={240}
              w={250}
              bgColor="white"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius={25}
              shadow="xl"
            >
              <VStack p={2} spacing={5}>
                <Heading fontWeight="extrabold">9,821</Heading>
                <Image color="green.600" as={FaPeopleGroup} boxSize="20" />
                <Text color="gray.500" fontSize="24" fontWeight="semibold">
                  SALES AGENT
                </Text>
              </VStack>
            </Box>
            <Box
              h={240}
              w={250}
              bgColor="white"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius={25}
              shadow="xl"
            >
              <VStack p={2} spacing={5}>
                <Heading fontWeight="extrabold">207</Heading>
                <Image color="green.600" as={RiBuilding4Fill} boxSize="20" />
                <Text color="gray.500" fontSize="24" fontWeight="semibold">
                  BRANCHES
                </Text>
              </VStack>
            </Box>
            <Box
              h={240}
              w={250}
              bgColor="white"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius={25}
              shadow="xl"
            >
              <VStack p={2} spacing={5}>
                <Heading fontWeight="extrabold">346</Heading>
                <Image
                  color="green.600"
                  as={BsFillPersonLinesFill}
                  boxSize="20"
                />
                <Text color="gray.500" fontSize="24" fontWeight="semibold">
                  CS STL
                </Text>
              </VStack>
            </Box>
            <Box
              h={240}
              w={250}
              bgColor="white"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius={25}
              shadow="xl"
            >
              <VStack p={2} spacing={5}>
                <Heading fontWeight="extrabold">37</Heading>
                <Image color="green.600" as={BiSolidMap} boxSize="20" />
                <Text color="gray.500" fontSize="24" fontWeight="semibold">
                  REGION
                </Text>
              </VStack>
            </Box>
            <Box
              h={240}
              w={250}
              bgColor="white"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius={25}
              shadow="xl"
            >
              <VStack p={2} spacing={5}>
                <Heading fontWeight="extrabold">16</Heading>
                <Image color="green.600" as={FaMapMarked} boxSize="24" />
                <Text color="gray.500" fontSize="24" fontWeight="semibold">
                  TERRITORY
                </Text>
              </VStack>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
      {/* <Box bgColor="red" w="30%">
          Flex
        </Box> */}
      {/* </Flex> */}
    </Box>
  );
};

export default LifePlanHome;
