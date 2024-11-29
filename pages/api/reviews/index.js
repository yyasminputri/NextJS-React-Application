// File: pages/api/reviews/index.js
import { Review } from '../../../sequelize';

export default async function handler(req, res) {
  // Handle GET request to fetch all reviews
  if (req.method === 'GET') {
    try {
      const reviews = await Review.findAll();
      return res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  }

  // Handle POST request to create a new review
  if (req.method === 'POST') {
    try {
      const { name, review } = req.body;

      if (!name || !review) {
        return res.status(400).json({ error: 'Name and review are required' });
      }

      const newReview = await Review.create({
        name: name.trim(),
        review: review.trim()
      });
      
      return res.status(201).json(newReview);
    } catch (error) {
      console.error('Error creating review:', error);
      return res.status(500).json({ error: 'Failed to create review' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}