import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { filterUse } from "./Hooks/useFilter";
import ReactDOM from "react-dom";
import filterUse from "./Hooks/useFilter";

export interface test {
  Name: string;
  Age: number;
}

export const logMessage = (entity: test) => {
  console.log("Name: " + entity.Name + " ,Age : " + entity.Age);
};

const filter = new filterUse();
export { filter };
