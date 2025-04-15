import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

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
  id: string;
  onBack: () => void;
}

function RecipeDetail({ id, onBack }: Props) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        setRecipe(data.meals?.[0] || null);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [id]);

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
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4"
      >
        <ArrowLeft size={20} />
        <span className="text-sm md:text-base">Kembali</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            {recipe.strMeal}
          </h2>

          <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2">
            Bahan-bahan:
          </h3>
          <ul className="mb-6 text-sm md:text-base">
            {ingredients.map(({ ingredient, measure }, index) => (
              <li key={index} className="text-gray-600 mb-1">
                • {measure} {ingredient}
              </li>
            ))}
          </ul>

          <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2">
            Cara Membuat:
          </h3>
          <p className="text-sm md:text-base text-gray-600 whitespace-pre-line">
            {recipe.strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;