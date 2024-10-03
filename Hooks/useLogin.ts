import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AuthLoginService } from "../Service/LoginService";
import { queryClient } from "../queryClient";
import { encryptData } from "../GenericFunctions/GenericFunction";

interface IUser {
  fullName: string;
  areaCode: string;
  posCode: string;
  contactNumber: string;
  empCode?: string;
  isDefault?: number;
}

export interface ILoginParam {
  email: string;
  password: string;
}

export default class useLogin {
  AuthenticateUser = () => {
    const [response, setResponse] = useState("");
    const [errorResponse, setErrorResponse] = useState("");

    const { mutate, data, isSuccess, isError } = useMutation<
      IUser,
      Error,
      ILoginParam
    >(
      {
        mutationFn: (entity: ILoginParam) =>
          AuthLoginService().AuthLogin({
            email: encryptData(entity.email),
            password: encryptData(entity.password),
          }),
      },
      queryClient
    );
    return {
      data,
      mutate,
      response,
      errorResponse,
      isSuccess,
      isError,
    };
  };
}
