export const formatDateToMMDDYYYY = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};
