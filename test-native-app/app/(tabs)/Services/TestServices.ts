import APIClient from "./API/Api-Client";

const apiClient = <t>(endpoint: string) => new APIClient<t>(endpoint);

export const fetchNsOverQuota = <t>() =>
  apiClient<t>("NewSales/fetchNsSummaryComp");
