// pages/api/categories.js
import { Category } from '../../sequelize';  // Mengimpor Category dari sequelize.js yang ada di root

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Mengambil semua kategori dari database
      const categories = await Category.findAll();  // Menggunakan Category langsung dari sequelize.js
      return res.status(200).json(categories);  // Mengembalikan kategori dalam bentuk JSON
    } catch (error) {
      console.error('Error fetching categories:', error);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
  } else {
    res.status(405).send('Method Not Allowed');  // Jika metode bukan GET, kirimkan 405
  }
}
