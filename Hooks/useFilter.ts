import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFilters } from "../Service/GenericService";

export interface IFilter {
  territoryCode: string;
  regionCode: string;
  branchCode: string;
  description: string;
}

export const useFilter = () => {
  const [isPassedQryEnabled, SetIsPassedQryEnabled] = useState<boolean>(false);
  const [response, setResponse] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const { isLoading, data } = useQuery<IFilter[], Error>({
    queryKey: ["FiltersData"],
    queryFn: () => fetchFilters<IFilter>().getAll(),
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: 24 * 60 * 1000,
    // onError: (error: Error) => setErrorResponse(useReponse(error)),
  });

  return { data, isLoading, SetIsPassedQryEnabled };
};
