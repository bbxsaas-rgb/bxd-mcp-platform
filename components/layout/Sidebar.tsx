import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileCheck, 
  PlayCircle, 
  Settings, 
  ChevronRight, 
  LogOut,
  Zap,
  HelpCircle,
  Users,
  CreditCard
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { signOut, profile } = useAuth();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Projetos', icon: FolderKanban, path: '/projects' },
    { label: 'Test Suites', icon: FileCheck, path: '/test-suites' },
    { label: 'Test Runs', icon: PlayCircle, path: '/test-runs' },
  ];

  const manageItems = [
    { label: 'Equipe', icon: Users, path: '/team', adminOnly: true },
    { label: 'Faturamento', icon: CreditCard, path: '/billing', adminOnly: true },
    { label: 'Configurações', icon: Settings, path: '/settings' },
    { label: 'Ajuda', icon: HelpCircle, path: '/help' },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white h-screen fixed left-0 top-0 flex flex-col z-50 shadow-sm">
      <div className="p-6 flex items-center gap-3">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Zap className="w-5 h-5 fill-current" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-black text-slate-900 tracking-tighter leading-none">BXD-MCP</span>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Platform</span>
        </div>
      </div>

      <div className="flex-1 px-4 space-y-8 mt-4 overflow-y-auto pb-8">
        {/* Main Nav */}
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3 mb-4">Menu Principal</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all',
                    isActive 
                      ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn('w-4.5 h-4.5', isActive ? 'text-blue-600' : 'text-slate-400')} />
                    {item.label}
                  </div>
                  {isActive && <div className="w-1 h-4 bg-blue-600 rounded-full animate-in slide-in-from-right-2 duration-300"></div>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Management Nav */}
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3 mb-4">Gestão & Suporte</p>
          <nav className="space-y-1">
            {manageItems.map((item) => {
              if (item.adminOnly && profile?.role !== 'admin') return null;
              
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all',
                    isActive 
                      ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn('w-4.5 h-4.5', isActive ? 'text-blue-600' : 'text-slate-400')} />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 p-2 mb-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <img 
            src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || 'User'}&background=0EA5E9&color=fff`} 
            className="w-9 h-9 rounded-xl border border-slate-100 object-cover" 
            alt="Profile" 
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">{profile?.full_name || 'Usuário'}</p>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">{profile?.role || 'Visitante'}</p>
          </div>
          <button 
            onClick={() => signOut()}
            className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
        <div className="px-2 text-center">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Plano Pro • 2026</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
