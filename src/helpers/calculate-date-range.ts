export const calculateDateRange = (startDate: Date, endDate: Date) => {
  const diff = Math.floor(startDate.getTime() - endDate.getTime());
  const day = 1000 * 60 * 60 * 24;

  const days = Math.floor(diff / day);
  const months = Math.floor(days / 31);
  const years = Math.floor(months / 12);
  const remaindedMonths = Math.floor(months % 12)

  const message = `${years} yrs ${remaindedMonths} mos`

  return message
}
  