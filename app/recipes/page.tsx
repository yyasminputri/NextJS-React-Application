"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Recipes() {
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get("/api/recipes");
      setRecipes(response.data);
    };

    fetchRecipes();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 py-12 px-6">
      <h1 className="text-2xl font-bold">Recipes</h1>
      <div className="mt-6 w-full max-w-3xl">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="mb-4 rounded-lg bg-white p-4 shadow"
          >
            <img src={recipe.image} alt={recipe.name} className="mb-2 w-full rounded-md" />
            <h2 className="text-lg font-bold">{recipe.name}</h2>
            <p className="text-sm text-gray-600">{recipe.description}</p>
            <h3 className="mt-2 font-bold">Ingredients:</h3>
            <ul className="list-disc pl-6">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3 className="mt-2 font-bold">Steps:</h3>
            <ol className="list-decimal pl-6">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}