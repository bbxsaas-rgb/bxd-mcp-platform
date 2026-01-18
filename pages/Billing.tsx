import React from 'react';
import { 
  CreditCard, 
  Zap, 
  Check, 
  HelpCircle, 
  Clock, 
  History,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import Button from '../components/ui/Button';
import { cn } from '../lib/utils';

const Billing: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Ideal para validar seus primeiros MVPs.',
      features: ['5 Projetos', '50 Test Runs/mês', 'Histórico de 7 dias', 'Acesso Comunitário'],
      current: false,
      cta: 'Plano Atual'
    },
    {
      name: 'Pro',
      price: '$49',
      description: 'Perfeito para agências e startups em crescimento.',
      features: ['Projetos Ilimitados', 'Runs Ilimitadas', 'IA Auto-Healing', 'Histórico de 1 ano', 'Suporte Prioritário'],
      current: true,
      cta: 'Upgrade para Pro',
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Para grandes empresas com segurança máxima.',
      features: ['Workspaces Isolados', 'SSO & SAML', 'API de Stress Dedicada', 'SLA Garantido', 'Gerente de Conta'],
      current: false,
      cta: 'Falar com Vendas'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Faturamento & Assinatura</h1>
        <p className="text-slate-500 text-sm">Gerencie seu plano, métodos de pagamento e histórico de faturas.</p>
      </div>

      {/* Cartão de Plano Atual */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
        <div className="p-8 md:w-2/3 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Seu plano atual é o <span className="text-blue-600">Pro</span></h2>
              <p className="text-xs text-slate-500">Assinatura mensal renova em 18 de Fevereiro, 2026.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Execuções este mês</p>
              <p className="text-xl font-bold text-slate-900">1,242 <span className="text-slate-300 text-sm">/ ∞</span></p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Armazenamento</p>
              <p className="text-xl font-bold text-slate-900">2.4 GB <span className="text-slate-300 text-sm">/ 10GB</span></p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Membros</p>
              <p className="text-xl font-bold text-slate-900">12 <span className="text-slate-300 text-sm">/ 20</span></p>
            </div>
          </div>
        </div>
        <div className="p-8 md:w-1/3 bg-slate-50 border-l border-slate-100 flex flex-col justify-center gap-3">
          <Button className="w-full bg-blue-600">Mudar de Plano</Button>
          <Button variant="outline" className="w-full">Cancelar Assinatura</Button>
        </div>
      </div>

      {/* Planos Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
        {plans.map((plan) => (
          <div key={plan.name} className={cn(
            "p-8 rounded-[2rem] border relative flex flex-col transition-all",
            plan.highlight 
              ? "border-blue-200 bg-white shadow-2xl shadow-blue-500/10 scale-105 z-10" 
              : "border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300"
          )}>
            {plan.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                Recomendado
              </span>
            )}
            <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
            <p className="text-xs text-slate-500 mb-6">{plan.description}</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black text-slate-900">{plan.price}</span>
              {plan.price !== 'Custom' && <span className="text-slate-400 font-bold text-sm">/mês</span>}
            </div>
            <div className="space-y-4 mb-10 flex-1">
              {plan.features.map(f => (
                <div key={f} className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  {f}
                </div>
              ))}
            </div>
            <Button className={cn(
              "w-full rounded-2xl h-12 font-bold",
              plan.highlight ? "bg-blue-600" : "bg-white text-slate-900 border-slate-200 hover:bg-slate-50"
            )}>
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>

      {/* Histórico de Faturas */}
      <div className="pt-10">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <History className="w-5 h-5 text-slate-400" />
          Histórico de Pagamento
        </h3>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Fatura</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: '#INV-2024-001', date: 'Jan 18, 2026', amount: '$49.00', status: 'pago' },
                { id: '#INV-2023-012', date: 'Dez 18, 2025', amount: '$49.00', status: 'pago' },
              ].map(inv => (
                <tr key={inv.id} className="text-sm">
                  <td className="px-6 py-4 font-bold text-slate-900">{inv.id}</td>
                  <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{inv.amount}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 font-bold hover:underline">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;
