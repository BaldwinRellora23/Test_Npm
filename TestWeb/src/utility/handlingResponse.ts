import { AxiosError } from "axios";

const useReponse = (error: Error) => {
  if (error instanceof AxiosError) {
    if (error.response) return error.response.data;
    else if (error.request) return error.message;
    else return error.message;
  }
};

export default useReponse;
