import axios from "axios";

const axiosInstance = axios.create({
  //   baseURL: "https://localhost:7249/api/",
  baseURL: "https://hris.stpeter.com.ph:5102/api",

  params: {
    key: "b07131600ee34def946ad3228a9a8af4",
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = () => {
    return axiosInstance.get<T>(this.endpoint).then((res) => res.data);
  };

  getAllByAccess = (posCode: string, areaCode: string) => {
    return axiosInstance
      .get<T[]>(this.endpoint + "?posCode=" + posCode + "&areaCode=" + areaCode)
      .then((res) => res.data);
  };
}

export default APIClient;
