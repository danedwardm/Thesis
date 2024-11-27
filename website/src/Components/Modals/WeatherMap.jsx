import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const WeatherMap = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "bc6b104c6841e12e5a0399f7ea0d94f0"; // Replace with your OpenWeatherMap API key
  const WEATHER_API_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    // Fetch weather data
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(WEATHER_API_URL);
        console.log(response); // Log the response to see the structure of the data
        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching weather data:", err); // Log the error message
        setError("Error fetching weather data");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [lat, lon]);

  // Handle loading and error states
  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full flex flex-col items-center rounded-2xl border-2 border-main mb-[5vh]">
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />

        {/* Add OpenWeatherMap weather layers (clouds, precipitation, etc.) */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
          attribution="&copy; <a href='https://openweathermap.org'>OpenWeatherMap</a>"
        />

        {/* You can add more weather layers here, such as:
            - "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png"
            - "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png"
        */}

        {/* Optional: Add a marker for the location */}
        <Marker position={[lat, lon]}>
          <Popup>
            <div>
              <h4>Weather Data</h4>
              <p>Temperature: {weatherData.current.temp}°C</p>
              <p>Weather: {weatherData.current.weather[0].description}</p>
              <p>Humidity: {weatherData.current.humidity}%</p>
              <p>Wind Speed: {weatherData.current.wind_speed} m/s</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
