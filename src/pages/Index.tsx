import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { CloudSun } from "lucide-react";

const API_KEY = "95f4fc2ca4c771c45380ef38bb668212";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_API = "https://api.openweathermap.org/data/2.5/forecast";

interface WeatherData {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load last searched city from localStorage on mount
  useEffect(() => {
    const lastCity = localStorage.getItem("lastSearchedCity");
    if (lastCity) {
      fetchWeather(lastCity);
    }
  }, []);

  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    setWeatherData(null);
    setForecastData([]);

    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `${WEATHER_API}?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) {
        if (weatherResponse.status === 404) {
          throw new Error("City not found. Please check the spelling and try again.");
        }
        throw new Error("Failed to fetch weather data. Please try again.");
      }

      const weather = await weatherResponse.json();
      setWeatherData(weather);

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${FORECAST_API}?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (forecastResponse.ok) {
        const forecast = await forecastResponse.json();
        setForecastData(forecast.list);
      }

      // Save to localStorage
      localStorage.setItem("lastSearchedCity", city);

      toast({
        title: "Weather updated",
        description: `Showing weather for ${weather.name}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CloudSun className="w-12 h-12 text-primary" />
            <h1 className="text-5xl md:text-6xl font-light tracking-wide">
              天気
              <span className="text-3xl md:text-4xl ml-3 text-muted-foreground">
                Weather
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Your calm companion for weather insights
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={fetchWeather} isLoading={isLoading} />

        {/* Content */}
        {isLoading && <LoadingSpinner />}

        {!isLoading && weatherData && (
          <div className="space-y-6 animate-fade-in">
            <WeatherCard data={weatherData} />
            {forecastData.length > 0 && <ForecastCard forecast={forecastData} />}
          </div>
        )}

        {!isLoading && !weatherData && (
          <div className="text-center py-16 animate-fade-in">
            <CloudSun className="w-24 h-24 mx-auto mb-6 text-primary/30" />
            <p className="text-xl text-muted-foreground">
              Search for a city to see the weather
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
