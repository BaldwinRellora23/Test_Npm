import {
  Box,
  Button,
  FormControl,
  Heading,
  Image,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Companies } from "../interface/companies";

const CompanyPage = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [filterValue, setFilterValue] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const filteredItems = Companies.filter((Companies) =>
    Companies.content.props.children[1].props.children
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  );

  const setSlideView =
    filteredItems.length == 2 ? 2 : filteredItems.length == 1 ? 1 : 3;

  const setSpacing = filteredItems.length <= 2 ? 100 : 50;
  const setPaddingX = filteredItems.length >= 3 ? 10 : 300;

  return (
    <>
      <VStack height="100vh" justifyContent="center" alignItems="center">
        <Box w={900} textAlign="center">
          <FormControl pb={15}>
            <Heading color="green.600" fontSize="6xl">
              ST. PETER
            </Heading>
            <Text fontSize="4xl" color="green.600" pb={5}>
              GROUP OF COMPANIES
            </Text>
            <Select
              borderColor="green.600"
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);
                setSelectedIndex(-1);
              }}
              placeholder="Select Company"
            >
              {Companies.map((a) => (
                <option key={a.id}>
                  {a.content.props.children[1].props.children}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          borderRadius="15px"
          h={400}
          w={900}
          display="flex"
          alignItems="center"
          textAlign="center"
          shadow="lg"
          px={setPaddingX}
          bgColor="gray.50"
        >
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={50}
            slidesPerView={setSlideView}
          >
            {filteredItems.map((a, index) => {
              return (
                <SwiperSlide
                  key={a.id}
                  onClick={() => {
                    setSelectedIndex(index);
                    setSelectedCompany(
                      a.content.props.children[1].props.children
                    );
                  }}
                >
                  <Box
                    borderRadius="25px"
                    maxW={400}
                    bgColor="white"
                    borderWidth="1px"
                    borderColor="transparent"
                    _hover={{
                      borderColor:
                        index === selectedIndex ? "transparent" : "green.500",
                    }}
                  >
                    {React.cloneElement(a.content, {
                      color: index === selectedIndex ? "white" : "green.600",
                      borderColor: "transparent",
                      backgroundColor:
                        index === selectedIndex ? "green.600" : "",
                    })}
                  </Box>
                </SwiperSlide>
              );
            })}
            {filteredItems.length == 0 ? (
              <Text color="red" fontSize="20px">
                No item matched.
              </Text>
            ) : (
              ""
            )}
          </Swiper>
        </Box>
        <Box pt={15}>
          <Button
            border="1px"
            borderColor="green"
            color="green"
            backgroundColor="white"
            px={10}
            mr={5}
            borderRadius={20}
            _hover={{
              bgColor: "green.600",
              color: "white",
            }}
          >
            <Image as={IoMdArrowRoundBack} size={30} />
          </Button>
          <Button
            ml={5}
            bgColor="green.500"
            color="white"
            px={10}
            borderRadius={20}
            onClick={() => {
              localStorage.setItem("Company", selectedCompany);
              navigate("/LifePlan");
            }}
            _hover={{
              bgColor: "green.600",
            }}
          >
            PROCEED
          </Button>
        </Box>
      </VStack>
    </>
  );
};

export default CompanyPage;
