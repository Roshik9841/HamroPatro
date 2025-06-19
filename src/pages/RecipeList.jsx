import React from "react";
import Search from "../component/Search";
import { Link } from "react-router-dom";

export default function RecipeList() {
  const [recipes, setRecipes] = React.useState([]);

  const updateRecipeList = (newRecipes) => {
    setRecipes(newRecipes);
  };

  return (
    <div className="w-[80%] mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Recipes</h1>
      <Search updateRecipeList={updateRecipeList} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes?.map((meal) => (
          <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal}>
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
          </Link>
        ))}
      </div>
    </div>
  );
}
