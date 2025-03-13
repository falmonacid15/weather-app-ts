import { WeatherAppStore } from "@/interfaces/WeatherAppStoreInterface";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export const useWeatherAppStore = create<WeatherAppStore>()(
  devtools(
    persist(
      (set) => ({
        currentUnit: "standard",
        location: null,
        geoLocation: null,
        currentData: null,
        dailyData: null,
        hourlyData: null,
        savedLocations: [],
        addLocation: (location) =>
          set((state) => ({
            savedLocations: [...state.savedLocations, location],
          })),
        removeLocation: (locationName) =>
          set((state) => ({
            savedLocations: state.savedLocations.filter(
              (loc) => loc.name !== locationName
            ),
          })),
        setCurrentData: (data) => set(() => ({ currentData: data })),
        setDailyData: (data) => set(() => ({ dailyData: data })),
        setHourlyData: (data) => set(() => ({ hourlyData: data })),
        setGeoLocation: (data) => set(() => ({ geoLocation: data })),
        setLocation: (data) => set(() => ({ location: data })),
        setCurrentUnit: (data) => set(() => ({ currentUnit: data })),
      }),
      {
        name: "weather-app-store",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
