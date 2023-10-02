import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/query-core";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import "../src/index.css";
import route from "./routing/Route";
import { QueryClientProvider } from "@tanstack/react-query";
import CompanyPage from "./pages/CompanyPage";
import TestLayout from "./pages/CompanyLayout";
import Lifeplan from "./components/Lifeplan";
import Vw_nsSummarycomp from "./components/Vw_nsSummarycomp";
import Charts from "./components/Charts/Charts";
import BarGraph from "./components/Charts/BarGraph";
import LineGraph from "./components/Charts/LineGraph";
import PieGraph from "./components/Charts/PieGraph";
import NsSummaryCompany from "./components/NsSummaryCompany";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import SampleRoute from "./FRANK/SampleRoute";

const carouselItems = [
  <div key="1">Slide 1</div>,
  <div key="2">Slide 2</div>,
  <div key="3">Slide 3</div>,
];

const data = [
  { name: "Category 1", value: 10 },
  { name: "Category 2", value: 20 },
  { name: "Category 3", value: 15 },
  // Add more data as needed
];

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        {/* <SidebarWithHeader /> */}
        {/* <Login /> */}
        {/* <CompanyPage /> */}
        {/* <TestLayout /> */}
        {/* <Vw_nsSummarycomp /> */}
        {/* <BarGraph data={data} /> */}
        {/* <LineGraph data={data} /> */}
        {/* <PieGraph data={data} /> */}
        {/* <NsSummaryCompany /> */}
        <RouterProvider router={route} />
        {/* <DndProvider backend={HTML5Backend}>
          <SampleRoute />
        </DndProvider> */}
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
