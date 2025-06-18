import { WiDaySunny, WiNightClear } from 'react-icons/wi';
import { motion } from 'framer-motion';

interface WeatherMainCardProps {
    temp?: string;
    city?: string;
    className?: string;
    isDay?: boolean;
}

const WeatherMainCard: React.FC<WeatherMainCardProps> = ({ temp, city, className, isDay }) => {
    return (
        <motion.div
            initial={{ backdropFilter: 'blur(0px)', opacity: 0 }}
            animate={{ backdropFilter: 'blur(8px)', opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`bg-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center ${className}`}
            style={{ WebkitBackdropFilter: 'blur(8px)' }}
        >
            {isDay ? (
                <WiDaySunny size={64} className="text-yellow-300 mb-4" />
            ) : (
                <WiNightClear size={64} className="text-yellow-300 mb-4" />
            )}
            <h2 className="text-5xl font-bold">{temp}</h2>
            <p className="text-xl mt-2">{city}</p>
        </motion.div>
    );
};

export default WeatherMainCard;