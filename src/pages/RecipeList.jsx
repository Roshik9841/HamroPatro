import useSWR from "swr";
import { Link } from "react-router-dom";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function RecipeList() {
  const { data, error, isLoading } = useSWR(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=",
    fetcher
  );

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error loading meals.</div>;

  return (
    <div className="w-[80%] bg-red-200 mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Recipes</h1>
      <div className="grid  grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6">
        {data.meals.map((meal) => (
          <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal}>
            <div className="bg-white shadow-md rounded-md  hover:shadow-xl ">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full  object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-bold">{meal.strMeal}</h2>
                <p className="text-sm text-gray-600 font-semibold">{meal.strCategory}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
