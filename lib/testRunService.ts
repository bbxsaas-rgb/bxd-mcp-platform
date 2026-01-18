import { supabase } from './supabase';
import { TestRun, TestResult } from '../types/database';
import { settingsService } from './settingsService';
import { testSuiteService } from './testSuiteService';

const RUNS_KEY = 'bxd_mcp_test_runs';
const RESULTS_KEY = 'bxd_mcp_test_results';

export const testRunService = {
  getRuns: async (suiteId?: string): Promise<TestRun[]> => {
    if (!supabase) return testRunService.getLocalRuns(suiteId);
    
    let query = supabase.from('test_runs').select('*');
    if (suiteId) query = query.eq('test_suite_id', suiteId);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar runs do Supabase:', error);
      return testRunService.getLocalRuns(suiteId);
    }
    return data || [];
  },

  getRunById: async (id: string): Promise<TestRun | null> => {
    if (!supabase) return testRunService.getLocalRuns().find(r => r.id === id) || null;

    const { data, error } = await supabase
      .from('test_runs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  },

  getResultsByRunId: async (runId: string): Promise<TestResult[]> => {
    if (!supabase) return testRunService.getLocalResults(runId);

    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .eq('test_run_id', runId);

    if (error) return [];
    return data || [];
  },

  createRun: async (suiteId: string, suiteName: string, triggeredBy: string = 'Manual'): Promise<TestRun> => {
    const newRun: Omit<TestRun, 'id' | 'created_at'> = {
      test_suite_id: suiteId,
      suite_name: suiteName,
      status: 'running',
      started_at: new Date().toISOString(),
      passed_count: 0,
      failed_count: 0,
      total_count: 0,
      triggered_by: triggeredBy
    };

    if (!supabase) {
      const runs = testRunService.getLocalRuns();
      const runWithId: TestRun = { ...newRun, id: crypto.randomUUID(), created_at: new Date().toISOString() };
      localStorage.setItem(RUNS_KEY, JSON.stringify([runWithId, ...runs]));
      testRunService.simulateExecution(runWithId.id);
      return runWithId;
    }

    const { data, error } = await supabase
      .from('test_runs')
      .insert([newRun])
      .select()
      .single();

    if (error) throw error;
    testRunService.simulateExecution(data.id);
    return data;
  },

  /**
   * Executa todas as suites de teste disponíveis (Stress Test)
   */
  runAllSuites: async (): Promise<void> => {
    const suites = await testSuiteService.getSuites();
    if (suites.length === 0) return;

    // Disparar execuções em paralelo
    await Promise.all(
      suites.map(suite => testRunService.createRun(suite.id, suite.name, 'Stress Test'))
    );
  },

  simulateExecution: async (runId: string) => {
    const settings = settingsService.getSettings();
    const hasAIKey = !!settings.api_keys.gemini || !!settings.api_keys.openai;
    
    // Simular tempo de execução variável entre 2 e 6 segundos para estresse real
    const executionTime = 2000 + Math.random() * 4000;

    setTimeout(async () => {
      // No stress test, a taxa de falha é maior (40%)
      const status = Math.random() > 0.4 ? 'passed' : 'failed';
      let diagnosis = null;

      if (status === 'failed' && hasAIKey) {
        diagnosis = "Análise da IA: Detectamos uma falha de latência durante o estresse. " +
                    "Sugestão: Otimizar o tempo de resposta do endpoint /api/v1/projects.";
      }

      if (!supabase) {
        const runs = testRunService.getLocalRuns();
        const idx = runs.findIndex(r => r.id === runId);
        if (idx !== -1) {
          runs[idx].status = status;
          runs[idx].completed_at = new Date().toISOString();
          runs[idx].duration = executionTime / 1000;
          // @ts-ignore - adicionando campo dinamicamente para validação
          runs[idx].diagnosis = diagnosis;
          localStorage.setItem(RUNS_KEY, JSON.stringify(runs));
        }
      } else {
        await supabase
          .from('test_runs')
          .update({ 
            status, 
            completed_at: new Date().toISOString(),
            duration: executionTime / 1000,
            passed_count: status === 'passed' ? 5 : 3,
            failed_count: status === 'failed' ? 2 : 0,
            total_count: 5,
            // @ts-ignore - assumindo que a tabela terá esse campo após o SQL anterior
            diagnosis: diagnosis
          })
          .eq('id', runId);
      }
      
      window.dispatchEvent(new CustomEvent('test-run-updated', { detail: { runId } }));
    }, executionTime);
  },

  getLocalRuns: (suiteId?: string): TestRun[] => {
    const stored = localStorage.getItem(RUNS_KEY);
    const runs: TestRun[] = stored ? JSON.parse(stored) : [];
    if (suiteId) return runs.filter(r => r.test_suite_id === suiteId);
    return runs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  getLocalResults: (runId: string): TestResult[] => {
    const stored = localStorage.getItem(RESULTS_KEY);
    const results: TestResult[] = stored ? JSON.parse(stored) : [];
    return results.filter(res => res.test_run_id === runId);
  }
};
