import React from "react";

export default function AddRecipeForm({ addNewRecipe }) {
  const [formData, setFormData] = React.useState({
    strMeal: "",
    strMealThumb: "",
    strCategory: "",
    strArea: "",
    strInstructions: "",
    ingredients: Array(20).fill(""),
    measures: Array(20).fill(""),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleMeasureChange = (index, value) => {
    const updatedMeasures = [...formData.measures];
    updatedMeasures[index] = value;
    setFormData({ ...formData, measures: updatedMeasures });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      idMeal: Date.now().toString(),
      strMeal: formData.strMeal,
      strMealThumb: formData.strMealThumb,
      strCategory: formData.strCategory,
      strArea: formData.strArea,
      strInstructions: formData.strInstructions,
      strTags: "", // optional tag field
      strYoutube: "", // optional YouTube field
    };

    // Add strIngredient1 to strIngredient20 and strMeasure1 to strMeasure20
    for (let i = 0; i < 20; i++) {
      newRecipe[`strIngredient${i + 1}`] = formData.ingredients[i] || "";
      newRecipe[`strMeasure${i + 1}`] = formData.measures[i] || "";
    }

    // Convert empty strings to null (to match TheMealDB format)
    for (let i = 1; i <= 20; i++) {
      if (newRecipe[`strIngredient${i}`].trim() === "") {
        newRecipe[`strIngredient${i}`] = null;
      }
      if (newRecipe[`strMeasure${i}`].trim() === "") {
        newRecipe[`strMeasure${i}`] = null;
      }
    }

    addNewRecipe(newRecipe);

    // Reset form
    setFormData({
      strMeal: "",
      strMealThumb: "",
      strCategory: "",
      strArea: "",
      strInstructions: "",
      ingredients: Array(20).fill(""),
      measures: Array(20).fill(""),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow mb-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-orange-600">Add New Recipe</h2>

      <input
        type="text"
        name="strMeal"
        placeholder="Recipe Name"
        value={formData.strMeal}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="strMealThumb"
        placeholder="Image URL"
        value={formData.strMealThumb}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="strCategory"
        placeholder="Category (e.g. Dessert)"
        value={formData.strCategory}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="strArea"
        placeholder="Area (e.g. Italian)"
        value={formData.strArea}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <textarea
        name="strInstructions"
        placeholder="Instructions"
        value={formData.strInstructions}
        onChange={handleChange}
        rows="4"
        className="w-full p-2 border rounded"
        required
      />

      <h3 className="text-lg font-semibold text-gray-700">
        Ingredients & Measures
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {formData.ingredients.map((_, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder={`Ingredient ${index + 1}`}
              value={formData.ingredients[index]}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder={`Measure ${index + 1}`}
              value={formData.measures[index]}
              onChange={(e) => handleMeasureChange(index, e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Add Recipe
      </button>
    </form>
  );
}
