import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Search from "../component/Search";

export default function MealList() {
  const [allMeals, setAllMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [localRecipes, setLocalRecipes] = useState([]);
  const [errors, setErrors] = useState({ category: null, meal: null });
  const [categories, setCategories] = useState([]);

  // Fetch categories and local recipes on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
        const data = await res.json();
        setCategories(data.meals || []);
      } catch (err) {
        setErrors(e => ({ ...e, category: err }));
      }
    };

    fetchCategories();
    const stored = JSON.parse(localStorage.getItem("localRecipes") || "[]");
    setLocalRecipes(stored);
  }, []);

  // Fetch meals by category
  useEffect(() => {
    if (!categories.length) return;

    const fetchMeals = async () => {
      try {
        const results = await Promise.all(
          categories.map(async ({ strCategory }) => {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`);
            const data = await res.json();
            return data.meals || [];
          })
        );
        const flatMeals = results.flat();
        setAllMeals(flatMeals);
        setFilteredMeals([...localRecipes, ...flatMeals]);
      } catch (err) {
        setErrors(e => ({ ...e, meal: err }));
      }
    };

    fetchMeals();
  }, [categories]);

  // Sync filteredMeals when localRecipes or allMeals change
  useEffect(() => {
    setFilteredMeals([...localRecipes, ...allMeals]);
  }, [localRecipes, allMeals]);

  const allCombinedMeals = useMemo(() => [...localRecipes, ...allMeals], [localRecipes, allMeals]);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    e.preventDefault();
    const updated = localRecipes.filter(m => m.idMeal !== id);
    setLocalRecipes(updated);
    localStorage.setItem("localRecipes", JSON.stringify(updated));
  };

  if (errors.category) return <div>Error loading categories</div>;
  if (errors.meal) return <div>Error loading meals</div>;

  return (
    <div className="w-[80%] mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">All Recipes</h1>
        <Link to="/add-recipe" className="bg-[#E15A0C] text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 transition-colors">
          Add New Recipe
        </Link>
      </div>
      <Search allMeals={allCombinedMeals} setFilteredMeals={setFilteredMeals} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMeals?.map(meal => (
          <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal}>
            <div className="bg-white shadow-md rounded-md hover:shadow-xl cursor-pointer">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-60 object-cover rounded-3xl mx-auto" />
              <div className="p-4">
                <h2 className="text-lg font-bold">{meal.strMeal}</h2>
                <p className="text-sm text-[#E15A0C] font-semibold">View Recipe →</p>
                {meal.ingredients && (
                  <ul className="mb-2">
                    {meal.ingredients.map((item, i) => (
                      <li key={i} className="text-sm text-gray-700">
                        {item.ingredient} - {item.measurement}
                      </li>
                    ))}
                  </ul>
                )}
                {meal.idMeal.startsWith("local-") && (
                  <div className="flex gap-2 mt-2 justify-end">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                      onClick={e => handleDelete(meal.idMeal, e)}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/edit-recipe/${meal.idMeal}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                      onClick={e => e.stopPropagation()}
                    >
                      Edit
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
