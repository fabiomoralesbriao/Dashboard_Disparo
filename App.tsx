import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { IDailyMetric } from './types';
import { fetchDailyMetrics } from './services/supabaseService';
import { supabase } from './lib/supabaseClient';
import DashboardHeader from './components/DashboardHeader';
import FilterPeriod from './components/FilterPeriod';
import MetricCard from './components/MetricCard';

// Import necessary icons
import PaperPlaneIcon from './components/icons/PaperPlaneIcon';
import ReplyIcon from './components/icons/ReplyIcon';
import ChartBarIcon from './components/icons/ChartBarIcon';
import CheckCircleIcon from './components/icons/CheckCircleIcon';

// This type will hold the calculated/aggregated data
interface IAggregatedMetrics {
  disparosRealizados: number;
  primeiraResposta: number;
  percentualPrimeiraResposta: number;
  percentualQualificados: number;
}

const getInitialDateRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6); // Default to last 7 days
  return {
    start: startDate.toISOString().split('T')[0],
    end: endDate.toISOString().split('T')[0],
  };
};


const App: React.FC = () => {
  const [rawMetrics, setRawMetrics] = useState<IDailyMetric[]>([]);
  const [activePeriod, setActivePeriod] = useState<string>('ÚLTIMA SEMANA');
  const [dateRange, setDateRange] = useState(getInitialDateRange());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadMetrics = useCallback(async () => {
    // Keep loader for initial load and subsequent refetches to give user feedback
    setLoading(true);
    try {
      setError(null);
      const data = await fetchDailyMetrics();
      setRawMetrics(data);
    } catch (err) {
      if (err instanceof Error) {
          setError(err.message);
      } else {
          setError('Ocorreu um erro desconhecido ao buscar os dados.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect for initial data load
  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  // Effect for real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('public-disparos-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'disparos' },
        (payload) => {
          console.log('Novo disparo detectado, atualizando métricas...', payload);
          loadMetrics();
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadMetrics]);


  // useMemo will recalculate aggregated metrics only when raw data or filter changes
  const aggregatedMetrics: IAggregatedMetrics | null = useMemo(() => {
    if (!rawMetrics.length) {
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 29);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const filteredMetrics = rawMetrics.filter(metric => {
        const metricDate = new Date(metric.date + 'T00:00:00'); // Ensure date is parsed as local time
        switch(activePeriod) {
            case 'HOJE':
                return metricDate.getTime() === today.getTime();
            case 'ÚLTIMA SEMANA':
                return metricDate >= sevenDaysAgo && metricDate <= today;
            case 'ÚLTIMO MÊS':
                return metricDate >= thirtyDaysAgo && metricDate <= today;
            case 'PERSONALIZADO':
                if (!dateRange.start || !dateRange.end) return false;
                 // Add T00:00:00 to ensure we compare dates correctly across timezones
                const startDate = new Date(dateRange.start + 'T00:00:00');
                const endDate = new Date(dateRange.end + 'T00:00:00');
                return metricDate >= startDate && metricDate <= endDate;
            case 'TODOS':
            default:
                return true;
        }
    });

    if (!filteredMetrics.length) {
        return {
            disparosRealizados: 0,
            primeiraResposta: 0,
            percentualPrimeiraResposta: 0,
            percentualQualificados: 0,
        };
    }

    const totalDisparos = filteredMetrics.reduce((sum, item) => sum + item.disparos, 0);
    const totalPrimeiraResposta = filteredMetrics.reduce((sum, item) => sum + item.primeiraResposta, 0);
    const totalQualificados = filteredMetrics.reduce((sum, item) => sum + item.atendimentoFinalizado, 0);

    return {
      disparosRealizados: totalDisparos,
      primeiraResposta: totalPrimeiraResposta,
      percentualPrimeiraResposta: totalDisparos > 0 ? (totalPrimeiraResposta / totalDisparos) * 100 : 0,
      percentualQualificados: totalDisparos > 0 ? (totalQualificados / totalDisparos) * 100 : 0,
    };

  }, [rawMetrics, activePeriod, dateRange]);


  const formatNumber = (num: number): string => new Intl.NumberFormat('pt-BR').format(num);
  const formatPercentage = (num: number): string => `${num.toFixed(1).replace('.',',')}%`;
  
  const metricsList = aggregatedMetrics ? [
    { title: "DISPAROS REALIZADOS", value: formatNumber(aggregatedMetrics.disparosRealizados), description: "Total de disparos no período", icon: PaperPlaneIcon, iconBgClass: "bg-blue-500" },
    { title: "1ª RESPOSTA", value: formatNumber(aggregatedMetrics.primeiraResposta), description: "Total de primeiras respostas", icon: ReplyIcon, iconBgClass: "bg-green-500" },
    { title: "% DE 1ª RESPOSTA", value: formatPercentage(aggregatedMetrics.percentualPrimeiraResposta), description: "Disparos com 1ª resposta", icon: ChartBarIcon, iconBgClass: "bg-cyan-500" },
    { title: "% DE QUALIFICADOS", value: formatPercentage(aggregatedMetrics.percentualQualificados), description: "Disparos qualificados (finalizados)", icon: CheckCircleIcon, iconBgClass: "bg-purple-500" },
  ] : [];

  if (loading && !rawMetrics.length) { // Only show full-screen loader on initial load
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-cyan-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-xl font-semibold text-gray-300">Carregando métricas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-400">
        <div className="bg-[#2a2d5a]/50 border border-red-700/50 p-6 rounded-lg text-center backdrop-blur-sm max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-2 text-white">Ocorreu um Erro</h2>
            <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <DashboardHeader />
        <FilterPeriod 
            activePeriod={activePeriod} 
            onPeriodChange={setActivePeriod}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
        />
        {aggregatedMetrics ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricsList.map(metric => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </div>
        ) : (
          !loading && <div className="text-center py-10 text-gray-400">Nenhum dado encontrado para o período selecionado.</div>
        )}
      </div>
    </main>
  );
};

export default App;
