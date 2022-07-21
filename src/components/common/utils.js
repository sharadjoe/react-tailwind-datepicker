import moment from "moment";

export const momentObj = (day, month, year) => {
  return moment(`${day}-${month}-${year}`, "DD-MM-YYYY");
};

export const isToday = (date, selectedDate) => {
  return moment(
    new Date(selectedDate.year(), selectedDate.month(), date)
  ).isSame(selectedDate, "month");
};

export const isSelectedMonth = (month, selectedDate) => {
  return moment(
    new Date(selectedDate.year(), month, selectedDate.date())
  ).isSame(selectedDate, "month");
};
