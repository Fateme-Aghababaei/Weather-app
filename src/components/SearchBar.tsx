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
    const [inputValue, setInputValue] = useState('');

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
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
        singleValue: (provided: any) => ({
            ...provided,
            color: 'white',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: 'rgba(255, 255, 255, 0.7)',
        }),
        input: (provided: any) => ({
            ...provided,
            color: 'white',
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: 'rgba(30, 30, 30, 0.9)',
            backdropFilter: 'blur(6px)',
            borderRadius: '1rem',
            overflow: 'hidden',
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused
                ? 'rgba(255, 255, 255, 0.2)'
                : 'transparent',
            color: 'white',
            cursor: 'pointer',
        }),
        indicatorSeparator: () => ({ display: 'none' }),
    };

    useEffect(() => {
        fetch('/data/cities.csv')
            .then(res => res.text())
            .then(csvText => {
                const parsed = Papa.parse<CityRow>(csvText, {
                    header: true,
                    skipEmptyLines: true,
                });
                setCities(parsed.data.filter(row => row.city && row.country));
            });
    }, []);

    const loadOptions = (inputValue: string, callback: (options: any[]) => void) => {
        if (!inputValue) {
            callback([]);
            return;
        }

        const filtered = cities
            .filter(row =>
                `${row.city}, ${row.country}`.toLowerCase().includes(inputValue.toLowerCase())
            )
            .slice(0, 50)
            .map(row => ({
                label: `${row.city}, ${row.country} (${row.iso2})`,
                value: row.city,
            }));

        callback(filtered);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            onSearch(inputValue);
        }
    };

    return (
        <div className="rounded-xl px-4 py-4 w-full max-w-md mb-10">
            <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions={false}
                onChange={(selectedOption) => {
                    if (selectedOption) {
                        onSearch(selectedOption.value);
                    }
                }}
                onInputChange={(value) => setInputValue(value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a city..."
                isClearable
                styles={customStyles}
                classNamePrefix="react-select"
            />
        </div>
    );
};

export default SearchBar;
