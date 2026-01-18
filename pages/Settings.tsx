import React, { useState, useEffect } from 'react';
import { 
  User, 
  Bell, 
  Key, 
  Shield, 
  Save, 
  Camera,
  Globe,
  Mail,
  Smartphone,
  Github,
  Database,
  Cloud
} from 'lucide-react';
import Button from '../components/ui/Button';
import { settingsService, GeneralSettings } from '../lib/settingsService';
import { Profile } from '../types/database';
import { cn } from '../lib/utils';

type Tab = 'profile' | 'notifications' | 'api' | 'integrations';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [settings, setSettings] = useState<GeneralSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    setProfile(settingsService.getProfile());
    setSettings(settingsService.getSettings());
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    setIsSaving(true);
    settingsService.updateProfile(profile);
    
    setTimeout(() => {
      setIsSaving(false);
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      setTimeout(() => setMessage(null), 3000);
    }, 500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    
    setIsSaving(true);
    settingsService.updateSettings(settings);
    
    setTimeout(() => {
      setIsSaving(false);
      setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
      setTimeout(() => setMessage(null), 3000);
    }, 500);
  };

  if (!profile || !settings) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configurações</h1>
        <p className="text-slate-500 text-sm">Gerencie suas preferências e chaves de acesso.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar de Abas */}
        <aside className="w-full md:w-64 space-y-1">
          {[
            { id: 'profile', label: 'Perfil', icon: User },
            { id: 'notifications', label: 'Notificações', icon: Bell },
            { id: 'api', label: 'Chaves de API', icon: Key },
            { id: 'integrations', label: 'Integrações', icon: Cloud },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all",
                activeTab === tab.id 
                  ? "bg-blue-50 text-blue-600 border border-blue-100 shadow-sm" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Conteúdo da Aba */}
        <div className="flex-1 max-w-2xl">
          {message && (
            <div className={cn(
              "mb-6 p-4 rounded-lg text-sm font-medium animate-in slide-in-from-top-2",
              message.type === 'success' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"
            )}>
              {message.text}
            </div>
          )}

          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Informações do Perfil</h3>
                <p className="text-sm text-slate-500">Como você aparece para o resto da equipe.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <img 
                      src={profile.avatar_url} 
                      alt="Avatar" 
                      className="w-20 h-20 rounded-full object-cover border-2 border-slate-100"
                    />
                    <button type="button" className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Foto de Perfil</h4>
                    <p className="text-xs text-slate-500 mt-1">Clique para trocar sua imagem.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                    <input 
                      type="text" 
                      value={profile.full_name}
                      onChange={e => setProfile({...profile, full_name: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                    <input 
                      type="email" 
                      value={profile.email}
                      onChange={e => setProfile({...profile, email: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Papel de Acesso (Simulação SaaS)</label>
                    <select 
                      value={profile.role}
                      onChange={e => setProfile({...profile, role: e.target.value as any})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
                    >
                      <option value="admin">Administrador (Total)</option>
                      <option value="developer">Desenvolvedor (Projetos & Testes)</option>
                      <option value="client">Cliente (Apenas Visualização)</option>
                    </select>
                    <p className="text-[10px] text-slate-500 mt-1">Isso mudará o que você pode ver e fazer na plataforma.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </form>
          )}

          {activeTab === 'notifications' && (
            <form onSubmit={handleSaveSettings} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Preferências de Notificação</h3>
                <p className="text-sm text-slate-500">Escolha como quer ser avisado sobre seus testes.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50/50 border border-slate-100">
                    <div className="flex gap-3">
                      <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Notificações por E-mail</p>
                        <p className="text-xs text-slate-500">Receba relatórios detalhados no seu inbox.</p>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.notifications.email}
                      onChange={e => setSettings({...settings, notifications: {...settings.notifications, email: e.target.checked}})}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50/50 border border-slate-100">
                    <div className="flex gap-3">
                      <Smartphone className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Notificações Push</p>
                        <p className="text-xs text-slate-500">Alertas em tempo real no seu navegador.</p>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.notifications.browser}
                      onChange={e => setSettings({...settings, notifications: {...settings.notifications, browser: e.target.checked}})}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">Frequência e Eventos</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.on_failure}
                        onChange={e => setSettings({...settings, notifications: {...settings.notifications, on_failure: e.target.checked}})}
                      />
                      Sempre quando um teste falhar
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.on_success}
                        onChange={e => setSettings({...settings, notifications: {...settings.notifications, on_success: e.target.checked}})}
                      />
                      Quando todos os testes passarem
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Salvando...' : 'Salvar Preferências'}
                </Button>
              </div>
            </form>
          )}

          {activeTab === 'api' && (
            <form onSubmit={handleSaveSettings} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Configurações de API</h3>
                <p className="text-sm text-slate-500">Suas chaves para integração com IA.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 text-blue-700">
                  <Shield className="w-5 h-5 shrink-0" />
                  <p className="text-xs leading-relaxed">
                    Suas chaves de API são armazenadas localmente no seu navegador e nunca são enviadas para nossos servidores.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gemini API Key</label>
                    <input 
                      type="password" 
                      placeholder="AIzaSy..."
                      value={settings.api_keys.gemini}
                      onChange={e => setSettings({...settings, api_keys: {...settings.api_keys, gemini: e.target.value}})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">OpenAI API Key (Opcional)</label>
                    <input 
                      type="password" 
                      placeholder="sk-..."
                      value={settings.api_keys.openai}
                      onChange={e => setSettings({...settings, api_keys: {...settings.api_keys, openai: e.target.value}})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Salvando...' : 'Salvar Chaves'}
                </Button>
              </div>
            </form>
          )}

          {activeTab === 'integrations' && (
            <form onSubmit={handleSaveSettings} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Integrações de Infraestrutura</h3>
                <p className="text-sm text-slate-500">Conecte sua conta ao Supabase, GitHub e Vercel.</p>
              </div>
              <div className="p-6 space-y-8">
                {/* Supabase */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Database className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-bold text-slate-900">Supabase</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Project URL</label>
                      <input 
                        type="text" 
                        placeholder="https://xyz.supabase.co"
                        value={settings.integrations.supabase_url}
                        onChange={e => setSettings({...settings, integrations: {...settings.integrations, supabase_url: e.target.value}})}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Anon Key</label>
                      <input 
                        type="password" 
                        placeholder="eyJhbG..."
                        value={settings.integrations.supabase_anon_key}
                        onChange={e => setSettings({...settings, integrations: {...settings.integrations, supabase_anon_key: e.target.value}})}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* GitHub */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Github className="w-5 h-5 text-slate-900" />
                    <h4 className="font-bold text-slate-900">GitHub</h4>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Personal Access Token</label>
                    <input 
                      type="password" 
                      placeholder="ghp_..."
                      value={settings.integrations.github_token}
                      onChange={e => setSettings({...settings, integrations: {...settings.integrations, github_token: e.target.value}})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Necessário para automação de commits e pull requests.</p>
                  </div>
                </div>

                {/* Vercel */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Cloud className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-slate-900">Vercel</h4>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Vercel API Token</label>
                    <input 
                      type="password" 
                      placeholder="v_..."
                      value={settings.integrations.vercel_token}
                      onChange={e => setSettings({...settings, integrations: {...settings.integrations, vercel_token: e.target.value}})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Necessário para gerenciar deploys e ambientes.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Salvando...' : 'Salvar Integrações'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
