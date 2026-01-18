import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  RotateCcw, 
  Share2, 
  Clock, 
  User, 
  Target,
  FileText,
  AlertCircle,
  Zap
} from 'lucide-react';
import { cn, formatDuration, formatTimeAgo, getSuccessRate } from '../lib/utils';
import StatusBadge from '../components/test-runs/StatusBadge';
import Button from '../components/ui/Button';
import RunTimeline from '../components/test-runs/RunTimeline';
import { testRunService } from '../lib/testRunService';
import { TestRun, TestResult } from '../types/database';

const RunDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [run, setRun] = useState<TestRun | null>(null);
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      const runData = await testRunService.getRunById(id);
      const resultsData = await testRunService.getResultsByRunId(id);
      
      if (runData) {
        setRun(runData);
        setResults(resultsData);
      }
      setLoading(false);
    };

    loadData();

    const handleUpdate = (e: any) => {
      if (e.detail?.runId === id) loadData();
    };

    window.addEventListener('test-run-updated', handleUpdate);
    return () => window.removeEventListener('test-run-updated', handleUpdate);
  }, [id]);

  if (loading) {
    return <div className="p-8 animate-pulse space-y-8">
      <div className="h-10 bg-slate-100 w-1/4 rounded"></div>
      <div className="grid grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-slate-100 rounded-xl"></div>)}
      </div>
      <div className="h-96 bg-slate-100 rounded-xl"></div>
    </div>;
  }

  if (!run) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border border-slate-200">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-900">Execução não encontrada</h2>
        <p className="text-slate-500 mb-6">O ID da execução fornecido é inválido ou não existe mais.</p>
        <Link to="/test-runs">
          <Button>Voltar para Histórico</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/test-runs">
            <button className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg transition-all">
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900">Run #{run.id.substring(0, 8)}</h1>
              <StatusBadge status={run.status} />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Executado na suite <Link to="/test-suites" className="text-blue-600 hover:underline">{run.suite_name}</Link>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
          <Button 
            size="sm" 
            onClick={() => testRunService.createRun(run.test_suite_id, run.suite_name || 'Suite')}
            disabled={run.status === 'running'}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Re-executar
          </Button>
        </div>
      </div>

      {/* AI Diagnosis - Only show if it exists */}
      {run.diagnosis && (
        <div className="bg-blue-600 rounded-xl p-6 text-white relative overflow-hidden shadow-lg animate-in slide-in-from-top-4 duration-700">
          <Zap className="absolute -right-4 -bottom-4 w-32 h-32 text-blue-500 opacity-20 rotate-12" />
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <h3 className="text-lg font-bold">Diagnóstico Inteligente (Stress Test)</h3>
          </div>
          <p className="text-sm text-blue-50 leading-relaxed max-w-2xl">
            {run.diagnosis}
          </p>
          <div className="mt-4 flex gap-3">
            <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50 border-none">
              Aplicar Correção Sugerida
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
              Ver Logs Detalhados
            </Button>
          </div>
        </div>
      )}

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Início & Duração</span>
          </div>
          <p className="text-sm font-semibold text-slate-900">
            {new Date(run.started_at).toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-xs text-slate-500 mt-1">Duração: {run.status === 'running' ? 'Executando...' : formatDuration(run.duration)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gatilho</span>
          </div>
          <p className="text-sm font-semibold text-slate-900">{run.triggered_by}</p>
          <p className="text-xs text-slate-500 mt-1">Ambiente: Local Browser</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Configuração</span>
          </div>
          <p className="text-sm font-semibold text-slate-900">Multi-browser</p>
          <p className="text-xs text-slate-500 mt-1 truncate">Chromium, Webkit</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Métricas</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={cn(
              "text-xl font-bold",
              run.status === 'passed' ? "text-emerald-600" : run.status === 'failed' ? "text-red-600" : "text-slate-400"
            )}>
              {getSuccessRate(run.passed_count, run.total_count)}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">PASS RATE</span>
          </div>
        </div>
      </div>

      {/* Test Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: run.total_count, color: 'text-slate-900', bg: 'bg-slate-100' },
          { label: 'Sucesso', value: run.passed_count, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Falha', value: run.failed_count, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Aguardando', value: run.status === 'running' ? '...' : 0, color: 'text-slate-400', bg: 'bg-slate-50' },
        ].map((stat, i) => (
          <div key={i} className={cn('p-4 rounded-xl border flex flex-col items-center justify-center', stat.bg, 'border-transparent')}>
            <span className={cn('text-2xl font-bold', stat.color)}>{stat.value}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Linha do Tempo dos Resultados</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Filtro:</span>
            <select className="text-xs border-none bg-slate-50 rounded-md px-2 py-1 font-semibold text-slate-600 focus:ring-0">
              <option>Todos os resultados</option>
              <option>Apenas falhas</option>
            </select>
          </div>
        </div>
        <div className="p-6 max-w-4xl mx-auto">
          {run.status === 'running' ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500 font-medium">Executando testes e coletando evidências...</p>
            </div>
          ) : (
            <RunTimeline results={results} />
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pb-10">
        <AlertCircle className="w-3.5 h-3.5" />
        Para mais logs detalhados, acesse a integração com o Playwright no terminal.
      </div>
    </div>
  );
};

export default RunDetails;
