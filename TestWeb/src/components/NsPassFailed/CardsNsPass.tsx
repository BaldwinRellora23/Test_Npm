import { Box, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

interface Props {
  TextHeader: string;
  color: string;
  data: number;
  Icon: IconType;
}

const CardsNsPass = ({ TextHeader, color, data, Icon }: Props) => {
  return (
    <HStack alignItems="center" pl={3}>
      <VStack alignItems="flex-start" pt={5}>
        <Text color={color} fontWeight="bold" fontSize="16">
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
        <Image color="gray.300" as={Icon} boxSize="12" />
      </Box>
    </HStack>
    // </Box>
  );
};
export default CardsNsPass;
