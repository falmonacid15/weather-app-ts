import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Hourly } from "@/interfaces/OneCallApiResponse";
import WeatherIcon from "../WeatherIcon";
import { formatUnixTimestamp } from "@/lib/dateFormatter";
import { useTranslation } from "react-i18next";
import { UVIndex } from "../UvIndex";
import { useWeatherAppStore } from "@/stores/WeatherAppStore";

interface HourlyWeatherCardProps {
  hourly: Hourly;
  className?: string;
}

const HourlyWeatherCard = ({ className, hourly }: HourlyWeatherCardProps) => {
  const { t } = useTranslation();
  const { currentUnit } = useWeatherAppStore();

  const getWeatherIcon = () => {
    const condition = hourly.weather[0].icon;
    return (
      <WeatherIcon iconCode={condition} variant="line" className="w-12 h-12" />
    );
  };

  return (
    <Card
      className={cn(
        "p-4 backdrop-blur-sm bg-background shadow-md rounded-xl",
        "border hover:shadow-lg transition-all duration-200",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getWeatherIcon()}
          <div>
            <h2 className="text-3xl font-extrabold text-primary">
              {Math.round(hourly.temp)}
              {currentUnit === "metric" ? "°C" : "°F"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {t("feelsLike")} {Math.round(hourly.feels_like)}
              {currentUnit === "metric" ? "°C" : "°F"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatUnixTimestamp(hourly?.dt as number, "", "HH:mm")}
          </p>
          <p className="text-sm font-medium capitalize">
            {hourly.weather[0].description}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <img src="/icons/misc/wind.svg" alt={t("wind")} className="w-8 h-8" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">
              {t("wind")}
            </p>
            <p className="font-medium truncate">{hourly.wind_speed} km/h</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="/icons/misc/humidity.svg"
            alt={t("humidity")}
            className="w-8 h-8"
          />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">
              {t("humidity")}
            </p>
            <p className="font-medium truncate">{hourly.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="/icons/misc/barometer.svg"
            alt={t("pressure")}
            className="w-8 h-8"
          />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">
              {t("pressure")}
            </p>
            <p className="font-medium truncate">{hourly.pressure} mb</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="/icons/misc/raindrops.svg"
            alt={t("precipitations")}
            className="w-8 h-8"
          />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">
              {t("precipitations")}
            </p>
            <p className="font-medium truncate">
              {Math.round(hourly.pop * 100)} %
            </p>
          </div>
        </div>
      </div>
      {/* <UVIndex value={Math.round(hourly?.uvi as number)} /> */}
    </Card>
  );
};

export default HourlyWeatherCard;
