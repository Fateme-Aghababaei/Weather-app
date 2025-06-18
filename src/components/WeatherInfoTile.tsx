import React from 'react';
import { motion } from 'framer-motion';

interface WeatherInfoTileProps {
    icon: React.ReactNode;
    value: string;
    label: string;
    className?: string;
}

const WeatherInfoTile: React.FC<WeatherInfoTileProps> = ({ icon, value, label, className }) => {
    return (
        <motion.div
            initial={{ backdropFilter: 'blur(0px)', opacity: 0 }}
            animate={{ backdropFilter: 'blur(6px)', opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`bg-white/10 rounded-xl p-4 flex items-center gap-4 ${className}`}
            style={{ WebkitBackdropFilter: 'blur(6px)' }}
        >
            {icon}
            <div>
                <p className="text-sm text-white">{label}</p>
                <p className="text-lg font-semibold">{value}</p>
            </div>
        </motion.div>
    );
};


export default WeatherInfoTile;
