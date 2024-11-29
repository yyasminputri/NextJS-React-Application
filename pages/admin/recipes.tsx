// File: pages/admin/recipes.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { Plus, Loader2, Pencil, Trash2 } from 'lucide-react';

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
  category: Category;
}

interface NewRecipe {
  title: string;
  ingredients: string;
  description: string;
  instructions: string;
  image_url: string;
  category_id: string;
  id?: number;
}

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [newRecipe, setNewRecipe] = useState<NewRecipe>({
    title: '',
    ingredients: '',
    description: '',
    instructions: '',
    image_url: '',
    category_id: ''
  });

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get('/api/recipes');
      setRecipes(res.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!newRecipe.title.trim() || !newRecipe.category_id) {
        setError('Title and Category are required');
        return;
      }

      if (newRecipe.id) {
        await axios.put(`/api/recipes/${newRecipe.id}`, newRecipe, {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        await axios.post('/api/recipes', newRecipe, {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      setNewRecipe({
        title: '',
        ingredients: '',
        description: '',
        instructions: '',
        image_url: '',
        category_id: ''
      });
      setShowAddModal(false);
      await fetchRecipes();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to save recipe');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setNewRecipe({
      title: recipe.title,
      ingredients: recipe.ingredients,
      description: recipe.description,
      instructions: recipe.instructions,
      image_url: recipe.image_url,
      category_id: recipe.category.id.toString(),
      id: recipe.id
    });
    setShowAddModal(true);
  };

  const handleDeleteRecipe = async (id: number) => {
    try {
      if (window.confirm('Are you sure you want to delete this recipe?')) {
        await axios.delete(`/api/recipes/${id}`);
        await fetchRecipes();
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FF]">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header Card */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm mb-6 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Recipes
              </h1>
              <p className="text-gray-500 mt-1">Manage your recipes collection</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Plus size={20} />
              Add Recipe
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="max-w-7xl mx-auto mb-6">
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">Recipe Title</th>
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">Category</th>
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">Description</th>
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">Image</th>
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe) => (
                  <tr key={recipe.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-6 text-sm text-gray-600">{recipe.title}</td>
                    <td className="p-6 text-sm text-gray-600">{recipe.category?.name || 'No Category'}</td>
                    <td className="p-6 text-sm text-gray-600">{recipe.description}</td>
                    <td className="p-6">
                      {recipe.image_url ? (
                        <img src={recipe.image_url} alt={recipe.title} className="w-16 h-16 rounded-lg object-cover" />
                      ) : (
                        <span className="text-sm text-gray-500">No Image</span>
                      )}
                    </td>
                    <td className="p-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditRecipe(recipe)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteRecipe(recipe.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Recipe Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center overflow-y-auto">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl m-4">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {newRecipe.id ? 'Edit Recipe' : 'Add New Recipe'}
                </h2>
                <form onSubmit={handleAddRecipe} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={newRecipe.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Recipe Title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        name="category_id"
                        value={newRecipe.category_id}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id.toString()}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={newRecipe.description}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of the recipe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
                    <textarea
                      name="ingredients"
                      value={newRecipe.ingredients}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="List the ingredients"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                    <textarea
                      name="instructions"
                      value={newRecipe.instructions}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Step by step instructions"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="text"
                      name="image_url"
                      value={newRecipe.image_url}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter image URL"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Recipe'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;