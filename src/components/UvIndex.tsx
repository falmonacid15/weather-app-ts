"use client";

import { Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

interface UVIndexProps {
  value: number;
  sunset?: string;
}

export function UVIndex({ value }: UVIndexProps) {
  // Convert 0-1 scale to 0-11 UV index scale
  const uvIndex = Math.round(value * 11);
  const { t } = useTranslation();

  // Determine risk level
  const getRiskLevel = (index: number) => {
    if (index <= 2) return "uvLow";
    if (index <= 5) return "uvModerate";
    if (index <= 7) return "evHigh";
    if (index <= 10) return "evVeryHigh";
    return "Extreme";
  };

  const getIconPath = (index: number) => {
    const iconUrl = `${
      index > 0
        ? `/icons/openweathermap/uv/uv-index-${value}.svg`
        : `/icons/openweathermap/uv/uv-index-${1}.svg`
    }`;
    return iconUrl;
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
            {/* Background gradient */}
            <div className="relative w-full min-w-24">
              <div className="h-2.5 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 via-red-500 to-purple-500" />
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
