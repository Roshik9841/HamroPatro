import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MAX_INGREDIENTS = 20;

export default function AddRecipeForm({ onAdd }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [instructions, setInstructions] = useState("");
  const [tags, setTags] = useState("");
  const [youtube, setYoutube] = useState("");
  const [ingredients, setIngredients] = useState([{ ingredient: "", measurement: "" }]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleIngredientChange = (idx, field, value) => {
    setIngredients((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };

  const addIngredientField = () => {
    if (ingredients.length < MAX_INGREDIENTS) {
      setIngredients((prev) => [...prev, { ingredient: "", measurement: "" }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !image.trim() || !instructions.trim() || ingredients.some(i => !i.ingredient.trim() || !i.measurement.trim())) {
      setError("Please fill in all required fields.");
      return;
    }
    // Build MealDB-style object
    const newRecipe = {
      idMeal: `local-${Date.now()}`,
      strMeal: name,
      strMealThumb: image,
      strCategory: category,
      strArea: area,
      strInstructions: instructions,
      strTags: tags,
      strYoutube: youtube,
    };
    // Add up to 20 ingredients and measures
    for (let i = 0; i < MAX_INGREDIENTS; i++) {
      newRecipe[`strIngredient${i + 1}`] = ingredients[i]?.ingredient || "";
      newRecipe[`strMeasure${i + 1}`] = ingredients[i]?.measurement || "";
    }
    // Save to localStorage
    const stored = JSON.parse(localStorage.getItem("localRecipes") || "[]");
    const updated = [newRecipe, ...stored];
    localStorage.setItem("localRecipes", JSON.stringify(updated));
    setName("");
    setImage("");
    setCategory("");
    setArea("");
    setInstructions("");
    setTags("");
    setYoutube("");
    setIngredients([{ ingredient: "", measurement: "" }]);
    setError("");
    if (onAdd) onAdd(newRecipe);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-8 flex flex-col gap-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">Add New Recipe</h2>
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
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <input
        type="text"
        placeholder="Image URL*"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <input
        type="text"
        placeholder="Area (e.g. Italian)"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <textarea
        placeholder="Instructions*"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
        rows={4}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <input
        type="text"
        placeholder="YouTube Link"
        value={youtube}
        onChange={(e) => setYoutube(e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <div>
        <label className="font-semibold">Ingredients & Measurements*</label>
        {ingredients.map((item, idx) => (
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
        {ingredients.length < MAX_INGREDIENTS && (
          <button type="button" onClick={addIngredientField} className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm font-semibold">+ Add Ingredient</button>
        )}
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="bg-[#E15A0C] text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 transition-colors">Add Recipe</button>
    </form>
  );
}
