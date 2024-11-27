// pages/admin/users.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

// Definisikan tipe data untuk User
interface User {
  id: number;
  email: string;
  password: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]); // State untuk menyimpan daftar pengguna

  // Fetch data pengguna saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users'); // Mengambil data dari API users
        setUsers(res.data); // Menyimpan data pengguna ke dalam state
      } catch (error) {
        console.error('Error fetching users:', error); // Menangani error jika fetch gagal
      }
    };

    fetchUsers(); // Panggil fungsi fetchUsers untuk mengambil data
  }, []); // Empty array memastikan efek ini hanya dijalankan sekali (pada mount pertama)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Users</h1>
      {/* Tabel untuk menampilkan data pengguna */}
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Email</th>
            <th className="border-b p-2">Password</th>
          </tr>
        </thead>
        <tbody>
          {/* Render setiap pengguna dalam tabel */}
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border-b p-2">{user.email}</td> {/* Menampilkan email pengguna */}
              <td className="border-b p-2">{user.password}</td> {/* Menampilkan password pengguna */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
