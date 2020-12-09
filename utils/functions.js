import moment from "moment";

export const formatDate = (date) => {
  if (date) return moment.unix(date / 1000).format("DD/MM/YYYY");
  return null;
};
