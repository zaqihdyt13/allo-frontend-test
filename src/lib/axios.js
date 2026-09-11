import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://lldev.thespacedevs.com/2.2.0",
});
