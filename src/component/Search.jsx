import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading } = useSWR(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`,
    fetcher
  );

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

      {searchTerm && data && data.meals && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-3">
            Search Results for "{searchTerm}"
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.meals.map((meal) => (
            
                <div
                  className="bg-white shadow-md rounded-md  hover:shadow-xl  "
                  key={meal.id}
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full object-cover rounded-3xl"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold">{meal.strMeal}</h2>
                    <p className="text-sm text-[#E15A0C] font-semibold">
                      View Recipe →{" "}
                    </p>
                  </div>
                </div>
         
            ))}
          </div>
        </div>
      )}

      {searchTerm && data && !data.meals && (
        <div className="mt-4 text-center text-gray-600">
          No recipes found for "{searchTerm}"
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-red-500">
          Error searching recipes: {error.message}
        </div>
      )}
    </div>
  );
}
