type NewsDate = {
  date: Date;
  datePrecision: "day" | "month";
};

export function formatNewsDate({ date, datePrecision }: NewsDate, includeYear = true) {
  const monthOnly = datePrecision === "month";
  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: monthOnly ? "long" : "short",
    ...(!monthOnly && { day: "numeric" }),
    ...(includeYear && { year: "numeric" }),
  });
}

export function newsDateTime({ date, datePrecision }: NewsDate) {
  return date.toISOString().slice(0, datePrecision === "month" ? 7 : 10);
}
