const YEAR = 2025;

const getDateFromDay = (dayOfYear: number) => {
  const startOfYear = new Date(YEAR, 0, 1);

  const targetDate = new Date(startOfYear);

  targetDate.setDate(startOfYear.getDate() + dayOfYear);

  return targetDate;
};

export default getDateFromDay;
