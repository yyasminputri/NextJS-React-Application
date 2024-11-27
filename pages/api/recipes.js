// pages/api/recipes.js
import { Recipe, Category } from '../../sequelize';  // Mengimpor Recipe dan Category dari sequelize.js

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Mengambil semua resep dari database, beserta kategori terkait
      const recipes = await Recipe.findAll({
        include: {
          model: Category,  // Menggabungkan kategori dengan resep
          // Do not specify the alias here, as the association is already defined with 'Category'
        },
      });
      return res.status(200).json(recipes);  // Mengembalikan resep dalam bentuk JSON
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  } else {
    res.status(405).send('Method Not Allowed');  // Jika metode bukan GET, kirimkan 405
  }
}
