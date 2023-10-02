import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  CloseButton,
  Collapse,
  Flex,
  Heading,
  Image,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ButtonProps } from "../../interface/ButtonProps";
import { NavItem } from "./NavItem";
import stPeterLogo from "../../assets/StPeter-Logo.webp";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { RxDashboard } from "react-icons/rx";
import {
  BiSolidChevronRight,
  BiSolidChevronDown,
  BiSolidDashboard,
} from "react-icons/bi";
import { VscPieChart } from "react-icons/vsc";
import { MdOutlineLeaderboard } from "react-icons/md";
import { BsBarChartLine } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { UseNavHeaderStore } from "../../state-management/UseNavHeaderStore";

interface Props {
  Items: ButtonProps[];
  onClose: () => void;
}

const SidebarContent = ({ Items, onClose, ...rest }: Props) => {
  const { isOpen, onToggle } = useDisclosure();
  const [isClicked, setIsClicked] = useState(false);
  const [isOpenOverview, setIsOpenOverview] = useState(false);
  const [isOpenReports, setIsOpenReports] = useState(false);
  const navigate = useNavigate();
  const useHeaderTitle = UseNavHeaderStore((a) => a.setTitle);

  return (
    <Box
      // borderBottom="1px"
      transition="3s ease"
      // bg={useColorModeValue("green.400", "gray.900")}
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
      shadow="lg"
    >
      <Flex
        h="20"
        alignItems="center"
        px="3"
        justifyContent="space-between"
        // bgColor="red"
        // borderRight="1px"
        // borderBottom="1px"
        borderColor="gray.100"
      >
        <Flex alignItems="center" justifyContent="center">
          <Image src={stPeterLogo} boxSize="12" />
          <Heading color="green.800" pl={3} pt={2} fontSize="xl">
            DASHBOARD
          </Heading>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <VStack>
        <Flex
          mt={6}
          p={3}
          w={210}
          alignItems="center"
          borderRadius={10}
          bgColor="white"
          color="black"
          _hover={{
            bg: "green.600",
            color: "white",
          }}
          cursor="pointer"
          onClick={() => {
            navigate("Home");
            useHeaderTitle("Home");
          }}
        >
          <Image as={AiOutlineHome} boxSize={30} />
          <Text pt={2} marginLeft="5" fontSize="md">
            Home
          </Text>
        </Flex>
        <Flex
          p={3}
          w={210}
          alignItems="center"
          borderRadius={10}
          bgColor={isOpenOverview ? "green.600" : "white"}
          color={isOpenOverview ? "white" : "black"}
          _hover={{
            bg: "green.600",
            color: "white",
          }}
          onClick={() => {
            onToggle();
            setIsOpenOverview(!isOpenOverview);
          }}
          cursor="pointer"
        >
          <Image as={RxDashboard} boxSize={30} />
          <Text marginLeft="5" fontSize="md">
            Overview
          </Text>
          <Image
            as={isOpenOverview ? BiSolidChevronDown : BiSolidChevronRight}
            boxSize={5}
            marginLeft="auto"
          />
        </Flex>
        <VStack>
          <Collapse in={isOpenOverview} animateOpacity>
            <VStack
              cursor="pointer"
              pb={1}
              alignItems="flex-start"
              mr="auto"
              ml={7}
              pl={3}
              borderLeft="1px solid green"
              spacing={2}
            >
              <Text
                fontSize="md"
                _hover={{
                  color: "green.600",
                }}
              >
                Recent
              </Text>

              <Text
                fontSize="md"
                _hover={{
                  color: "green.600",
                }}
              >
                Starred
              </Text>
              <Text
                fontSize="md"
                _hover={{
                  color: "green.600",
                }}
              >
                My Report
              </Text>
              <Text
                fontSize="md"
                _hover={{
                  color: "green.600",
                }}
              >
                Shared with me
              </Text>
            </VStack>
          </Collapse>
          <Flex
            p={3}
            w={210}
            borderRadius={10}
            alignItems="center"
            bgColor={isOpenReports ? "green.600" : "white"}
            color={isOpenReports ? "white" : "black"}
            _hover={{
              bg: "green.600", // Change to your desired green color
              color: "white", // Text color on hover
            }}
            onClick={() => {
              // onToggle();
              setIsOpenReports(!isOpenReports);
            }}
            cursor="pointer"
          >
            <Image as={BsBarChartLine} boxSize={30} />
            <Text marginLeft="5" fontSize="md">
              Reports
            </Text>
            <Image
              as={isOpenReports ? BiSolidChevronDown : BiSolidChevronRight}
              // as={isClicked ? BiSolidChevronDown : BiSolidChevronRight}
              boxSize={5}
              marginLeft="auto"
            />
          </Flex>
          <Collapse in={isOpenReports} animateOpacity>
            <VStack
              cursor="pointer"
              pb={1}
              alignItems="flex-start"
              mr="auto"
              pl={3}
              ml={16}
              borderLeft="1px solid green"
            >
              <Text
                fontSize="md"
                _hover={{
                  color: "green.600",
                }}
                onClick={() => {
                  // localStorage.setItem("companyLink", "NsQuota");
                  navigate("NsQuota");
                  useHeaderTitle("Ns Over Quota");
                }}
              >
                Ns Over Quota
              </Text>

              <Text
                fontSize="md"
                _hover={{
                  color: "green.600",
                }}
                onClick={() => {
                  navigate("NsPassFailed");
                  useHeaderTitle("Ns Passed & Failed");
                }}
              >
                Ns Passed & Failed
              </Text>
              <Text
                fontSize="md"
                _hover={{
                  color: "green.600",
                }}
                onClick={() => {
                  navigate("NsClassification");
                  useHeaderTitle("Ns Classification");
                }}
              >
                Ns Classification Bracket
              </Text>

              <Text
                fontSize="md"
                _hover={{
                  color: "green.600",
                }}
                onClick={() => {
                  navigate("NsQuotaCollection");
                  useHeaderTitle("Quota");
                }}
              >
                Quota
              </Text>

              {/* <Text
                fontSize="lg"
                _hover={{
                  color: "green.600",
                }}
              >
                Starred
              </Text> */}
            </VStack>
          </Collapse>

          <Flex
            p={3}
            w={210}
            borderRadius={10}
            alignItems="center"
            _hover={{
              bg: "green.600", // Change to your desired green color
              color: "white", // Text color on hover
            }}
            cursor="pointer"
          >
            <Image as={VscPieChart} boxSize={30} />
            <Text marginLeft="5" fontSize="md">
              Dashboard
            </Text>
            {/* <Image
              as={BiSolidChevronRight}
              // as={isClicked ? BiSolidChevronDown : BiSolidChevronRight}
              boxSize={5}
              marginLeft="auto"
            /> */}
          </Flex>

          <Flex
            p={3}
            w={210}
            borderRadius={10}
            alignItems="center"
            _hover={{
              bg: "green.600", // Change to your desired green color
              color: "white", // Text color on hover
            }}
            cursor="pointer"
          >
            <Image as={MdOutlineLeaderboard} boxSize={30} />
            <Text marginLeft="4" fontSize="md">
              Learder Board
            </Text>
            {/* <Image
              as={BiSolidChevronRight}
              // as={isClicked ? BiSolidChevronDown : BiSolidChevronRight}
              boxSize={5}
              ml="auto"
            /> */}
          </Flex>
        </VStack>
      </VStack>
    </Box>
  );
};

export default SidebarContent;
