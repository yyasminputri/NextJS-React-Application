import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar'
import { Plus, Loader2, Pencil, Trash2, Home, Users, BarChart3, FolderOpen, Book } from 'lucide-react';

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
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (!newCategoryName.trim()) {
        setError('Category name cannot be empty');
        return;
      }

      await axios.post('/api/categories', {
        name: newCategoryName.trim()
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setNewCategoryName('');
      setShowAddModal(false);
      await fetchCategories();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to add category');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`/api/categories?id=${id}`);
        await fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCategory) return;

    setIsLoading(true);
    try {
      await axios.put(`/api/categories?id=${editCategory.id}`, {
        name: editCategory.name.trim()
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setEditCategory(null);
      await fetchCategories();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update category');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FF]">
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <div className="flex-1 p-8">
      {/* Header Card */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm mb-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Categories
            </h1>
            <p className="text-gray-500 mt-1">Manage your categories</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Plus size={20} />
            Add Category
          </button>
        </div>
      </div>

      {/* Table Card */}
              <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">ID</th>
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">Name</th>
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-6 text-sm text-gray-600">{category.id}</td>
                    <td className="p-6 text-sm text-gray-600">{category.name}</td>
                    <td className="p-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditCategory({ id: category.id, name: category.name })}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
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


      {/* Edit Category Modal */}
      {editCategory && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md m-4">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Edit Category
              </h2>
              <form onSubmit={handleUpdate}>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editCategory.name}
                    onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                    placeholder="Category Name"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setEditCategory(null)}
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
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}


      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md m-4">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Add New Category
              </h2>
              <form onSubmit={handleAddCategory}>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Category Name"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
                </div>
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
                      'Save'
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

export default Categories;