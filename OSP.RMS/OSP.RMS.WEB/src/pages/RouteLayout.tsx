import React from "react";
import SideBar from "../components/Navigation/SideBar";
import { Outlet } from "react-router";

const RouteLayout = () => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default RouteLayout;
