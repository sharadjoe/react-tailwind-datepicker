import moment from "moment";

export const momentObj = (day, month, year) => {
  return moment(`${day}-${month}-${year}`, "DD-MM-YYYY");
};
