import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../component/Search";
import Recipe from "../component/Recipe";

export default function RecipeList() {
  const [recipesFromApi, setRecipesFromApi] = useState([]);
  const [recipesFromLocalStorage, setRecipesFromLocalStorage] = useState([]);
  const [filteredRecipesFromApi, setFilteredRecipesFromApi] = useState([]);
  const [filteredRecipesFromLocalStorage, setFilteredRecipesFromLocalStorage] = useState([]);
  const [errors, setErrors] = useState({ category: null, recipe: null });
  const [categories, setCategories] = useState([]);

  // sabai categories haru fetch garni
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
    
    const localStorageRecipes = JSON.parse(localStorage.getItem("localRecipes") || "[]");
    setRecipesFromLocalStorage(localStorageRecipes);
  }, []); 

  // sabai recipe fetch garni categories anusar
  useEffect(() => {
    if (!categories.length) return;

    const fetchRecipes = async () => {
      try {
        const results = await Promise.all(
        categories.map(async (category) => {
          const categoryName = category.strCategory;
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
          const data = await res.json();
          return data.meals || [];
        })
      );
        const flatRecipes = results.flat(); //flat le sabai lai eutai array ma rakhxa
        setRecipesFromApi(flatRecipes);
      } catch (err) {
        setErrors(e => ({ ...e, recipe: err }));
      }
    };

    fetchRecipes();
  }, [categories]);

  useEffect(() => {
    setFilteredRecipesFromApi(recipesFromApi);
    setFilteredRecipesFromLocalStorage(recipesFromLocalStorage)
  }, [recipesFromApi, recipesFromLocalStorage]);

  const handleLocalRecipeDelete = (id, e) => {
    e.stopPropagation(); //stopPropagation le bahira ko onclick lai hataidinxa
    e.preventDefault();
    const updatedLocalRecipes = recipesFromLocalStorage.filter(recipe => recipe.idMeal !== id);
    setRecipesFromLocalStorage(updatedLocalRecipes);
    localStorage.setItem("localRecipes", JSON.stringify(updatedLocalRecipes));
  };

  if (errors.category) return <div>Error loading categories</div>;
  if (errors.recipe) return <div>Error loading meals</div>;

  return (
    <div className="w-[80%] mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">All Recipes</h1>
        <Link to="/add-recipe" className="bg-[#E15A0C] text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 transition-colors">
          Add New Recipe
        </Link>
      </div>
      <Search 
        recipesFromApi = {recipesFromApi}
        recipesFromLocalStorage = {recipesFromLocalStorage}
        setFilteredRecipesFromApi = {setFilteredRecipesFromApi} 
        setFilteredRecipesFromLocalStorage = {setFilteredRecipesFromLocalStorage}
      />

      {filteredRecipesFromLocalStorage.length > 0 && (
        <>
          <h2 className="text-3xl font-bold text-center mb-10">New & Exciting</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
            {filteredRecipesFromLocalStorage.map(recipe => (
              <div key = {recipe.idMeal} className="relative">
                <Recipe recipe={recipe} />
                <div className="flex gap-2  absolute bottom-[5%] right-[5%]">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                    onClick={(e) => handleLocalRecipeDelete(recipe.idMeal, e)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/edit-recipe/${recipe.idMeal}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      
      <h2 className="text-3xl font-bold text-center mb-5 mt-10">Our Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredRecipesFromApi?.map(recipe => (
        <Recipe 
          key = {recipe.idMeal}
          recipe={recipe}
        />
      ))}
      </div>
    </div>
  );
}
