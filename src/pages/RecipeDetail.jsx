import { useParams, Link } from "react-router-dom";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function RecipeDetail() {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    fetcher
  );

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error loading recipe.</div>;
  if (!data || !data.meals) return <div className="text-center mt-10">Recipe not found.</div>;

  const recipe = data.meals[0];

  // Extract ingredients
  const getIngredients = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }
    return ingredients;
  };

  const ingredients = getIngredients(recipe);

  return (
    <div className="w-[80%] mx-auto p-6">
      <Link to="/" className="text-orange-600 hover:text-orange-700 mb-4 inline-block">
        ← Back to Recipes
      </Link>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className="w-full h-64 object-cover"
        />
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{recipe.strMeal}</h1>
          <p className="text-gray-600 mb-4">{recipe.strCategory} • {recipe.strArea}</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    <span>
                      <strong>{item.measure}</strong> {item.ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Instructions */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              <div className="prose">
                {recipe.strInstructions.split('\n').map((instruction, index) => (
                  instruction.trim() && (
                    <p key={index} className="mb-3 text-gray-700">
                      {instruction.trim()}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>
          
          {/* Tags */}
          {recipe.strTags && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.strTags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Links */}
          <div className="mt-6 flex gap-4">
            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Watch on YouTube
              </a>
            )}
            {recipe.strSource && (
              <a
                href={recipe.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                View Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
