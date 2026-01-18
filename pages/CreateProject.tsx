import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Globe, Github, Save, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { projectService } from '../lib/projectService';
import { useAuth } from '../contexts/AuthContext';

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    repository_url: '',
    base_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await projectService.addProject({
      ...formData,
      user_id: user.id
    });
    navigate('/projects');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 hover:bg-slate-100 rounded-full transition-colors group"
          title="Voltar"
        >
          <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Novo Projeto</h1>
          <p className="text-slate-500 text-sm">Configure uma nova aplicação para monitoramento.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Projeto</label>
            <div className="relative">
              <Layout className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Minha Loja Virtual"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Breve descrição do que este projeto faz..."
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all h-24 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">URL de Produção</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  required
                  type="url"
                  value={formData.base_url}
                  onChange={e => setFormData({...formData, base_url: e.target.value})}
                  placeholder="https://app.com"
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Repositório (Opcional)</label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  value={formData.repository_url}
                  onChange={e => setFormData({...formData, repository_url: e.target.value})}
                  placeholder="github.com/user/repo"
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancelar</Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Criar Projeto
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
