import { supabase } from '../lib/supabaseClient';
import type { IDailyMetric } from '../types';

export const fetchDailyMetrics = async (): Promise<IDailyMetric[]> => {
  console.log("Fetching daily metrics from Supabase...");

  // Call the RPC function in your Supabase project
  const { data, error } = await supabase.rpc('get_daily_metrics');

  if (error) {
    // Log the detailed error object from Supabase for better debugging
    console.error('Error fetching from Supabase RPC:', JSON.stringify(error, null, 2));
    
    let userMessage = 'Falha ao buscar dados do Supabase.';

    // Check for a common permission error (Postgres code 42501)
    if (error.code === '42501') {
      userMessage += ' Causa provável: Permissão negada. A role "anon" precisa de permissão para executar a função "get_daily_metrics" no banco de dados. Execute "GRANT EXECUTE ON FUNCTION get_daily_metrics() TO anon;" no SQL Editor do Supabase.';
    } else {
      userMessage += ` Detalhes: ${error.message}`;
    }

    throw new Error(userMessage);
  }

  // The RPC function is expected to return data in the correct format.
  // No further mapping should be needed if the function is set up correctly.
  return data as IDailyMetric[];
};
