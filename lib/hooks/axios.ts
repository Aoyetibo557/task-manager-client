import axios from "axios";
import { API_URL } from "@/const/apis";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
