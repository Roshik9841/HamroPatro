import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RecipeForm({
  initialData = null,
  onSubmit,
  submitText = "Add Recipe",
  title = "Add New Recipe",
  backTo = "/",
}) {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      image: "",
      category: "",
      area: "",
      instructions: "",
      source: "",
      youtube: "",
      ingredients: [{ ingredient: "", measurement: "" }],
    }
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleIngredientChange = (idx, field, value) => {
    setForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addIngredientField = () => {
    setForm((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { ingredient: "", measurement: "" }],
    }));
  };

  const deleteIngredientField = (idx) => {
    setForm((prev) => ({
      ...prev,
      ingredients:
        prev.ingredients.length > 1
          ? prev.ingredients.filter((_, i) => i !== idx)
          : prev.ingredients,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.image.trim() ||
      !form.instructions.trim() ||
      form.ingredients.some(
        (i) => !i.ingredient.trim() || !i.measurement.trim()
      )
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow mb-8 flex flex-col gap-4 max-w-xl mx-auto"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">{title}</h2>
        <Link
          to={backTo}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-semibold hover:bg-gray-300 "
        >
          Back to Recipes
        </Link>
      </div>
      <input
        type="text"
        placeholder="Recipe Name*"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <input
        type="url"
        placeholder="Image URL*"
        value={form.image}
        onChange={(e) => handleChange("image", e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => handleChange("category", e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <input
        type="text"
        placeholder="Area (e.g. Italian)"
        value={form.area}
        onChange={(e) => handleChange("area", e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <textarea
        placeholder="Instructions*"
        value={form.instructions}
        onChange={(e) => handleChange("instructions", e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
        rows={4}
      />
      <input
        type="url"
        placeholder="Source (URL or description)"
        value={form.source}
        onChange={(e) => handleChange("source", e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
      />
      <input
        type="url"
        placeholder="YouTube Link"
        value={form.youtube}
        onChange={(e) => handleChange("youtube", e.target.value)}
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
              onChange={(e) =>
                handleIngredientChange(idx, "ingredient", e.target.value)
              }
              className="border rounded px-2 py-1 flex-1"
            />
            <input
              type="text"
              placeholder={`Measurement ${idx + 1}`}
              value={item.measurement}
              onChange={(e) =>
                handleIngredientChange(idx, "measurement", e.target.value)
              }
              className="border rounded px-2 py-1 flex-1"
            />
            <button
              type="button"
              onClick={() => deleteIngredientField(idx)}
              className="ml-2 px-2 py-1 bg-red-200 text-red-700 rounded hover:bg-red-300 text-xs"
              disabled={form.ingredients.length === 1}
              title="Delete Ingredient"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredientField}
          className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm font-semibold"
        >
          + Add Ingredient
        </button>
      </div>
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <button
        type="submit"
        className="bg-[#E15A0C] text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 transition-colors"
      >
        {submitText}
      </button>
    </form>
  );
}