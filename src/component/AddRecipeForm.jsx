import React from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "./RecipeForm";

export default function AddRecipeForm() {
  const navigate = useNavigate();

  const handleAdd = (form) => {
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

    form.ingredients.forEach((ing, i) => {
      newRecipe[`strIngredient${i + 1}`] = ing.ingredient || "";
      newRecipe[`strMeasure${i + 1}`] = ing.measurement || "";
    });

    const stored = JSON.parse(localStorage.getItem("localRecipes") || "[]");
    localStorage.setItem("localRecipes", JSON.stringify([newRecipe, ...stored]));
    navigate("/");
  };

  return (
    <RecipeForm
      onSubmit={handleAdd}
      submitText="Add Recipe"
      title="Add New Recipe"
      backTo="/"
    />
  );
}
