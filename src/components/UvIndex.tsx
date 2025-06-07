"use client";

import { useTranslation } from "react-i18next";

interface UVIndexProps {
  value: number;
  sunset?: string;
}

export function UVIndex({ value }: UVIndexProps) {
  const uvIndex = Math.round(value);
  const { t } = useTranslation();

  const getRiskLevel = (index: number) => {
    if (index <= 2) return "uvLow";
    if (index <= 5) return "uvModerate";
    if (index <= 7) return "evHigh";
    if (index <= 10) return "evVeryHigh";
    return "Extreme";
  };

  const getIconPath = (index: number) => {
    const clampedIndex = Math.min(Math.max(index, 1), 11);
    return `/icons/openweathermap/uv/uv-index-${clampedIndex}.svg`;
  };

  const level = getRiskLevel(uvIndex);

  const indicatorPosition = `${value * 100}%`;

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-foreground/40 justify-center">
        <span>{t("uvIndex")}</span>
      </div>
      <p className="text-xs text-center mt-2 text-foreground/80">
        {level === "uvLow"
          ? `${t("uvMessageLow")}`
          : `${t("uvMessageProtect")} ${new Date().getHours() + 2}:00.`}
      </p>
      <div className="flex items-center justify-center space-x-2">
        <div className="mb-2 text-center flex flex-col items-center">
          <img
            src={getIconPath(uvIndex) || "/placeholder.svg"}
            alt={`Weather icon`}
            className={`w-16 h-16`}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg text-center">{t(`${level}`)}</span>
          <div className="flex justify-center my-2">
            <div className="relative w-full min-w-24">
              <div className="h-2.5 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-green-400 via-orange-400  to-purple-500" />
              </div>
              <div
                className="w-3 h-3 bg-white rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-1/2 shadow-lg"
                style={{ left: indicatorPosition }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
