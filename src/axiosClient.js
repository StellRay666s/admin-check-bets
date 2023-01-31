import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.URL,
  timeout: 999999,
});
