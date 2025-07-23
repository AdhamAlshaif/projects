import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function WeatherRow({ data }) {
  return (
    <Link
      to={`/weather/${data.city_name}`}
      className="weather-row"
      style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
    >
      <span><strong>{data.city_name}</strong></span>
      <span>Temp: {data.temp}°C</span>
      <span>{data.weather.description}</span>
    </Link>
  );
}

export default WeatherRow;