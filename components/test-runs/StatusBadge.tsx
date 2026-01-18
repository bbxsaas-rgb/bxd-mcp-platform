
import React from 'react';
import { CheckCircle2, XCircle, Clock, Ban, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Status } from '../../types/database';

interface StatusBadgeProps {
  status: Status;
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const configs = {
    passed: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2, label: 'Sucesso' },
    failed: { color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle, label: 'Falha' },
    running: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Loader2, label: 'Rodando', animate: true },
    pending: { color: 'bg-slate-100 text-slate-600 border-slate-200', icon: Clock, label: 'Pendente' },
    cancelled: { color: 'bg-slate-100 text-slate-500 border-slate-200', icon: Ban, label: 'Cancelado' },
  };

  const config = configs[status] || configs.pending;
  const Icon = config.icon;

  return (
    <div className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-medium uppercase tracking-wider',
      config.color,
      size === 'sm' ? 'text-[10px]' : 'text-xs'
    )}>
      <Icon className={cn('w-3.5 h-3.5', config.animate && 'animate-spin')} />
      {config.label}
    </div>
  );
};

export default StatusBadge;
