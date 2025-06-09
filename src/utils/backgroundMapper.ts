// import { WeatherCondition } from './types';

export const getBackgroundImage = (weatherId: number, isDay: boolean): string => {
    // Thunderstorms
    if (weatherId >= 200 && weatherId < 300) {
        return isDay ? '/assets/Ash.jpg' : '/assets/background1.jpg';
    }

    // Drizzle/Rain
    if (weatherId >= 300 && weatherId < 600) {
        return isDay ? '/assets/background2.jpg' : '/assets/Clear.jpg';
    }

    // Snow
    if (weatherId >= 600 && weatherId < 700) {
        return isDay ? '/assets/Clouds.jpg' : '/assets/Drizzle.jpg';
    }

    // Atmosphere (Fog/Mist/etc)
    if (weatherId >= 700 && weatherId < 800) {
        return '/assets/Fog.jpg'; // Same for day/night
    }

    // Clear sky
    if (weatherId === 800) {
        return isDay ? '/assets/Sand.jpg' : '/assets/Mist.jpg';
    }

    // Clouds
    if (weatherId > 800 && weatherId < 900) {
        return isDay ? '/assets/Tornado.jpg' : '/assets/Snow.jpg';
    }

    // Default fallback
    return '/assets/background6.jpg';
};