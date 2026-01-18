import { supabase } from './supabase';
import { TestSuite } from '../types/database';

export const testSuiteService = {
  getSuites: async (projectId?: string): Promise<TestSuite[]> => {
    if (!supabase) return testSuiteService.getLocalSuites(projectId);

    let query = supabase.from('test_suites').select('*');
    if (projectId) {
      query = query.eq('project_id', projectId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar suites do Supabase:', error);
      return testSuiteService.getLocalSuites(projectId);
    }

    return data || [];
  },

  addSuite: async (suite: Omit<TestSuite, 'id' | 'created_at'>) => {
    if (!supabase) {
      const suites = testSuiteService.getLocalSuites();
      const newSuite: TestSuite = {
        ...suite,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString()
      };
      localStorage.setItem('bxd_mcp_test_suites', JSON.stringify([newSuite, ...suites]));
      return newSuite;
    }

    const { data, error } = await supabase
      .from('test_suites')
      .insert([suite])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteSuite: async (id: string) => {
    if (!supabase) {
      const suites = testSuiteService.getLocalSuites();
      const filtered = suites.filter(s => s.id !== id);
      localStorage.setItem('bxd_mcp_test_suites', JSON.stringify(filtered));
      return;
    }

    const { error } = await supabase
      .from('test_suites')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  getLocalSuites: (projectId?: string): TestSuite[] => {
    const stored = localStorage.getItem('bxd_mcp_test_suites');
    const suites: TestSuite[] = stored ? JSON.parse(stored) : [];
    if (projectId) return suites.filter(s => s.project_id === projectId);
    return suites;
  }
};
