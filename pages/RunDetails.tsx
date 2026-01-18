
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  RotateCcw, 
  Share2, 
  Clock, 
  User, 
  Target,
  FileText,
  AlertCircle
} from 'lucide-react';
// Add cn import
import { cn } from '../lib/utils';
import StatusBadge from '../components/test-runs/StatusBadge';
import Button from '../components/ui/Button';
import RunTimeline from '../components/test-runs/RunTimeline';
import { TestResult } from '../types/database';

const RunDetails: React.FC = () => {
  const { id } = useParams();

  // Mock data for results
  const mockResults: TestResult[] = [
    {
      id: 'res-1',
      test_run_id: 'run-1',
      test_name: 'Login com credenciais válidas',
      status: 'passed',
      duration: 12,
      browser: 'chromium',
      created_at: new Date().toISOString()
    },
    {
      id: 'res-2',
      test_run_id: 'run-1',
      test_name: 'Mensagem de erro para senha incorreta',
      status: 'failed',
      duration: 5,
      error_message: "Error: expect(received).toBe(expected) // Object.is equality\n\nExpected: 'Credenciais inválidas'\nReceived: 'Login falhou'",
      stack_trace: "at Context.<anonymous> (tests/auth.spec.ts:15:24)\nat processTicksAndRejections (node:internal/process/task_queues:95:5)",
      screenshot_url: "https://picsum.photos/800/600?random=1",
      browser: 'chromium',
      created_at: new Date().toISOString()
    },
    {
      id: 'res-3',
      test_run_id: 'run-1',
      test_name: 'Recuperação de senha - Fluxo completo',
      status: 'passed',
      duration: 18,
      browser: 'webkit',
      created_at: new Date().toISOString()
    },
    {
      id: 'res-4',
      test_run_id: 'run-1',
      test_name: 'Validação de campos obrigatórios',
      status: 'skipped',
      duration: 0,
      browser: 'chromium',
      created_at: new Date().toISOString()
    }
  ];

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
              <h1 className="text-xl font-bold text-slate-900">Run #{id?.substring(0, 8)}</h1>
              <StatusBadge status="failed" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Executado na suite <Link to="#" className="text-blue-600 hover:underline">User Authentication Flow</Link></p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
          <Button size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Re-executar
          </Button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Início & Duração</span>
          </div>
          <p className="text-sm font-semibold text-slate-900">18 Jan, 2024 • 14:32</p>
          <p className="text-xs text-slate-500 mt-1">Duração: 2m 45s</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gatilho</span>
          </div>
          <p className="text-sm font-semibold text-slate-900">Manual</p>
          <p className="text-xs text-slate-500 mt-1">Usuário: Admin BXD-MCP</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ambiente</span>
          </div>
          <p className="text-sm font-semibold text-slate-900">Production</p>
          <p className="text-xs text-slate-500 mt-1 truncate">shop.mystore.com</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Métricas</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-emerald-600">75%</span>
            <span className="text-[10px] text-slate-400 font-medium">PASS RATE</span>
          </div>
        </div>
      </div>

      {/* Test Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: 4, color: 'text-slate-900', bg: 'bg-slate-100' },
          { label: 'Sucesso', value: 2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Falha', value: 1, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Ignorado', value: 1, color: 'text-slate-400', bg: 'bg-slate-50' },
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
          <RunTimeline results={mockResults} />
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