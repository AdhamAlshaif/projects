import { useEffect, useState } from "react";
import WeatherRow from "./components/WeatherRow";

const cities = [
  "New York",
  "Tokyo",
  "Cairo",
  "Paris",
  "Mumbai",
  "Sydney",
  "Toronto",
  "Rio",
  "Moscow",
  "Cape Town",
];

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      const responses = await Promise.all(
        cities.map((city) =>
          fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}`)
            .then((res) => res.json())
        )
      );

      const parsed = responses.map((entry) => entry.data?.[0]).filter(Boolean);
      setWeatherData(parsed);
      setLoading(false);
    };

    fetchWeather().catch((err) => {
      console.error("Weather fetch failed:", err);
      setLoading(false);
    });
  }, []);

  const uniqueConditions = [...new Set(weatherData.map((item) => item.weather.description))];

  const filteredWeather = weatherData.filter((item) => {
    const matchesSearch = item.city_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCondition =
      conditionFilter === "" || item.weather.description === conditionFilter;
    return matchesSearch && matchesCondition;
  });

  if (loading) return <p>Loading weather data...</p>;

  return (
    <div className="dashboard">

      <input
        type="text"
        placeholder="Search by city..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <select
        value={conditionFilter}
        onChange={(e) => setConditionFilter(e.target.value)}
        className="filter-dropdown"
      >
        <option value="">All Conditions</option>
        {uniqueConditions.map((condition, index) => (
          <option key={index} value={condition}>
            {condition}
          </option>
        ))}
      </select>

      <div className="summary-stats">
        <p>Total Cities: {filteredWeather.length}</p>
        <p>
          Average Temperature:{" "}
          {filteredWeather.length > 0
            ? (
                filteredWeather.reduce((sum, item) => sum + item.temp, 0) /
                filteredWeather.length
              ).toFixed(1)
            : "N/A"}°C
        </p>
        <p>
          Temperature Range:{" "}
          {filteredWeather.length > 0
            ? `${Math.min(...filteredWeather.map((item) => item.temp)).toFixed(1)}°C – ${Math.max(
                ...filteredWeather.map((item) => item.temp)
              ).toFixed(1)}°C`
            : "N/A"}
        </p>
      </div>

      {filteredWeather.length === 0 ? (
        <p>No cities match your criteria.</p>
      ) : (
        filteredWeather.map((data, index) => (
          <WeatherRow key={index} data={data} />
        ))
      )}
    </div>
  );
}

export default App;