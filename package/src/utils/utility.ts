 export const getFormattedDate = (dateString: string) => {
  return new Intl.DateTimeFormat('en-US', {
    year: "numeric",
    month: "long",
    day: "numeric",
    }).format(new Date(dateString));
}