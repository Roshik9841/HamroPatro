import { useNavigate } from "react-router-dom";
import RecipeForm from "./RecipeForm";

export default function AddRecipeForm() {
  const navigate = useNavigate();

  function handleAdd(form) {
    const newRecipe = {
      idMeal: `local-${Date.now()}`,
      strMeal: form.name,
      strMealThumb: form.image,
      strCategory: form.category,
      strArea: form.area,
      strInstructions: form.instructions,
      strSource: form.source,
      strYoutube: form.youtube,
    };
    for (let i = 0; i < form.ingredients.length; i++) {
      newRecipe[`strIngredient${i + 1}`] = form.ingredients[i].ingredient || "";
      newRecipe[`strMeasure${i + 1}`] = form.ingredients[i].measurement || "";
    }
    // Save to localStorage
    const stored = JSON.parse(localStorage.getItem("localRecipes") || "[]");
    const updated = [newRecipe, ...stored];
    localStorage.setItem("localRecipes", JSON.stringify(updated));
    navigate("/");
  }

  return (
    <RecipeForm
      onSubmit={handleAdd}
      submitText="Add Recipe"
      title="Add New Recipe"
      backTo="/"
    />
  );
}