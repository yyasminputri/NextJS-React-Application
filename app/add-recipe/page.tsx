"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@/components/Container";

export default function Recipes() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);  // State for categories
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    description: "",
    instructions: "",
    image_url: "",
    category_id: "",  // Category ID for the dropdown
  });

  useEffect(() => {
    // Fetch recipes when component mounts
    const fetchRecipes = async () => {
      const response = await axios.get("/api/recipes");
      setRecipes(response.data);
    };

    // Fetch categories
    const fetchCategories = async () => {
      const response = await axios.get("/api/categories"); // Make sure the API endpoint exists
      setCategories(response.data);
    };

    fetchRecipes();
    fetchCategories();
  }, []);

  // Handle changes in form input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRecipe({
      ...newRecipe,
      [name]: value,
    });
  };

  // Handle form submission to add new recipe
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/recipes", newRecipe);
      setRecipes([...recipes, response.data]);  // Update state with new recipe
      setNewRecipe({
        title: "",
        ingredients: "",
        description: "",
        instructions: "",
        image_url: "",
        category_id: "",  // Reset category_id after submission
      });  // Reset form after submission
    } catch (error) {
      console.error("Failed to add recipe:", error);
    }
  };

  return (
    <>
      <Container>
        <div className="text-center my-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
            Add a New Recipe
          </h1>
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={newRecipe.title}
                onChange={handleChange}
                name="title"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                value={newRecipe.description}
                onChange={handleChange}
                name="description"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ingredients
              </label>
              <textarea
                value={newRecipe.ingredients}
                onChange={handleChange}
                name="ingredients"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter ingredients"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Instructions
              </label>
              <textarea
                value={newRecipe.instructions}
                onChange={handleChange}
                name="instructions"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter instructions"
              />
            </div>

            <div>
              <label
                htmlFor="image_url"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Image URL
              </label>
              <input
                id="image_url"
                type="text"
                value={newRecipe.image_url}
                onChange={handleChange}
                name="image_url"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter image URL"
              />
            </div>

            {/* Category dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                name="category_id"
                value={newRecipe.category_id}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
              >
                Add Recipe
              </button>
            </div>
          </form>
        </div>

        {/* Display added recipes below */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Recipes</h2>
          {recipes.length > 0 ? (
            <div className="space-y-6 mt-6">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{recipe.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{recipe.description}</p>
                  <div className="mt-4">
                    <img src={recipe.image_url} alt={recipe.title} className="w-full h-64 object-cover rounded-lg" />
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-800 dark:text-white">Ingredients: {recipe.ingredients}</p>
                    <p className="text-gray-800 dark:text-white">Instructions: {recipe.instructions}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-300">No recipes added yet.</p>
          )}
        </div>
      </Container>
    </>
  );
}
