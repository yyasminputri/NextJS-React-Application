// pages/api/users.js
import { User } from '../../sequelize'; // Impor model User

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Mengambil semua data pengguna dari tabel Users
      const users = await User.findAll();
      return res.status(200).json(users); // Mengembalikan data pengguna dalam format JSON
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Failed to fetch users' }); // Menangani error jika terjadi kesalahan
    }
  } else {
    res.status(405).send('Method Not Allowed'); // Jika request bukan GET
  }
}
