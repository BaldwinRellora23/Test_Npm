import { Flex, FlexProps, Heading, Spacer } from "@chakra-ui/react";
import userIcon from "../../assets/User-Icon.png";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  HStack,
  useColorModeValue,
  VStack,
  Icon,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UseNavHeaderStore } from "../../state-management/UseNavHeaderStore";

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const navigate = useNavigate();
  const { Title } = UseNavHeaderStore();
  return (
    <>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        // bg={useColorModeValue("white", "gray.900")}
        bgColor="white"
        // borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "flex-start", md: "flex-start" }}
        {...rest}
      >
        <Box>
          <Heading color="green.600" fontSize="3xl" borderLeft="4px" pl={3}>
            {Title}
          </Heading>
        </Box>
        <Spacer />
        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          {/* <Image src={ } /> */}
        </Text>

        <HStack spacing={{ base: "0", md: "6" }}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar
                    size={"sm"}
                    src={
                      "https://cdn-icons-png.flaticon.com/512/7178/7178489.png"
                    }
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">FRANK GONZALES</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    // localStorage.removeItem("userName");
                    localStorage.removeItem("Company");
                    navigate("/");
                  }}
                >
                  Select Company
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("userName");
                    localStorage.removeItem("Company");
                    navigate("/login");
                  }}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    </>
  );
};
