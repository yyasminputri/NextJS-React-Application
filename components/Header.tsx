// components/Header.tsx
import { Bars3Icon } from '@heroicons/react/24/outline' // Ganti MenuIcon dengan Bars3Icon

const Header = () => {
  return (
    <header className="bg-gray-800 text-white flex items-center justify-between p-4">
      <div className="flex items-center">
        <Bars3Icon className="w-6 h-6 mr-4" /> {/* Menggunakan Bars3Icon */}
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </div>
      <button className="bg-blue-500 px-4 py-2 rounded-md">Log Out</button>
    </header>
  )
}

export default Header
