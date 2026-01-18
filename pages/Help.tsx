import React, { useState } from 'react';
import { 
  BookOpen, 
  Rocket, 
  Terminal, 
  Zap, 
  ShieldCheck, 
  HelpCircle,
  ChevronRight,
  Code2,
  Database,
  Github as GithubIcon,
  X,
  CheckCircle2,
  Info
} from 'lucide-react';

interface HelpDetail {
  title: string;
  description: string;
  steps?: string[];
  code?: string;
}

const Help: React.FC = () => {
  const [selectedDetail, setSelectedDetail] = useState<HelpDetail | null>(null);

  const helpDetails: Record<string, HelpDetail> = {
    'Configurando Integrações': {
      title: 'Configurando Integrações',
      description: 'Para que a plataforma funcione 100%, você precisa conectar suas ferramentas.',
      steps: [
        'Vá em Configurações > Integrações.',
        'Insira a URL e a Anon Key do seu banco de dados na nuvem.',
        'Adicione seu Token do GitHub para sincronizar repositórios.',
        'Configure o Token da Vercel para deploys automáticos.'
      ]
    },
    'Primeiro Projeto': {
      title: 'Seu Primeiro Projeto',
      description: 'Projetos organizam suas suítes de teste e histórico.',
      steps: [
        'Na tela de Projetos, clique em "Novo Projeto".',
        'Dê um nome e descreva o objetivo (ex: "Meu SaaS - Dashboard").',
        'Insira a URL base onde os testes serão executados.',
        'Vincule o repositório do GitHub (opcional).'
      ]
    },
    'Sintaxe de configuração': {
      title: 'Sintaxe de Configuração JSON',
      description: 'As suítes de teste usam um formato JSON simples para definir o comportamento.',
      code: `{
  "browser": "chromium",
  "viewport": { "width": 1280, "height": 720 },
  "retries": 2,
  "timeout": 30000,
  "headless": true
}`
    },
    'Setup no Cursor': {
      title: 'Configuração no Cursor',
      description: 'Conecte o BXD-MCP ao seu editor para que a IA execute testes diretamente.',
      steps: [
        'No Cursor, vá em Settings > MCP.',
        'Clique em "Add New MCP Server".',
        'Nome: BXD-Platform.',
        'Type: command.',
        'Command: npx ts-node mcp-server.ts (no diretório do projeto).'
      ]
    },
    'Como funciona o diagnóstico': {
      title: 'IA & Diagnóstico Automático',
      description: 'Nossa IA economiza horas de debugging analisando falhas automaticamente.',
      steps: [
        'Execute uma suíte de teste ou um Stress Test.',
        'Se houver falha, a IA lê o log de erro e o código fonte.',
        'Um cartão de "Diagnóstico da IA" aparecerá nos detalhes da execução.',
        'O diagnóstico sugere a linha exata e a correção necessária.'
      ]
    },
    'Níveis de permissão': {
      title: 'Níveis de Permissão (RBAC)',
      description: 'Garanta que cada pessoa veja apenas o que é necessário.',
      steps: [
        'Admin: Acesso total, configurações, faturamento e gestão de equipe.',
        'Developer: Cria projetos, suítes e executa testes.',
        'Client: Acesso apenas para visualizar relatórios e histórico de saúde.'
      ]
    },
    'O que é o Stress Test?': {
      title: 'Stress Test & Escalabilidade',
      description: 'O Stress Test simula múltiplas execuções simultâneas para validar a robustez do seu SaaS.',
      steps: [
        'Dispara todas as suítes de teste do projeto ao mesmo tempo.',
        'Monitora o tempo de resposta sob carga.',
        'A IA identifica gargalos de performance que só aparecem em pico de tráfego.'
      ]
    }
  };

  const sections = [
    {
      title: 'Primeiros Passos',
      icon: Rocket,
      content: 'Para começar, você deve configurar suas integrações básicas na aba de Configurações. Insira as credenciais de banco de dados para ativar a persistência na nuvem.',
      links: ['Configurando Integrações', 'Primeiro Projeto']
    },
    {
      title: 'Gestão de Projetos',
      icon: Database,
      content: 'Projetos são os containers das suas aplicações. Cada projeto pode ter múltiplas suítes de teste e um histórico próprio de execuções.',
      links: ['Criar novo projeto', 'Monitorar saúde']
    },
    {
      title: 'Suites de Teste',
      icon: Code2,
      content: 'As suítes definem o cenário de teste. Você pode configurar parâmetros como navegador, resolução e comportamentos específicos via JSON.',
      links: ['Sintaxe de configuração', 'Ambientes']
    },
    {
      title: 'IA & Diagnóstico',
      icon: Zap,
      content: 'Quando um teste falha durante um Stress Test, nossa IA analisa automaticamente o log de erro e sugere a correção exata no seu código.',
      links: ['Como funciona o diagnóstico', 'Conectar Gemini/OpenAI']
    },
    {
      title: 'Conexão MCP',
      icon: Terminal,
      content: 'Use o Model Context Protocol para conectar o BXD-MCP ao seu editor (Cursor/VS Code). Isso permite que a IA execute testes por você.',
      links: ['Setup no Cursor', 'Setup no VS Code']
    },
    {
      title: 'Controle de Acesso',
      icon: ShieldCheck,
      content: 'Gerencie permissões entre Administradores, Desenvolvedores e Clientes para garantir a segurança e transparência do projeto.',
      links: ['Níveis de permissão', 'Convidar cliente']
    }
  ];

  const handleLinkClick = (link: string) => {
    const detail = helpDetails[link] || {
      title: link,
      description: 'Esta documentação está sendo atualizada. Entre em contato com o suporte para mais detalhes.',
      steps: ['Recurso em fase de homologação profissional.']
    };
    setSelectedDetail(detail);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 px-4 sm:px-6">
      {/* Modal de Detalhes */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <Info className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{selectedDetail.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedDetail(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <p className="text-slate-600 leading-relaxed">
                {selectedDetail.description}
              </p>

              {selectedDetail.steps && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Passo a passo:</h4>
                  {selectedDetail.steps.map((step, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                      <span className="text-sm text-slate-600">{step}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedDetail.code && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Exemplo de Configuração:</h4>
                  <pre className="bg-slate-900 text-blue-400 p-4 rounded-xl text-xs overflow-x-auto font-mono leading-relaxed border border-white/10 shadow-inner">
                    {selectedDetail.code}
                  </pre>
                </div>
              )}

              <button 
                onClick={() => setSelectedDetail(null)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
              >
                Entendi, continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-4 pt-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-600 text-white shadow-2xl shadow-blue-500/20 mb-4">
          <HelpCircle className="w-10 h-10" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase">
          Guia do <span className="text-blue-600">Sucesso</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Tudo o que você precisa saber para validar seus projetos SaaS com automação de ponta e inteligência artificial de forma profissional.
        </p>
      </div>

      {/* Grid de Seções */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group duration-300">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all mb-6 shadow-sm">
              <section.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">
              {section.content}
            </p>
            <div className="space-y-3">
              {section.links.map((link, lIdx) => (
                <button 
                  key={lIdx} 
                  onClick={() => handleLinkClick(link)}
                  className="flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group/link"
                >
                  {link}
                  <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ ou Documentação Rápida */}
      <div className="bg-slate-900 rounded-[40px] p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-blue-500/30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[300px] h-[300px] bg-indigo-500/20 blur-[80px] rounded-full"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
              Central de Suporte
            </div>
            <h2 className="text-4xl font-bold leading-tight">Ainda com dúvidas? <br/> Estamos aqui.</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Nossa documentação completa cobre desde o setup inicial até integrações avançadas de CI/CD com fluxos profissionais de entrega contínua.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all flex items-center gap-3 shadow-lg shadow-blue-600/20">
                <BookOpen className="w-5 h-5" />
                Acessar Docs
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold transition-all flex items-center gap-3 border border-white/5 backdrop-blur-md">
                <GithubIcon className="w-5 h-5" />
                Open Source
              </button>
            </div>
          </div>

          <div className="bg-white/5 rounded-[32px] p-8 border border-white/10 backdrop-blur-xl shadow-inner">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 ml-2">Perguntas Frequentes</h4>
            <div className="space-y-4">
              {[
                'Como integrar com o Cursor?',
                'Como funciona o consumo de tokens?',
                'Posso usar com projetos locais?',
                'O que é o Stress Test?'
              ].map((q, qIdx) => (
                <button 
                  key={qIdx} 
                  onClick={() => handleLinkClick(q)}
                  className="w-full flex justify-between items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10 group"
                >
                  <span className="text-sm text-slate-200 font-semibold">{q}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
