import React from "react";

export default function Search({ allMeals, setFilteredMeals }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e) => {
    const searchInput = e.target.value;
    setSearchTerm(searchInput);
    const filteredMeals = allMeals.filter(meal => meal.strMeal.toLowerCase().includes(searchInput.toLowerCase()))
    setFilteredMeals(filteredMeals);
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

    </div>
  );
}
