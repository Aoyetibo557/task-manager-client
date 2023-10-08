import API from "../hooks/axios";
import { auth } from "../firebase.js";
import { Notification, ReturnObject } from "../utils/types";

const CREATE_NOTIFICATION_ROUTE = "/notifications/createnotification";
const GET_USER_NOTIFICATIONS_ROUTE = "/notifications/getnotifications";
const UPDATE_NOTIFICATION_ROUTE = "/notifications/updatenotification";

// create a new notification
async function createNotification(notification: Notification | any) {
  const { data } = await API.post<Notification>(
    `${CREATE_NOTIFICATION_ROUTE}`,
    notification
  );
  return data;
}

async function getUserNotifications(userid: string) {
  const { data } = await API.get<Notification[] | any>(
    `${GET_USER_NOTIFICATIONS_ROUTE}/${userid}`
  );
  return data;
}

// update a notification
async function updateNotification(
  notificationId: Notification | any,
  actionType: string
) {
  const { data } = await API.put<Notification>(
    `${UPDATE_NOTIFICATION_ROUTE}/${notificationId}`,
    actionType
  );
  return data;
}

export { createNotification, getUserNotifications, updateNotification };
