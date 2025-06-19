import React, {useState, useEffect } from "react";
import Search from "../component/Search";
import { Link, useNavigate } from "react-router-dom";

export default function MealList() {
  const [allMeals, setAllMeals] = useState([]);
  const [mealError, setMealError] = useState(null);
  const [categoriesData, setCategoriesData] = useState(null);
  const [categoriesError, setCategoriesError] = useState(null);
  const [filteredMeals, setFilteredMeals] = useState([])
  const [localRecipes, setLocalRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  
    const fetchAllCategories = async () => {
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
        const data = await response.json();
        console.log('Categories:', data);
        setCategoriesData(data.meals || []);
      } catch (error) {
        setCategoriesError(error);
        console.error('Categories fetch error:', error);
      }
    };
    fetchAllCategories();
    // Load local recipes
    const stored = JSON.parse(localStorage.getItem("localRecipes") || "[]");  //localRecipes ma bhakoo value haru get garni JSON.parse garera
    setLocalRecipes(stored);
  }, []);
  
   // Fetch meals for categories
   useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      const fetchAllMeals = async () => {
        try {
          const categories = categoriesData.map(categoryData => categoryData.strCategory);
          const mealsByCategory = await Promise.all(
            categories.map(async (category) => {
              try {
                const response = await fetch(
                  `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
                );
                const data = await response.json();
                console.log(`Meals for ${category}:`, data);
                return data.meals || [];
              } catch (error) {
                setMealError(error);
                console.error(`Meals fetch error for ${category}:`, error);
                return [];
              }
            })
          );
          const allMealsFlat = [].concat(...mealsByCategory);
          setAllMeals(allMealsFlat);
          setFilteredMeals([...localRecipes, ...allMealsFlat]);
        } catch (error) {
          setMealError(error);
          console.error('All meals fetch error:', error);
        }
      };
      fetchAllMeals();
    }
  }, [categoriesData]);

  // When localRecipes changes, update filteredMeals
  useEffect(() => {
    setFilteredMeals([...localRecipes, ...allMeals]);
  }, [localRecipes, allMeals]);

  // Delete local recipe
  const handleDelete = (idMeal, e) => {
    e.stopPropagation();
    e.preventDefault();
    const updated = localRecipes.filter(item => item.idMeal !== idMeal);
    setLocalRecipes(updated);
    localStorage.setItem("localRecipes", JSON.stringify(updated));
  };

  // Edit local recipe
  const handleEdit = (idMeal, e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/edit-recipe/${idMeal}`);
  };

  if(categoriesError){
    return(
      <div>Error loading categories</div>
    )
  }

  if(mealError){
    return(
      <div>Error loading meals</div>
    )
  }

  return (
    <div className="w-[80%] mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">All Recipes</h1>
        <button
          className="bg-[#E15A0C] text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 transition-colors"
          onClick={() => navigate("/add-recipe")}
        >
          Add New Recipe
        </button>
      </div>
      <Search 
        allMeals={[...localRecipes, ...allMeals]}
        setFilteredMeals={setFilteredMeals} 
       />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMeals?.map((meal) => (
          meal.idMeal?.startsWith("local-") ? (
            <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal}>
              <div className="bg-white shadow-md rounded-md hover:shadow-xl cursor-pointer">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-60 object-cover rounded-3xl mx-auto"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{meal.strMeal}</h2>
                  {meal.ingredients ? (
                    <ul className="mb-2">
                      {meal.ingredients.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700">
                          {item.ingredient} - {item.measurement}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="flex gap-2 mt-2 justify-end">
                  <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                      onClick={e => handleDelete(meal.idMeal, e)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                      onClick={e => handleEdit(meal.idMeal, e)}
                    >
                      Edit
                    </button>
                   
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal}>
              <div className="bg-white shadow-md rounded-md hover:shadow-xl cursor-pointer">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-60 object-cover rounded-3xl mx-auto"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{meal.strMeal}</h2>
                  <p className="text-sm text-[#E15A0C] font-semibold">
                    View Recipe →
                  </p>
                </div>
              </div>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}
