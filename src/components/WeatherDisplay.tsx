import React, { useState } from 'react';

interface WeatherDisplayProps {
    city: string;
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    uvIndex: number;
    forecast: string;
    visibility: number; // Add visibility property
    airPressure: number; // Add air pressure property
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city, temperature, description, humidity, windSpeed, uvIndex, forecast, visibility, airPressure }) => {
    const [showForecast, setShowForecast] = useState(false);

    const toggleForecast = () => {
        setShowForecast(!showForecast);
    };

    return (
        <div className="mb-8 bg-gray-100 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Weather for <span className="text-blue-500">{city}</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-b-2 border-gray-200 pb-2">
                    <p className="text-lg">Temperature: {temperature}°C</p>
                    <p className="text-lg">Description: {description}</p>
                    <p className="text-lg">Humidity: {humidity}%</p>
                    <p className="text-lg">Wind Speed: {windSpeed} m/s</p>
                </div>
                <div className="border-b-2 border-gray-200 pb-2">
                    <p className="text-lg">Visibility: {visibility} km</p>
                    <p className="text-lg">UV Index: {uvIndex}</p>
                    <p className="text-lg">Air Pressure: {airPressure} hPa</p>
                </div>
            </div>
           
        </div>
    );
};

export default WeatherDisplay;
