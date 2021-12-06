import { parse } from "date-fns";



export function compareDateString(a: { date: string; }, b: { date: string; }): 0 | 1 | -1 {
  let dateA = parse(a.date, "yyyy-MMM-dd", new Date());
  let dateB = parse(b.date, "yyyy-MMM-dd", new Date());
  console.log(dateA, dateB);
  if (dateA > dateB) {
    return 1;
  } else if (dateA < dateB) {
    return -1;
  } else {
    return 0;
  }
}
