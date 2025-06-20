import React from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Search({ updateRecipeList }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState(searchTerm);
  const [localRecipes, setLocalRecipes] = React.useState([]);

  // Load local recipes from localStorage
  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("localRecipes") || "[]");
    setLocalRecipes(stored);
  }, []);

  // Debounce effect: wait 500ms after typing stops
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler); // Cleanup on new keystroke
  }, [searchTerm]);

  // Fetch from API using debounced value
  const { data, error } = useSWR(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedSearchTerm}`,
    fetcher
  );

  // Update recipe list when debounced value or data changes
  React.useEffect(() => {
    if (debouncedSearchTerm === "") {
      fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
        .then((res) => res.json())
        .then((apiData) => {
          const apiMeals = apiData.meals || [];
          updateRecipeList(apiMeals, localRecipes);
        });
    } else {
      const filteredLocal = localRecipes.filter(r =>
        r.strMeal && r.strMeal.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      const apiMeals = data && data.meals ? data.meals : [];
      updateRecipeList(apiMeals, filteredLocal);
    }
  }, [data, debouncedSearchTerm, updateRecipeList, localRecipes]);

  // Input change handler
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

      {debouncedSearchTerm &&
        data &&
        !data.meals &&
        localRecipes.filter(r => r.strMeal && r.strMeal.toLowerCase().includes(debouncedSearchTerm.toLowerCase())).length === 0 && (
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
