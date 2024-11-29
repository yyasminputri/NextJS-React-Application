// File: pages/api/reviews/[id].js
import { Review } from '../../../sequelize';

export default async function handler(req, res) {
  const { id } = req.query;

  // Handle DELETE request
  if (req.method === 'DELETE') {
    try {
      const review = await Review.findByPk(id);
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }

      await review.destroy();
      return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      return res.status(500).json({ error: 'Failed to delete review' });
    }
  }

  // Handle PUT request
  if (req.method === 'PUT') {
    try {
      const { name, review: reviewText } = req.body;

      if (!name || !reviewText) {
        return res.status(400).json({ error: 'Name and review are required' });
      }

      const reviewData = await Review.findByPk(id);
      if (!reviewData) {
        return res.status(404).json({ error: 'Review not found' });
      }

      await reviewData.update({ 
        name: name.trim(),
        review: reviewText.trim()
      });
      return res.status(200).json(reviewData);
    } catch (error) {
      console.error('Error updating review:', error);
      return res.status(500).json({ error: 'Failed to update review' });
    }
  }

  res.setHeader('Allow', ['DELETE', 'PUT']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}