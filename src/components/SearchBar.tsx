import {
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

const SearchBar = () => {
    return (
        <div className="w-1/4">
            <form className="flex items-center bg-white text-gray-800 rounded-full overflow-hidden">
                <input
                    type="search"
                    placeholder="Search for books"
                    className="px-4 py-2 outline-none w-full"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 outline-none text-white font-semibold hover:bg-blue-700 transition duration-300"
                >
                    <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
            </form>
        </div>

    );
}

export default SearchBar;
