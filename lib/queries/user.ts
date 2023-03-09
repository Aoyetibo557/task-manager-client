import API from "../hooks/axios";
import { auth } from "../firebase.js";
import { User, ReturnObject } from "../utils/types";

const USER_DETAILS_ROUTE = "/auth/finduserbyid";
const UPDATE_USER_BY_ID = "/auth/updateuserbyid";

// Update a user by id
async function updateUserById(userid: User | any, rec: any) {
  const { data } = await API.put(`${UPDATE_USER_BY_ID}/${userid}`, rec);
  return data;
}

// Get user details
async function getUserDetails(userid: string) {
  const { data } = await API.get(`${USER_DETAILS_ROUTE}/${userid}`);
  return data;
}

export { getUserDetails, updateUserById };
