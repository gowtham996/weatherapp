import { Card } from "@/components/ui/card";

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

interface ForecastCardProps {
  forecast: ForecastItem[];
}

const ForecastCard = ({ forecast }: ForecastCardProps) => {
  // Get one forecast per day (at 12:00)
  const dailyForecasts = forecast.filter((item, index) => index % 8 === 0).slice(0, 5);

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 shadow-card hover:shadow-hover transition-smooth backdrop-blur-sm bg-card/80 border-primary/20">
      <h3 className="text-2xl font-semibold mb-6 text-center">5-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecasts.map((item) => {
          const date = new Date(item.dt * 1000);
          const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
          const weatherIcon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

          return (
            <div
              key={item.dt}
              className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 transition-smooth hover:from-primary/20 hover:to-secondary/20"
            >
              <p className="text-sm font-medium mb-2">{dayName}</p>
              <img
                src={weatherIcon}
                alt={item.weather[0].description}
                className="w-16 h-16 mb-2"
              />
              <p className="text-xl font-semibold">{Math.round(item.main.temp)}°C</p>
              <p className="text-xs text-muted-foreground capitalize text-center mt-1">
                {item.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ForecastCard;
