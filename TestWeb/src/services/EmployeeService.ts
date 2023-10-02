import { AuthEmployeeSchema } from "../schema/AuthEmployeeSchema";
import APIClient from "./Api-Client";

const apiClient = (endpoint: string) =>
  new APIClient<AuthEmployeeSchema>(endpoint);

export const AuthLoginService = () => apiClient("/PostEmployee");
