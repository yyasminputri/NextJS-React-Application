import { NextRequest, NextResponse } from "next/server";

// Dummy data untuk sementara (gunakan database di implementasi nyata)
let recipes = [
  {
    id: 1,
    name: "Nasi Goreng",
    description: "Nasi goreng dengan bumbu rempah",
    ingredients: ["Nasi", "Bawang merah", "Bawang putih", "Kecap"],
    steps: ["Panaskan wajan", "Tumis bawang", "Masukkan nasi", "Tambahkan kecap"],
    image: "/placeholder.jpg",
  },
];

// GET: Fetch all recipes
export async function GET() {
  return NextResponse.json(recipes);
}

// POST: Add a new recipe
export async function POST(request: NextRequest) {
  const body = await request.json();
  const newRecipe = { id: recipes.length + 1, ...body };
  recipes.push(newRecipe);
  return NextResponse.json(newRecipe, { status: 201 });
}

// PUT: Update a recipe
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === body.id);
  if (recipeIndex === -1) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }
  recipes[recipeIndex] = body;
  return NextResponse.json(body);
}

// DELETE: Delete a recipe
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  recipes = recipes.filter((recipe) => recipe.id !== id);
  return NextResponse.json({ message: "Recipe deleted" });
}