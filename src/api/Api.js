import axios from "axios";
const BASE_URL = `https://localhost:8800`;

const api = axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.defaults.withCredentials = true;

export { api, axiosPrivate, BASE_URL };
