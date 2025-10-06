import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-12">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={isLoading}
            className="h-14 pl-5 pr-5 text-lg shadow-card transition-smooth hover:shadow-hover focus:shadow-hover border-primary/20"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !city.trim()}
          className="h-14 px-8 gradient-sakura hover:shadow-hover transition-smooth disabled:opacity-50"
        >
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
