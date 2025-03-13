import { Current } from "@/types/CurrentType";
import { Forecast } from "@/types/ForecastType";
import { Location } from "@/types/LocationType";

export interface ForecastWeatherResponse {
  location: Location;
  current: Current;
  forecast: Forecast;
}
