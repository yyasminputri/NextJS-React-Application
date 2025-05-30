"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/container";
import Image from "next/image";

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white">
      <Container>
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-8">Favorite Recipes</h1>

          <div className="space-y-4">
            {favorites.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-[#1e2538] rounded-xl p-6 hover:bg-[#252a3d] transition-all duration-200"
              >
                <div className="flex items-start gap-6">
                  {/* Gambar */}
                  <div className="w-32 h-32 relative flex-shrink-0">
                    <Image
                      src={
                        recipe.logo || 
                        recipe.image || 
                        recipe.image_url || 
                        "/img/default.png" 
                      }
                      alt={recipe.name || "Unnamed Recipe"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{recipe.name || "Unnamed Recipe"}</h3>
                      <span className="text-sm px-3 py-1 bg-[#2d3346] text-indigo-300 rounded">
                        {recipe.category || "Uncategorized"}
                      </span>
                    </div>
                    <p className="text-gray-400">{recipe.description || "No description provided."}</p>
                  </div>
                </div>
              </div>
            ))}

            {favorites.length === 0 && (
              <div className="text-center py-12 text-gray-400 bg-[#1e2538] rounded-xl">
                No favorite recipes found.
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}