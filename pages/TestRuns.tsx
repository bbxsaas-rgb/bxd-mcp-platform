import React, { useEffect, useState } from 'react';
import { 
  PlayCircle, 
  Search, 
  Filter, 
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from '../components/test-runs/StatusBadge';
import { testRunService } from '../lib/testRunService';
import { TestRun } from '../types/database';
import { formatDuration, formatTimeAgo } from '../lib/utils';

const TestRuns: React.FC = () => {
  const [runs, setRuns] = useState<TestRun[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRuns = async () => {
      const data = await testRunService.getRuns();
      setRuns(data);
      setLoading(false);
    };

    loadRuns();
    
    // Listener para atualizações em tempo real (simuladas)
    window.addEventListener('test-run-updated', loadRuns);
    return () => window.removeEventListener('test-run-updated', loadRuns);
  }, []);

  const filteredRuns = runs.filter(run => 
    run.suite_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    run.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Histórico de Execuções</h1>
          <p className="text-slate-500 text-sm">Acompanhe todos os testes rodados na plataforma.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex-1 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar por suite ou ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filtros</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Período</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-100">
                <th className="px-6 py-4">ID / Suite</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Métricas</th>
                <th className="px-6 py-4">Duração</th>
                <th className="px-6 py-4">Iniciado</th>
                <th className="px-6 py-4">Gatilho</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!loading && filteredRuns.map((run) => (
                <tr key={run.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{run.suite_name}</span>
                      <span className="text-[10px] font-mono text-slate-400">#{run.id.substring(0, 8)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={run.status} size="sm" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <span className="text-emerald-600">{run.passed_count}</span>
                      <span className="text-slate-300">/</span>
                      <span className="text-red-500">{run.failed_count}</span>
                      <span className="text-slate-300">/</span>
                      <span className="text-slate-500">{run.total_count}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {run.status === 'running' ? '...' : formatDuration(run.duration)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {formatTimeAgo(run.started_at)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-100">
                      {run.triggered_by}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      to={`/test-runs/${run.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      Detalhes
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && filteredRuns.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <PlayCircle className="w-12 h-12 text-slate-200 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">Nenhuma execução encontrada</h3>
            <p className="text-sm text-slate-500 max-w-xs">
              As execuções de teste aparecerão aqui assim que você começar a rodar suas suites.
            </p>
          </div>
        )}

        {loading && (
          <div className="p-8 space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-12 bg-slate-50 animate-pulse rounded-lg"></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestRuns;
