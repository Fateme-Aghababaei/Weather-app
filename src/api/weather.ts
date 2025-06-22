import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherByCity = async (city: string) => {
    const response = await axios.get(BASE_URL, {
        params: {
            q: city,
            APPID: API_KEY,
            units: 'metric',
        },
    });

    return response.data;
};
