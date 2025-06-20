import { Link } from "react-router-dom";

export default function Recipe({recipe}) {
  return (
    <>

    {/* api ra localhost dubai ko value recipe bata pass garyo ani yeta bata display 
    garyo dherai boilerplate hudaina yesari */}
      <Link to={`/recipe/${recipe.idMeal}`} key={recipe.idMeal}>
        <div className="bg-white shadow-md rounded-md hover:shadow-xl cursor-pointer">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-60 object-cover rounded-3xl mx-auto"
          />
          <div className="p-4">
            <h2 className="text-lg font-bold">{recipe.strMeal}</h2>
            <p className="text-sm text-[#E15A0C] font-semibold">
              View Recipe →
            </p>
            {recipe.ingredients && (
              <ul className="mb-2">
                {recipe.ingredients.map((item, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    {item.ingredient} - {item.measurement}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}
