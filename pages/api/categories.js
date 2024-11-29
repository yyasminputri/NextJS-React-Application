// pages/api/categories.js
import { Category } from '../../sequelize';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const categories = await Category.findAll();
      return res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
  } 
  else if (req.method === 'POST') {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }

      const newCategory = await Category.create({ name: name.trim() });
      return res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      return res.status(500).json({ error: 'Failed to create category' });
    }
  }
  else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      await category.destroy();
      return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error);
      return res.status(500).json({ error: 'Failed to delete category' });
    }
  }
  else if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }

      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      await category.update({ name: name.trim() });
      return res.status(200).json(category);
    } catch (error) {
      console.error('Error updating category:', error);
      return res.status(500).json({ error: 'Failed to update category' });
    }
  }
  else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}