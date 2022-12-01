import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
});
