import React from 'react';
import { 
  Zap, 
  CheckCircle2, 
  Terminal, 
  BarChart3, 
  ArrowRight, 
  ShieldCheck, 
  Layout, 
  Cpu, 
  Globe, 
  Code2,
  Lock,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      {/* Navbar Minimalista */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">BXD-MCP</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Funcionalidades</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">Como funciona</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Preços</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
            <Button size="sm">Começar Agora</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Nova Geração de Testes com IA
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Sua plataforma de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">validação SaaS</span> em tempo recorde.
            </h1>
            <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
              Automação inteligente, diagnóstico em tempo real e integração nativa com seu editor de código via protocolo MCP. Valide seus projetos antes do deploy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-2xl shadow-xl shadow-blue-200">
                Criar seu workspace gratuito
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center gap-4 px-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                  ))}
                </div>
                <p className="text-xs text-slate-400 font-medium">Junte-se a 500+ desenvolvedores</p>
              </div>
            </div>
          </div>
          <div className="relative animate-in fade-in zoom-in-95 duration-1000 delay-200">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-3xl blur-3xl -z-10"></div>
            <div className="bg-slate-900 rounded-3xl p-4 shadow-2xl border border-slate-800">
              <div className="flex items-center gap-2 mb-4 px-2 border-b border-slate-800 pb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-slate-800 h-5 w-48 rounded-full text-[10px] text-slate-500 flex items-center justify-center font-mono">
                    bxd-mcp-v1.deploy.app
                  </div>
                </div>
              </div>
              <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden flex flex-col items-center justify-center border border-white/5">
                <Terminal className="w-12 h-12 text-blue-500 mb-4 animate-pulse" />
                <div className="space-y-2 text-center">
                  <p className="text-xs font-mono text-emerald-400">$ bxd-mcp run stress-test --all</p>
                  <p className="text-[10px] font-mono text-slate-500">Executando 12 suites em paralelo...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 opacity-40 grayscale contrast-125">
          <span className="text-2xl font-black italic">MICROSOFT</span>
          <span className="text-2xl font-black italic">STRIPE</span>
          <span className="text-2xl font-black italic">VERCEL</span>
          <span className="text-2xl font-black italic">SUPABASE</span>
          <span className="text-2xl font-black italic">GITHUB</span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">O que o BXD-MCP faz por você?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Uma ferramenta desenhada para quem não aceita bugs em produção e quer escalar seus projetos SaaS com segurança.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Cpu, title: 'IA Auto-Healing', desc: 'Nossa IA analisa falhas e sugere correções no código instantaneamente.' },
              { icon: Terminal, title: 'MCP Protocol', desc: 'Integração nativa com Cursor e VS Code para rodar testes sem sair do editor.' },
              { icon: Globe, title: 'Cloud Persistence', desc: 'Sincronização em tempo real com Supabase para gerenciar dados em qualquer lugar.' },
              { icon: Lock, title: 'Controle de Acesso', desc: 'Permissões customizadas para Admins, Desenvolvedores e seus Clientes.' },
              { icon: BarChart3, title: 'Stress Analytics', desc: 'Descubra gargalos de performance simulando carga pesada em seus endpoints.' },
              { icon: Users, title: 'Multi-Workspace', desc: 'Gerencie dezenas de projetos SaaS separadamente em uma única conta.' }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20"></div>
          <div className="relative z-10 space-y-10">
            <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
              Pare de caçar bugs,<br /> comece a validar.
            </h2>
            <p className="text-xl text-blue-100/60 max-w-2xl mx-auto leading-relaxed">
              Junte-se à nova era de automação inteligente e garanta que seu SaaS esteja sempre online e performático.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="h-14 px-10 text-lg rounded-2xl bg-white text-blue-600 hover:bg-blue-50 border-none">
                Get Started for Free
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-2xl border-white/20 text-white hover:bg-white/10">
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">BXD-MCP</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Plataforma de automação e validação para desenvolvedores de elite.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Plataforma</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600">Funcionalidades</a></li>
              <li><a href="#" className="hover:text-blue-600">Integrações</a></li>
              <li><a href="#" className="hover:text-blue-600">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Recursos</h4>
            <Link to="/help" className="text-sm text-slate-500 hover:text-blue-600 block mb-4">Central de Ajuda</Link>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600">API Docs</a></li>
              <li><a href="#" className="hover:text-blue-600">Comunidade</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Empresa</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600">Sobre nós</a></li>
              <li><a href="#" className="hover:text-blue-600">Privacidade</a></li>
              <li><a href="#" className="hover:text-blue-600">Termos</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">© 2026 BXD-MCP Platform. Todos os direitos reservados.</p>
          <div className="flex gap-6 opacity-40">
            <GithubIcon className="w-5 h-5" />
            <Globe className="w-5 h-5" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
