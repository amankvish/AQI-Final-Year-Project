import React, { useState, useEffect } from "react";

interface WeatherData {
  temperature: { value: number; unit: "celsius" | "fahrenheit" };
  description: string;
  iconId: string;
  city: string;
  country: string;
  windSpeed: number;
  humidity: number;
  uvIndex: number;
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: { value: 0, unit: "celsius" },
    description: "",
    iconId: "unknown",
    city: "",
    country: "",
    windSpeed: 0,
    humidity: 0,
    uvIndex: 0,
  });
  const [forecast, setForecast] = useState<any[]>([]);
  const [showForecast, setShowForecast] = useState(false);
  const iconBaseUrl = "https://openweathermap.org/img/wn/";
  const key = "82005d27a116c2880c8f0fcb866998a0"; // Your API key

  useEffect(() => {
    const fetchData = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherByCoordinates(latitude, longitude);
          },
          (error) => console.error("Error getting location:", error)
        );
      } else {
        console.error("Browser doesn't support Geolocation");
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWeatherByCoordinates = async (latitude: number, longitude: number) => {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
    try {
      const response = await fetch(api);
      const data = await response.json();
      updateWeather(data);
      fetchForecastByCoordinates(latitude, longitude);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchForecastByCoordinates = async (latitude: number, longitude: number) => {
    const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
    try {
      const response = await fetch(api);
      const data = await response.json();
      setForecast(data.list.slice(0, 5)); // Set only the first 5 forecast items
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const updateWeather = (data: any) => {
    if (data.cod === "404") {
      console.error("City not found:", data.message);
      return;
    }
    setWeather({
      temperature: { value: data.main.temp, unit: "celsius" },
      description: data.weather[0].description,
      iconId: data.weather[0].icon,
      city: data.name,
      country: data.sys.country,
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,
      uvIndex: 5, // Dummy value for demonstration
    });
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const searchQuery = formData.get("search") as string;
    if (searchQuery) {
      const isIndianPINCode = /^[1-9][0-9]{5}$/.test(searchQuery);
      if (isIndianPINCode) {
        await fetchWeatherByPinCode(searchQuery);
      } else {
        await fetchWeatherByCity(searchQuery);
      }
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    try {
      const response = await fetch(api);
      const data = await response.json();
      updateWeather(data);
      fetchForecastByCity(city);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchWeatherByPinCode = async (pincode: string) => {
    const api = `https://api.openweathermap.org/data/2.5/weather?zip=${pincode},in&appid=${key}&units=metric`;
    try {
      const response = await fetch(api);
      const data = await response.json();
      updateWeather(data);
      fetchForecastByPinCode(pincode);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchForecastByCity = async (city: string) => {
    const api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`;
    try {
      const response = await fetch(api);
      const data = await response.json();
      setForecast(data.list.slice(0, 5)); // Set only the first 5 forecast items
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const fetchForecastByPinCode = async (pincode: string) => {
    const api = `https://api.openweathermap.org/data/2.5/forecast?zip=${pincode},in&appid=${key}&units=metric`;
    try {
      const response = await fetch(api);
      const data = await response.json();
      setForecast(data.list.slice(0, 5)); // Set only the first 5 forecast items
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const toggleForecast = () => {
    setShowForecast(!showForecast);
  };

  const celsiusToFahrenheit = (celsius: number) => {
    return Math.round((celsius * 9) / 5 + 32);
  };

  return (
    <main>
      <div className="weather-container">
        <form onSubmit={handleSearch} className="form-container">
          <input
            type="text"
            name="search"
            placeholder="Enter city name or Indian PIN code"
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          >
            Search
          </button>
        </form>
        <div className="weather-info">
          {weather.city ? (
            <>
              <img
                src={`${iconBaseUrl}${weather.iconId}@2x.png`}
                alt="Weather Icon"
                className="mx-auto mb-4"
              />
              <div className="text-4xl font-bold mb-2">{weather.temperature.value}°C</div>
              <div className="mb-2">{weather.description}</div>
              <div className="mb-4">
                {weather.city}, {weather.country}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>Wind Speed: {weather.windSpeed} m/s</div>
                <div>Humidity: {weather.humidity}%</div>
                <div>UV Index: {weather.uvIndex}</div>
              </div>
            </>
          ) : (
            <p className="text-center">Enter a city name or Indian PIN code to see the weather</p>
          )}
        </div>
        <div className="forecast-container">
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 mb-4"
            onClick={toggleForecast}
          >
            Show 5-Day Forecast
          </button>
          {showForecast && (
            <>
              <h2 className="text-xl font-bold mb-2">Upcoming 5-Day Forecast:</h2>
              <div className="forecast-grid">
                {forecast.map((item, index) => (
                  <div key={index} className="forecast-item">
                    <div className="day">
                      {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </div>
                    <img src={`${iconBaseUrl}${item.weather[0].icon}@2x.png`} alt="Weather Icon" />
                    <div className="description">{item.weather[0].description}</div>
                    <div className="temperature">{item.main.temp}°C</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Weather;
