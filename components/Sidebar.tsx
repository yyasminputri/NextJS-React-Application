import Link from 'next/link'; // Import Link for navigation
import { HomeIcon, UsersIcon, ChartBarIcon, FolderIcon, BookOpenIcon } from '@heroicons/react/24/outline'; // Use BookOpenIcon for recipes
import { Plus, Loader2, Pencil, Trash2, Home, Users, BarChart3, FolderOpen, Book, MessageSquare } from 'lucide-react'; // Added MessageSquare for Contacts

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#1E2640] text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        <nav className="space-y-4">
          <Link href="/admin" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
            <Users size={20} />
            <span>Users</span>
          </Link>
          <Link href="/admin/review" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
            <BarChart3 size={20} />
            <span>Reviews</span>
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
            <FolderOpen size={20} />
            <span>Categories</span>
          </Link>
          <Link href="/admin/recipes" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
            <Book size={20} />
            <span>Recipes</span>
          </Link>
          {/* New Contact Link */}
          <Link href="/admin/contacts" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
            <MessageSquare size={20} />
            <span>Contacts</span>
          </Link>

          <div className="border-t border-gray-700 my-4"></div>

          <div className="mb-2 text-sm text-gray-400 px-2"></div>
          <Link href="/" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
            <Home size={20} />
            <span>User</span>
          </Link>
        </nav>
      </div>
  );
};

export default Sidebar;
