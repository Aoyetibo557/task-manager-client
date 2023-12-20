import API from "../hooks/axios";
import { auth } from "../firebase.js";
import { User, ReturnObject } from "../utils/types";

const SIGNIN_ROUTE = "/auth/login";
const SIGNUP_ROUTE = "/auth/signup";
const USER_DETAILS_ROUTE = "/auth/finduserbyid";
const UPDATE_USER_BY_ID = "/auth/updateuserbyid";
const RESET_PASSWORD = "/auth/resetpassword";
const FIND_USER_BY_EMAIL_ROUTE = "/auth/finduser";
const GET_USER_STATS_ROUTE = "/auth/userstats";

async function signIn(email: string, password: string) {
  const { data } = await API.post(SIGNIN_ROUTE, { email, password });
  return data;
}

// Sign up
async function signUp(
  email: string,
  password: string,
  firstname: string,
  lastname: string
) {
  const { data } = await API.post(SIGNUP_ROUTE, {
    email,
    password,
    firstname,
    lastname,
  });
  return data;
}

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

// Get user stats
async function getUserStats(userid: string) {
  const { data } = await API.get(`${GET_USER_STATS_ROUTE}/${userid}`);
  return data;
}

export {
  signIn,
  signUp,
  getUserDetails,
  updateUserById,
  resetPassword,
  findUserByEmail,
  getUserStats,
};
