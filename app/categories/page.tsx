"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import Image from "next/image";

export default function Categories() {
  // Data kategori
  const categories = [
    { id: 1, name: "Main Dishes", image: "/img/categories/appetizer.png" },
    { id: 2, name: "Desserts", image: "/img/categories/appetizer.png" },
    { id: 3, name: "Appetizers", image: "/img/categories/appetizer.png" },
    { id: 4, name: "Beverages", image: "/img/categories/appetizer.png" },
    { id: 5, name: "Snacks", image: "/img/categories/appetizer.png" },
  ];

  // Data makanan berdasarkan kategori
  const categoryData: { [key: string]: string[] } = {
    "Main Dishes": [
      "Grilled Salmon with Lemon Butter Sauce",
      "Spaghetti Carbonara",
      "Beef Wellington",
      "Chicken Alfredo",
      "Vegetarian Lasagna",
    ],
    Desserts: [
      "Chocolate Lava Cake",
      "Strawberry Cheesecake",
      "Tiramisu",
      "Macarons",
      "Matcha Ice Cream",
    ],
    Appetizers: [
      "Bruschetta",
      "Stuffed Mushrooms",
      "Garlic Breadsticks",
      "Mini Quiches",
      "Caprese Skewers",
    ],
    Beverages: [
      "Iced Matcha Latte",
      "Mango Smoothie",
      "Classic Mojito",
      "Strawberry Lemonade",
      "Espresso Martini",
    ],
    Snacks: [
      "Nachos with Cheese Dip",
      "Honey Roasted Almonds",
      "Popcorn Chicken",
      "Veggie Chips",
      "Mini Tacos",
    ],
  };

  // State untuk kategori yang dipilih (toggle behavior)
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // Fungsi untuk toggle daftar makanan
  const handleToggle = (categoryName: string) => {
    setOpenCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
    <>
      

      <Container>
        {/* Header */}
        <div className="text-center my-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
            Explore Recipes by Categories
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            Click on a category to explore delicious recipes.
          </p>
        </div>

        {/* List Categories Vertikal */}
        <div className="space-y-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              {/* Gambar Kategori */}
              <div className="relative w-full h-48">
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="fill"
                  objectFit="contain"
                  className="p-4"
                />
              </div>

              {/* Nama Kategori */}
              <div className="p-4 text-center">
                <h3
                  onClick={() => handleToggle(category.name)}
                  className="text-xl font-semibold text-gray-800 dark:text-white cursor-pointer"
                >
                  {category.name}
                </h3>
              </div>

              {/* Daftar Makanan (toggleable) */}
              {openCategory === category.name && (
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Recipes in {category.name}:
                  </h4>
                  <ul className="space-y-2">
                    {categoryData[category.name]?.map((recipe, index) => (
                      <li
                        key={index}
                        className="p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm hover:bg-indigo-100 dark:hover:bg-indigo-600 transition"
                      >
                        {recipe}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>

      
    </>
  );
}
