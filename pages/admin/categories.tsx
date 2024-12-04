import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { Plus, Loader2, Pencil, Trash2 } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editCategory, setEditCategory] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!newCategoryName.trim()) {
      setError('Category name cannot be empty');
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(
        '/api/categories',
        { name: newCategoryName.trim() },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setNewCategoryName('');
      setShowAddModal(false);
      await fetchCategories();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add category');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await axios.delete(`/api/categories?id=${id}`);
      await fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCategory) return;

    if (!editCategory.name.trim()) {
      setError('Category name cannot be empty');
      return;
    }

    setIsLoading(true);
    try {
      await axios.put(
        `/api/categories?id=${editCategory.id}`,
        { name: editCategory.name.trim() },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setEditCategory(null);
      await fetchCategories();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update category');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FF]">
      <Sidebar />
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm mb-6 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-indigo-600">Categories</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Add Category
            </button>
          </div>
        </div>

        {/* Categories Table */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-100">
                  <td className="p-4">{category.id}</td>
                  <td className="p-4">{category.name}</td>
                  <td className="p-4">
                    <button
                      onClick={() => setEditCategory({ id: category.id, name: category.name })}
                      className="text-blue-500 hover:underline"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-500 hover:underline ml-4"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Add New Category</h2>
              <form onSubmit={handleAddCategory}>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Category Name"
                  className="w-full p-2 border rounded mb-4"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowAddModal(false)}
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editCategory && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Edit Category</h2>
              <form onSubmit={handleUpdateCategory}>
                <input
                  type="text"
                  value={editCategory.name}
                  onChange={(e) =>
                    setEditCategory((prev) => (prev ? { ...prev, name: e.target.value } : null))
                  }
                  placeholder="Category Name"
                  className="w-full p-2 border rounded mb-4"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="flex justify-end">
                  <button
                    onClick={() => setEditCategory(null)}
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
