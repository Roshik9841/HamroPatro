import useSWR from "swr";

import Search from "../component/Search";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function RecipeList() {
  const { data, error, isLoading } = useSWR(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=",
    fetcher
  );

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error loading meals.</div>;

  return (
    <div className="w-[80%] mx-auto p-6 ">
      <h1 className="text-3xl font-bold text-center mb-6">All Recipes</h1>
     <Search/>
      <div className="grid  grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6 ">
        {data.meals.map((meal) => (
         
            <div className="bg-white shadow-md rounded-md  hover:shadow-xl ">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full object-cover rounded-3xl" />
              <div className="p-4">
                <h2 className="text-lg font-bold">{meal.strMeal}</h2>
                <p className="text-sm text-[#E15A0C] font-semibold">View Recipe → </p>
              </div>
            </div>
       
        ))}
      </div>
    </div>
  );
}
