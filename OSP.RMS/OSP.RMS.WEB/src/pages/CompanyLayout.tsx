import { useEffect, useState } from "react";
import Lifeplan from "../components/Lifeplan";
import SideBar from "../components/Navigation/SideBar";
import { ButtonProps } from "../interface/ButtonProps";
import { FiHome } from "react-icons/fi";
import SidebarWithHeader from "../components/Navigation/SideBarHeader";
import NsSummaryCompany from "../components/NsSummaryCompany";
import NsOverQuota from "../components/NsOverQuota";
import LifeplanPage from "./LifePlan/LifeplanPage";
import LifeplanPageContainer from "./LifePlan/LifeplanPageContainer";
import { Outlet } from "react-router";
import { UseNavHeaderStore } from "../state-management/UseNavHeaderStore";

const propsArray: ButtonProps[] = [
  {
    name: "Home",
    icon: FiHome,
  },
  {
    name: "Trending",
    icon: FiHome,
  },
  // Add more objects as needed
];

const CompanyLayout = () => {
  const useSetHeaderTitle = UseNavHeaderStore((a) => a.setTitle);
  const companyName = localStorage.getItem("Company");
  const [sideBarWHeader, setsideBarWHeader] = useState<JSX.Element | null>(
    null
  );
  const [companyPage, setCompanyPage] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (companyName !== null) {
      switch (companyName) {
        case "LIFE PLAN":
          setsideBarWHeader(<SidebarWithHeader Items={propsArray} />);
          setCompanyPage(<NsOverQuota />);
          useSetHeaderTitle("Home");

          // setCompanyPage(<LifeplanPageContainer />);
          break;
        case "CHAPEL":
          setCompanyPage(<SideBar />);
          break;
      }
    }
  }, [companyName]);

  return (
    <>
      {/* <SidebarWithHeader /> */}
      {sideBarWHeader}
      {/* {companyPage} */}
      <Outlet />
    </>
  );
};

export default CompanyLayout;
