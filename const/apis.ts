const PRODUCTION_API = " https://task-manager-api-dun.vercel.app/api";
const DEVELOPMENT_API = "http://localhost:9090/api";

const API_URL =
  process.env.NODE_ENV === "development" ? DEVELOPMENT_API : PRODUCTION_API;

export { API_URL };
