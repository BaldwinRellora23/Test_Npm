import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNsOverQuota } from "../Services/TestServices";

export interface INSNsOverQuota {
  territoryCode: string;
  regionCode: string;
  areaCode: string;
  branchDesc: string;
  yearNMonthSale: string;
  quota: number;
  ns_Traditional: number;
  ns_From_Estore: number;
  ns_Total: number;
  category: string;
  yrSale: number;
  variance: number;
  trxMonth: string;
}

export const useNsOverQuota = () => {
  const [isPassedQryEnabled, SetIsPassedQryEnabled] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState("");

  const { isLoading, data } = useQuery<INSNsOverQuota[], Error>({
    queryKey: ["NsOverQuota", isPassedQryEnabled],
    queryFn: () =>
      fetchNsOverQuota<INSNsOverQuota>().getAllByAccess("TH", "NCT1"),
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: isPassedQryEnabled,
    staleTime: 24 * 60 * 1000,
    // onerr
    // onError: (error: Error) => setErrorResponse(useReponse(error)),
  });

  return { data, isLoading, SetIsPassedQryEnabled };
};
