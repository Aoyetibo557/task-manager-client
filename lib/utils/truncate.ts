import dayjs from "dayjs";

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
