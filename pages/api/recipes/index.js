// File: pages/api/recipes/index.js
import { Recipe, Category } from '../../../sequelize';

export default async function handler(req, res) {
  // Handle GET request to fetch all recipes
  if (req.method === 'GET') {
    try {
      const recipes = await Recipe.findAll({
        include: [{
          model: Category,
          as: 'category'
        }]
      });
      return res.status(200).json(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  }

  // Handle POST request to create a new recipe
  if (req.method === 'POST') {
    try {
      const { title, ingredients, description, instructions, image_url, category_id } = req.body;
      
      if (!title || !category_id) {
        return res.status(400).json({ error: 'Title and category are required' });
      }

      const newRecipe = await Recipe.create({
        title: title.trim(),
        ingredients,
        description,
        instructions,
        image_url,
        category_id: parseInt(category_id)
      });

      const recipeWithCategory = await Recipe.findByPk(newRecipe.id, {
        include: [{
          model: Category,
          as: 'category'
        }]
      });

      return res.status(201).json(recipeWithCategory);
    } catch (error) {
      console.error('Error creating recipe:', error);
      return res.status(500).json({ error: 'Failed to create recipe' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}