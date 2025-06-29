import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeList from "./pages/RecipeList";
import RecipeDetail from "./pages/RecipeDetail";
import AddRecipeForm from "./component/AddRecipeForm";
import EditRecipeForm from "./component/EditRecipeForm";

export default function App() {
  return (
    <BrowserRouter basename="/HamroPatro/">
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/add-recipe" element={<AddRecipeForm />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />

        <Route path="/edit-recipe/:id" element={<EditRecipeForm />} />
      </Routes>
    </BrowserRouter>
  );
}