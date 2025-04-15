import React, { useState } from 'react';
import { Search, ChefHat, Soup, SlidersHorizontal, Menu, X } from 'lucide-react';
import RecipeList from './components/RecipeList';
import AlphabetFilter from './components/AlphabetFilter';
import RandomRecipe from './components/RandomRecipe';
import RecipeDetail from './components/RecipeDetail';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [view, setView] = useState<'list' | 'detail' | 'random'>('list');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedLetter('');
    setView('list');
  };

  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter);
    setSearchTerm('');
    setView('list');
  };

  const handleRecipeClick = (id: string) => {
    setSelectedRecipeId(id);
    setView('detail');
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-orange-600 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChefHat size={24} />
              <h1 className="text-xl md:text-2xl font-bold">Resep Masakan</h1>
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Cari resep..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 rounded-full text-gray-800 w-64 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="mt-4 md:hidden">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Cari resep..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 rounded-full text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setView('list');
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    view === 'list'
                      ? 'bg-orange-700 text-white'
                      : 'text-white hover:bg-orange-700'
                  }`}
                >
                  <SlidersHorizontal size={20} />
                  Daftar Resep
                </button>
                <button
                  onClick={() => {
                    setView('random');
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    view === 'random'
                      ? 'bg-orange-700 text-white'
                      : 'text-white hover:bg-orange-700'
                  }`}
                >
                  <Soup size={20} />
                  Resep Acak
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-4 md:py-8">
        <div className="hidden md:flex gap-4 mb-8">
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              view === 'list'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 hover:bg-orange-50'
            }`}
          >
            <SlidersHorizontal size={20} />
            Daftar Resep
          </button>
          <button
            onClick={() => setView('random')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              view === 'random'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 hover:bg-orange-50'
            }`}
          >
            <Soup size={20} />
            Resep Acak
          </button>
        </div>

        {view === 'list' && (
          <>
            <AlphabetFilter
              selectedLetter={selectedLetter}
              onLetterSelect={handleLetterSelect}
            />
            <RecipeList
              searchTerm={searchTerm}
              selectedLetter={selectedLetter}
              onRecipeClick={handleRecipeClick}
            />
          </>
        )}
        {view === 'detail' && selectedRecipeId && (
          <RecipeDetail id={selectedRecipeId} onBack={() => setView('list')} />
        )}
        {view === 'random' && <RandomRecipe onRecipeClick={handleRecipeClick} />}
      </main>
    </div>
  );
}

export default App;