import React, { useEffect, useState } from "react";
import NsOverQuota from "../../components/NsOverQuota";
import LifeplanPage from "./LifeplanPage";

interface Props {
  PageLink: string;
}

const LifeplanPageContainer = () => {
  //problem i wan to trigger the getter of localstorage (how to trigger and have dependencies)
  console.log("render");
  const companyLink = localStorage.getItem("companyLink");
  const [linkPage, setLinkPage] = useState(companyLink);
  const [lifePlanPage1, setlifePlanPage] = useState<JSX.Element | null>(null);

  useEffect(() => {
    // console.log("Compange Page : " + companyLink);
    setLinkPage(companyLink);
  }, [companyLink]);
  useEffect(() => {
    // setLinkPage(companyLink);
    switch (linkPage) {
      case "Home":
        setlifePlanPage(<LifeplanPage />);
        break;
      case "NsQuota":
        console.log("setlifeplanpage");
        setlifePlanPage(<NsOverQuota />);
        break;
    }
  }, [linkPage, companyLink]);

  useEffect(() => {
    // This effect will be triggered whenever lifePlanPage1 changes
    // Do something when lifePlanPage1 changes, such as logging
    // console.log("lifePlanPage1 changed:");
  }, [lifePlanPage1]);

  return (
    <>
      {/* <test /> */}
      {lifePlanPage1}
    </>
  );
};

export default LifeplanPageContainer;
