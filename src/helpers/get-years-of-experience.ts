export const getYearsOfExperience = (entries: Date[][]) => {
  const yearsAcc = entries.reduce((yearsAcc, entry) => {
    const [startDate, endDate] = entry;

    const monthsDiff = Math.max(
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      endDate.getMonth() -
        startDate.getMonth(),
      0
    );

    const yearsDiff = monthsDiff / 12;

    return yearsAcc + yearsDiff;
  }, 0)

  return Math.floor(yearsAcc)
}