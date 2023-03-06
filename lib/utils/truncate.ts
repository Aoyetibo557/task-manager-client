import dayjs from "dayjs";

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) {
    return str;
  }

  return str.substr(0, length) + "...";
};

// format dayjs unix timestamp to a readable date
export const formatDate = (timestamp: number): string => {
  return dayjs
    .unix(timestamp)
    .format("MMMM D, YYYY HH:MM:ssa", { useUtc: true });
};
