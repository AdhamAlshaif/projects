import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import WeatherRow from "./components/WeatherRow";
import WeatherDetail from "./components/WeatherDetail";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

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
          fetch(
            `https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}`
          ).then((res) => res.json())
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

  const uniqueConditions = [
    ...new Set(weatherData.map((item) => item.weather.description)),
  ];

  const filteredWeather = weatherData.filter((item) => {
    const matchesSearch = item.city_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCondition =
      conditionFilter === "" || item.weather.description === conditionFilter;
    return matchesSearch && matchesCondition;
  });

  if (loading) return <p>Loading weather data...</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {/* Left: Dashboard content */}
              <div style={{ flex: 2, marginRight: "2rem" }}>
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

              {/* Right: Charts stacked vertically */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2rem" }}>
                {/* Chart 1: Bar chart of temperature by city */}
                <div>
                  <h3>Temperature by City</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={filteredWeather}>
                      <XAxis dataKey="city_name" />
                      <YAxis label={{ value: "°C", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Bar dataKey="temp" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Chart 2: Pie chart of weather condition distribution */}
                <div>
                  <h3>Weather Condition Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={
                          Object.entries(
                            filteredWeather.reduce((acc, item) => {
                              acc[item.weather.description] =
                                (acc[item.weather.description] || 0) + 1;
                              return acc;
                            }, {})
                          ).map(([name, value]) => ({ name, value }))
                        }
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#82ca9d"
                        label
                      >
                        {filteredWeather.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={[
                              "#8884d8",
                              "#82ca9d",
                              "#ffc658",
                              "#ff8042",
                              "#8dd1e1",
                              "#a4de6c",
                              "#d0ed57",
                              "#8884d8",
                              "#d0ed57",
                              "#ffc658",
                            ][index % 10]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/weather/:city"
          element={<WeatherDetail weatherData={weatherData} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;