'use client';

import { Search } from 'lucide-react';
import { useState, useCallback } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = 'Buscar apellido...',
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      onSearch(value);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');
  }, [onSearch]);

  return (
    <div className="w-full">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-[#BEBBB2]" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-[#BEBBB2] bg-white py-2 pl-10 pr-10 text-gray-900 placeholder-[#BEBBB2] focus:border-[#8BBB46] focus:outline-none focus:ring-2 focus:ring-[#E8F5D9]"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
