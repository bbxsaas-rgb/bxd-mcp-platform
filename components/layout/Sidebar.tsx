
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
  Zap
} from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Projetos', icon: FolderKanban, path: '/projects' },
    { label: 'Test Suites', icon: FileCheck, path: '/test-suites' },
    { label: 'Test Runs', icon: PlayCircle, path: '/test-runs' },
    { label: 'Configurações', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white h-screen fixed left-0 top-0 flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
          <Zap className="w-5 h-5" />
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">BXD-MCP</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn('w-4.5 h-4.5', isActive ? 'text-blue-600' : 'text-slate-400')} />
                {item.label}
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">Projetos Recentes</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              E-commerce App
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              CRM Dashboard
            </div>
          </div>
        </div>

        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 w-full transition-colors">
          <LogOut className="w-4.5 h-4.5" />
          Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;