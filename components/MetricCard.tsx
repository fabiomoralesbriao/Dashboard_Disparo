
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  colorClass: string;
  progress?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, description, colorClass, progress }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col justify-between backdrop-blur-sm">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <div className={colorClass}>{icon}</div>
        </div>
        <div className="mt-2">
          <p className="text-4xl font-bold text-white">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
      </div>
      {progress !== undefined && (
        <div className="w-full bg-gray-700 rounded-full h-2 mt-4 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ease-out ${colorClass.replace('text-', 'bg-')}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
