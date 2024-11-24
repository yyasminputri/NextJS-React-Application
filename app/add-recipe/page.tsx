"use client";

import { useState } from "react";
import axios from "axios";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";

export default function AddRecipe() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/recipes", {
        name,
        description,
        ingredients,
        steps,
        image,
      });
      setMessage("Recipe added successfully!");
      setName("");
      setDescription("");
      setIngredients([]);
      setSteps([]);
      setImage("");
    } catch (error: any) {
      setMessage("Failed to add recipe.");
    }
  };

  const handleArrayChange = (
    index: number,
    value: string,
    setArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setArray((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addToArray = (setArray: React.Dispatch<React.SetStateAction<string[]>>) => {
    setArray((prev) => [...prev, ""]);
  };

  return (
    <>
      
      <Container>
        <div className="text-center my-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
            Add a New Recipe
          </h1>
          {message && (
            <p className="mt-4 text-center text-red-500">{message}</p>
          )}
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ingredients
              </label>
              {ingredients.map((ingredient, index) => (
                <input
                  key={index}
                  type="text"
                  value={ingredient}
                  onChange={(e) =>
                    handleArrayChange(index, e.target.value, setIngredients)
                  }
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder={`Ingredient ${index + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={() => addToArray(setIngredients)}
                className="mt-2 w-full rounded-md bg-indigo-600 py-1 px-2 text-white hover:bg-indigo-700"
              >
                Add Ingredient
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Steps
              </label>
              {steps.map((step, index) => (
                <textarea
                  key={index}
                  value={step}
                  onChange={(e) => handleArrayChange(index, e.target.value, setSteps)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder={`Step ${index + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={() => addToArray(setSteps)}
                className="mt-2 w-full rounded-md bg-indigo-600 py-1 px-2 text-white hover:bg-indigo-700"
              >
                Add Step
              </button>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Image URL
              </label>
              <input
                id="image"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
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
      </Container>
    </>
  );
}