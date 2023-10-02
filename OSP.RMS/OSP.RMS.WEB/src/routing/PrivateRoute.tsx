import React from "react";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const localUser = localStorage.getItem("userName");
  if (localUser === null) return <Navigate to="/Login" />;
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
