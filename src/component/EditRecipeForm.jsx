import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditRecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("localRecipes") || "[]");
    const recipe = stored.find(r => r.idMeal === id);
    if (!recipe) {
      setError("Recipe not found.");
      return;
    }
    // Convert MealDB structure to form state
    setForm({
      name: recipe.strMeal || "",
      image: recipe.strMealThumb || "",
      category: recipe.strCategory || "",
      area: recipe.strArea || "",
      instructions: recipe.strInstructions || "",
      source: recipe.strSource || "",
      youtube: recipe.strYoutube || "",
      ingredients: Array.from({ length: 30 }, (_, i) => ({
        ingredient: recipe[`strIngredient${i + 1}`] || "",
        measurement: recipe[`strMeasure${i + 1}`] || ""
      })).filter(i => i.ingredient || i.measurement)
    });
  }, [id]);

  if (!form) {
    return error ? <div className="text-red-500 text-center mt-8">{error}</div> : <div>Loading...</div>;
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleIngredientChange = (idx, field, value) => {
    setForm(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((item, i) => i === idx ? { ...item, [field]: value } : item)
    }));
  };

  const addIngredientField = () => {
    setForm(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { ingredient: "", measurement: "" }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.image.trim() || !form.instructions.trim() || form.ingredients.some(i => !i.ingredient.trim() || !i.measurement.trim())) {
      setError("Please fill in all required fields.");
      return;
    }
    // Build MealDB-style object
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
    const newStored = stored.map(r => r.idMeal === id ? updatedRecipe : r);
    localStorage.setItem("localRecipes", JSON.stringify(newStored));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-8 flex flex-col gap-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">Edit Recipe</h2>
        <button
          type="button"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-semibold hover:bg-gray-300 transition-colors"
          onClick={() => navigate("/")}
        >
          Back to Recipes
        </button>
      </div>
      <input
        type="text"
        placeholder="Recipe Name*"
        value={form.name}
        onChange={e => handleChange("name", e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <input
        type="text"
        placeholder="Image URL*"
        value={form.image}
        onChange={e => handleChange("image", e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={e => handleChange("category", e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <input
        type="text"
        placeholder="Area (e.g. Italian)"
        value={form.area}
        onChange={e => handleChange("area", e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <textarea
        placeholder="Instructions*"
        value={form.instructions}
        onChange={e => handleChange("instructions", e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
        rows={4}
      />
      <input
        type="text"
        placeholder="Source (URL or description)"
        value={form.source}
        onChange={e => handleChange("source", e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <input
        type="text"
        placeholder="YouTube Link"
        value={form.youtube}
        onChange={e => handleChange("youtube", e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <div>
        <label className="font-semibold">Ingredients & Measurements*</label>
        {form.ingredients.map((item, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder={`Ingredient ${idx + 1}`}
              value={item.ingredient}
              onChange={e => handleIngredientChange(idx, "ingredient", e.target.value)}
              className="border rounded px-2 py-1 flex-1"
            />
            <input
              type="text"
              placeholder={`Measurement ${idx + 1}`}
              value={item.measurement}
              onChange={e => handleIngredientChange(idx, "measurement", e.target.value)}
              className="border rounded px-2 py-1 flex-1"
            />
          </div>
        ))}
        <button type="button" onClick={addIngredientField} className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm font-semibold">+ Add Ingredient</button>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="bg-[#E15A0C] text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 transition-colors">Update Recipe</button>
    </form>
  );
} 