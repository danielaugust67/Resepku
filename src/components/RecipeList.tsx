import React, { useEffect, useState } from 'react';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Props {
  searchTerm: string;
  selectedLetter: string;
  onRecipeClick: (id: string) => void;
}

function RecipeList({ searchTerm, selectedLetter, onRecipeClick }: Props) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        let url = 'https://www.themealdb.com/api/json/v1/1/';
        if (searchTerm) {
          url += `search.php?s=${searchTerm}`;
        } else if (selectedLetter) {
          url += `search.php?f=${selectedLetter}`;
        } else {
          url += 'search.php?s=';
        }

        const response = await fetch(url);
        const data = await response.json();
        setRecipes(data.meals || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setRecipes([]);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, [searchTerm, selectedLetter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Tidak ada resep yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe.idMeal}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
          onClick={() => onRecipeClick(recipe.idMeal)}
        >
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <div className="p-3 md:p-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-2">
              {recipe.strMeal}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;