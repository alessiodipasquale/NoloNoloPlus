import { maxTime, minTime, sub } from "date-fns";
import { isWithinInterval } from "date-fns/esm";
import _ from "lodash";

export function groupByInterval<T>(
  things: T[],
  dates: Date[],
  period: Duration,
  howMany: number = 2) {
  if (_.isEqual(period, {})) {
    return new Map<Interval, T[]>([[{ start: minTime, end: maxTime }, things]]);
  }

  let groupedByInterval = new Map<Interval, T[]>();

  let latest = new Date();
  let earliest = sub(latest, period);

  for (let i = 0; i < howMany; i++) {
    let interval = { start: earliest, end: latest };
    let groups = things.filter((thing, index) => isWithinInterval(dates[index], interval)
    );
    groupedByInterval.set(interval, groups);

    latest = earliest;
    earliest = sub(earliest, period);
  };
  return groupedByInterval;
}
