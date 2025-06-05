import React from 'react';

interface WeatherInfoTileProps {
    icon: React.ReactNode;
    value: string;
    label: string;
    className?: string;
}

const WeatherInfoTile: React.FC<WeatherInfoTileProps> = ({ icon, value, label, className }) => {
    return (
        <div className={`backdrop-blur-sm bg-white/10 rounded-xl p-4 flex items-center gap-4 ${className}`}>
            {icon}
            <div>
                <p className="text-sm text-white">{value}</p>
                <p className="text-lg font-semibold">{label}</p>
            </div>
        </div>
    );
};


export default WeatherInfoTile;
