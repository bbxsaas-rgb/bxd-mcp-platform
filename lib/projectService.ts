import { supabase } from './supabase';
import { Project } from '../types/database';

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    if (!supabase) return projectService.getLocalProjects();
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar projetos do Supabase:', error);
      return projectService.getLocalProjects();
    }

    return data || [];
  },

  getProjectById: async (id: string): Promise<Project | null> => {
    if (!supabase) return projectService.getLocalProjects().find(p => p.id === id) || null;

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao buscar projeto:', error);
      return null;
    }

    return data;
  },

  addProject: async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    if (!supabase) {
      const projects = projectService.getLocalProjects();
      const newProject: Project = {
        ...project,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      localStorage.setItem('bxd_mcp_projects', JSON.stringify([newProject, ...projects]));
      return newProject;
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteProject: async (id: string) => {
    if (!supabase) {
      const projects = projectService.getLocalProjects();
      const filtered = projects.filter(p => p.id !== id);
      localStorage.setItem('bxd_mcp_projects', JSON.stringify(filtered));
      return;
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Fallback para manter compatibilidade enquanto o usuário não coloca a Anon Key
  getLocalProjects: (): Project[] => {
    const stored = localStorage.getItem('bxd_mcp_projects');
    return stored ? JSON.parse(stored) : [];
  }
};
