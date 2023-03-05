export const truncate = (str: string, length: number): string => {
  if (str.length <= length) {
    return str;
  }

  return str.substr(0, length) + "...";
};
