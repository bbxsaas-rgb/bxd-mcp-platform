import React from 'react';
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
  Github as GithubIcon
} from 'lucide-react';

const Help: React.FC = () => {
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
      content: 'Projetos são os containers das suas aplicações. Cada projeto pode ter múltiplas suites de teste e um histórico próprio de execuções.',
      links: ['Criar novo projeto', 'Monitorar saúde']
    },
    {
      title: 'Suites de Teste',
      icon: Code2,
      content: 'As suites definem o cenário de teste. Você pode configurar parâmetros como navegador, resolução e comportamentos específicos via JSON.',
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

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mb-2">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Como usar o BXD-MCP?</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Tudo o que você precisa saber para validar seus projetos SaaS com automação de ponta e inteligência artificial.
        </p>
      </div>

      {/* Grid de Seções */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors mb-4">
              <section.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{section.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              {section.content}
            </p>
            <div className="space-y-2">
              {section.links.map((link, lIdx) => (
                <button key={lIdx} className="flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  {link}
                  <ChevronRight className="w-3 h-3 ml-1" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ ou Documentação Rápida */}
      <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Ainda com dúvidas?</h2>
            <p className="text-slate-400">
              Nossa documentação completa cobre desde o setup inicial até integrações avançadas de CI/CD com GitHub Actions e Vercel.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4" />
                Docs Completas
              </button>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all flex items-center gap-2 text-sm">
                <GithubIcon className="w-4 h-4" />
                Ver no GitHub
              </button>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
            <div className="space-y-4">
              {[
                'Como integrar com o Cursor?',
                'Como funciona o consumo de tokens?',
                'Posso usar com projetos locais?',
                'O que é o Stress Test?'
              ].map((q, qIdx) => (
                <div key={qIdx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-sm text-slate-300 font-medium">{q}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
