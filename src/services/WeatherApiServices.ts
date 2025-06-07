import {
  autoCompleteCityUrlBase,
  forecastUrlBase,
} from "@/constants/weather-api";
import { ForecastWeatherResponse } from "@/interfaces/ForecastWeatherResponseInterface";
import axios from "axios";

export const autoCompleteSearch = async (search: string) => {
  try {
    const response = await axios.get(
      `${autoCompleteCityUrlBase}?key=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&q=${search}&lang=${"es"}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const fetchWeatherForecast = async (city: string) => {
  try {
    const response = await axios.get<ForecastWeatherResponse>(
      `${forecastUrlBase}?key=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&q=${city}&days=3&lang=${"en"}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
