import { Locate } from "lucide-react";
import { Button } from "../ui/button";
import { useWeatherAppStore } from "@/stores/WeatherAppStore";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchWeatherForecast } from "@/services/WeatherApiServices";

export default function GeoLocation() {
  const { setLocation, geoLocation, setGeoLocation } = useWeatherAppStore();

  const { refetch, isFetching } = useQuery({
    queryKey: ["weatherByGeo", geoLocation?.lat, geoLocation?.lon],
    queryFn: () =>
      fetchWeatherForecast(`${geoLocation?.lat},${geoLocation?.lon}`),
    enabled: false,
    onSuccess: (data) => {
      setLocation(data.location);
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
