import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  iconBgClass: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, icon: Icon, iconBgClass }) => {
  return (
    <div className="bg-[#2a2d5a]/30 border border-[#4a4e91]/50 rounded-xl p-5 shadow-lg flex flex-col justify-between h-48 backdrop-blur-sm hover:border-[#6a6ec1] transition-colors duration-300">
      <div>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBgClass}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-sm text-gray-300 tracking-wider">{title}</h3>
        </div>
        <p className="text-xs text-gray-500 mt-2 ml-1">{description}</p>
      </div>
      <p className="text-4xl lg:text-5xl font-bold text-white text-right">{value}</p>
    </div>
  );
};

export default MetricCard;
