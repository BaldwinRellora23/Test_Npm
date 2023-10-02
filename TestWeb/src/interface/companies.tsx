import { Box, Icon } from "@chakra-ui/react";
import { GiFactory } from "react-icons/gi";
import {
  BiBarChartAlt,
  BiBuildings,
  BiCar,
  BiSolidFlorist,
  BiMoney,
  BiBarChart,
} from "react-icons/bi";
import { FaHome, FaStar, FaEnvelope, FaChurch, FaSearch } from "react-icons/fa";

export const Companies = [
  {
    id: 1,
    content: (
      <Box key={1} p={4} borderRadius="25px">
        <Icon as={BiBuildings} boxSize={150} />
        <Box mt={2} fontSize={20}>
          LIFE PLAN
        </Box>
      </Box>
    ),
  },
  {
    id: 2,
    content: (
      <Box key={2} p={4} borderRadius="25px">
        <Icon as={FaChurch} boxSize={150} />
        <Box mt={2} fontSize={20}>
          CHAPEL
        </Box>
      </Box>
    ),
  },
  {
    id: 3,
    content: (
      <Box key={3} p={4} borderRadius="25px">
        <Icon as={GiFactory} boxSize={150} />
        <Box mt={2} fontSize={20}>
          CASKET
        </Box>
      </Box>
    ),
  },
  {
    id: 4,
    content: (
      <Box key={4} p={4} borderRadius="25px">
        <Icon as={BiMoney} boxSize={150} />
        <Box mt={2} fontSize={20}>
          FINANCE CORP
        </Box>
      </Box>
    ),
  },
  {
    id: 5,
    content: (
      <Box key={5} p={4} borderRadius="25px">
        <Icon as={BiSolidFlorist} boxSize={150} />
        <Box mt={2} fontSize={20}>
          GARDENS
        </Box>
      </Box>
    ),
  },
  {
    id: 6,
    content: (
      <Box key={6} p={4} borderRadius="25px">
        <Icon as={BiCar} boxSize={150} maxW={300} />
        <Box mt={2} fontSize={20}>
          MOTORPOOL
        </Box>
      </Box>
    ),
  },
];
