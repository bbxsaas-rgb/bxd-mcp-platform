import { createClient } from '@supabase/supabase-js';
import { settingsService } from './settingsService';

/**
 * Cria um cliente do Supabase baseado nas configurações salvas no localStorage.
 * Se as configurações não existirem, tenta usar variáveis de ambiente ou retorna null.
 */
export const getSupabaseClient = () => {
  const settings = settingsService.getSettings();
  const { supabase_url, supabase_anon_key } = settings.integrations;

  // Credenciais reais fornecidas pelo usuário
  const url = supabase_url || 'https://mlvokrlquuicidqupxhf.supabase.co';
  const key = supabase_anon_key || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sdm9rcmxxdXVpY2lkcXVweGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NjQ3ODIsImV4cCI6MjA4NDM0MDc4Mn0.To4f8X_xe6FYIulCIZVN5Tjw2mqJXoAKBYyUAK-HNR0';

  if (!url || !key) {
    console.warn('Supabase não configurado. Por favor, adicione a Anon Key nas Configurações.');
    return null;
  }

  try {
    return createClient(url, key);
  } catch (error) {
    console.error('Erro ao inicializar o cliente Supabase:', error);
    return null;
  }
};

// Cliente exportado para uso nos serviços
export const supabase = getSupabaseClient();
