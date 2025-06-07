import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
    city: string;
    onCityChange: (value: string) => void;
    onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ city, onCityChange, onSearch }) => {

    return (
        <div className="flex items-center bg-white/10 border border-white backdrop-blur-xs rounded-full px-4 py-2 w-full max-w-md mb-10">
            <input
                type="text"
                placeholder="Enter your city"
                value={city}
                className="flex-grow bg-transparent outline-none text-white placeholder-white px-2"
                onChange={(e) => onCityChange(e.target.value)}
            />
            <button
                className="w-8 h-8 flex items-center justify-center text-white rounded-full cursor-pointer"
                onClick={onSearch}
                disabled={!city}
            >
                <FaSearch size={14} />
            </button>
        </div>
    );
};

export default SearchBar;
