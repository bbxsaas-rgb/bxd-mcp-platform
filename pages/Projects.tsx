import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Github, 
  Globe, 
  History,
  Layout
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import StatusBadge from '../components/test-runs/StatusBadge';
import { projectService } from '../lib/projectService';
import { Project } from '../types/database';
import { formatTimeAgo } from '../lib/utils';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando um pequeno delay para carregar
    const loadProjects = () => {
      const data = projectService.getProjects();
      setProjects(data);
      setLoading(false);
    };

    loadProjects();
  }, []);

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Seus Projetos</h1>
          <p className="text-slate-500 text-sm">Gerencie e monitore a saúde de suas aplicações.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar projetos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64 transition-all"
            />
          </div>
          <Link to="/projects/new">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Novo Projeto
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && filteredProjects.map((project) => (
          <Link 
            key={project.id} 
            to={`/projects/${project.id}`}
            className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all p-6 flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-500 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                <Layout className="w-5 h-5" />
              </div>
              <button className="p-1.5 hover:bg-slate-50 rounded-md transition-colors">
                <MoreVertical className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{project.name}</h3>
            <p className="text-sm text-slate-500 line-clamp-2 mb-6 flex-1">{project.description}</p>

            <div className="space-y-3 mb-6">
              {project.repository_url && (
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{project.repository_url}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{project.base_url}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Suites</p>
                  <p className="text-sm font-bold text-slate-700">0</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Runs</p>
                  <p className="text-sm font-bold text-slate-700">0</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Último Status</p>
                <StatusBadge status="pending" size="sm" />
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
              <History className="w-3 h-3" />
              Atualizado {formatTimeAgo(project.updated_at)}
            </div>
          </Link>
        ))}
        
        {loading && [1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 h-[300px] animate-pulse">
            <div className="w-10 h-10 bg-slate-100 rounded-lg mb-4"></div>
            <div className="h-6 bg-slate-100 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-slate-100 rounded w-full mb-1"></div>
            <div className="h-4 bg-slate-100 rounded w-full mb-6"></div>
            <div className="h-10 bg-slate-50 rounded w-full mt-auto"></div>
          </div>
        ))}

        {/* Placeholder for "Add Project" as a card */}
        <Link 
          to="/projects/new"
          className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-300 hover:bg-blue-50/30 hover:text-blue-500 transition-all min-h-[300px]"
        >
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
            <Plus className="w-6 h-6" />
          </div>
          <p className="font-semibold">Criar Novo Projeto</p>
          <p className="text-xs mt-1">Configure sua stack de testes em segundos.</p>
        </Link>
      </div>
    </div>
  );
};

export default Projects;
