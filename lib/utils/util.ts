import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) {
    return str;
  }

  return str.substr(0, length) + "...";
};

// format dayjs unix timestamp to a readable date
export const formatDate = (timestamp: any): string => {
  return dayjs.unix(parseInt(timestamp)).format(`D MMM YYYY, hh:mm:a`);
};

/**
 *  relative time function that will return a string like "2 days ago", "3 hours ago", etc.
 *
 */
export const formatRelativeTime = (timestamp: any): string => {
  return dayjs().to(dayjs.unix(parseInt(timestamp)));
};

export const NOTIFICATION_TYPE_COLOR = {
  "user-change": "#f50",
  "password-reset": "#2db7f5",
  "email-notification": "#87d068",
  "feature-update": "#4D5ACE",
  "task-update": "#2db7f5",
  "task-create": "#FF4366",
  "task-deadline": "#f50",
};

export const NOTIFICATION_TYPES = {
  "email-notification": "Email Notification",
  "user-change": "User Change",
  "password-reset": "Password Change",
  "feature-update": "Feature Update",
  "task-update": "Task Updated",
  "task-create": "Task Created",
  "task-deadline": "Task Deadline",
};
