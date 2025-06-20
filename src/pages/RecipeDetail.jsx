import { useParams, Link } from "react-router-dom";
import useSWR from "swr";
import React,{useState,useEffect} from "react";
import RecipeLayout from "../component/RecipeLayout";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function RecipeDetail() {
  const { id } = useParams();
  const [localRecipe, setLocalRecipe] = useState(null);

  const { data, error, isLoading } = useSWR(
    !localRecipe ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : null,

    fetcher
  );

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("localRecipes") || "[]");
    const found = stored.find((r) => r.idMeal === id);
    if (found) setLocalRecipe(found);
  }, [id]);

  const recipe = localRecipe || data?.meals?.[0];

  if (isLoading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">Error loading recipe.</div>;
  if (!recipe) return <div className="text-center mt-10">Recipe not found.</div>;

  return <RecipeLayout recipe={recipe} />;
}

