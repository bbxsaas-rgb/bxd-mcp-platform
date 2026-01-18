import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Play, 
  Settings2, 
  Trash2, 
  Beaker,
  Filter,
  MoreVertical
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { testSuiteService } from '../lib/testSuiteService';
import { projectService } from '../lib/projectService';
import { testRunService } from '../lib/testRunService';
import { TestSuite, Project } from '../types/database';
import { cn } from '../lib/utils';

const TestSuites: React.FC = () => {
  const navigate = useNavigate();
  const [suites, setSuites] = useState<TestSuite[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const projectsData = await projectService.getProjects();
      const suitesData = await testSuiteService.getSuites();
      setProjects(projectsData);
      setSuites(suitesData);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredSuites = suites.filter(suite => {
    const matchesProject = selectedProjectId === 'all' || suite.project_id === selectedProjectId;
    const matchesSearch = suite.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         suite.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesProject && matchesSearch;
  });

  const getProjectName = (id: string) => {
    return projects.find(p => p.id === id)?.name || 'Projeto Desconhecido';
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta suite de testes?')) {
      testSuiteService.deleteSuite(id);
      setSuites(suites.filter(s => s.id !== id));
    }
  };

  const handleRunSuite = async (suite: TestSuite) => {
    const newRun = await testRunService.createRun(suite.id, suite.name);
    navigate(`/test-runs/${newRun.id}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Suites de Teste</h1>
          <p className="text-slate-500 text-sm">Gerencie seus cenários de teste automatizados.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/test-suites/new">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nova Suite
            </Button>
          </Link>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex-1 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar suites..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os Projetos</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && filteredSuites.map((suite) => (
          <div 
            key={suite.id} 
            className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-purple-50 border border-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                <Beaker className="w-5 h-5" />
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => handleDelete(suite.id)}
                  className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-md transition-colors"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:bg-slate-50 rounded-md transition-colors">
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 mb-2">
                {getProjectName(suite.project_id)}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                {suite.name}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2">{suite.description || 'Sem descrição'}</p>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between gap-3">
              <div className="text-xs text-slate-400 font-medium">
                Criada em: {new Date(suite.created_at).toLocaleDateString('pt-BR')}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 px-3">
                  <Settings2 className="w-3.5 h-3.5 mr-1.5" />
                  Config
                </Button>
                <Button 
                  size="sm" 
                  className="h-8 px-3 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => handleRunSuite(suite)}
                >
                  <Play className="w-3.5 h-3.5 mr-1.5 fill-current" />
                  Rodar
                </Button>
              </div>
            </div>
          </div>
        ))}

        {!loading && filteredSuites.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-center bg-white rounded-xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Beaker className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Nenhuma suite encontrada</h3>
            <p className="text-sm text-slate-500 max-w-xs mb-6">
              Comece criando uma nova suite de testes para seu projeto.
            </p>
            <Link to="/test-suites/new">
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeira Suite
              </Button>
            </Link>
          </div>
        )}

        {loading && [1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 h-[220px] animate-pulse">
            <div className="w-10 h-10 bg-slate-100 rounded-lg mb-4"></div>
            <div className="h-6 bg-slate-100 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-slate-100 rounded w-full mb-1"></div>
            <div className="h-4 bg-slate-100 rounded w-full mb-6"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestSuites;
