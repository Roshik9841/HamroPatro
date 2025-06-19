import React, {useState, useEffect } from "react";
import Search from "../component/Search";
import { Link } from "react-router-dom";

export default function MealList() {
  const [allMeals, setAllMeals] = useState([]);
  const [mealError, setMealError] = useState(null);
  const [categoriesData, setCategoriesData] = useState(null);
  const [categoriesError, setCategoriesError] = useState(null);
  const [filteredMeals, setFilteredMeals] = useState([])

  useEffect(() => {
    //fetch categories
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
          setFilteredMeals(allMealsFlat);
        } catch (error) {
          setMealError(error);
          console.error('All meals fetch error:', error);
        }
      };
      fetchAllMeals();
    }
  }, [categoriesData]);
  
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
      <h1 className="text-3xl font-bold text-center mb-6">All Recipes</h1>
      <Search 
        allMeals={allMeals}
        setFilteredMeals={setFilteredMeals} 
       />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMeals?.map((meal) => (
          <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal}>
            <div className="bg-white shadow-md rounded-md hover:shadow-xl cursor-pointer">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full object-cover rounded-3xl"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{meal.strMeal}</h2>
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
