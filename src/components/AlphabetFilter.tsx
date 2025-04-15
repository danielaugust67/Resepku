import React from 'react';

interface Props {
  selectedLetter: string;
  onLetterSelect: (letter: string) => void;
}

function AlphabetFilter({ selectedLetter, onLetterSelect }: Props) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-1 md:gap-2 mb-4 md:mb-6">
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => onLetterSelect(letter)}
          className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            selectedLetter === letter
              ? 'bg-orange-600 text-white'
              : 'bg-white text-gray-700 hover:bg-orange-50'
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default AlphabetFilter;