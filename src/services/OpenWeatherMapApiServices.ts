import {
  baseUrlFindCities,
  baseUrlOneCall,
} from "@/constants/openweathermap-api";
import { autoCompleteCityUrlBase } from "@/constants/weather-api";
import { FindCitiesApiResponse } from "@/interfaces/FindCitiesApiResponse";
import { OneCallApiResponse } from "@/interfaces/OneCallApiResponse";
import { City } from "@/types/CityType";
import axios from "axios";

export const autoCompleteFindCities = async (search: string) => {
  try {
    const response = await axios.get<FindCitiesApiResponse>(
      `${baseUrlFindCities}?appid=${
        import.meta.env.VITE_OPENWEATHERMAP_API_KEY
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

export const oneCallFetchWeather = async (
  lat: number,
  lon: number,
  lang: string,
  units: "metric" | "imperial" | "standard"
) => {
  try {
    const { data: oneCallResponse } = await axios.get<OneCallApiResponse>(
      `${baseUrlOneCall}?appid=${
        import.meta.env.VITE_OPENWEATHERMAP_API_KEY
      }&lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`
    );

    const { data: locationResponse } = await axios.get<City[]>(
      `${autoCompleteCityUrlBase}?key=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&q=${lat},${lon}&lang=${"es"}`
    );
    return {
      oneCallResponse,
      locationResponse,
    };
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
