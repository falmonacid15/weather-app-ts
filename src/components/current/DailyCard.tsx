import { cn } from "@/lib/utils";

import { Daily } from "@/interfaces/OneCallApiResponse";
import { useTranslation } from "react-i18next";
import { formatUnixTimestamp } from "@/lib/dateFormatter";
import WeatherIcon from "../WeatherIcon";
import { useWeatherAppStore } from "@/stores/WeatherAppStore";

interface Props {
  daily: Daily;
  className?: string;
}

export default function DailyWeatherCard({ daily, className }: Props) {
  const { currentUnit } = useWeatherAppStore();
  const { t } = useTranslation();
  const getWeatherIcon = () => {
    const condition = daily.weather[0].icon;
    return (
      <WeatherIcon iconCode={condition} variant="line" className="w-12 h-12" />
    );
  };
  return (
    <Card
      className={cn(
        "p-2 backdrop-blur-sm bg-background shadow-lg rounded-xl",
        "border hover:shadow-xl transition-shadow w-full",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          {getWeatherIcon()}
          <div>
            <p className="text-xs text-foreground/40">
              {formatUnixTimestamp(daily?.dt as number, "", "dd-MM-yyyy")}
            </p>
            <h2 className="text-3xl font-extrabold text-primary">
              {Math.round(daily.temp.day)}
              {currentUnit === "metric" ? "°C" : "°F"}
            </h2>
            <p className="text-xs font-medium text-foreground/90 capitalize">
              {daily.weather[0].description}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex space-x-4">
              <div className="flex items-center gap-2">
                <img
                  src="/icons/misc/sunrise.svg"
                  alt={`Weather icon`}
                  className="w-8 h-8"
                />
                <div className="min-w-0">
                  <p className="text-foreground/40 truncate text-xs">
                    {t("sunrise")}
                  </p>
                  <p className="font-medium truncate text-sm">
                    {formatUnixTimestamp(daily.sunrise as number, "", "HH:mm")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/icons/misc/sunrise.svg"
                  alt={`Weather icon`}
                  className="w-8 h-8"
                />
                <div className="min-w-0">
                  <p className="text-foreground/40 truncate text-xs">
                    {t("sunrise")}
                  </p>
                  <p className="font-medium truncate text-sm">
                    {formatUnixTimestamp(daily.sunrise as number, "", "HH:mm")}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/icons/misc/raindrops.svg"
                alt={`Weather icon`}
                className="w-8 h-8"
              />
              <div className="min-w-0">
                <p className="text-foreground/40 truncate text-xs">
                  {t("precipitations")}
                </p>
                <p className="font-medium truncate text-sm">
                  {Math.round(daily.pop * 100)} %
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/icons/misc/thermometer-colder.svg"
                alt={`Weather icon`}
                className="w-8 h-8"
              />
              <div>
                <p className="text-foreground/40 text-xs whitespace-nowrap">
                  {t("tempMin")}
                </p>
                <p className="font-semibold text-sm">
                  {Math.round(daily.temp.min as number)}
                  {currentUnit === "metric" ? "°C" : "°F"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/icons/misc/thermometer-warmer.svg"
                alt={`Weather icon`}
                className="w-8 h-8"
              />
              <div>
                <p className="text-foreground/40 text-xs whitespace-nowrap">
                  {t("tempMax")}
                </p>
                <p className="font-semibold text-sm">
                  {Math.round(daily.temp.max as number)}
                  {currentUnit === "metric" ? "°C" : "°F"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <img
            src="/icons/misc/wind.svg"
            alt={`Weather icon`}
            className="w-8 h-8"
          />
          <div className="min-w-0">
            <p className="text-foreground/40 truncate">{t("wind")}</p>
            <p className="font-medium truncate">{daily.wind_speed} km/h</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="/icons/misc/humidity.svg"
            alt={`Weather icon`}
            className="w-8 h-8"
          />
          <div className="min-w-0">
            <p className="text-foreground/40 truncate">{t("humidity")}</p>
            <p className="font-medium truncate">{daily.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="/icons/misc/barometer.svg"
            alt={`Weather icon`}
            className="w-8 h-8"
          />
          <div className="min-w-0">
            <p className="text-foreground/40 truncate">{t("pressure")}</p>
            <p className="font-medium truncate">{daily.pressure} hPa</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

const Card = ({
  children,
  className,
}: {
  children: any;
  className?: string;
}) => {
  return (
    <div className={cn(" rounded-lg shadow-md", className)}>{children}</div>
  );
};
