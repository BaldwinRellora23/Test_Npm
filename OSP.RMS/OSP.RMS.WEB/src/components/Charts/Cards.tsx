import { Box, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

interface Props {
  TextHeader: string;
  color: string;
  data: number;
  Icon: IconType;
}

const Cards = ({ TextHeader, color, data, Icon }: Props) => {
  return (
    <Box>
      <Box
        bgColor="white"
        w={350}
        h={120}
        shadow="lg"
        borderRadius={5}
        borderLeft={`7px solid ${color}`}
      >
        <HStack alignItems="center" pl={3}>
          <VStack alignItems="flex-start" pt={5}>
            <Text paddingTop={2} color={color} fontWeight="bold" fontSize="16">
              {TextHeader}
            </Text>
            <Text fontSize="lg" color={data < 0 ? "red" : "black"}>
              {typeof data === "number"
                ? data.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                : "Invalid Data"}
            </Text>
          </VStack>
          <Spacer />
          <Box pr={3}>
            <Image mt={6} color="gray.300" as={Icon} boxSize="14" />
            {/* Imnage Color: color="gray.300" */}
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default Cards;
