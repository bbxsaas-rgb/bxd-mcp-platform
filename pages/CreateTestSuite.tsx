import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Beaker, ArrowLeft, Save, Code2, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { testSuiteService } from '../lib/testSuiteService';
import { projectService } from '../lib/projectService';
import { Project } from '../types/database';

const CreateTestSuite: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    project_id: '',
    config: '{\n  "browser": "chromium",\n  "headless": true,\n  "viewport": { "width": 1280, "height": 720 }\n}'
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await projectService.getProjects();
      setProjects(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, project_id: data[0].id }));
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Validar JSON da configuração
      const parsedConfig = JSON.parse(formData.config);
      
      await testSuiteService.addSuite({
        name: formData.name,
        description: formData.description,
        project_id: formData.project_id,
        config: parsedConfig
      });
      
      navigate('/test-suites');
    } catch (err) {
      setError('A configuração deve ser um JSON válido.');
    }
  };

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border border-slate-200">
        <AlertCircle className="w-12 h-12 text-amber-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-900">Nenhum projeto encontrado</h2>
        <p className="text-slate-500 mb-6">Você precisa criar um projeto antes de adicionar uma suite de testes.</p>
        <Button onClick={() => navigate('/projects/new')}>Criar Projeto</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 hover:bg-slate-100 rounded-full transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nova Suite de Teste</h1>
          <p className="text-slate-500 text-sm">Configure o ambiente e os parâmetros da sua suite.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Suite</label>
                <div className="relative">
                  <Beaker className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Ex: Checkout Flow"
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Projeto Relacionado</label>
                <select
                  required
                  value={formData.project_id}
                  onChange={e => setFormData({...formData, project_id: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none bg-white"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Descreva o objetivo desta suite de testes..."
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all h-32 resize-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Configuração JSON
              </label>
              <div className="relative font-mono text-xs">
                <textarea
                  required
                  value={formData.config}
                  onChange={e => setFormData({...formData, config: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all h-[260px] bg-slate-900 text-slate-300 resize-none leading-relaxed"
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs flex items-center gap-1.5 mt-2">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancelar</Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Criar Suite
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTestSuite;
