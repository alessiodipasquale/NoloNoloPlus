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
  // let periodTotals = [] as { date: string; revenue: number }[];
  let arr = Array.from(rentalsByPeriod);
  return new Map(
    arr.map(([key, rentals]) => [
      key,
      rentals.reduce((tot, curr) => tot + curr.finalPrice, 0),
    ])
  );

  // for (let date of Object.keys(rentalsByPeriod)) {
  //   periodTotals.push({
  //     date: date,
  //     revenue: rentalsByPeriod[date].reduce(
  //       (tot, curr) => tot + curr.finalPrice,
  //       0
  //     ),
  //   });
  // }
  // return periodTotals;
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

export function fillMissing<T>(
  thingsByPeriod: { value: T | null; date: Date }[],
  periodHelpers: PeriodHelpers
) {
  let copy = thingsByPeriod.slice().sort((a, b) => compareAsc(a.date, b.date));
  for (let i = 0; i < thingsByPeriod.length - 1; i++) {
    const dateA = thingsByPeriod[i].date;
    const dateB = thingsByPeriod[i + 1].date;

    let difference = periodHelpers.difference(dateB, dateA);

    for (let j = 1; j < difference; j++) {
      copy.push({
        date: periodHelpers.add(dateA, j) ,
        value: null,
      });
    }
  }
  return copy.sort((a, b) => compareAsc(a.date, b.date));
}

export function getRevenuePerWeek(rentals: any[]) {
  const revenuePerWeek = getRevenueByCalendarPeriod(rentals, startOfWeek);
  const arrToFill = Array.from(revenuePerWeek)

  const filledValues = fillMissing(
    arrToFill.map(([date, rental]) => ({
      value: rental,
      date: date,
    })),
    {
      add: addWeeks,
      startOf: startOfISOWeek,
      difference: differenceInCalendarWeeks,
    }
  );
  return filledValues.map((current) => ({
    revenue: current.value ?? 0,
    date: current.date,
  }));
}

// export function getRevenuePerMonth(rentals: any[]) {
//   let revenuePerMonth = getRevenueByCalendarPeriod(rentals, startOfMonth);
//   const filledValues = fillMissing(
//     revenuePerMonth.map((curr) => ({
//       value: curr.revenue,
//       date: new Date(curr.date),
//     })),
//     {
//       add: addMonths,
//       startOf: startOfMonth,
//       difference: differenceInCalendarMonths,
//     }
//   );
//   return filledValues.map((current) => ({
//     revenue: current.value ?? 0,
//     date: current.date,
//   }));
// }

export function getPercentDiff(last: number, current: number): number {
  return ((current - last) / last) * 100;
}
