import { useParams, Link } from "react-router-dom";
import useSWR from "swr";
import React from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function RecipeDetail() {
  const { id } = useParams();
  const [localRecipe, setLocalRecipe] = React.useState(null);

  const { data, error, isLoading } = useSWR(
    !localRecipe ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : null,
    fetcher
  );

  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("localRecipes") || "[]");
    const found = stored.find((r) => r.idMeal === id);
    if (found) setLocalRecipe(found);
  }, [id]);

  const recipe = localRecipe || data?.meals?.[0];

  if (isLoading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">Error loading recipe.</div>;
  if (!recipe) return <div className="text-center mt-10">Recipe not found.</div>;

  return <RecipeLayout recipe={recipe} />;
}

function RecipeLayout({ recipe }) {
  const ingredients = [];
  for (let i = 1; i <= 30; i++) {
    const ing = recipe[`strIngredient${i}`];
    const qty = recipe[`strMeasure${i}`];
    if (ing && ing.trim()) ingredients.push(`${qty} ${ing}`);
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link
        to="/"
        className="text-orange-600 hover:text-orange-700 text-sm font-medium mb-6 flex transition"
      >
        ← Back to Recipes
      </Link>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-2 gap-6">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-auto max-h-[500px] object-cover lg:rounded-2xl"
        />
        <div className="p-6 space-y-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">{recipe.strMeal}</h1>
            <p className="text-sm text-gray-500">
              {recipe.strCategory} • {recipe.strArea}
            </p>

          </div>
          <div>
            <h2 className="text-xl font-semibold text-orange-600 mb-2">🧂 Ingredients</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-orange-600 mb-2">📖 Instructions</h2>
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {recipe.strInstructions}
            </div>
          </div>
          <div className="pt-4 flex gap-4">
         
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg hover:bg-orange-200 text-sm font-medium"
              >
                🎥 Watch on YouTube
              </a>
           
           
              <a
                href={recipe.strSource}
                target="_blank"
                rel="noreferrer"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm font-medium"
              >
                🌐 View Source
              </a>
          
          </div>
        </div>
      </div>
    </div>
  );
}
