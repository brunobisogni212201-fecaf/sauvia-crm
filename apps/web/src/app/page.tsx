import React from 'react';
import { AppIcons, DESIGN_TOKENS } from '@sauvia/ui-icons';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] selection:bg-[var(--color-primary-light)] selection:text-white">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-[var(--color-surface-container-high)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AppIcons.Dashboard size={32} strokeWidth={2.5} className="text-[var(--color-primary)]" />
            <span className="text-2xl font-display font-extrabold text-[var(--color-primary)] tracking-tight">SAUVIA</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[var(--color-on-surface-variant)] font-medium">
            <a href="#features" className="hover:text-[var(--color-primary)] transition-colors">Funcionalidades</a>
            <a href="#security" className="hover:text-[var(--color-primary)] transition-colors">Segurança</a>
            <a href="#pricing" className="hover:text-[var(--color-primary)] transition-colors">Preços</a>
          </div>

          <Link href="/login" className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[var(--color-primary-dark)] transition-all shadow-md active:scale-95">
            Acessar Sistema
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[var(--color-surface-container)] px-4 py-2 rounded-full text-[var(--color-primary)] font-bold text-sm mb-8 animate-fade-in">
            <AppIcons.Security size={18} />
            <span>100% em conformidade com a LGPD</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-[var(--color-on-surface)] leading-[1.1] mb-8 animate-slide-up">
            A Nova Era da <span className="text-[var(--color-primary)]">Gestão em Saúde</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[var(--color-on-surface-variant)] max-w-3xl mx-auto mb-12 animate-slide-up delay-100">
            Plataforma completa para clínicas modernas: Gestão inteligente de pacientes, prontuários digitais e total segurança jurídica.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-slide-up delay-200">
            <Link href="/register" className="w-full md:w-auto bg-[var(--color-secondary)] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-[var(--color-secondary-light)] transition-all shadow-lg hover:shadow-xl active:scale-95">
              Começar Agora Gratuitamente
            </Link>
            <button className="w-full md:w-auto flex items-center justify-center gap-2 text-[var(--color-primary)] font-bold text-xl px-8 py-4 hover:bg-[var(--color-surface-container)] rounded-2xl transition-all">
              <AppIcons.Time size={24} />
              Ver Demonstração
            </button>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--color-primary-light)] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-secondary)] rounded-full blur-[150px]" />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<AppIcons.Patients size={40} />}
              title="Gestão de Pacientes"
              description="Histórico completo, documentos e evolução clínica organizada em uma timeline intuitiva."
            />
            <FeatureCard 
              icon={<AppIcons.Appointments size={40} />}
              title="Agenda Inteligente"
              description="Controle de horários com notificações automáticas via WhatsApp para reduzir faltas."
            />
            <FeatureCard 
              icon={<AppIcons.Treatments size={40} />}
              title="Planos de Tratamento"
              description="Crie e acompanhe planos de saúde personalizados com indicadores de progresso reais."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl border border-[var(--color-surface-container)] hover:border-[var(--color-primary-light)] transition-all hover:shadow-xl group">
      <div className="mb-6 text-[var(--color-primary)] group-hover:scale-110 transition-transform origin-left">
        {icon}
      </div>
      <h3 className="text-2xl font-display font-bold text-[var(--color-on-surface)] mb-4">{title}</h3>
      <p className="text-[var(--color-on-surface-variant)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
