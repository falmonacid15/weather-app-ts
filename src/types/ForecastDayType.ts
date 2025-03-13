import { Astro } from "./AstroType";
import { Day } from "./DayType";
import { Hour } from "./HourType";

export type Forecastday = {
  date: string;
  date_epoch: number;
  day: Day;
  astro: Astro;
  hour: Hour[];
};
