import React from 'react';
import '../App.css';
function WeatherRow({ data }) {
  return (
    <div className="weather-row">
      <span><strong>{data.city_name}</strong></span>
      <span>Temp: {data.temp}°C</span>
      <span>{data.weather.description}</span>
    </div>
  );
}

export default WeatherRow;