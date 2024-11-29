import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { Users, TrendingUp, ChefHat, Star, ArrowUp, ShoppingBag } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUpward: boolean;
  };
}

const StatsCard = ({ title, value, icon, trend }: StatsCardProps) => {
  return (
    <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${trend.isUpward ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
                {trend.isUpward ? <ArrowUp size={16} /> : null}
                {trend.isUpward ? '+' : '-'}{trend.value}%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-gray-50 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecipes: 0,
    totalRevenue: 0,
    totalReviews: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    // Update stats every 5 minutes
    const interval = setInterval(fetchStats, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch data from your APIs
      const [usersRes, recipesRes, reviewsRes] = await Promise.all([
        axios.get('/api/users'),
        axios.get('/api/recipes'),
        axios.get('/api/reviews')
      ]);

      setStats({
        totalUsers: usersRes.data.length,
        totalRecipes: recipesRes.data.length,
        totalRevenue: usersRes.data.length * 50, // Example revenue calculation
        totalReviews: reviewsRes.data.length
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FF]">
      <Sidebar />
      
      <div className="flex-1">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Dashboard Overview
                </h1>
                <p className="text-gray-500 mt-1">Welcome to your dashboard</p>
              </div>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                Log Out
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatsCard 
              title="Total Users" 
              value={isLoading ? "Loading..." : stats.totalUsers.toLocaleString()}
              icon={<Users className="w-6 h-6 text-blue-500" />}
              trend={{ value: 12.5, isUpward: true }}
            />
            <StatsCard 
              title="Total Revenue" 
              value={isLoading ? "Loading..." : `$${stats.totalRevenue.toLocaleString()}`}
              icon={<TrendingUp className="w-6 h-6 text-green-500" />}
              trend={{ value: 8.2, isUpward: true }}
            />
            <StatsCard 
              title="Total Recipes" 
              value={isLoading ? "Loading..." : stats.totalRecipes.toLocaleString()}
              icon={<ChefHat className="w-6 h-6 text-orange-500" />}
              trend={{ value: 15.3, isUpward: true }}
            />
            <StatsCard 
              title="Total Reviews" 
              value={isLoading ? "Loading..." : stats.totalReviews.toLocaleString()}
              icon={<Star className="w-6 h-6 text-yellow-500" />}
              trend={{ value: 5.8, isUpward: true }}
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Users Card */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Users</h2>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                  View All
                </button>
              </div>
              {/* Add recent users list here */}
            </div>

            {/* Recent Recipes Card */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Recipes</h2>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                  View All
                </button>
              </div>
              {/* Add recent recipes list here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;