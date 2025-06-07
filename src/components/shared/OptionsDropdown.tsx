import { MonitorCog, Moon, Settings, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "../providers/theme-provider";
import { useTranslation } from "react-i18next";
import { useWeatherAppStore } from "@/stores/WeatherAppStore";

export function OptionsDropdown() {
  const { setTheme, theme } = useTheme();
  const { currentUnit, setCurrentUnit } = useWeatherAppStore();

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const changeUnit = (unit: "metric" | "imperial") => {
    setCurrentUnit(unit);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="sr-only">{t("toggleTheme")}</span>
          <Settings strokeWidth={2.5} className="text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex flex-col">
          <h2 className="text-center font-bold">{t("options")}</h2>
          <div className="flex flex-col space-y-1 p-1">
            <p className="text-center text-xs font-light">{t("theme")}</p>
            <div className="flex space-x-2 justify-center">
              <Button
                onClick={() => setTheme("light")}
                size="icon"
                variant={theme === "light" ? "default" : "outline"}
              >
                <Sun strokeWidth={3} />
              </Button>
              <Button
                onClick={() => setTheme("dark")}
                size="icon"
                variant={theme === "dark" ? "default" : "outline"}
              >
                <Moon strokeWidth={3} />
              </Button>
              <Button
                onClick={() => setTheme("system")}
                size="icon"
                variant={theme === "system" ? "default" : "outline"}
              >
                <MonitorCog strokeWidth={3} />
              </Button>
            </div>
          </div>
          <div className="flex flex-col space-y-1 p-1">
            <p className="text-center text-xs font-light">{t("language")}</p>
            <div className="flex space-x-2 justify-center">
              <Button
                onClick={() => changeLanguage("es")}
                size="icon"
                variant={i18n.language === "es" ? "default" : "outline"}
              >
                ES
              </Button>
              <Button
                onClick={() => changeLanguage("en")}
                size="icon"
                variant={i18n.language === "en" ? "default" : "outline"}
              >
                EN
              </Button>
            </div>
          </div>
          <div className="flex flex-col space-y-1 p-1">
            <p className="text-center text-xs font-light">{t("units")}</p>
            <div className="flex space-x-2 justify-center">
              <Button
                onClick={() => changeUnit("metric")}
                size="icon"
                variant={currentUnit === "metric" ? "default" : "outline"}
              >
                °C
              </Button>
              <Button
                onClick={() => changeUnit("imperial")}
                size="icon"
                variant={currentUnit === "imperial" ? "default" : "outline"}
              >
                °F
              </Button>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
