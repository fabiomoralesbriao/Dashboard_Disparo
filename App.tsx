
import React, { useState, useEffect } from 'react';
import type { IMetrics } from './types';
import { fetchMetrics } from './services/supabaseService';
import DashboardHeader from './components/DashboardHeader';
import MetricCard from './components/MetricCard';
import PaperPlaneIcon from './components/icons/PaperPlaneIcon';
import ReplyIcon from './components/icons/ReplyIcon';
import CheckCircleIcon from './components/icons/CheckCircleIcon';
import ChartBarIcon from './components/icons/ChartBarIcon';

const App: React.FC = () => {
  const [metrics, setMetrics] = useState<IMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMetrics();
        setMetrics(data);
      } catch (err) {
        setError('Falha ao carregar as métricas. Por favor, tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, []);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  const calculatePercentage = (part: number, whole: number): number => {
    if (whole === 0) return 0;
    return (part / whole) * 100;
  };

  const firstReplyPercentage = metrics ? calculatePercentage(metrics.primeiraResposta, metrics.disparosRealizados) : 0;
  const qualifiedPercentage = metrics ? calculatePercentage(metrics.atendimentoFinalizado, metrics.disparosRealizados) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-cyan-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-xl font-semibold">Carregando métricas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-400">
        <div className="bg-red-900/50 border border-red-700 p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-2">Ocorreu um Erro</h2>
            <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Disparos Realizados"
            value={metrics ? formatNumber(metrics.disparosRealizados) : '0'}
            icon={<PaperPlaneIcon />}
            description="Total de mensagens enviadas"
            colorClass="text-cyan-400"
          />
          <MetricCard
            title="1ª Resposta"
            value={metrics ? formatNumber(metrics.primeiraResposta) : '0'}
            icon={<ReplyIcon />}
            description="Total de contatos que responderam"
            colorClass="text-green-400"
          />
          <MetricCard
            title="% de 1ª Resposta"
            value={`${firstReplyPercentage.toFixed(1)}%`}
            icon={<ChartBarIcon />}
            description="Respostas / Disparos Realizados"
            colorClass="text-yellow-400"
            progress={firstReplyPercentage}
          />
          <MetricCard
            title="% de Qualificados"
            value={`${qualifiedPercentage.toFixed(1)}%`}
            icon={<CheckCircleIcon />}
            description="Qualificados / Disparos Realizados"
            colorClass="text-purple-400"
            progress={qualifiedPercentage}
          />
        </div>
      </div>
    </main>
  );
};

export default App;
