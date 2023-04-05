import API from "../hooks/axios";
import { auth } from "../firebase.js";
import { User, ReturnObject } from "../utils/types";

const USER_DETAILS_ROUTE = "/auth/finduserbyid";
const UPDATE_USER_BY_ID = "/auth/updateuserbyid";
const RESET_PASSWORD = "/auth/resetpassword";
const FIND_USER_BY_EMAIL_ROUTE = "/auth/finduser";

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

// Reset password
async function resetPassword(newpassword: any, userId: string) {
  const { data } = await API.put(`${RESET_PASSWORD}/${userId}`, {
    password: newpassword,
  });
  return data;
}

// Find user by email
async function findUserByEmail(email: string) {
  const { data } = await API.get(`${FIND_USER_BY_EMAIL_ROUTE}/${email}`);
  return data;
}

export { getUserDetails, updateUserById, resetPassword, findUserByEmail };
