import React, { useEffect } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";

const ValidateCompany = () => {
  const navigate = useNavigate();
  const company = localStorage.getItem("Company");

  useEffect(() => {
    if (company === null) {
      navigate("/");
    }
  }, [company]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default ValidateCompany;
