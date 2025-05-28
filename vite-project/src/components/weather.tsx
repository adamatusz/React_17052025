import React from "react";
import { useState, useEffect, useCallback } from "react";
import "./weather.css";

const Weather = () => {
	const [weather, setWeather] = useState<{
		temperature: number;
		windspeed: number;
	} | null>(null);
	const [location, setLocation] = useState<{
		city: string;
		latitude: string;
		longitude: string;
	}>({
		city: "",
		latitude: "50.50",
		longitude: "19.40",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchCityName = async (lat: string, lon: string) => {
		try {
			// Fetch city name from OpenStreetMap Nominatim API
			const response = await fetch(
				`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
			);
			const data = await response.json();
			return (
				data.address?.city ||
				data.address?.town ||
				data.address?.village ||
				"Unknown location"
			);
		} catch {
			return "Unknown location";
		}
	};

	const fetchWeather = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			// Fetch weather data
			const weatherResponse = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`
			);
			if (!weatherResponse.ok) {
				throw new Error("Failed to fetch weather data");
			}
			const weatherData = await weatherResponse.json();
			setWeather(weatherData.current_weather);

			// Fetch city name
			const cityName = await fetchCityName(
				location.latitude,
				location.longitude
			);
			setLocation(prev => ({ ...prev, city: cityName }));
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "An unknown error occurred"
			);
		} finally {
			setLoading(false);
		}
	// Only re-create fetchWeather when location.latitude or location.longitude changes
	}, [location.latitude, location.longitude]);

	useEffect(() => {
		fetchWeather();	
	}, [fetchWeather]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		fetchWeather();
	};

	return (
		<div className='weather-container'>
			<h1>Aktualna Pogoda</h1>
			{location.city && <h2>{location.city}</h2>}

			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Szerokość geograficzna:
						<input
							type='text'
							value={location.latitude}
							onChange={e =>
								setLocation(prev => ({ ...prev, latitude: e.target.value }))
							}
						/>
					</label>
				</div>
				<div>
					<label>
						Długość geograficzna:
						<input
							type='text'
							value={location.longitude}
							onChange={e =>
								setLocation(prev => ({ ...prev, longitude: e.target.value }))
							}
						/>
					</label>
				</div>
				<button type='submit'>Pobierz pogodę</button>
			</form>

			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{weather && (
				<div className='weather-info'>
					<p>Temperatura: {weather.temperature}°C</p>
					<p>Wiatr: {weather.windspeed} km/h</p>
				</div>
			)}
		</div>
	);
};

export default Weather;
