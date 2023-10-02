// "use client";
import { Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { ButtonProps } from "../../interface/ButtonProps";
import { MobileNav } from "./MobileNav";
import SidebarContent from "./SideBarContent";

interface Props {
  Items: ButtonProps[];
}

const SidebarWithHeader = ({ Items }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* <Box
                minH="100vh"
                bg={useColorModeValue('gray.50', 'gray.900')}
            > */}

      <SidebarContent
        Items={Items}
        onClose={() => onClose}

        // display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent Items={Items} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      {/* </Box> */}
    </>
  );
};

export default SidebarWithHeader;
