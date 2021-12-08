import { parse } from "date-fns";
import { dateFormat } from "./fillMissingMissing";



export function compareDateString(a: { date: string; }, b: { date: string; }, format = dateFormat): 0 | 1 | -1 {
  let dateA = parse(a.date, format, new Date());
  let dateB = parse(b.date, format, new Date());
  console.log(dateA, dateB);
  if (dateA > dateB) {
    return 1;
  } else if (dateA < dateB) {
    return -1;
  } else {
    return 0;
  }
}
