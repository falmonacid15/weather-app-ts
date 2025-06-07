import { Locate } from "lucide-react";
import { Button } from "../ui/button";
import { useWeatherAppStore } from "@/stores/WeatherAppStore";
import { useQuery } from "react-query";
import { oneCallFetchWeather } from "@/services/OpenWeatherMapApiServices";
import { useTranslation } from "react-i18next";

export default function GeoLocation() {
  const { geoLocation, setGeoLocation, currentUnit } = useWeatherAppStore();
  const { i18n } = useTranslation();

  const { refetch, isFetching } = useQuery({
    queryKey: ["weatherByGeo", geoLocation?.lat, geoLocation?.lon],
    queryFn: () =>
      oneCallFetchWeather(
        geoLocation?.lat as number,
        geoLocation?.lon as number,
        i18n.language,
        currentUnit
      ),
    enabled: false,
    onSuccess: (data) => {
      useWeatherAppStore.setState((state) => ({
        location: state.location
          ? {
              ...state.location,
              lat: data.locationResponse[0].lat as number,
              lon: data.locationResponse[0].lon as number,
              timezone: data.oneCallResponse.timezone as string,
              region: data.locationResponse[0].region as string,
              country: data.locationResponse[0].country as string,
              timezone_offset: data.oneCallResponse.timezone_offset as number,
            }
          : {
              name: data.locationResponse[0].name,
              region: data.locationResponse[0].region,
              country: data.locationResponse[0].country,
              lat: data.locationResponse[0].lat as number,
              lon: data.locationResponse[0].lon as number,
              timezone: data.oneCallResponse.timezone as string,
              timezone_offset: data.oneCallResponse.timezone_offset as number,
            },
      }));
    },
    onError: (error) => {
      console.error("Error fetching weather data:", error);
    },
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
    if (geoLocation) refetch();
  };

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
