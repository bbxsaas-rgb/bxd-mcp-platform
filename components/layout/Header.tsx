
import React from 'react';
import { Bell, Search, User, ChevronDown, Command } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center flex-1">
        <div className="relative max-w-md w-full mr-4 group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input 
            type="text" 
            placeholder="Pressione / para buscar..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] font-bold text-slate-400 shadow-sm pointer-events-none">
            <Command className="w-2.5 h-2.5" />
            K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="h-8 w-px bg-slate-200"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Leonardo Santos</p>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Desenvolvedor Sênior</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-sm">
            LS
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default Header;
