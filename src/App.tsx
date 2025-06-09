import { useState } from 'react';
import {
  WiStrongWind,
  WiHumidity,
  WiDaySunny,
  WiNightClear,
  WiBarometer,
  WiDirectionUp,
  WiDirectionRight,
  WiCloudy,
  WiNightCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog
} from 'react-icons/wi';

import SearchBar from './components/SearchBar';
import WeatherMainCard from './components/WeatherMainCard';
import WeatherInfoTile from './components/WeatherInfoTile';
import { fetchWeatherByCity } from './api/weather';
import { getBackgroundImage } from './utils/backgroundMapper';
import { motion } from 'framer-motion';

function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [backgroundImage, setBackgroundImage] = useState('/assets/background2.jpg');

  const handleSearch = async (cityToSearch: string) => {
    if (cityToSearch) {
      try {
        const data = await fetchWeatherByCity(cityToSearch);
        setWeatherData(data);

        // Update background based on weather
        const isDay = isDayTime(
          data.sys.sunrise,
          data.sys.sunset,
          data.timezone
        );
        // const newBg = getBackgroundImage(data.weather[0].id, isDay);
        // setBackgroundImage(newBg);
      } catch (error) {
        alert('City not found or API error');
      }
    }
  };

  const isDayTime = (sunrise: number, sunset: number, timezone: number) => {
    const now = Math.floor(Date.now() / 1000); // UTC time in seconds
    const localNow = now + timezone; // Adjust to local time
    return localNow > sunrise && localNow < sunset;
  };

  // Function to get weather icon based on conditions (for condition tile)
  const getConditionIcon = (weatherId: number, isDay: boolean) => {
    // Group weather conditions by ID ranges
    if (weatherId >= 200 && weatherId < 300) return WiThunderstorm;
    if (weatherId >= 300 && weatherId < 400) return WiRain;
    if (weatherId >= 500 && weatherId < 600) return WiRain;
    if (weatherId >= 600 && weatherId < 700) return WiSnow;
    if (weatherId >= 700 && weatherId < 800) return WiFog;

    // Handle clear and cloudy conditions
    if (weatherId === 800) {
      return isDay ? WiDaySunny : WiNightClear;
    }

    if (weatherId > 800 && weatherId < 900) {
      return isDay ? WiCloudy : WiNightCloudy;
    }

    // Default icon
    return isDay ? WiDaySunny : WiNightClear;
  };

  return (
    <div style={{ backgroundImage: `url(/assets/background2.jpg})` }} className="relative bg-cover bg-center bg-no-repeat bg-fixed min-h-screen w-screen text-white">
      <div
        key={backgroundImage} // force re-render when image changes
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: 1,
        }}
      ></div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-shadow-md">Find Your Weather</h1>

        <SearchBar onSearch={handleSearch} />

        {weatherData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl px-4">
            <motion.div
              key={`${weatherData.name}-${Math.round(weatherData.main.temp)}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="col-span-2 row-span-3"
            >
              <WeatherMainCard
                className="h-full"
                temp={`${Math.round(weatherData.main.temp)}°C`}
                city={`${weatherData.name} (${weatherData.sys.country})`}
                isDay={isDayTime(
                  weatherData.sys.sunrise,
                  weatherData.sys.sunset,
                  weatherData.timezone
                )}
              />
            </motion.div>

            <motion.div
              key={weatherData.wind.speed}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WeatherInfoTile
                icon={<WiStrongWind className="text-3xl text-yellow-300" />}
                label="Wind Speed"
                value={`${weatherData.wind.speed} km/h`}
              />
            </motion.div>

            <motion.div
              key={weatherData.main.humidity}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WeatherInfoTile
                icon={<WiHumidity className="text-3xl text-yellow-300" />}
                label="Humidity"
                value={`${weatherData.main.humidity}%`}
              />
            </motion.div>

            <motion.div
              key={weatherData.weather[0].description}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WeatherInfoTile
                icon={(() => {
                  const isDay = isDayTime(
                    weatherData.sys.sunrise,
                    weatherData.sys.sunset,
                    weatherData.timezone
                  );
                  const Icon = getConditionIcon(weatherData.weather[0].id, isDay);
                  return <Icon className="text-3xl text-yellow-300" />;
                })()}
                label="Condition"
                value={weatherData.weather[0].description.charAt(0).toUpperCase() +
                  weatherData.weather[0].description.slice(1)}
              />
            </motion.div>

            <motion.div
              key={weatherData.main.pressure}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WeatherInfoTile
                icon={<WiBarometer className="text-3xl text-yellow-300" />}
                label="Pressure"
                value={`${weatherData.main.pressure} hPa`}
              />
            </motion.div>

            <motion.div
              key={weatherData.coord.lat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WeatherInfoTile
                icon={<WiDirectionUp className="text-3xl text-yellow-300" />}
                label="Latitude"
                value={`${weatherData.coord.lat.toFixed(2)}°`}
              />
            </motion.div>

            <motion.div
              key={weatherData.coord.lon}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WeatherInfoTile
                icon={<WiDirectionRight className="text-3xl text-yellow-300" />}
                label="Longitude"
                value={`${weatherData.coord.lon.toFixed(2)}°`}
              />
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
