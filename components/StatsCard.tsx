// components/StatsCard.tsx
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;  // Gunakan ReactNode untuk mendukung komponen ikon apapun
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
      <div className="bg-gray-100 p-4 rounded-full">{icon}</div>
    </div>
  );
};

export default StatsCard;
