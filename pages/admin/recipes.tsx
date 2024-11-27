import { useEffect, useState } from 'react';
import axios from 'axios';

// Definisikan tipe data untuk category dan recipe
interface Category {
  id: number;
  name: string;
}

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  description: string;
  instructions: string;
  image_url: string;
  category: Category; // Menyertakan relasi kategori
}

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Set tipe data

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get('/api/recipes');
        setRecipes(res.data);
      } catch (error) {
        console.error('Error fetching recipes', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Recipes</h1>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Recipe Title</th>
            <th className="border-b p-2">Category</th>
            <th className="border-b p-2">Ingredients</th>
            <th className="border-b p-2">Description</th>
            <th className="border-b p-2">Instructions</th>
            <th className="border-b p-2">Image</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td className="border-b p-2">{recipe.title}</td>
              <td className="border-b p-2">{recipe.category?.name || 'No Category'}</td>
              <td className="border-b p-2">{recipe.ingredients}</td>
              <td className="border-b p-2">{recipe.description}</td>
              <td className="border-b p-2">{recipe.instructions}</td>
              <td className="border-b p-2">
                {recipe.image_url ? (
                  <img src={recipe.image_url} alt={recipe.title} className="w-16 h-16 object-cover" />
                ) : (
                  'No Image'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recipes;
