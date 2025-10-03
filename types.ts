// This interface represents the raw, daily data points.
export interface IDailyMetric {
  date: string; // ISO date string e.g., "2024-07-28"
  disparos: number;
  primeiraResposta: number;
  atendimentoFinalizado: number; // This is the "qualificados" count
}
