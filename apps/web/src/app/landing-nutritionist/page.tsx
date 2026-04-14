"use client";

import { Button } from "@/components/primitives/Button";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  MessageSquare,
  FileText,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";

export default function LandingNutritionistPage() {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Gestão Completa de Pacientes",
      description:
        "Centralize todas as informações dos seus pacientes em um só lugar. Histórico completo, evoluções e dados antropométricos organizados.",
    },
    {
      icon: <CalendarDays className="w-8 h-8" />,
      title: "Agenda Inteligente",
      description:
        "Gerencie consultas presenciais e online com agenda integrada. Confirmação automática e lembretes para reduzir faltas.",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Planos Alimentares Automatizados",
      description:
        "Crie planos nutricionais personalizados com cálculo automático de macros e distribuição de refeições.",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Comunicação Integrada",
      description:
        "Chat com pacientes, envio de materiais educativos e acompanhamento remoto em tempo real.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Evolução e Métricas",
      description:
        "Dashboards visuais com indicadores de progresso dos pacientes. Acompanhe adesão e resultados.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "LGPD Compliant",
      description:
        "Seus dados e dos pacientes protegidos com criptografia de ponta a ponta e controle de consentimento.",
    },
  ];

  const benefits = [
    "Atenda mais pacientes em menos tempo",
    "Redu faltas em até 60%",
    "Automatize cálculos nutricionais",
    "Acesse de qualquer lugar",
    "Acompanhamento remoto eficiente",
    "Aumente seu faturamento",
  ];

  const testimonials = [
    {
      name: "Dra. Carolina Mendes",
      role: "Nutricionista Clínica",
      text: "O Sauvia transformou minha prática. Consigo atender 40% mais pacientes e ainda tenho mais tempo para me dedicar a cada caso.",
      rating: 5,
    },
    {
      name: "Dr. Rafael Costa",
      role: "Nutricionista Esportivo",
      text: "A plataforma é intuitiva e completa. Meus pacientes adoraram o acompanhamento remoto e os planos digitais.",
      rating: 5,
    },
    {
      name: "Dra. Fernanda Lima",
      role: "Nutrição Materno-Infantil",
      text: "Reduzi 70% do tempo administrativo. Agora foco no que realmente importa: meus pacientes.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "2.500+", label: "Nutricionistas Ativos" },
    { value: "150K+", label: "Pacientes Atendidos" },
    { value: "94%", label: "Taxa de Satisfação" },
    { value: "3x", label: "Mais Produtividade" },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "R$ 97",
      period: "/mês",
      description: "Ideal para quem está começando",
      features: [
        "Até 30 pacientes",
        "Agenda completa",
        "Planos alimentares básicos",
        "Chat com pacientes",
        "Suporte por email",
      ],
      cta: "Começar Grátis",
      popular: false,
    },
    {
      name: "Professional",
      price: "R$ 197",
      period: "/mês",
      description: "Para nutricionistas estabelecidos",
      features: [
        "Até 100 pacientes",
        "Tudo do Starter +",
        "Planos avançados com macros",
        "Dashboard de evolução",
        "Consultas online",
        "Suporte prioritário",
      ],
      cta: "Mais Popular",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "R$ 397",
      period: "/mês",
      description: "Para clínicas e equipes",
      features: [
        "Pacientes ilimitados",
        "Tudo do Professional +",
        "Múltiplos profissionais",
        "Relatórios gerenciais",
        "API personalizada",
        "Treinamento dedicado",
      ],
      cta: "Falar com Vendas",
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "Quanto tempo leva para começar?",
      answer:
        "Menos de 5 minutos! Crie sua conta, configure seu perfil e já pode começar a cadastrar pacientes. Sem complicação.",
    },
    {
      question: "Posso migrar dados de outro sistema?",
      answer:
        "Sim! Oferecemos importação automática de planilhas e suporte dedicado para migração dos seus dados.",
    },
    {
      question: "Tem contrato de fidelidade?",
      answer:
        "Não. Você pode cancelar a qualquer momento sem multas. Acreditamos que você ficará pela qualidade.",
    },
    {
      question: "Os dados estão seguros?",
      answer:
        "Absolutamente. Usamos criptografia de ponta a ponta, backups automáticos e estamos 100% em conformidade com a LGPD.",
    },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-secondary py-20 lg:py-32">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>A plataforma #1 para nutricionistas no Brasil</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-display leading-tight">
                Transforme Sua Prática de Nutrição em um Negócio
                <span className="block text-secondary mt-2">
                  Altamente Lucrativo
                </span>
              </h1>

              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                O Sauvia é o CRM completo que automatiza a gestão de pacientes,
                planos alimentares e acompanhamentos. Foque no que importa:
                transformar vidas através da nutrição.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="secondary" size="lg" className="group">
                  Comece Grátis por 14 Dias
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/20"
                >
                  Ver Demonstração
                </Button>
              </div>

              <p className="mt-6 text-white/80 text-sm">
                ✓ Sem cartão de crédito ✓ Setup em 5 minutos ✓ Cancele quando
                quiser
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2 font-display">
                  {stat.value}
                </div>
                <div className="text-on-surface-variant">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-surface to-surface-container">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-4 font-display">
              Tudo Que Você Precisa Para Escalar Sua Clínica
            </h2>
            <p className="text-xl text-on-surface-variant max-w-3xl mx-auto">
              Ferramentas profissionais integradas que automatizam o trabalho
              administrativo e potencializam seus resultados
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-xl bg-surface flex items-center justify-center text-primary mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3 font-display">
                  {feature.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-6 font-display">
                Resultados Reais Para Profissionais Reais
              </h2>
              <p className="text-xl text-on-surface-variant mb-8">
                Nutricionistas que usam o Sauvia reportam melhorias
                significativas em produtividade e satisfação.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-on-surface text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <TrendingUp className="w-32 h-32 text-white" />
              </div>
              {/* Floating Stats Cards */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-2xl font-bold text-primary">+40%</div>
                <div className="text-sm text-on-surface-variant">
                  Mais pacientes
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-2xl font-bold text-primary">-60%</div>
                <div className="text-sm text-on-surface-variant">
                  Faltas reduzidas
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-surface-container to-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-4 font-display">
              O Que Profissionais Estão Dizendo
            </h2>
            <p className="text-xl text-on-surface-variant">
              Mais de 2.500 nutricionistas já transformaram suas práticas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-on-surface-variant mb-6 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-on-surface">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-on-surface-variant">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-4 font-display">
              Investimento Que Se Paga
            </h2>
            <p className="text-xl text-on-surface-variant">
              Planos flexíveis que crescem com sua prática
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-br from-primary to-primary-dark text-white shadow-xl scale-105"
                    : "bg-white shadow-md"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3
                    className={`text-2xl font-bold mb-2 font-display ${plan.popular ? "text-white" : "text-on-surface"}`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${plan.popular ? "text-white/90" : "text-on-surface-variant"}`}
                  >
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span
                      className={`text-4xl font-bold font-display ${plan.popular ? "text-white" : "text-primary"}`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={
                        plan.popular
                          ? "text-white/90"
                          : "text-on-surface-variant"
                      }
                    >
                      {plan.period}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? "text-white" : "text-primary"}`}
                      />
                      <span
                        className={
                          plan.popular
                            ? "text-white/90"
                            : "text-on-surface-variant"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "secondary" : "primary"}
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-surface to-surface-container">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-4 font-display">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-on-surface mb-3 font-display">
                  {faq.question}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary via-primary-dark to-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-display">
              Pronto Para Transformar Sua Prática?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Junte-se a mais de 2.500 nutricionistas que já estão usando o
              Sauvia para crescer
            </p>
            <Button variant="secondary" size="lg" className="group">
              Comece Grátis por 14 Dias
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="mt-6 text-white/80 text-sm">
              Setup em 5 minutos • Sem cartão de crédito • Cancele quando quiser
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-on-surface text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-bold font-display mb-4">Sauvia</div>
          <p className="text-white/70 mb-4">CRM para Nutricionistas</p>
          <p className="text-white/50 text-sm">
            © 2024 Sauvia. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
