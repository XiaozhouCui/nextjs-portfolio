import moment from "moment";

export const formatDate = (date) => {
  if (date) return moment.unix(date / 1000).format("DD/MM/YYYY");
  return null;
};

export const fromNow = (date) => moment.unix(date / 1000).fromNow();

export const shortify = (text, maxLength = 50) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return text.substr(0, maxLength) + "...";
};
