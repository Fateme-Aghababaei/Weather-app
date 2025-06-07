import { useState } from 'react';
import {
  WiStrongWind,
  WiHumidity,
  WiDaySunny,
  WiBarometer,
  WiDirectionUp,
  WiDirectionRight,
} from 'react-icons/wi';

import SearchBar from './components/SearchBar';
import WeatherMainCard from './components/WeatherMainCard';
import WeatherInfoTile from './components/WeatherInfoTile';
import { fetchWeatherByCity } from './api/weather';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);

  const handleSearch = async () => {
    if (city) {
      try {
        const data = await fetchWeatherByCity(city);
        setWeatherData(data);
        console.log(data); // Inspect structure
      } catch (error) {
        alert('City not found or API error');
      }
    }
  };

  // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     handleSearch();
  //   }
  // };


  return (
    <div className="relative bg-[url('./assets/background6.jpg')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen w-screen text-white">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Actual content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-shadow-md">Find Your Weather</h1>

        <SearchBar city={city} onCityChange={setCity} onSearch={handleSearch} />

        {weatherData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl px-4">
            <WeatherMainCard
              className="col-span-2 row-span-3"
              temp={`${Math.round(weatherData.main.temp)}°C`}
              city={`${weatherData.name} (${weatherData.sys.country})`}
            />

            <WeatherInfoTile
              icon={<WiStrongWind className="text-3xl text-yellow-300" />}
              label="Wind Speed"
              value={`${weatherData.wind.speed} km/h`}
            />
            <WeatherInfoTile
              icon={<WiHumidity className="text-3xl text-yellow-300" />}
              label="Humidity"
              value={`${weatherData.main.humidity}%`}
            />
            <WeatherInfoTile
              icon={<WiDaySunny className="text-3xl text-yellow-300" />}
              label="Condition"
              value={weatherData.weather[0].description}
            />
            <WeatherInfoTile
              icon={<WiBarometer className="text-3xl text-yellow-300" />}
              label="Pressure"
              value={`${weatherData.main.pressure} hPa`}
            />
            <WeatherInfoTile
              icon={<WiDirectionUp className="text-3xl text-yellow-300" />}
              label="Latitude"
              value={`${weatherData.coord.lat.toFixed(2)}°`}
            />
            <WeatherInfoTile
              icon={<WiDirectionRight className="text-3xl text-yellow-300" />}
              label="Longitude"
              value={`${weatherData.coord.lon.toFixed(2)}°`}
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
