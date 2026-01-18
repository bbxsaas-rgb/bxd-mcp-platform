import { Project } from '../types/database';

const STORAGE_KEY = 'bxd_mcp_projects';

// Dados iniciais para não começar vazio
const initialProjects: Project[] = [
  { 
    id: '1', 
    user_id: 'user-1',
    name: 'E-commerce App', 
    description: 'Plataforma completa de vendas B2C com integração Stripe.', 
    repository_url: 'github.com/org/ecommerce-v2',
    base_url: 'shop.mystore.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: '2', 
    user_id: 'user-1',
    name: 'CRM Dashboard', 
    description: 'Painel interno para gerenciamento de leads e funil de vendas.', 
    repository_url: 'github.com/org/crm-internal',
    base_url: 'crm.company.io',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const projectService = {
  getProjects: (): Project[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProjects));
      return initialProjects;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Erro ao carregar projetos do localStorage:', e);
      return initialProjects;
    }
  },

  getProjectById: (id: string): Project | undefined => {
    const projects = projectService.getProjects();
    return projects.find(p => p.id === id);
  },

  addProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    const projects = projectService.getProjects();
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newProject, ...projects]));
    return newProject;
  },

  updateProject: (id: string, updates: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>) => {
    const projects = projectService.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProject = {
      ...projects[index],
      ...updates,
      updated_at: new Date().toISOString()
    };

    projects[index] = updatedProject;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return updatedProject;
  },

  deleteProject: (id: string) => {
    const projects = projectService.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
