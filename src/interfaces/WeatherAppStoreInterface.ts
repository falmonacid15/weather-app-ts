import { Location } from "@/types/LocationType";
import { Current as CurrentData, Daily, Hourly } from "./OneCallApiResponse";

export type Geolocation = {
  lat: number;
  lon: number;
};

export interface WeatherAppStore {
  savedLocations: Location[];
  addLocation: (location: Location) => void;
  removeLocation: (locationName: string) => void;

  currentUnit: "metric" | "imperial" | "standard";
  setCurrentUnit: (data: "metric" | "imperial" | "standard") => void;

  location: Location | null;
  setLocation: (data: Location) => void;

  currentData: CurrentData | null;
  setCurrentData: (data: CurrentData) => void;

  hourlyData: Hourly[] | null;
  setHourlyData: (data: Hourly[]) => void;

  dailyData: Daily[] | null;
  setDailyData: (data: Daily[]) => void;

  geoLocation: Geolocation | null;
  setGeoLocation: (data: Geolocation) => void;
}
