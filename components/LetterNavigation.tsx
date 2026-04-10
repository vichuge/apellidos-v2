'use client';

interface LetterNavigationProps {
  letters: string[];
  selectedLetter: string | null;
  onLetterSelect: (letter: string | null) => void;
}

export default function LetterNavigation({
  letters,
  selectedLetter,
  onLetterSelect,
}: LetterNavigationProps) {
  return (
    <div className="flex flex-wrap gap-2 py-6">
      <button
        onClick={() => onLetterSelect(null)}
        className={`rounded-lg px-4 py-2 font-medium transition-colors ${
          selectedLetter === null
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        Todos
      </button>
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onLetterSelect(letter)}
          className={`rounded-lg px-4 py-2 font-medium transition-colors ${
            selectedLetter === letter
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
