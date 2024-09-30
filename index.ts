import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFilter } from "./Hooks/useFilter";
import ReactDOM from "react-dom";

export interface test {
  Name: string;
  Age: number;
}

export const logMessage = (entity: test) => {
  console.log("Name: " + entity.Name + " ,Age : " + entity.Age);
};

export { useFilter };
