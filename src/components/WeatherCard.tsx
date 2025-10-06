import { Cloud, Droplets, Wind, Thermometer } from "lucide-react";
import { Card } from "@/components/ui/card";

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

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  return (
    <Card className="w-full max-w-2xl mx-auto p-8 shadow-card hover:shadow-hover transition-smooth backdrop-blur-sm bg-card/80 border-primary/20">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-4xl font-semibold mb-2">
          {data.name}, {data.sys.country}
        </h2>
        <p className="text-muted-foreground text-lg capitalize">
          {data.weather[0].description}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
        <div className="flex items-center justify-center">
          <img
            src={weatherIcon}
            alt={data.weather[0].description}
            className="w-32 h-32 drop-shadow-lg"
          />
        </div>
        <div className="text-center md:text-left">
          <div className="text-7xl font-light mb-2">
            {Math.round(data.main.temp)}°C
          </div>
          <div className="text-muted-foreground text-lg">
            Feels like {Math.round(data.main.feels_like)}°C
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/10 transition-smooth hover:bg-primary/20">
          <div className="p-3 rounded-xl bg-card shadow-soft">
            <Cloud className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Condition</p>
            <p className="text-lg font-medium">{data.weather[0].main}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/10 transition-smooth hover:bg-secondary/20">
          <div className="p-3 rounded-xl bg-card shadow-soft">
            <Droplets className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Humidity</p>
            <p className="text-lg font-medium">{data.main.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-accent/10 transition-smooth hover:bg-accent/20">
          <div className="p-3 rounded-xl bg-card shadow-soft">
            <Wind className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Wind Speed</p>
            <p className="text-lg font-medium">{data.wind.speed} m/s</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
