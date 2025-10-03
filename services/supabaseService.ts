import type { IDailyMetric } from '../types';

// Helper to generate mock data for the last N days
const generateMockData = (days: number): IDailyMetric[] => {
  const data: IDailyMetric[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    const disparos = Math.floor(Math.random() * 150) + 50; // 50 to 200
    const primeiraResposta = Math.floor(disparos * (Math.random() * 0.3 + 0.6)); // 60% to 90% of disparos
    const atendimentoFinalizado = Math.floor(primeiraResposta * (Math.random() * 0.2 + 0.7)); // 70% to 90% of first replies

    data.push({
      date: date.toISOString().split('T')[0], // "YYYY-MM-DD"
      disparos,
      primeiraResposta,
      atendimentoFinalizado,
    });
  }
  return data;
};


// This is a mock service to simulate fetching data from Supabase.
// In a real application, you would use the Supabase client here to query your database.
export const fetchDailyMetrics = (): Promise<IDailyMetric[]> => {
  console.log("Fetching daily metrics from mock service...");
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate data for the last 60 days
      resolve(generateMockData(60));
    }, 1000); // Simulate network delay
  });
};
