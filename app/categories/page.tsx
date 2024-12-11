"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@/components/container";
import Image from "next/image";

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([
    { id: 101, name: "Main Dishes", checked: false },
    { id: 102, name: "Desserts", checked: false },
    { id: 103, name: "Appetizers", checked: false },
    { id: 104, name: "Beverages", checked: false },
    { id: 105, name: "Snacks", checked: false },
  ]);

  const [apiCategories, setApiCategories] = useState<any[]>([]);
  const [allRecipes, setAllRecipes] = useState<any[]>([
    {
      id: 101,
      name: "Creamy Carbonara",
      image: "/img/recipes/carbonara.png",
      category: "Main Dishes",
      description: "Classic Italian pasta dish with creamy sauce and crispy bacon",
    },
    {
      id: 102,
      name: "Dragon Roll Sushi",
      image: "/img/recipes/sushi.png",
      category: "Main Dishes",
      description: "Japanese-style sushi roll with avocado and tempura shrimp",
    },
    {
      id: 103,
      name: "Chocolate Pudding",
      image: "/img/recipes/pudding.png",
      category: "Desserts",
      description: "Rich and creamy homemade chocolate pudding",
    },
    {
      id: 104,
      name: "Vanilla Bean Ice Cream",
      image: "/img/recipes/icecream.png",
      category: "Desserts",
      description: "Smooth and creamy vanilla ice cream with real vanilla beans",
    },
    {
      id: 105,
      name: "Mojito Cocktail",
      image: "/img/recipes/cocktail.png",
      category: "Beverages",
      description: "Refreshing mint and lime cocktail with white rum",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<any[]>([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchApiCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        const fetchedCategories = response.data.map((category, index) => ({
          id: category.id || `api-${index}`,
          name: category.name || `Category ${index + 1}`,
          checked: false,
        }));
        setApiCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchApiCategories();
  }, []);

  // Merge categories from API with local dummy categories
  useEffect(() => {
    const mergedCategories = [
      ...categories,
      ...apiCategories.filter(
        (apiCategory) => !categories.some((cat) => cat.name === apiCategory.name)
      ),
    ];
    setCategories(mergedCategories);
  }, [apiCategories]);

  // Fetch recipes from API and merge with dummy recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("/api/recipes");
        const fetchedRecipes = response.data.map((recipe) => ({
          id: recipe.id,
          name: recipe.title || "Unnamed Recipe",
          image: recipe.image_url || "/img/default.png",
          category:
            typeof recipe.category === "object"
              ? recipe.category.name
              : recipe.category || "Uncategorized",
          description: recipe.description || "No description provided.",
        }));
        setAllRecipes((prevRecipes) => [...prevRecipes, ...fetchedRecipes]);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleCategoryToggle = (categoryId: number | string) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === categoryId ? { ...cat, checked: !cat.checked } : cat
      )
    );
  };

  const toggleFavorite = (recipe: any) => {
    const updatedFavorites = favorites.some((fav) => fav.id === recipe.id)
      ? favorites.filter((fav) => fav.id !== recipe.id)
      : [...favorites, recipe];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  const filteredRecipes = allRecipes.filter((recipe) => {
    if (!recipe || !recipe.name || !recipe.description) {
      return false;
    }

    const matchesSearch =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

    const selectedCategories = categories
      .filter((cat) => cat.checked)
      .map((cat) => cat.name);

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(recipe.category);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white">
      <Container>
        <div className="flex flex-col md:flex-row gap-8 py-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <h2 className="text-2xl font-bold mb-6">Categories</h2>

            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-full p-2 pl-10 rounded-lg bg-[#2a2f3d] border-none text-white placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>

            {/* Category Filters */}
            <div className="space-y-3 mb-8">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={category.checked}
                    className="w-4 h-4 rounded border-gray-400 bg-[#2a2f3d] checked:bg-indigo-600"
                    onChange={() => handleCategoryToggle(category.id)}
                  />
                  <span className="text-gray-300">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">All Recipes</h1>
              <span className="text-gray-400">
                Showing {filteredRecipes.length} results
              </span>
            </div>

            {/* Recipe Cards */}
            <div className="space-y-4">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-[#1e2538] rounded-xl p-6 hover:bg-[#252a3d] transition-all duration-200"
                >
                  <div className="flex items-start gap-6">
                    {/* Image */}
                    <div className="w-32 h-32 relative flex-shrink-0">
                      <Image
                        src={recipe.image}
                        alt={recipe.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{recipe.name}</h3>
                        <span className="text-sm px-3 py-1 bg-[#2d3346] text-indigo-300 rounded">
                          {recipe.category}
                        </span>
                        <button
                          className={`ml-auto text-lg ${
                            favorites.some((fav) => fav.id === recipe.id)
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }`}
                          onClick={() => toggleFavorite(recipe)}
                        >
                          ★
                        </button>
                      </div>
                      <p className="text-gray-400">{recipe.description}</p>
                    </div>
                  </div>
                </div>
              ))}

              {filteredRecipes.length === 0 && (
                <div className="text-center py-12 text-gray-400 bg-[#1e2538] rounded-xl">
                  No recipes found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
} 