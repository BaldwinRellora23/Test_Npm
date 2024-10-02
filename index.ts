import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { filterUse } from "./Hooks/useFilter";
import ReactDOM from "react-dom";
import filterUse from "./Hooks/useFilter";
import useLogin from "./Hooks/useLogin";

export interface test {
  Name: string;
  Age: number;
}

export const logMessage = (entity: test) => {
  console.log("Name: " + entity.Name + " ,Age : " + entity.Age);
};

const filter = new filterUse();
const useLoginClass = new useLogin();

export { filter, useLoginClass };
