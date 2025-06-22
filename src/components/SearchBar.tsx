import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import AsyncSelect from 'react-select/async';

interface SearchBarProps {
    onSearch: (city: string) => void;
}

interface CityRow {
    city: string;
    country: string;
    iso2: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [cities, setCities] = useState<CityRow[]>([]);

    useEffect(() => {
        fetch('./data/cities.csv')
            .then(res => res.text())
            .then(csv => {
                const { data } = Papa.parse<CityRow>(csv, {
                    header: true,
                    skipEmptyLines: true,
                });
                setCities(data.filter(row => row.city && row.country));
            });
    }, []);

    const loadOptions = (input: string, callback: (options: any[]) => void) => {
        if (!input) return callback([]);

        const options = cities
            .filter(({ city, country }) =>
                `${city}, ${country}`.toLowerCase().includes(input.toLowerCase())
            )
            .slice(0, 50)
            .map(({ city, country, iso2 }) => ({
                label: `${city}, ${country} (${iso2})`,
                value: city,
            }));

        callback(options);
    };

    const customStyles = {
        control: (base: any, state: any) => ({
            ...base,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(4px)',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '9999px',
            boxShadow: state.isFocused ? '0 0 0 1px rgba(255, 255, 255, 0.3)' : 'none',
            '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
            },
        }),
        singleValue: (base: any) => ({ ...base, color: 'white' }),
        placeholder: (base: any) => ({ ...base, color: 'rgba(255, 255, 255, 0.7)' }),
        input: (base: any) => ({ ...base, color: 'white' }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: 'rgba(30, 30, 30, 0.9)',
            backdropFilter: 'blur(6px)',
            borderRadius: '1rem',
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            color: 'white',
            cursor: 'pointer',
        }),
        indicatorSeparator: () => ({ display: 'none' }),
    };

    return (
        <div className="rounded-xl px-4 py-4 w-full max-w-md mb-10">
            <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions={false}
                onChange={option => option && onSearch(option.value)}
                placeholder="Type a city..."
                isClearable
                styles={customStyles}
                classNamePrefix="react-select"
            />
        </div>
    );
};

export default SearchBar;
