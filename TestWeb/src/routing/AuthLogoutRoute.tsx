import React, { useEffect } from "react";
import { Navigate } from "react-router";
import Login from "../pages/LoginPage";

const AuthLogoutRoute = () => {
  const firstName = localStorage.getItem("userName");

  return (
    <>
      <Login />
    </>
  );
};

export default AuthLogoutRoute;
