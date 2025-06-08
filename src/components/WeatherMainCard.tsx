import { WiDaySunny, WiNightClear } from 'react-icons/wi';

interface WeatherMainCardProps {
    temp?: string;
    city?: string;
    className?: string;
    isDay?: boolean;
}

const WeatherMainCard: React.FC<WeatherMainCardProps> = ({
    temp = '40°C',
    city = 'Faisalabad (PK)',
    className = '',
    isDay = true
}) => {
    return (
        <div className={`backdrop-blur-sm bg-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center ${className}`}>
            {isDay ? (
                <WiDaySunny size={64} className="text-yellow-300 mb-4" />
            ) : (
                <WiNightClear size={64} className="text-yellow-300 mb-4" />
            )}
            <h2 className="text-5xl font-bold">{temp}</h2>
            <p className="text-xl mt-2">{city}</p>
        </div>
    );
};

export default WeatherMainCard;