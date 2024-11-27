import { Review } from '../../sequelize'; // Impor model Review


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Mengambil semua data review dari tabel Reviews
      const reviews = await Review.findAll(); // Query ke database
      return res.status(200).json(reviews); // Mengembalikan data review dalam format JSON
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Jika terjadi error, return response 500 (Internal Server Error)
      return res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  } else {
    // Jika request bukan GET, kirimkan response 405 (Method Not Allowed)
    res.status(405).send('Method Not Allowed');
  }
}
