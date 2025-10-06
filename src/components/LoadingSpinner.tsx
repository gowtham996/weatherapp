import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
      <p className="text-lg text-muted-foreground">Fetching weather data...</p>
    </div>
  );
};

export default LoadingSpinner;
