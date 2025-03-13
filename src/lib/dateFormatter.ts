import { format, fromUnixTime } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export function formatUnixTimestamp(
  timestamp: number,
  timeZone: string,
  formatString: string = "dd-MM-yyyy"
): string {
  const date = fromUnixTime(timestamp);
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, formatString);
}
