import {
  addWeeks,
  differenceInCalendarMonths,
  differenceInCalendarWeeks,
  format,
  parse,
  startOfISOWeek,
  startOfWeek,
  Interval,
} from "date-fns";
import { compareDateString } from "./compareDateString.1";
import { Rental as any } from "../../@types/db-entities";
import { addMonths, intervalToDuration, startOfMonth, sub } from "date-fns/esm";

export const dateFormat = "yyyy-MMM-dd";
export type timeframe = "week" | "month" | "quarter" | "year" | "all";

type PeriodHelpers = {
  add: (date: number | Date, amount: number) => Date;
  difference: (dateLeft: number | Date, dateRight: number | Date) => number;
  startOf: (date: number | Date) => Date;
};


function getRevenueByCalendarPeriod(
  rentals: any[],
  startOfPeriod: (date: number | Date) => Date
): { date: string; revenue: number }[] {
  let rentalsByPeriod = groupByDate(
    rentals.map((rental) => ({ thing: rental, date: rental.endDate })),
    startOfPeriod
  );
  let weekTotals = getTotalsPerGroup(rentalsByPeriod);
  return weekTotals;
}

function getTotalsPerGroup(rentalsByPeriod: { [key: string]: any[] }) {
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

export function groupByDate<T>(
  arr: { thing: T; date: Date }[],
  getPeriodStart: (date: number | Date) => Date
) {
  return arr.reduce<{ [key: string]: T[] }>(
    (thingsByPeriod, { thing, date }, index) => {
      const periodStart = getPeriodStart(new Date(date));
      const key = format(periodStart, dateFormat);

      if (!thingsByPeriod[key]) {
        thingsByPeriod[key] = [];
      }
      thingsByPeriod[key].push(thing);

      return thingsByPeriod;
    },
    {}
  );
}

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

export function getRevenuePerWeek(rentals: any[]) {
  let revenuePerWeek = getRevenueByCalendarPeriod(rentals, startOfWeek);
  return fillMissing(revenuePerWeek, {
    add: addWeeks,
    startOf: startOfISOWeek,
    difference: differenceInCalendarWeeks,
  });
}

export function getRevenuePerMonth(rentals: any[]) {
  let revenuePerMonth = getRevenueByCalendarPeriod(rentals, startOfMonth);
  return fillMissing(revenuePerMonth, {
    add: addMonths,
    startOf: startOfMonth,
    difference: differenceInCalendarMonths,
  });
}

export function getPercentDiff(last: number, current: number): number {
  return ((current - last) / last) * 100;
}
