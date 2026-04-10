"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  ClipboardList,
  Bell,
  Sparkles,
  Crown,
  MessageSquare,
  BarChart3,
  Shield,
  ArrowRight,
  Send,
  ChevronDown,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] selection:bg-[var(--color-primary)] selection:text-white">
      {/* ─── Navigation ─── */}
      <nav className="glass sticky top-0 z-50 border-b border-[var(--color-surface-container-high)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Sparkles size={28} className="text-[var(--color-primary)]" />
            <span className="text-2xl font-body font-extrabold tracking-tight text-[var(--color-primary)]">
              SAUVIA
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[var(--color-on-surface-variant)] font-medium text-sm">
            <a href="#eficiencia" className="hover:text-[var(--color-primary)] transition-colors">
              Eficiência
            </a>
            <a href="#marca" className="hover:text-[var(--color-primary)] transition-colors">
              Sua Marca
            </a>
            <a href="#recursos" className="hover:text-[var(--color-primary)] transition-colors">
              Recursos
            </a>
          </div>

          <Link
            href="/login"
            className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[var(--color-primary-dark)] transition-all glow-shadow glow-shadow-hover active:scale-95"
          >
            Acessar Sistema
          </Link>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        {/* Background blurs */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[15%] w-[500px] h-[500px] bg-[var(--color-primary)] rounded-full blur-[180px] opacity-10" />
          <div className="absolute bottom-[-15%] left-[10%] w-[400px] h-[400px] bg-[var(--color-secondary)] rounded-full blur-[160px] opacity-10" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 px-5 py-2 rounded-full text-[var(--color-primary)] font-semibold text-sm mb-10"
            >
              <Crown size={16} />
              <span>O CRM #1 para Nutricionistas no Brasil</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl sm:text-6xl lg:text-7xl font-display text-[var(--color-on-surface)] leading-[1.1] mb-8"
            >
              A Ciência de Fazer Mais.
              <br />
              <span className="text-[var(--color-primary)]">
                A Arte de Ser Relevante.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg sm:text-xl text-[var(--color-on-surface-variant)] max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              O CRM que não gerencia apenas dados, orquestra relacionamentos.
              Simplifique sua prática clínica e foque no que importa: ser o
              arquiteto da saúde dos seus pacientes.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/register"
                className="group flex items-center gap-2 bg-[var(--color-primary)] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[var(--color-primary-dark)] transition-all glow-shadow glow-shadow-hover active:scale-95"
              >
                Comece sua Avaliação Gratuita
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <button className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-lg px-8 py-4 hover:bg-[var(--color-primary)]/5 rounded-full transition-all">
                Ver Demonstração
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-8 text-sm text-[var(--color-on-surface-variant)]"
            >
              Sem cartão de crédito · Setup em 5 minutos · Cancele quando quiser
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} className="text-[var(--color-on-surface-variant)] opacity-40" />
        </motion.div>
      </section>

      {/* ─── Seção Peggy Olson: O Problema e a Eficiência ─── */}
      <section id="eficiencia" className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-4xl sm:text-5xl lg:text-6xl font-display text-[var(--color-on-surface)] mb-6"
            >
              O Controle Que Você Merece.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-lg text-[var(--color-on-surface-variant)] max-w-3xl mx-auto leading-relaxed"
            >
              Você não estudou nutrição para ser uma secretária. A Sauvia
              centraliza sua agenda, automatiza lembretes e organiza planos
              nutricionais. Removemos o estresse administrativo para você focar
              no paciente à sua frente.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <CalendarDays size={32} />,
                title: "Agenda Inteligente",
                desc: "Gerencie horários com eficiência. Confirmação e lembretes automáticos via WhatsApp reduzem faltas em até 60%.",
              },
              {
                icon: <ClipboardList size={32} />,
                title: "Planos Nutricionais",
                desc: "Crie planos personalizados com cálculo automático de macros. Templates reutilizáveis economizam horas semanais.",
              },
              {
                icon: <Bell size={32} />,
                title: "Automações Completas",
                desc: "Lembretes de consulta, follow-ups pós-atendimento e cobranças. Tudo automático, nada passa despercebido.",
              },
              {
                icon: <Users size={32} />,
                title: "Gestão de Pacientes",
                desc: "Histórico completo, evolução clínica e dados antropométricos. Tudo organizado em uma timeline intuitiva.",
              },
              {
                icon: <BarChart3 size={32} />,
                title: "Dashboards Visuais",
                desc: "Acompanhe métricas de adesão, progresso e resultados dos pacientes com gráficos em tempo real.",
              },
              {
                icon: <Shield size={32} />,
                title: "LGPD Compliant",
                desc: "Dados protegidos com criptografia, controle de consentimento granular e residência de dados em São Paulo.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                custom={i}
                className="group p-8 rounded-[1rem] bg-[var(--color-surface)] hover:bg-white transition-all hover:shadow-[var(--shadow-lg)]"
              >
                <div className="w-14 h-14 rounded-[1rem] bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-6 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-body font-bold text-[var(--color-on-surface)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-on-surface-variant)] leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Seção Don Draper: A Marca e o Legado ─── */}
      <section
        id="marca"
        className="relative py-24 lg:py-32 px-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 50%, var(--color-primary-light) 100%)",
        }}
      >
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-4xl sm:text-5xl lg:text-6xl font-display text-white mb-8"
            >
              O Que o Seu CRM Diz Sobre Você?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-lg sm:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed mb-16"
            >
              Eles não compram apenas um plano alimentar, compram a sua
              confiança. A Sauvia é o palco onde a sua marca brilha, garantindo
              que a percepção de valor do seu consultório comece antes mesmo da
              primeira consulta.
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <MessageSquare size={28} />,
                  title: "Comunicação Premium",
                  desc: "Mensagens personalizadas com a cara da sua marca. Cada interação reforça sua autoridade profissional.",
                },
                {
                  icon: <Crown size={28} />,
                  title: "Experiência de Alto Padrão",
                  desc: "Portal do paciente com design elegante. Seu consultório digital transmite a mesma excelência que o presencial.",
                },
                {
                  icon: <Sparkles size={28} />,
                  title: "Posicionamento de Mercado",
                  desc: "Relatórios visuais, acompanhamento sofisticado. Ferramentas que justificam seu preço premium.",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  custom={i}
                  className="glass p-8 rounded-[1rem] text-left"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white mb-5">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-body font-bold text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-white/75 leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Social Proof / Stats ─── */}
      <section id="recursos" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "2.500+", label: "Nutricionistas Ativos" },
              { value: "150K+", label: "Pacientes Gerenciados" },
              { value: "94%", label: "Taxa de Satisfação" },
              { value: "3x", label: "Mais Produtividade" },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i}>
                <div className="text-4xl lg:text-5xl font-display text-[var(--color-primary)] mb-2">
                  {stat.value}
                </div>
                <div className="text-[var(--color-on-surface-variant)] font-medium text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA Final ─── */}
      <section
        className="py-24 lg:py-32 px-6"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 60%, hsl(270, 80%, 25%) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-4xl sm:text-5xl lg:text-6xl font-display text-white mb-6"
            >
              Deixe o seu legado,
              <br />
              não apenas o seu plano.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-lg text-white/80 mb-10 max-w-xl mx-auto"
            >
              Junte-se a milhares de nutricionistas que já transformaram a forma
              como cuidam dos seus pacientes.
            </motion.p>

            <motion.form
              variants={fadeUp}
              custom={2}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 w-full sm:w-auto px-6 py-4 rounded-full bg-white/15 text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all text-base"
              />
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-bold text-base hover:bg-white/90 transition-all active:scale-95"
              >
                <Send size={18} />
                Começar Grátis
              </button>
            </motion.form>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="mt-6 text-sm text-white/60"
            >
              14 dias grátis · Sem cartão de crédito · Cancele quando quiser
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12 px-6 bg-[var(--color-on-surface)]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={20} className="text-[var(--color-primary-light)]" />
            <span className="text-xl font-body font-extrabold text-white tracking-tight">
              SAUVIA
            </span>
          </div>
          <p className="text-white/50 text-sm mb-2">
            O CRM que orquestra relacionamentos para nutricionistas.
          </p>
          <p className="text-white/30 text-xs">
            © 2026 Sauvia. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
