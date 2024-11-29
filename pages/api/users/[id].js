// File: pages/api/users/[id].js
import { User } from '../../../sequelize';

export default async function handler(req, res) {
  const { id } = req.query;

  // Handle DELETE request
  if (req.method === 'DELETE') {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ error: 'Failed to delete user' });
    }
  }

  // Handle PUT request
  if (req.method === 'PUT') {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.update({ email, password });
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Failed to update user' });
    }
  }

  res.setHeader('Allow', ['DELETE', 'PUT']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}