import axios from "axios";

const axiosInstance = axios.create({
  //#region LOCALHOST API

  // baseURL: "https://localhost:7249/api/",

  baseURL: "https://hris.stpeter.com.ph:5102/api",

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

  getAll = () => {
    return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);
  };

  AuthLogin = (entity: { email: string; password: string }) => {
    return axiosInstance.post(this.endpoint, entity).then((res) => res.data);
  };
}

export default APIClient;
