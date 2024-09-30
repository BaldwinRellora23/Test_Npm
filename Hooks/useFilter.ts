import { useState } from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { fetchFilters } from "../Service/GenericService";

export interface IFilter {
  territoryCode: string;
  regionCode: string;
  branchCode: string;
  description: string;
}

let queryClient: QueryClient | null = null;

export const getQueryClient = (): QueryClient => {
  if (!queryClient) {
    queryClient = new QueryClient();
  }
  return queryClient;
};
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
