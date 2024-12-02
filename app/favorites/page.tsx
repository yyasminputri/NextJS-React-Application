"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/container";
import Image from "next/image";
import axios from "axios";

interface Recipe {
  id: number;
  name: string;
  description: string;
  category: string;
  logo: string;
  year: number;
}

interface Category {
  id: number;
  name: string;
  checked: boolean;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch favorites from API
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("/api/favorites"); // Update endpoint if needed
        console.log("Fetched favorites:", res.data);
        setFavorites(res.data);

        // Extract unique categories from favorites
        const uniqueCategories = Array.from(
          new Set(res.data.map((item: Recipe) => item.category))
        ).map((category, index) => ({
          id: index,
          name: category,
          checked: false,
        }));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const getDishesFromCategories = (numDishes: number) => {
    const categoryMap: { [key: string]: Recipe[] } = {};

    favorites.forEach((recipe) => {
      if (!categoryMap[recipe.category]) {
        categoryMap[recipe.category] = [];
      }
      categoryMap[recipe.category].push(recipe);
    });

    const selectedDishes: Recipe[] = [];
    Object.values(categoryMap).forEach((recipes) => {
      selectedDishes.push(...recipes.slice(0, numDishes));
    });

    return selectedDishes;
  };

  const selectedDishes = getDishesFromCategories(3); // Select up to 3 dishes from each category

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Favorite Dishes</h1>
          </div>

          {/* Recipe Cards */}
          <div className="space-y-4">
            {selectedDishes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-[#1e2538] rounded-xl p-6 hover:bg-[#252a3d] transition-all duration-200"
              >
                <div className="flex items-start gap-6">
                  {/* Logo */}
                  <div className="w-32 h-32 relative flex-shrink-0">
                    <Image
                      src={recipe.logo}
                      alt={recipe.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                      onError={(e) => {
                        e.currentTarget.src = "/fallback-image.png";
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{recipe.name}</h3>
                      <span className="text-gray-400 text-sm px-2 py-1 bg-[#2a2f3d] rounded">
                        {recipe.year}
                      </span>
                      <span className="text-sm px-3 py-1 bg-[#2d3346] text-indigo-300 rounded">
                        {recipe.category}
                      </span>
                    </div>
                    <p className="text-gray-400">{recipe.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {selectedDishes.length === 0 && (
              <div className="text-center py-12 text-gray-400 bg-[#1e2538] rounded-xl">
                No favorite dishes found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}