import React, { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
  [key: string]: string;
}

interface Props {
  onRecipeClick: (id: string) => void;
}

function RandomRecipe({ onRecipeClick }: Props) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomRecipe = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php'
      );
      const data = await response.json();
      setRecipe(data.meals?.[0] || null);
    } catch (error) {
      console.error('Error fetching random recipe:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Resep tidak ditemukan.</p>
      </div>
    );
  }

  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map((i) => ({
      ingredient: recipe[`strIngredient${i}`],
      measure: recipe[`strMeasure${i}`],
    }))
    .filter(({ ingredient }) => ingredient && ingredient.trim() !== '');

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Resep Acak</h2>
        <button
          onClick={fetchRandomRecipe}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors w-full sm:w-auto justify-center"
        >
          <RefreshCw size={20} />
          <span className="text-sm md:text-base">Acak Lagi</span>
        </button>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 cursor-pointer"
        onClick={() => onRecipeClick(recipe.idMeal)}
      >
        <div>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full rounded-lg shadow-md"
            loading="lazy"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
              {recipe.strCategory}
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
              {recipe.strArea}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
            {recipe.strMeal}
          </h3>

          <h4 className="text-base md:text-lg font-semibold text-gray-700 mb-2">
            Bahan-bahan:
          </h4>
          <ul className="mb-6 text-sm md:text-base">
            {ingredients.map(({ ingredient, measure }, index) => (
              <li key={index} className="text-gray-600 mb-1">
                • {measure} {ingredient}
              </li>
            ))}
          </ul>

          <p className="text-sm md:text-base text-gray-600 line-clamp-4">
            {recipe.strInstructions}
          </p>
          <p className="text-orange-600 mt-2 text-sm md:text-base">
            Klik untuk melihat detail...
          </p>
        </div>
      </div>
    </div>
  );
}

export default RandomRecipe;