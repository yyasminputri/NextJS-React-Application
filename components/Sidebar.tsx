import Link from 'next/link'; // Import Link for navigation
import { HomeIcon, UsersIcon, ChartBarIcon, FolderIcon, BookOpenIcon } from '@heroicons/react/24/outline'; // Use BookOpenIcon for recipes

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
      <ul>
        <li className="flex items-center mb-4">
          <HomeIcon className="w-5 h-5 mr-2" />
          <Link href="/admin">Dashboard</Link>
        </li>
        <li className="flex items-center mb-4">
          <UsersIcon className="w-5 h-5 mr-2" />
          <Link href="/admin/users">Users</Link>
        </li>
        <li className="flex items-center mb-4">
          <ChartBarIcon className="w-5 h-5 mr-2" />
          <Link href="/admin/review">Reviews</Link>
        </li>
        <li className="flex items-center mb-4">
          <FolderIcon className="w-5 h-5 mr-2" />
          <Link href="/admin/categories">Categories</Link>
        </li>
        <li className="flex items-center mb-4">
          <BookOpenIcon className="w-5 h-5 mr-2" /> {/* Use BookOpenIcon for Recipes */}
          <Link href="/admin/recipes">Recipes</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
