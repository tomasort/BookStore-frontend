const SearchBar = () => {
    return (
        <form className="flex items-center bg-white text-gray-800 rounded-lg overflow-hidden">
            <input
                type="search"
                placeholder="Search for books"
                className="px-4 py-2 outline-none w-full"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white font-semibold hover:bg-blue-700 transition duration-300"
            >
                Search
            </button>
        </form>
    );
}

export default SearchBar;
