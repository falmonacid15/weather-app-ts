import { useTranslation } from "react-i18next";
import CurrentCard from "./components/current/CurrentCard";
import DailyWeatherCard from "./components/current/DailyCard";
import HourlyWeatherCard from "./components/current/HourlyWeatherCard";
import Layout from "./components/shared/Layout";
import { useWeatherAppStore } from "./stores/WeatherAppStore";
import { ScrollContainer } from "./components/ScrollShadow";
import WelcomeMessage from "./components/WelcomeMessage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App: React.FC = () => {
  const { location, currentData, dailyData, hourlyData } = useWeatherAppStore();

  const { t } = useTranslation();

  return (
    <Layout>
      <ReactQueryDevtools />
      <div className="h-[80vh] p-1 md:p-1">
        {currentData && dailyData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <div className="lg:col-span-1 order-1 lg:order-2">
              <CurrentCard
                location={location}
                dailyData={dailyData}
                currentData={currentData}
                className="h-full"
              />
            </div>
            <div className="flex flex-col order-2 lg:order-3">
              <h2 className="text-2xl font-semibold text-primary mb-2">
                {t("hourlyForecast")}
              </h2>
              <ScrollContainer>
                <div className="space-y-2 px-2 py-4">
                  {hourlyData?.slice(0, 24).map((hour, index) => (
                    <HourlyWeatherCard
                      key={index}
                      hourly={hour}
                      className="min-h-[180px]"
                    />
                  ))}
                </div>
              </ScrollContainer>
            </div>
            <div className="flex flex-col order-3 lg:order-1">
              <h2 className="text-2xl font-semibold text-primary mb-2">
                {t("dailyForecast")}
              </h2>
              <ScrollContainer>
                <div className="space-y-2 px-2 py-4">
                  {dailyData.slice(0, 7).map((day, index) => (
                    <DailyWeatherCard
                      key={index}
                      daily={day}
                      className="min-h-[200px]"
                    />
                  ))}
                </div>
              </ScrollContainer>
            </div>
          </div>
        ) : (
          <WelcomeMessage />
        )}
      </div>
    </Layout>
  );
};

export default App;
