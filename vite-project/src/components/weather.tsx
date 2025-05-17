import React from "react";
import { useState, useEffect } from "react";
import "./weather.css"

const Weather = () => {
  const [weather, setWeather] = useState<{ temperature: number; windspeed: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latitude, setLatitude] = useState("50.16"); // Domyślne współrzędne (np. Kraków)
  const [longitude, setLongitude] = useState("19.01");

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeather(data.current_weather);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []); // Pobierz dane przy pierwszym renderze

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(); // Pobierz dane po zmianie lokalizacji
  };

  return (
    <div className="weather-container">
      <h1>Aktualna Pogoda</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Szerokość geograficzna:
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Długość geograficzna:
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Pobierz pogodę</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weather && (
        <div className="weather-info">
          <p>Temperatura: {weather.temperature}°C</p>
          <p>Wiatr: {weather.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
};

export default Weather;