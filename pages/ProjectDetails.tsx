import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Settings, 
  Play, 
  Beaker, 
  Clock, 
  BarChart3, 
  ShieldCheck,
  Plus,
  ExternalLink,
  Github,
  Zap,
  MoreVertical,
  Activity,
  History as HistoryIcon
} from 'lucide-react';
import { cn, formatDuration, formatTimeAgo, getSuccessRate } from '../lib/utils';
import Button from '../components/ui/Button';
import StatusBadge from '../components/test-runs/StatusBadge';
import { projectService } from '../lib/projectService';
import { testSuiteService } from '../lib/testSuiteService';
import { testRunService } from '../lib/testRunService';
import { Project, TestSuite, TestRun } from '../types/database';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [suites, setSuites] = useState<TestSuite[]>([]);
  const [runs, setRuns] = useState<TestRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'suites' | 'history' | 'metrics'>('suites');

  useEffect(() => {
    const loadProjectData = async () => {
      if (!id) return;
      try {
        const [projData, suitesData, runsData] = await Promise.all([
          projectService.getProjectById(id),
          testSuiteService.getSuites(id),
          testRunService.getRuns() // Aqui idealmente filtraríamos por suites do projeto no backend
        ]);

        if (projData) {
          setProject(projData);
          setSuites(suitesData);
          // Filtrar runs que pertencem às suites deste projeto
          const projectSuiteIds = suitesData.map(s => s.id);
          setRuns(runsData.filter(r => projectSuiteIds.includes(r.test_suite_id)));
        }
      } catch (error) {
        console.error('Erro ao carregar dados do projeto:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjectData();
    window.addEventListener('test-run-updated', loadProjectData);
    return () => window.removeEventListener('test-run-updated', loadProjectData);
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 animate-pulse space-y-8">
        <div className="h-10 bg-slate-100 w-1/3 rounded"></div>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-100 rounded-2xl"></div>)}
        </div>
        <div className="h-96 bg-slate-100 rounded-2xl"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Projeto não encontrado</h2>
        <Button onClick={() => navigate('/projects')} className="mt-4">Voltar para Projetos</Button>
      </div>
    );
  }

  const finishedRuns = runs.filter(r => r.status !== 'running');
  const passedRuns = finishedRuns.filter(r => r.status === 'passed');
  const healthScore = finishedRuns.length > 0 
    ? Math.round((passedRuns.length / finishedRuns.length) * 100) 
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header do Projeto */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link to="/projects" className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg transition-all">
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900">{project.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase">Ativo</span>
            </div>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                {project.base_url}
              </p>
              {project.repository_url && (
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Github className="w-3 h-3" />
                  {project.repository_url}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Button>
          <Button 
            size="sm" 
            onClick={() => testRunService.runAllSuites()}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
          >
            <Play className="w-4 h-4 mr-2 fill-current" />
            Rodar Tudo
          </Button>
        </div>
      </div>

      {/* Stats do Projeto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Health Score</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={cn(
              "text-3xl font-black",
              healthScore > 80 ? "text-emerald-600" : healthScore > 50 ? "text-amber-500" : "text-red-500"
            )}>
              {healthScore}%
            </span>
            <span className="text-xs text-slate-400 font-medium italic">baseado nas últimas runs</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Beaker className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Total de Suites</span>
          </div>
          <span className="text-3xl font-black text-slate-900">{suites.length}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Última Atividade</span>
          </div>
          <span className="text-lg font-bold text-slate-700">
            {runs.length > 0 ? formatTimeAgo(runs[0].created_at) : 'Sem execuções'}
          </span>
        </div>
      </div>

      {/* Tabs de Controle */}
      <div className="space-y-6">
        <div className="flex border-b border-slate-200 gap-8">
          {[
            { id: 'suites', label: 'Suites de Teste', icon: Beaker },
            { id: 'history', label: 'Histórico de Runs', icon: HistoryIcon },
            { id: 'metrics', label: 'Métricas de Stress', icon: BarChart3 },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 pb-4 text-sm font-bold transition-all relative",
                activeTab === tab.id 
                  ? "text-blue-600" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full animate-in fade-in zoom-in duration-300"></div>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'suites' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suites.map(suite => (
              <div key={suite.id} className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between group hover:border-blue-200 hover:shadow-sm transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{suite.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{suite.description || 'Sem descrição'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 px-2"
                    onClick={() => testRunService.createRun(suite.id, suite.name)}
                  >
                    <Play className="w-3.5 h-3.5" />
                  </Button>
                  <button className="p-1.5 hover:bg-slate-50 rounded-md transition-colors">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            ))}
            <Link 
              to="/test-suites/new"
              className="border-2 border-dashed border-slate-200 rounded-xl p-5 flex items-center justify-center gap-2 text-slate-400 hover:border-blue-300 hover:bg-blue-50/30 hover:text-blue-500 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-bold">Adicionar Suite</span>
            </Link>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Suite</th>
                  <th className="px-6 py-4">Resultados</th>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {runs.map(run => (
                  <tr key={run.id} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => navigate(`/test-runs/${run.id}`)}>
                    <td className="px-6 py-4">
                      <StatusBadge status={run.status} size="sm" />
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900 text-sm">
                      {run.suite_name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-bold">
                        <span className="text-emerald-600">{run.passed_count}</span>
                        <span className="text-slate-300">/</span>
                        <span className="text-red-500">{run.failed_count}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                      {formatTimeAgo(run.started_at)}
                    </td>
                    <td className="px-6 py-4 text-right text-blue-600 font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      Detalhes
                    </td>
                  </tr>
                ))}
                {runs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic text-sm">
                      Nenhuma execução registrada para este projeto.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Métricas de Performance</h3>
            <p className="text-sm text-slate-500 max-w-sm">
              Analise a latência e o tempo de resposta do seu SaaS durante picos de estresse. 
              <br /><span className="font-bold text-blue-600">Disponível no Plano Pro.</span>
            </p>
            <Button size="sm">Fazer Upgrade</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
