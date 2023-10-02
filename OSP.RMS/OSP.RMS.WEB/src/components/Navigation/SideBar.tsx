import { Heading } from "@chakra-ui/layout";
import React from "react";

const SideBar = () => {
  const firstName = localStorage.getItem("userName");
  return <Heading>Welcome {firstName}</Heading>;
};

export default SideBar;
