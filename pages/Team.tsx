import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Shield, 
  MoreVertical, 
  Trash2, 
  ShieldCheck,
  Search,
  Check
} from 'lucide-react';
import Button from '../components/ui/Button';
import { cn } from '../lib/utils';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'developer' | 'client';
  status: 'active' | 'pending';
  avatar?: string;
}

const Team: React.FC = () => {
  const [members] = useState<Member[]>([
    { id: '1', name: 'BXD Admin', email: 'contato@bxd.com', role: 'admin', status: 'active', avatar: 'https://github.com/github.png' },
    { id: '2', name: 'Dev Frontend', email: 'dev@empresa.io', role: 'developer', status: 'active' },
    { id: '3', name: 'Cliente VIP', email: 'CEO@cliente.com', role: 'client', status: 'pending' },
  ]);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Gestão de Equipe</h1>
          <p className="text-slate-500 text-sm">Gerencie quem tem acesso aos seus projetos e seus níveis de permissão.</p>
        </div>
        <Button onClick={() => setIsInviteModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Convidar Membro
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1 tracking-wider">Membros Ativos</p>
          <p className="text-3xl font-black text-slate-900">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1 tracking-wider">Convites Pendentes</p>
          <p className="text-3xl font-black text-amber-500">3</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1 tracking-wider">Assentos Restantes</p>
          <p className="text-3xl font-black text-blue-600">5</p>
        </div>
      </div>

      {/* Lista de Membros */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou e-mail..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Membro</th>
              <th className="px-6 py-4">Papel</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}&background=random`} 
                      className="w-10 h-10 rounded-full border border-slate-200" 
                      alt={member.name} 
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{member.name}</p>
                      <p className="text-xs text-slate-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
                    member.role === 'admin' ? "bg-purple-50 text-purple-700 border-purple-100" :
                    member.role === 'developer' ? "bg-blue-50 text-blue-700 border-blue-100" :
                    "bg-slate-50 text-slate-600 border-slate-100"
                  )}>
                    <Shield className="w-3 h-3" />
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                    member.status === 'active' ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"
                  )}>
                    {member.status === 'active' ? <Check className="w-2.5 h-2.5" /> : null}
                    {member.status === 'active' ? 'Ativo' : 'Pendente'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-400">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Convite (Simulado) */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsInviteModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 animate-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Convidar para o Time</h3>
            <p className="text-slate-500 text-sm mb-8">Adicione desenvolvedores para gerenciar testes ou clientes para visualizar relatórios.</p>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">E-mail do Membro</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="email" placeholder="cliente@empresa.com" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Papel de Acesso</label>
                <div className="grid grid-cols-3 gap-3">
                  {['admin', 'developer', 'client'].map((r) => (
                    <button key={r} className="p-3 rounded-xl border border-slate-200 text-center hover:border-blue-500 hover:bg-blue-50 transition-all group">
                      <p className="text-xs font-bold uppercase text-slate-900 group-hover:text-blue-600">{r}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setIsInviteModalOpen(false)}>Cancelar</Button>
              <Button className="flex-1 bg-blue-600" onClick={() => setIsInviteModalOpen(false)}>Enviar Convite</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
