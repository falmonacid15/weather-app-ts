import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Location } from "@/types/LocationType";
import { UVIndex } from "../UvIndex";
import { useTranslation } from "react-i18next";
import WeatherIcon from "../WeatherIcon";
import { Current as CurrentData, Daily } from "@/interfaces/OneCallApiResponse";
import { formatUnixTimestamp } from "@/lib/dateFormatter";
import { Save } from "lucide-react";
import { motion } from "framer-motion";
import { useWeatherAppStore } from "@/stores/WeatherAppStore";
import toast from "react-hot-toast";

interface WeatherCardProps {
  currentData: CurrentData | null;
  dailyData: Daily[] | null;
  location: Location | null;
  className?: string;
}

export default function CurrentCard({
  className,
  location,
  currentData,
  dailyData,
}: WeatherCardProps) {
  const getWeatherIcon = () => {
    const condition = currentData?.weather[0].icon as string;
    return (
      <WeatherIcon iconCode={condition} variant="line" className="w-48 h-48" />
    );
  };

  const { t } = useTranslation();
  const { addLocation, currentUnit } = useWeatherAppStore();

  const handleSaveLocation = (location: Location) => {
    toast.success("Location added successfully");
    addLocation(location);
  };

  return (
    <Card
      className={cn(
        "p-6 backdrop-blur-sm bg-card shadow-lg rounded-xl",
        "border hover:shadow-xl transition-shadow",
        "w-full max-w-md mx-auto flex flex-col justify-between",
        className
      )}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-primary">{location?.name}</h1>
          <motion.div
            whileHover={{
              scale: 1.09,
              animation: "ease-in-out",
            }}
            whileTap={{
              scale: 0.9,
              animation: "ease-in-out",
            }}
            onClick={() => handleSaveLocation(location as Location)}
          >
            <Save className={cn("text-foreground", className)} />
          </motion.div>
        </div>
        <p className="text-sm text-foreground/60">
          {location?.region}, {location?.country}
        </p>
        <p className="text-xs text-gray-500 text-start">
          {t("lastUpdated")}:{" "}
          {formatUnixTimestamp(
            currentData?.dt as number,
            location?.timezone as string,
            "HH:mm"
          )}
        </p>
      </div>
      <div className="flex">
        {getWeatherIcon()}
        <div className="flex flex-col items-start justify-center">
          <div className="flex flex-col">
            <h2 className="text-5xl font-extrabold text-primary text-start">
              {Math.round(currentData?.temp as number)}
              {currentUnit === "metric" ? "°C" : "°F"}
            </h2>
            <p className="text-xs text-foreground/50 text-start">
              {t("feelsLike")} {Math.round(currentData?.feels_like as number)}
              {currentUnit === "metric" ? "°C" : "°F"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-medium text-foreground/100 text-start capitalize">
              {currentData?.weather[0].description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly mb-6">
        <div className="flex items-center gap-2">
          <img
            src="/icons/misc/thermometer-colder.svg"
            alt={`Weather icon`}
            className={`w-12 h-12`}
          />
          <div>
            <p className="text-foreground/40 text-xs max-w-24">
              {t("tempMin")}
            </p>
            <p className="font-semibold text-lg">
              {Math.round(dailyData[0].temp.min as number)}
              {currentUnit === "metric" ? "°C" : "°F"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="/icons/misc/thermometer-warmer.svg"
            alt={`Weather icon`}
            className={`w-14 h-14`}
          />
          <div>
            <p className="text-foreground/40 text-xs max-w-24">
              {t("tempMax")}
            </p>
            <p className="font-semibold text-lg">
              {Math.round(dailyData[0].temp.max as number)}
              {currentUnit === "metric" ? "°C" : "°F"}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-2 place-items-center">
        <div className="flex flex-col items-center justify-center">
          <img
            src="/icons/misc/wind.svg"
            alt={`Weather icon`}
            className={`w-14 h-14`}
          />
          <div>
            <p className="text-foreground/40 text-center">{t("wind")}</p>
            <p className="font-medium text-center">
              {Math.round(currentData?.wind_speed as number)} km/h
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src="/icons/misc/humidity.svg"
            alt={`Weather icon`}
            className={`w-14 h-14`}
          />
          <div>
            <p className="text-foreground/40 text-center">{t("humidity")}</p>
            <p className="font-medium text-center">{currentData?.humidity}%</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src="/icons/misc/barometer.svg"
            alt={`Weather icon`}
            className={`w-14 h-14`}
          />
          <div>
            <p className="text-foreground/40 text-center">{t("pressure")}</p>
            <p className="font-medium text-center">
              {currentData?.pressure} mb
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src="/icons/misc/raindrops.svg"
            alt={`Weather icon`}
            className={`w-14 h-14`}
          />
          <div>
            <p className="text-foreground/40 text-center">
              {t("precipitations")}
            </p>
            <p className="font-medium text-center">
              {Math.round(dailyData[0].pop || 0 * 100)} %
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <img
              src="/icons/misc/sunrise.svg"
              alt={`Weather icon`}
              className={`w-16 h-16`}
            />
            <div>
              <p className="text-gray-600">{t("sunrise")}</p>
              <p className="font-medium">
                {formatUnixTimestamp(
                  currentData?.sunrise as number,
                  location.timezone,
                  "HH:mm"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/icons/misc/sunset.svg"
              alt={`Weather icon`}
              className={`w-16 h-16`}
            />
            <div>
              <p className="text-gray-600">{t("sunset")}</p>
              <p className="font-medium">
                {formatUnixTimestamp(
                  currentData?.sunset as number,
                  location.timezone,
                  "HH:mm"
                )}
              </p>
            </div>
          </div>
        </div>
        <UVIndex value={Math.round(currentData?.uvi as number)} />
      </div>
    </Card>
  );
}
