import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthEmployeeSchema } from "../schema/AuthEmployeeSchema";
import { AuthLoginService } from "../services/EmployeeService";
import useReponse from "../utility/handlingResponse";

interface Props {
  firstName: string;
}

const useAuthenticate = () => {
  const [response, setResponse] = useState("");
  const { mutate, data, isLoading, isSuccess, isError } = useMutation<
    Props,
    Error,
    AuthEmployeeSchema
  >({
    mutationFn: (employee: AuthEmployeeSchema) =>
      AuthLoginService().AuthLogin(employee),

    onError: (error) => {
      setResponse(useReponse(error));
    },
  });
  return { data, mutate, response, isLoading, isSuccess, isError };
};

export default useAuthenticate;
