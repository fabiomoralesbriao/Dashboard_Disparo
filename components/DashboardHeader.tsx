
import React from 'react';

const DashboardHeader: React.FC = () => {
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'full'
  }).format(new Date());

  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold text-white tracking-tight">Dashboard do Agente de IA</h1>
      <p className="text-gray-400 mt-2">
        Métricas de desempenho para {formattedDate}.
      </p>
    </header>
  );
};

export default DashboardHeader;
