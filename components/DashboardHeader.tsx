import React, { useState, useEffect } from 'react';
import BuildingIcon from './icons/BuildingIcon';
import SearchIcon from './icons/SearchIcon';
import ExportIcon from './icons/ExportIcon';

const DashboardHeader: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formattedTime = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium'
  }).format(currentTime);

  return (
    <header className="bg-[#2a2d5a]/30 border border-[#4a4e91]/50 rounded-xl p-4 md:p-6 mb-6 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500 rounded-full flex-shrink-0"></div>
          <div>
            <div className="flex items-center gap-3">
                <BuildingIcon className="w-8 h-8 text-gray-300"/>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">DASHBOARD PRÉ-VENDAS</h1>
            </div>
            <p className="text-gray-400 text-lg">PINZ Container</p>
          </div>
        </div>
        
        <div className="w-full md:w-auto flex flex-col items-center gap-4">
            <div className="bg-[#1a1c3a]/50 border border-[#4a4e91]/50 rounded-full px-4 py-1.5 text-xs text-center">
                <p>
                    <span className="font-semibold">Atendente IA</span> | Última atualização: {formattedTime}
                </p>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
                <button className="flex items-center gap-2 bg-blue-600/20 border border-blue-500 text-blue-300 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600/30 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                    <ExportIcon className="w-4 h-4" />
                    EXPORTAR
                </button>
            </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
