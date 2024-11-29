// File: pages/api/recipes/[id].js
import { Recipe, Category } from '../../../sequelize';

export default async function handler(req, res) {
  const { id } = req.query;

  // Handle PUT request to update a recipe
  if (req.method === 'PUT') {
    try {
      const { title, ingredients, description, instructions, image_url, category_id } = req.body;

      if (!title || !category_id) {
        return res.status(400).json({ error: 'Title and category are required' });
      }

      const recipe = await Recipe.findByPk(id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      await recipe.update({
        title: title.trim(),
        ingredients,
        description,
        instructions,
        image_url,
        category_id: parseInt(category_id)
      });

      const updatedRecipe = await Recipe.findByPk(id, {
        include: [{
          model: Category,
          as: 'category'
        }]
      });

      return res.status(200).json(updatedRecipe);
    } catch (error) {
      console.error('Error updating recipe:', error);
      return res.status(500).json({ error: 'Failed to update recipe' });
    }
  }

  // Handle DELETE request
  if (req.method === 'DELETE') {
    try {
      const recipe = await Recipe.findByPk(id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      await recipe.destroy();
      return res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      console.error('Error deleting recipe:', error);
      return res.status(500).json({ error: 'Failed to delete recipe' });
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}