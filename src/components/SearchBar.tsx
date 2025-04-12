import { Input } from './Input';
import { cn } from '../utils';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import {
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

interface BookSuggestion {
    id: number;
    title: string;
    photo_url: string;
    score: number;
}

interface AuthorSuggestion {
    id: number;
    name: string;
    photo_url: string;
    score: number;
}

interface Suggestions {
    authors: AuthorSuggestion[];
    books: BookSuggestion[];
}

async function fetchSuggestions(query: string): Promise<Suggestions> {
    const response = await fetch(`/api/api/books/suggestions?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
    }
    return response.json();
};

interface SearchBarProps {
    onFocusChange?: (isFocused: boolean) => void;
    className?: string;
}


const SearchBar = ({ onFocusChange = () => { }, className = "" }: SearchBarProps) => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearchInput, setDebouncedSearchInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Debounce the search input
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearchInput(searchInput);
        }, 300);
        return () => clearTimeout(timeout);
    }, [searchInput]);

    // Notify parent component when focus changes
    useEffect(() => {
        onFocusChange(isFocused);
        console.log("isFocused", isFocused);
    }, [isFocused, onFocusChange]);

    // Fetch suggestions based on debounced input
    const { data: suggestions } = useQuery({
        queryKey: ['suggestions', debouncedSearchInput],
        queryFn: () => fetchSuggestions(debouncedSearchInput),
        enabled: !!debouncedSearchInput, // Only fetch when input is not empty
    });

    const handleSuggestionClick = (id: number) => {
        navigate(`/book/${id}`);
        setShowSuggestions(false);
    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        setShowSuggestions(false);
        event.preventDefault();
        if (searchInput.trim()) {
            navigate(`/search/results/?q=${encodeURIComponent(searchInput)}`);
        }
    };

    return (
        <>
            {/* 
            <div
                className={`relative transition-all duration-300 ease-in-out ${isFocused ? "w-3/5" : "w-2/4"}`}
            >
            </div>
            */}
            <div className={cn("relative", className)}>
                <form
                    className="flex items-center bg-white text-gray-800 rounded-full overflow-hidden"
                    onSubmit={handleSearch}
                >
                    <Input
                        type="search"
                        placeholder="Search for books"
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        onFocus={() => {
                            setIsFocused(true);
                            setShowSuggestions(true);
                        }}
                        onBlur={() => {
                            setIsFocused(false);
                            setTimeout(() => setShowSuggestions(false), 200);
                        }}
                        className=" py-2 outline-none w-full border-none "
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 outline-none text-white font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        <MagnifyingGlassIcon className="h-6 w-6" />
                    </button>
                </form>
                {suggestions && debouncedSearchInput && showSuggestions && (suggestions.books.length > 0) && (
                    <ul className="absolute text-black z-50 w-full bg-white border border-gray-300 rounded mt-2 shadow-lg max-h-96 overflow-y-auto">
                        {suggestions.books.map((book: BookSuggestion, index: number) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSuggestionClick(book.id)}
                            >
                                {book.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default SearchBar;
