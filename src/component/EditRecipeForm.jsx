import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "./RecipeForm";

export default function EditRecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialForm, setInitialForm] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const stored = JSON.parse(localStorage.getItem("localRecipes") || "[]");
    const recipe = stored.find((r) => r.idMeal === id);
    if (!recipe) {
      setError("Recipe not found.");
      setLoading(false);
      return;
    }
    setError("");
    setInitialForm({
      name: recipe.strMeal || "",
      image: recipe.strMealThumb || "",
      category: recipe.strCategory || "",
      area: recipe.strArea || "",
      instructions: recipe.strInstructions || "",
      source: recipe.strSource || "",
      youtube: recipe.strYoutube || "",
      ingredients: Array.from({ length: 30 }, (_, i) => ({
        ingredient: recipe[`strIngredient${i + 1}`] || "",
        measurement: recipe[`strMeasure${i + 1}`] || "",
      })).filter((i) => i.ingredient || i.measurement),
    });
    setLoading(false);
  }, [id]);

  function handleEdit(form) {
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
    for (let i = 0; i < form.ingredients.length; i++) {
      updatedRecipe[`strIngredient${i + 1}`] = form.ingredients[i].ingredient || "";
      updatedRecipe[`strMeasure${i + 1}`] = form.ingredients[i].measurement || "";
    }
    // Update in localStorage
    const stored = JSON.parse(localStorage.getItem("localRecipes") || "[]");
    const newStored = stored.map((r) =>
      r.idMeal === id ? updatedRecipe : r
    );
    localStorage.setItem("localRecipes", JSON.stringify(newStored));
    navigate("/");
  }

  // Show loading or error states
  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <RecipeForm
      initialData={initialForm}
      onSubmit={handleEdit}
      submitText="Update Recipe"
      title="Edit Recipe"
      backTo="/"
    />
  );
}