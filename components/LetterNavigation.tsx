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
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onLetterSelect(letter)}
          className={`rounded-lg px-4 py-2 font-medium transition-colors ${
            selectedLetter === letter
              ? 'bg-[#8BBB46] text-white'
              : 'bg-[#BEBBB2] text-white hover:bg-[#A8A89E]'
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
