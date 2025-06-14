import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";
import { useWeatherAppStore } from "@/stores/WeatherAppStore";
import { useTranslation } from "react-i18next";
import {
  autoCompleteFindCities,
  oneCallFetchWeather,
} from "@/services/OpenWeatherMapApiServices";
import { List as Cities, List } from "@/interfaces/FindCitiesApiResponse";
import WeatherIcon from "../WeatherIcon";
import { useQuery } from "@tanstack/react-query";

export function CitySearch() {
  const [input, setInput] = useState("");
  const [isListVisible, setIsListVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const {
    setGeoLocation,
    geoLocation,
    setCurrentData,
    setDailyData,
    setHourlyData,
    currentUnit,
  } = useWeatherAppStore();

  const debouncedInput = useDebounce(input, 1000);

  const { data, isFetching: isLoading } = useQuery({
    queryKey: ["cities", debouncedInput],
    queryFn: () => autoCompleteFindCities(debouncedInput),
    enabled: debouncedInput.length > 0,
  });

  const { data: forecastData, refetch } = useQuery({
    queryKey: ["forecast"],
    queryFn: () => {
      if (!geoLocation?.lat || !geoLocation?.lon) {
        throw new Error("Geolocation coordinates are not available");
      }
      return oneCallFetchWeather(
        geoLocation.lat,
        geoLocation.lon,
        i18n.language,
        currentUnit || "standard"
      );
    },
    enabled: !!geoLocation,
  });

  const selectCity = async (city: List) => {
    setGeoLocation({ lat: city.coord.lat, lon: city.coord.lon });
    setIsListVisible(false);
    setInput(city.name);
  };

  useEffect(() => {
    if (i18n.language) {
      refetch();
    }
  }, [i18n.language]);

  useEffect(() => {
    if (geoLocation) {
      refetch();
    }
  }, [geoLocation]);

  useEffect(() => {
    if (currentUnit) {
      refetch();
    }
  }, [currentUnit]);

  useEffect(() => {
    if (forecastData) {
      setCurrentData(forecastData.oneCallResponse.current);
      setDailyData(forecastData.oneCallResponse.daily);
      setHourlyData(forecastData.oneCallResponse.hourly);
      useWeatherAppStore.setState((state) => ({
        location: state.location
          ? {
              ...state.location,
              lat: forecastData.locationResponse[0].lat as number,
              lon: forecastData.locationResponse[0].lon as number,
              timezone: forecastData.oneCallResponse.timezone as string,
              region: forecastData.locationResponse[0].region as string,
              country: forecastData.locationResponse[0].country as string,
              timezone_offset: forecastData.oneCallResponse
                .timezone_offset as number,
              name: forecastData.locationResponse[0].name,
            }
          : {
              name: forecastData.locationResponse[0].name,
              region: forecastData.locationResponse[0].region,
              country: forecastData.locationResponse[0].country,
              lat: forecastData.locationResponse[0].lat as number,
              lon: forecastData.locationResponse[0].lon as number,
              timezone: forecastData.oneCallResponse.timezone as string,
              timezone_offset: forecastData.oneCallResponse
                .timezone_offset as number,
            },
      }));
    }
  }, [forecastData]);

  return (
    <div className="relative z-10">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-card-foreground" />
        <Input
          type="text"
          placeholder={t("searchInputPlaceholder")}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsListVisible(true)}
          className="w-[300px] py-2 pl-10 pr-4 text-sm text-card-foreground border-2"
        />
      </div>
      <AnimatePresence>
        {isListVisible && data && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-1 w-[300px] rounded-lg shadow-lg border bg-popover "
          >
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 text-sm text-gray-500"
              >
                {t("searching")}
              </motion.div>
            ) : data && data.list.length > 0 ? (
              <motion.div className="max-h-[300px] overflow-auto py-2 bg-popover px-2 ">
                {data.list.map((city: Cities, index: number) => (
                  <motion.button
                    key={`${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      selectCity(city);
                    }}
                    className="w-full px-4 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="flex space-x-4 items-center">
                      <WeatherIcon
                        iconCode={city.weather[0].icon}
                        className="w-10 h-10"
                      />
                      <div className="flex flex-col justify-center items-start">
                        <h2>
                          <span className="font-bold text-base">
                            {city.name}, {""}
                          </span>
                          {city.sys.country}
                        </h2>
                        <p className="capitalize text-xs">
                          {city.weather[0].description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 text-sm text-gray-500"
              >
                {t("noResultsFound")}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
