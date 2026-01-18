import React, { useEffect, useState } from 'react';
import { 
  FolderKanban, 
  PlayCircle, 
  CheckCircle2, 
  ArrowRight,
  Plus,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import StatsCard from '../components/dashboard/StatsCard';
import SuccessRateChart from '../components/dashboard/SuccessRateChart';
import StatusBadge from '../components/test-runs/StatusBadge';
import Button from '../components/ui/Button';
import { projectService } from '../lib/projectService';
import { testRunService } from '../lib/testRunService';
import { settingsService } from '../lib/settingsService';
import { TestRun, Profile } from '../types/database';

const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalRuns: 0,
    successRate: '0%'
  });
  const [recentRuns, setRecentRuns] = useState<TestRun[]>([]);
  const [isStressing, setIsStressing] = useState(false);

  const loadDashboardData = async () => {
    const userProfile = settingsService.getProfile();
    setProfile(userProfile);

    const projects = await projectService.getProjects();
    const runs = await testRunService.getRuns();
    
    const finishedRuns = runs.filter(r => r.status !== 'running');
    const passedRuns = finishedRuns.filter(r => r.status === 'passed');
    const rate = finishedRuns.length > 0 
      ? `${Math.round((passedRuns.length / finishedRuns.length) * 100)}%` 
      : '0%';

    setStats({
      totalProjects: projects.length,
      totalRuns: runs.length,
      successRate: rate
    });

    setRecentRuns(runs.slice(0, 5));
    setIsStressing(runs.some(r => r.status === 'running'));
  };

  useEffect(() => {
    loadDashboardData();
    window.addEventListener('test-run-updated', loadDashboardData);
    return () => window.removeEventListener('test-run-updated', loadDashboardData);
  }, []);

  const handleRunAll = async () => {
    setIsStressing(true);
    await testRunService.runAllSuites();
  };

  const chartData = [
    { date: 'Seg', rate: 92 },
    { date: 'Ter', rate: 88 },
    { date: 'Qua', rate: 95 },
    { date: 'Qui', rate: 91 },
    { date: 'Sex', rate: 85 },
    { date: 'Sáb', rate: 98 },
    { date: 'Dom', rate: 94 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Olá, {profile?.full_name?.split(' ')[0] || 'Bem-vindo'}!</h1>
          <p className="text-slate-500 text-sm">
            {profile?.role === 'client' 
              ? 'Aqui está o status atual dos seus projetos.' 
              : 'Aqui está o que está acontecendo com seus testes hoje.'}
          </p>
        </div>
        {profile?.role !== 'client' && (
          <div className="flex gap-3">
            <Link to="/projects/new">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Novo Projeto
              </Button>
            </Link>
            <Button 
              size="sm" 
              onClick={handleRunAll}
              disabled={isStressing}
              className={cn(isStressing && "animate-pulse bg-amber-500 hover:bg-amber-600")}
            >
              <PlayCircle className={cn("w-4 h-4 mr-2", isStressing && "animate-spin")} />
              {isStressing ? "Estressando..." : "Executar Todos"}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          title="Total de Projetos" 
          value={stats.totalProjects} 
          subtitle="Projetos ativos" 
          icon={FolderKanban} 
          color="blue"
          trend={{ value: 0, direction: 'up' }}
        />
        <StatsCard 
          title="Execuções Totais" 
          value={stats.totalRuns} 
          subtitle="Testes rodados na plataforma" 
          icon={PlayCircle} 
          color="purple"
          trend={{ value: 0, direction: 'up' }}
        />
        <StatsCard 
          title="Taxa de Sucesso" 
          value={stats.successRate} 
          subtitle="Média histórica" 
          icon={CheckCircle2} 
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-slate-900">Taxa de Sucesso (Últimos 7 dias)</h2>
              <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Última semana</option>
                <option>Último mês</option>
              </select>
            </div>
            <SuccessRateChart data={chartData} />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Execuções Recentes</h2>
              <Link to="/test-runs" className="text-blue-600 text-sm font-medium hover:underline inline-flex items-center">
                Ver histórico <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    <th className="px-6 py-3">Suite de Teste</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Duração</th>
                    <th className="px-6 py-3">Testes</th>
                    <th className="px-6 py-3">Iniciado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentRuns.map((run) => (
                    <tr 
                      key={run.id} 
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => window.location.hash = `#/test-runs/${run.id}`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900 text-sm">{run.suite_name}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={run.status as any} size="sm" />
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {run.status === 'running' ? '...' : `${Math.floor(run.duration || 0)}s`}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium">
                        <span className={run.status === 'failed' ? 'text-red-500' : 'text-emerald-500'}>
                          {run.passed_count}
                        </span>
                        <span className="text-slate-400">/{run.total_count}</span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {new Date(run.started_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                  {recentRuns.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-400 text-sm italic">
                        Nenhuma execução recente.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Próximas Tarefas</h2>
            <div className="space-y-4">
              {[
                { title: 'Corrigir falhas Auth', project: 'CRM Dashboard', priority: 'high' },
                { title: 'Adicionar testes API', project: 'E-commerce App', priority: 'medium' },
                { title: 'Configurar Webhook CI', project: 'Admin Panel', priority: 'low' },
              ].map((task, idx) => (
                <div key={idx} className="flex gap-4 items-start p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className={cn(
                    'w-1.5 h-10 rounded-full',
                    task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                  )}></div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{task.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{task.project}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-xs">Ver todas as tarefas</Button>
          </div>

          <div className="bg-blue-600 rounded-xl p-6 text-white relative overflow-hidden">
            <Zap className="absolute -right-4 -bottom-4 w-32 h-32 text-blue-500 opacity-20 rotate-12" />
            <h3 className="text-lg font-bold mb-2">Plano Pro</h3>
            <p className="text-sm text-blue-100 mb-6">Desbloqueie execuções paralelas ilimitadas e retenção de dados de 1 ano.</p>
            <Button className="bg-white text-blue-600 hover:bg-blue-50 w-full border-none">Fazer Upgrade</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
