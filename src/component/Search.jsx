import React from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Search({ updateRecipeList }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const { data, error } = useSWR(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`,
    fetcher
  );

  React.useEffect(() => {
    if (data && data.meals) {
      updateRecipeList(data.meals);
    } else if (searchTerm && data && !data.meals) {
      updateRecipeList([]);
    }
  }, [data]);

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

      {error && (
        <div className="mt-4 text-center text-red-500">
          Error searching recipes: {error.message}
        </div>
      )}
    </div>
  );
}
