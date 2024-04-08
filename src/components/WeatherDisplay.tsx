import React from 'react';

interface WeatherDisplayProps {
    city: string;
    temperature: number;
    description: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city, temperature, description }) => {
    return (
        <div className="mb-8 bg-gray-100 p-6 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Weather for {city}</h2>
            <div className="flex justify-between items-center">
                <p className="text-lg">Temperature: {temperature}°C</p>
                <p className="text-lg">{description}</p>
            </div>
        </div>
    );
};

export default WeatherDisplay;
