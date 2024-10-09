import { format, parseISO } from "date-fns";

export const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "dd-MM-yyyy");
};
