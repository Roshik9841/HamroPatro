import React from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Search({ updateRecipeList, localRecipes }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const { data, error } = useSWR(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`,
    fetcher
  );

  React.useEffect(() => {
    if (searchTerm === "") {
      // When blank, show both local and API recipes (no duplicates)
      fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
        .then(res => res.json())
        .then(apiData => {
          const apiMeals = apiData.meals || [];
          const all = [...localRecipes, ...apiMeals.filter(api => !localRecipes.some(l => l.idMeal === api.idMeal))];
          updateRecipeList(all);
        });
    } else {
      // Filter local recipes by search term
      const filteredLocal = localRecipes.filter(r =>
        r.strMeal && r.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // API search results
      const apiMeals = data && data.meals ? data.meals : [];
      // Remove duplicates by idMeal
      const all = [...filteredLocal, ...apiMeals.filter(api => !filteredLocal.some(l => l.idMeal === api.idMeal))];
      updateRecipeList(all);
    }
  }, [data, searchTerm, updateRecipeList, localRecipes]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
        />
      </div>

      {searchTerm && data && !data.meals && localRecipes.filter(r => r.strMeal && r.strMeal.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
        <div className="mt-4 text-center text-red-600">Item not found</div>
      )}
      {error && (
        <div className="mt-4 text-center text-red-500">
          Error searching recipes: {error.message}
        </div>
      )}
    </div>
  );
}
