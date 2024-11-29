// File: pages/admin/reviews.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { Plus, Loader2, Pencil, Trash2 } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  review: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', review: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editReview, setEditReview] = useState<Review | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('/api/reviews');
      setReviews(res.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (!newReview.name.trim() || !newReview.review.trim()) {
        setError('Name and review cannot be empty');
        return;
      }

      await axios.post('/api/reviews', {
        name: newReview.name.trim(),
        review: newReview.review.trim()
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setNewReview({ name: '', review: '' });
      setShowAddModal(false);
      await fetchReviews();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to add review');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`/api/reviews/${id}`);
        await fetchReviews();
      } catch (error: any) {
        console.error('Error deleting review:', error);
        setError(error.response?.data?.message || 'Failed to delete review');
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editReview) return;

    setIsLoading(true);
    try {
      await axios.put(`/api/reviews/${editReview.id}`, {
        name: editReview.name.trim(),
        review: editReview.review.trim()
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setEditReview(null);
      await fetchReviews();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update review');
    } finally {
      setIsLoading(false);
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
                Reviews
              </h1>
              <p className="text-gray-500 mt-1">Manage customer reviews</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Plus size={20} />
              Add Review
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

        {/* Table Card */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">ID</th>
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">Name</th>
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">Review</th>
                  <th className="text-left p-6 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-6 text-sm text-gray-600">{review.id}</td>
                    <td className="p-6 text-sm text-gray-600">{review.name}</td>
                    <td className="p-6 text-sm text-gray-600">{review.review}</td>
                    <td className="p-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditReview(review)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
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

        {/* Edit Review Modal */}
        {editReview && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md m-4">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Edit Review
                </h2>
                <form onSubmit={handleUpdate}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={editReview.name}
                        onChange={(e) => setEditReview({ ...editReview, name: e.target.value })}
                        placeholder="Customer Name"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                      <textarea
                        value={editReview.review}
                        onChange={(e) => setEditReview({ ...editReview, review: e.target.value })}
                        placeholder="Review content"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      />
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setEditReview(null)}
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

        {/* Add Review Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md m-4">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Add New Review
                </h2>
                <form onSubmit={handleAddReview}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={newReview.name}
                        onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Customer Name"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                      <textarea
                        value={newReview.review}
                        onChange={(e) => setNewReview(prev => ({ ...prev, review: e.target.value }))}
                        placeholder="Write review here..."
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      />
                    </div>
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

export default Reviews;