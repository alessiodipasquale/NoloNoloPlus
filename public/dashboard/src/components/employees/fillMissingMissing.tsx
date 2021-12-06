import {
  addWeeks,
  differenceInCalendarWeeks,
  format,
  parse,
  startOfISOWeek,
  startOfWeek,
} from "date-fns";
import { timeframe } from "./EmployeeDashboard";
import { compareDateString } from "./compareDateString.1";
import { Rental } from "../../types/bd-entities";

type PeriodHelpers = {
  add: (date: number | Date, amount: number) => Date;
  difference: (dateLeft: number | Date, dateRight: number | Date) => number;
  startOf: (date: number | Date) => Date;
};

const dateFormat = "yyyy-MMM-dd";

function fillMissing(
  revenueByPeriod: { date: string; revenue: number }[],
  periodHelpers: PeriodHelpers
) {
  let copy = revenueByPeriod.slice().sort(compareDateString);

  for (let i = 0; i < revenueByPeriod.length - 1; i++) {
    const dateA = parse(revenueByPeriod[i].date, dateFormat, new Date());
    const dateB = parse(revenueByPeriod[i + 1].date, dateFormat, new Date());
    console.log(dateA);

    let difference = periodHelpers.difference(dateB, dateA);
    console.log(difference);

    for (let j = 1; j < difference; j++) {
      let date = format(periodHelpers.add(dateA, j), dateFormat);
      console.log(date);
      copy.push({
        date: date,
        revenue: 0,
      });
    }
  }

  return copy.sort(compareDateString);
}

function getRevenuePerPeriod(
  rentals: Rental[],
  startOfPeriod: (date: number | Date) => Date
): { date: string; revenue: number }[] {
  let rentalsByPeriod = groupRentalsByPeriod(rentals, startOfPeriod);
  let weekTotals = getTotalsPerGroup(rentalsByPeriod);
  return weekTotals;
}

function getTotalsPerGroup(rentalsByPeriod: { [key: string]: Rental[] }) {
  let periodTotals = [] as { date: string; revenue: number }[];

  for (let date of Object.keys(rentalsByPeriod)) {
    periodTotals.push({
      date: date,
      revenue: rentalsByPeriod[date].reduce(
        (tot, curr) => tot + curr.finalPrice,
        0
      ),
    });
  }
  return periodTotals;
}

function groupRentalsByPeriod(
  rentals: Rental[],
  getPeriodStart: (date: number | Date) => Date
) {
  return rentals.reduce<{ [key: string]: Rental[] }>(
    (rentalsByPeriod, curr, index) => {
      let endDate = new Date(curr.endDate);
      let periodStart = getPeriodStart(endDate);
      const key = format(periodStart, "yyyy-MMM-dd");

      if (!rentalsByPeriod[key]) {
        rentalsByPeriod[key] = [];
      }
      rentalsByPeriod[key].push(curr);

      return rentalsByPeriod;
    },
    {}
  );
}

export function getRevenuePerWeek(rentals: Rental[]) {
  let revenuePerWeek = getRevenuePerPeriod(rentals, startOfWeek);
  return fillMissing(revenuePerWeek, {
    add: addWeeks,
    startOf: startOfISOWeek,
    difference: differenceInCalendarWeeks,
  });
}
