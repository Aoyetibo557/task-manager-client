import API from "../hooks/axios";
import { auth } from "../firebase.js";

const USER_DETAILS_ROUTE = "/auth/finduserbyid";

// Get user details
async function getUserDetails(userid: string) {
  const { data } = await API.get(`${USER_DETAILS_ROUTE}/${userid}`);
  return data;
}

export { getUserDetails };
