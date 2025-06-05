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

function App() {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city) {
      // TODO: Fetch weather data
    }
  };

  return (
    <div className="bg-[url('./assets/background6.jpg')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen w-screen text-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-shadow-md">Find Your Weather</h1>

        <SearchBar city={city} onCityChange={setCity} onSearch={handleSearch} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl px-4">
          <WeatherMainCard className="col-span-2 row-span-3" />

          <WeatherInfoTile
            icon={<WiStrongWind className="text-3xl text-yellow-300" />}
            label="Wind Speed"
            value="4.04km/h"
          />
          <WeatherInfoTile
            icon={<WiHumidity className="text-3xl text-yellow-300" />}
            label="Humidity"
            value="11%"
          />
          <WeatherInfoTile
            icon={<WiDaySunny className="text-3xl text-yellow-300" />}
            label="Condition"
            value="clear sky"
          />
          <WeatherInfoTile
            icon={<WiBarometer className="text-3xl text-yellow-300" />}
            label="Pressure"
            value="995 / hPa"
          />
          <WeatherInfoTile
            icon={<WiDirectionUp className="text-3xl text-yellow-300" />}
            label="Latitude"
            value="31°"
          />
          <WeatherInfoTile
            icon={<WiDirectionRight className="text-3xl text-yellow-300" />}
            label="Longitude"
            value="73°"
          />
        </div>

      </div>
    </div>
  );
}

export default App;
