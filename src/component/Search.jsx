import { useState, useEffect } from "react";

export default function Search({ recipesFromApi, recipesFromLocalStorage, setFilteredRecipesFromApi, setFilteredRecipesFromLocalStorage }) {
    const [inputText, setInputText] = useState("");

    const handleInputChange = (event) => {
      const text = event.target.value;
      setInputText(text);

      const filteredApiRecipes = recipesFromApi.filter(recipe =>
          recipe.strMeal.toLowerCase().includes(text.toLowerCase())
      );
      const filteredLocalRecipes = recipesFromLocalStorage.filter(recipe => 
        recipe.strMeal.toLowerCase().includes(text.toLowerCase())
      );

      setFilteredRecipesFromApi(filteredApiRecipes);
      setFilteredRecipesFromLocalStorage(filteredLocalRecipes)
    }

    return (
        <input type="text"
        placeholder="Search the food you want"
        value={inputText}
        onChange={handleInputChange}
        className="rounded-xl w-[80%] mx-auto block mb-6 px-4 py-2 border border-gray-300"
        />
    );
}