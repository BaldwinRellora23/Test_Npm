import { createBrowserRouter } from "react-router-dom";
import CompanyLayout from "../pages/CompanyLayout";
import CompanyPage from "../pages/CompanyPage";
import AuthLogoutRoute from "./AuthLogoutRoute";
import PrivateRoute from "./PrivateRoute";
import ValidateCompany from "./ValidateCompany";
import NsOverQuota from "../components/NsOverQuota";
import LifeplanPageContainer from "../pages/LifePlan/LifeplanPageContainer";
import LifeplanPage from "../pages/LifePlan/LifeplanPage";
import NsPassFailed from "../components/NsPassFailed/NsPassFailed";
import NsClassification from "../components/NsClassification/NsClassification";
import NsQuotaCollection from "../components/NsQuotaCollection/NsQuotaCollection";
import LifePlanHome from "../components/LifePlanHome/LifePlanHome";

const route = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <ValidateCompany />,
        children: [
          { index: true, element: <CompanyPage /> },
          {
            path: "LifePlan",
            element: <CompanyLayout />,
            children: [
              { index: true, element: <LifePlanHome /> },
              { path: "Home", element: <LifePlanHome /> },
              { path: "NsQuota", element: <NsOverQuota /> },
              { path: "NsPassFailed", element: <NsPassFailed /> },
              { path: "NsQuotaCollection", element: <NsQuotaCollection /> },
              { path: "NsClassification", element: <NsClassification /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/Login",
    element: <AuthLogoutRoute />,
  },
]);

export default route;
