import { Locate } from "lucide-react";
import { Button } from "../ui/button";
import { useWeatherAppStore } from "@/stores/WeatherAppStore";

import { oneCallFetchWeather } from "@/services/OpenWeatherMapApiServices";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function GeoLocation() {
  const { geoLocation, setGeoLocation, currentUnit } = useWeatherAppStore();
  const { i18n } = useTranslation();

  const {
    data: results,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["weatherByGeo", geoLocation?.lat, geoLocation?.lon],
    queryFn: () =>
      oneCallFetchWeather(
        geoLocation?.lat as number,
        geoLocation?.lon as number,
        i18n.language,
        currentUnit
      ),
    enabled: !!geoLocation,
  });

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGeoLocation({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (geoLocation) {
      refetch();
    }
  }, [geoLocation]);

  useEffect(() => {
    if (results) {
      useWeatherAppStore.setState((state) => ({
        location: state.location
          ? {
              ...state.location,
              lat: results.locationResponse[0].lat as number,
              lon: results.locationResponse[0].lon as number,
              timezone: results.oneCallResponse.timezone as string,
              region: results.locationResponse[0].region as string,
              country: results.locationResponse[0].country as string,
              timezone_offset: results.oneCallResponse
                .timezone_offset as number,
            }
          : {
              name: results.locationResponse[0].name,
              region: results.locationResponse[0].region,
              country: results.locationResponse[0].country,
              lat: results.locationResponse[0].lat as number,
              lon: results.locationResponse[0].lon as number,
              timezone: results.oneCallResponse.timezone as string,
              timezone_offset: results.oneCallResponse
                .timezone_offset as number,
            },
      }));
    }
  }, [results]);

  return (
    <Button
      size="icon"
      variant="ghost"
      className="rounded-full"
      onClick={handleGetLocation}
      disabled={isFetching}
    >
      <Locate
        size={32}
        strokeWidth={3}
        className={`text-foreground ${isFetching ? "animate-spin" : ""}`}
      />
    </Button>
  );
}
