import axios from "axios";

const axiosInstance = axios.create({
  //#region LOCALHOST API

  baseURL: "https://localhost:7249/api/",

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

  // FOR REPORT BUILDER

  getAll = () => {
    return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);
  };

  //#endregion
}

export default APIClient;
