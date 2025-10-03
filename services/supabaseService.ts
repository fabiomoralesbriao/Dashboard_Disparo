
import type { IMetrics } from '../types';

// This is a mock service to simulate fetching data from Supabase.
// In a real application, you would use the Supabase client here to query your database.
export const fetchMetrics = (): Promise<IMetrics> => {
  console.log("Fetching metrics from mock service...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        disparosRealizados: 15234,
        primeiraResposta: 9876,
        atendimentoFinalizado: 2469,
      });
    }, 1500); // Simulate network delay
  });
};
