"use client";

import { useState } from 'react';
import { Container } from "@/components/Container";
import axios from 'axios';

export default function Review() {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation check for name and review fields
    if (!name || !review) {
      setError('Both name and review are required.');
      return;
    }

    try {
      // Sending POST request to API to create a new review
      const response = await axios.post('/api/reviews', {
        name,
        review,
      });
      
      // Success message after review is created
      setSuccessMessage('Review submitted successfully!');
      setError('');
      setName('');
      setReview('');
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review.');
    }
  };

  return (
    <Container>
      <div className="text-center my-12">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
          Add Review
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
          Share your experience with our recipes and help others discover great food!
        </p>
      </div>

      {/* Form Review */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter your name"
            />
          </div>
          
          {/* Review Input */}
          <div>
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Review
            </label>
            <textarea
              id="review"
              name="review"
              rows={4}
              required
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white resize-none"
              placeholder="Write your review here..."
            ></textarea>
          </div>

          {/* Error or Success Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition font-medium"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}
