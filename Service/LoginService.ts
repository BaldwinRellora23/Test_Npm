import APIClient from "../Api/Api-Client";

const apiClient = <t>(endpoint: string) => new APIClient<t>(endpoint);

export const AuthLoginService = () => apiClient("User/AuthenticateUser");
