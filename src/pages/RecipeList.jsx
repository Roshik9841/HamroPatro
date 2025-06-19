import React from "react";
import Search from "../component/Search";
import { Link, useNavigate } from "react-router-dom";

export default function RecipeList() {
  const [recipes, setRecipes] = React.useState([]);
  const [localRecipes, setLocalRecipes] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Load local recipes from localStorage
    const stored = localStorage.getItem("localRecipes");
    setLocalRecipes(stored ? JSON.parse(stored) : []);
  }, []);

  const updateRecipeList = (newRecipes) => {
    setRecipes(newRecipes);
  };

  const deleteRecipe = (idMeal) => {
    const updated = localRecipes.filter((r) => r.idMeal !== idMeal);
    setLocalRecipes(updated);
    localStorage.setItem("localRecipes", JSON.stringify(updated));
  };

  // Combine local and API recipes, local first
  const allRecipes = [...localRecipes, ...recipes.filter(r => !localRecipes.some(lr => lr.idMeal === r.idMeal))];

  return (
    <div className="w-[80%] mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Recipes</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-[#E15A0C] text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 transition-colors"
          onClick={() => navigate("/add")}
        >
          Add Recipe
        </button>
      </div>
      <Search updateRecipeList={updateRecipeList} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allRecipes?.map((meal) => (
          <div key={meal.idMeal} className="relative">
            <div onClick={() => navigate(`/recipe/${meal.idMeal}`)} style={{ cursor: 'pointer' }}>
              <div className="bg-white shadow-md rounded-md hover:shadow-xl cursor-pointer">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full object-cover rounded-3xl transition-transform  hover:scale-105"
                />
                <div className="p-4">
                  <p className="text-sm text-[#E15A0C] font-semibold">
                    View Recipe →
                  </p>
                </div>
              </div>
            </div>
            {/* Show edit/delete for local recipes only */}
            {localRecipes.some(r => r.idMeal === meal.idMeal) && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={e => { e.stopPropagation(); deleteRecipe(meal.idMeal); }} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Delete</button>
                <Link to={`/edit/${meal.idMeal}`} onClick={e => e.stopPropagation()} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Edit</Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
