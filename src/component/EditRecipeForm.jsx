import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeForm from "./RecipeForm";

export default function EditRecipeForm() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("localRecipes") || "[]");
    const recipe = stored.find((r) => r.idMeal === id);

    if (!recipe) {
      setError("Recipe not found.");
      return;
    }

    let ingredients = [];
    for (let i = 1; ; i++) {
      const ing = recipe[`strIngredient${i}`];
      const meas = recipe[`strMeasure${i}`];
      if ((ing && ing !== "") || (meas && meas !== "")) {
        ingredients.push({ ingredient: ing || "", measurement: meas || "" });
      } else {
        break;
      }
    }
    if (ingredients.length === 0) ingredients = [{ ingredient: "", measurement: "" }];

    setInitialData({
      name: recipe.strMeal || "",
      image: recipe.strMealThumb || "",
      category: recipe.strCategory || "",
      area: recipe.strArea || "",
      instructions: recipe.strInstructions || "",
      source: recipe.strSource || "",
      youtube: recipe.strYoutube || "",
      ingredients,
    });
  }, [id]);

  const handleUpdate = (form) => {
    if (!initialData) return;

    const updatedRecipe = {
      idMeal: id,
      strMeal: form.name,
      strMealThumb: form.image,
      strCategory: form.category,
      strArea: form.area,
      strInstructions: form.instructions,
      strSource: form.source,
      strYoutube: form.youtube,
    };

    form.ingredients.forEach((ing, i) => {
      updatedRecipe[`strIngredient${i + 1}`] = ing.ingredient || "";
      updatedRecipe[`strMeasure${i + 1}`] = ing.measurement || "";
    });

    const stored = JSON.parse(localStorage.getItem("localRecipes") || "[]");
    const updatedStorage = stored.map((r) => (r.idMeal === id ? updatedRecipe : r));
    localStorage.setItem("localRecipes", JSON.stringify(updatedStorage));
    window.location.href = "/";
  };

  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!initialData) return <div>Loading...</div>;

  return (
    <RecipeForm
      initialData={initialData}
      onSubmit={handleUpdate}
      submitText="Update Recipe"
      title="Edit Recipe"
      backTo="/"
    />
  );
}
