// pages/admin/index.tsx
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import StatsCard from '../../components/StatsCard'
import { UsersIcon, ArrowUpIcon, ShoppingCartIcon } from '@heroicons/react/24/outline' // pastikan ini sesuai

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Header */}
        <Header />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <StatsCard 
            title="Users" 
            value="1,200" 
            icon={<UsersIcon className="w-6 h-6 text-blue-500" />} 
          />
          <StatsCard 
            title="Revenue" 
            value="$5,400" 
            icon={<ArrowUpIcon className="w-6 h-6 text-green-500" />} 
          />
          <StatsCard 
            title="Orders" 
            value="320" 
            icon={<ShoppingCartIcon className="w-6 h-6 text-yellow-500" />} 
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
