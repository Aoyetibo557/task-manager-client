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
  return dayjs.unix(parseInt(timestamp)).format("MMMM D, YYYY hh:mm:ssa");
};

/**
 *  relative time function that will return a string like "2 days ago", "3 hours ago", etc.
 *
 */
export const formatRelativeTime = (timestamp: any): string => {
  return dayjs().to(dayjs.unix(parseInt(timestamp)));
};
