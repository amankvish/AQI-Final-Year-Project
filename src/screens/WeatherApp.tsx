import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import CityList from '../components/CityList';
import WeatherDisplay from '../components/WeatherDisplay';
import { fetchWeatherDataByCoordinates, fetchWeatherDataByCity } from '../screens/weatherApi';


const WeatherApp: React.FC = () => {
    const [cities, setCities] = useState<string[]>([]);
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch weather data for user's current location when component mounts
        const fetchWeatherByUserLocation = async () => {
            try {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords;
                            const data = await fetchWeatherDataByCoordinates(latitude, longitude);
                            setWeatherData(data);
                        },
                        (error) => {
                            console.error('Error getting current location:', error);
                            setError('Error getting current location');
                        }
                    );
                } else {
                    console.error('Geolocation is not supported by this browser.');
                    setError('Geolocation is not supported by this browser.');
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setError('Error fetching weather data');
            }
        };

        fetchWeatherByUserLocation();
    }, []);

    const handleSearch = async (query: string) => {
        try {
            const data = await fetchWeatherDataByCity(query);
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Error fetching weather data');
        }
    };

    return (
        <div className="container mx-auto flex-grow py-8">
            <h1 className="text-4xl font-bold mb-4 text-center">Weather Forecast App</h1>
            <div className="flex flex-col items-center">
                <SearchBar onSearch={handleSearch} />
                {error && <p className="text-red-500">{error}</p>}
                {weatherData && (
                    <WeatherDisplay
                        city={weatherData.name}
                        temperature={weatherData.main.temp}
                        description={weatherData.weather[0].description}
                    />
                )}
            </div>
            <CityList cities={cities} />
        </div>
    );
};

export default WeatherApp;
