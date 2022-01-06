import {
  addWeeks,
  differenceInCalendarMonths,
  differenceInCalendarWeeks,
  format,
  parse,
  startOfISOWeek,
  startOfWeek,
  Interval,
  compareAsc,
  differenceInWeeks,
  addMilliseconds,
  differenceInMonths,
} from "date-fns";
import { compareDateString } from "./compareDateString.1";
import { Rental as any, Rental } from "../../@types/db-entities";
import { addMonths, intervalToDuration, startOfMonth, sub } from "date-fns/esm";

export const dateFormat = "yyyy-MMM-dd";
export type timeframe = "week" | "month" | "quarter" | "year" | "all";

type PeriodHelpers = {
  add: (date: number | Date, amount: number) => Date;
  difference: (dateLeft: number | Date, dateRight: number | Date) => number;
  startOf: (date: number | Date) => Date;
};

function getRevenueByCalendarPeriod(
  rentals: Rental[],
  startOfPeriod: (date: number | Date) => Date
) {
  let rentalsByPeriod = groupByDate<Rental>(
    rentals.map((rental) => ({ thing: rental, date: rental.endDate })),
    startOfPeriod
  );
  let weekTotals = getTotalsPerGroup(rentalsByPeriod);
  return weekTotals;
}

function getTotalsPerGroup(rentalsByPeriod: Map<Date, Rental[]>) {
  let arr = Array.from(rentalsByPeriod);
  return new Map(
    arr.map(([key, rentals]) => [
      key,
      rentals.reduce((tot, curr) => tot + curr.finalPrice, 0),
    ])
  );
}

export function groupByDate<T>(
  arr: { thing: T; date: Date }[],
  getPeriodStart: (date: number | Date) => Date
) {
  return arr.reduce((map, { thing, date }, index) => {
    const periodStart = getPeriodStart(new Date(date));

    if (!map.has(periodStart)) {
      map.set(periodStart, []);
    }
    map.get(periodStart)!.push(thing);

    return map;
  }, new Map<Date, T[]>());
}




function fillMissing<T>(
  thingsByPeriod: readonly { value?: T; date: Date }[],
  periodHelpers: PeriodHelpers
) {
  let copy = thingsByPeriod.slice().sort((a, b) => compareAsc(a.date, b.date));

  for (let i = 0; i < thingsByPeriod.length - 1; i++) {
    const dateA = copy[i].date;
    const dateB = copy[i + 1].date;
    let difference = periodHelpers.difference(dateB, dateA);
    for (let j = 1; j < difference; j++) {
      copy.push({
        date: periodHelpers.add(dateA, j),
      });
    }
  }
  return copy.sort((a, b) => compareAsc(a.date, b.date));
}

function getRevenueAndFill(rentals: Rental[], periodHelpers: PeriodHelpers) {
  const revenuePerPeriod = getRevenueByCalendarPeriod(
    rentals,
    periodHelpers.startOf
  );

  const arrToFill = Array.from(revenuePerPeriod).map(([date, value]) => ({
    value,
    date,
  }));

  const filledValues = fillMissing(arrToFill, periodHelpers);

  return filledValues.map(({ value, date }) => ({
    revenue: value ?? 0,
    date: date,
  }));
}

export function getRevenuePerWeek(rentals: Rental[]) {
  return getRevenueAndFill(rentals, {
    add: addWeeks,
    difference: differenceInCalendarWeeks,
    startOf: startOfWeek,
  });
}

export function getRevenuePerMonth(rentals: Rental[]) {
  return getRevenueAndFill(rentals, {
    add: addMonths,
    difference: differenceInMonths,
    startOf: startOfMonth,
  });
}

export function getPercentDiff(last: number, current: number): number {
  return ((current - last) / last) * 100;
}
