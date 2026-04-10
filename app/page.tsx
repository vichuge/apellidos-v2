'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import SearchBar from '@/components/SearchBar';
import LetterNavigation from '@/components/LetterNavigation';
import PdfCard from '@/components/PdfCard';
import Footer from '@/components/Footer';
import type { PDFFile } from '@/lib/pdfs';

interface PDFsByLetter {
  [letter: string]: PDFFile[];
}

export default function Home() {
  const [pdfs, setPdfs] = useState<PDFsByLetter>({});
  const [letters, setLetters] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load PDFs on mount
  useEffect(() => {
    async function loadPdfs() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/pdfs');
        const data = await response.json();
        setPdfs(data);
        setLetters(Object.keys(data).sort());
        // Select letter 'A' by default
        setSelectedLetter('A');
      } catch (error) {
        console.error('Error loading PDFs:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPdfs();
  }, []);

  // Filter PDFs based on search and selected letter
  const filteredPdfs = useMemo(() => {
    let results: PDFFile[] = [];

    if (searchQuery) {
      // Search mode
      Object.values(pdfs).forEach((letterPdfs) => {
        results.push(
          ...letterPdfs.filter((pdf) =>
            pdf.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      });
    } else if (selectedLetter) {
      // Letter filter mode
      results = pdfs[selectedLetter] || [];
    } else {
      // Show all
      Object.values(pdfs).forEach((letterPdfs) => {
        results.push(...letterPdfs);
      });
    }

    return results;
  }, [pdfs, selectedLetter, searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query) {
      setSelectedLetter(null);
    }
  }, []);

  const handleLetterSelect = useCallback((letter: string | null) => {
    setSelectedLetter(letter);
    setSearchQuery('');
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-[#F5F7F0]">
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Apellidos</h1>
          <p className="mt-2 text-gray-600">
            Encuentra información sobre familias hispanas y sus apellidos
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Letter Navigation */}
        {!searchQuery && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Filtrar por letra
            </h2>
            <LetterNavigation
              letters={letters}
              selectedLetter={selectedLetter}
              onLetterSelect={handleLetterSelect}
            />
          </div>
        )}

        {/* Results Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            {searchQuery
              ? `Resultados (${filteredPdfs.length})`
              : selectedLetter
                ? `Letra ${selectedLetter} (${filteredPdfs.length})`
                : `Todos los apellidos (${filteredPdfs.length})`}
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#8BBB46] border-t-transparent" />
            </div>
          ) : filteredPdfs.length === 0 ? (
            <div className="rounded-lg border border-[#BEBBB2] bg-white p-8 text-center">
              <p className="text-[#BEBBB2]">
                {searchQuery
                  ? 'No se encontraron resultados.'
                  : 'No hay apellidos disponibles.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPdfs.map((pdf) => (
                <PdfCard
                  key={`${pdf.letter}-${pdf.filename}`}
                  name={pdf.name}
                  letter={pdf.letter}
                  filename={pdf.filename}
                />
              ))}
            </div>
          )}
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
