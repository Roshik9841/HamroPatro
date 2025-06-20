import React from "react";
import Search from "../component/Search";
import { Link } from "react-router-dom";

export default function RecipeList() {
  const [localRecipes, setLocalRecipes] = React.useState([]);
  const [apiRecipes, setApiRecipes] = React.useState([]);

  const updateRecipeList = (apiItems, localItems) => {
    setApiRecipes(apiItems || []);
    setLocalRecipes(localItems || []);
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
      <Search updateRecipeList={updateRecipeList} />

      <h2 className="text-2xl font-bold mb-4 text-center">New & Exciting</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {localRecipes.length === 0 && <p className="text-gray-500">No local recipes found.</p>}
        {localRecipes.map((meal) => (
          <div key={meal.idMeal} className="relative">
            <Link to={`/recipe/${meal.idMeal}`} style={{ cursor: 'pointer', display: 'block' }}>
              <div className="bg-white shadow-md rounded-md hover:shadow-xl cursor-pointer">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-60 object-cover rounded-3xl hover:scale-105" />
                <div className="p-4">
                  <p className="text-sm text-grey-600 font-bold mb-4">{meal.strMeal}</p>
                  <p className="text-sm text-[#E15A0C] font-semibold">View Recipe →</p>
                </div>
              </div>
            </Link>
            <div className="absolute bottom-[5%] right-2 flex gap-2">
              <button onClick={e => { e.stopPropagation(); deleteRecipe(meal.idMeal); }} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Delete</button>
              <Link to={`/edit/${meal.idMeal}`} onClick={e => e.stopPropagation()} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Edit</Link>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">Our Favourites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {apiRecipes.length === 0 && <p className="text-gray-500">No API recipes found.</p>}
        {apiRecipes.map((meal) => (
          <div key={meal.idMeal} className="relative">
            <Link to={`/recipe/${meal.idMeal}`} style={{ cursor: 'pointer', display: 'block' }}>
              <div className="bg-white shadow-md rounded-md hover:shadow-xl cursor-pointer">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-60 object-cover rounded-3xl hover:scale-105" />
                <div className="p-4">
                  <p className="text-sm text-grey-600 font-bold mb-4">{meal.strMeal}</p>
                  <p className="text-sm text-[#E15A0C] font-semibold">View Recipe →</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
