import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeList from "./pages/RecipeList";
import RecipeDetail from "./pages/RecipeDetail";
import EditRecipeForm from "./pages/EditRecipeForm";
import AddRecipeForm from "./component/AddRecipeForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<AddRecipeForm />} />
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/edit/:id" element={<EditRecipeForm />} />
      </Routes>
    </BrowserRouter>
  );
}