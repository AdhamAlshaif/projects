import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function WeatherDetail({ weatherData }) {
  const { city } = useParams();
  const navigate = useNavigate();

  const cityData = weatherData.find(
    (item) => item.city_name.toLowerCase() === city.toLowerCase()
  );

  if (!cityData) {
    return (
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
        <p>City not found.</p>
      </div>
    );
  }

  return (
    <div className="weather-detail">
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{cityData.city_name} Weather Details</h2>
      <p><strong>Temperature:</strong> {cityData.temp}°C</p>
      <p><strong>Description:</strong> {cityData.weather.description}</p>
      <p><strong>Humidity:</strong> {cityData.rh}%</p>
      <p><strong>Wind Speed:</strong> {cityData.wind_spd} m/s</p>
      <p><strong>Pressure:</strong> {cityData.pres} mb</p>
    </div>
  );
}

export default WeatherDetail;