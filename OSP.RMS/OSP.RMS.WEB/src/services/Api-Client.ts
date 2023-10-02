import axios from "axios";
import AddHeaders from "./AddHeaders";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7249/api/Employee/",

  params: {
    key: "b07131600ee34def946ad3228a9a8af4",
  },
  headers: {
    "Content-type": "application/json",
    authorization: "Bearer " + sessionStorage.getItem("rms-bearertoken"),
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  AuthLogin = (entity: { userName: string; password: string }) => {
    return axiosInstance.post(this.endpoint, entity).then((res) => res.data);
  };
}

export default APIClient;
