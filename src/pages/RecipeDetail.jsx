import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeLayout from "../component/RecipeLayout";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipeFromApi, setRecipeFromApi] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(id){
      const fetchRecipeDetails = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await res.json();
          setIsLoading(false);
          setRecipeFromApi(data.meals?.[0] || []);
        } catch (err) {
          setIsLoading(false);
          setError(err);
        }
      };
      
      if(id.startsWith('local-')){
        const stored = JSON.parse(localStorage.getItem("localRecipes") || "[]");
        const found = stored.find((r) => r.idMeal === id);
        if (found){
          setRecipe(found);
        }
      }else{
        fetchRecipeDetails();  
      }
    }
  }, [id]);
  
  useEffect(() => {
    if(recipeFromApi) {
      setRecipe(recipeFromApi);
    }
  }, [recipeFromApi])
  
  
  if (isLoading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">Error loading recipe.</div>;
  if (!recipe) return <div className="text-center mt-10">Recipe not found.</div>;

  return <RecipeLayout recipe={recipe} />;
}