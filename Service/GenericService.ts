import APIClient from "../Api/Api-Client";

const apiClient = <t>(endpoint: string) => new APIClient<t>(endpoint);

export const fetchFilters = <t>() => apiClient<t>("/Generic/fetchFilters");
