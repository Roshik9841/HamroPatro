import React from "react";
import Search from "../component/Search";
import { Link } from "react-router-dom";

export default function RecipeList() {
  const [recipes, setRecipes] = React.useState([]); // always display this
  const [localRecipes, setLocalRecipes] = React.useState([]);

  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("localRecipes") || "[]");
    setLocalRecipes(stored);
  }, []);

  const updateRecipeList = (newRecipes) => {
    setRecipes(newRecipes);
  };

  const deleteRecipe = (idMeal) => {
    const updated = localRecipes.filter((item) => item.idMeal !== idMeal);
    setLocalRecipes(updated);
    localStorage.setItem("localRecipes", JSON.stringify(updated));
  };

  return (
    <div className="w-[80%] mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Recipes</h1>
      <div className="flex justify-end mb-4">
        <Link
          to="/add"
          className="bg-[#E15A0C] text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 transition-colors"
        >
          Add Recipe
        </Link>
      </div>
      <Search updateRecipeList={updateRecipeList} localRecipes={localRecipes} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes?.map((meal) => (
          <div key={meal.idMeal} className="relative">
            <Link to={`/recipe/${meal.idMeal}`} style={{ cursor: 'pointer', display: 'block' }}>
              <div className="bg-white shadow-md rounded-md hover:shadow-xl cursor-pointer">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-60 object-cover rounded-3xl  hover:scale-105"
                />
                <div className="p-4">
                  <p className="text-sm text-grey-600 font-bold mb-4">{meal.strMeal}</p>
                  <p className="text-sm text-[#E15A0C] font-semibold">
                    View Recipe →
                  </p>
                </div>
              </div>
            </Link>
            {localRecipes.some(item => item.idMeal === meal.idMeal) && (
              <div className="absolute bottom-[5%] right-2 flex gap-2">
                <button onClick={e => { e.stopPropagation(); deleteRecipe(meal.idMeal); }} className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                  Delete</button> 
                <Link to={`/edit/${meal.idMeal}`} onClick={e => e.stopPropagation()} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Edit</Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
