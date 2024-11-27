import { useEffect, useState } from 'react';
import axios from 'axios';


// Definisikan tipe data untuk Review
interface Review {
  id: number;    // ID dari review
  name: string;  // Nama pemberi review
  review: string; // Isi dari review
}


const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]); // State untuk menyimpan daftar review


  // Fetch data review saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Mengambil data dari API reviews
        const res = await axios.get('/api/reviews');
        setReviews(res.data); // Menyimpan data review ke dalam state
      } catch (error) {
        console.error('Error fetching reviews', error); // Menangani error jika fetch gagal
      }
    };


    fetchReviews(); // Panggil fungsi fetchReviews untuk mengambil data
  }, []); // Empty array memastikan efek ini hanya dijalankan sekali (pada mount pertama)


  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Reviews</h1>
      {/* Tabel untuk menampilkan data review */}
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Name</th>
            <th className="border-b p-2">Review</th>
          </tr>
        </thead>
        <tbody>
          {/* Render setiap review dalam tabel */}
          {reviews.map((review) => (
            <tr key={review.id}>
              <td className="border-b p-2">{review.name}</td> {/* Menampilkan nama pemberi review */}
              <td className="border-b p-2">{review.review}</td> {/* Menampilkan isi review */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Reviews;
