"use client";

import { Button } from "@/components/primitives/Button";
import { motion } from "framer-motion";
import {
  Heart,
  Smartphone,
  Calendar,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Star,
  Utensils,
  TrendingUp,
  Shield,
  Clock,
  Users,
  Target,
} from "lucide-react";

export default function LandingClientPage() {
  const features = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Acesse Seu Plano de Qualquer Lugar",
      description:
        "Receba seu plano alimentar direto no celular. Consulte receitas, listas de compras e orientações quando e onde quiser.",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Fale Direto Com Seu Nutricionista",
      description:
        "Tire dúvidas em tempo real, envie fotos das refeições e receba feedback imediato do seu profissional.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Acompanhe Sua Evolução",
      description:
        "Veja seu progresso com gráficos visuais. Monitore peso, medidas e hábitos ao longo do tempo.",
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Receitas Práticas e Deliciosas",
      description:
        "Acesse centenas de receitas saudáveis personalizadas para seu plano. Com filtros de tempo e ingredientes.",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Agende Consultas Facilmente",
      description:
        "Marque e remarcas consultas com poucos cliques. Receba lembretes automáticos para não esquecer.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Seus Dados Protegidos",
      description:
        "Informações 100% seguras e privadas. Você controla quem tem acesso aos seus dados de saúde.",
    },
  ];

  const benefits = [
    "Plano alimentar 100% personalizado",
    "Acompanhamento contínuo entre consultas",
    "Receitas adaptadas ao seu gosto",
    "Lembretes de hidratação e refeições",
    "Chat direto com seu nutricionista",
    "Relatórios visuais de progresso",
  ];

  const testimonials = [
    {
      name: "Mariana Souza",
      role: "Perdeu 15kg em 6 meses",
      text: "O app me ajudou a manter a disciplina entre as consultas. As receitas são incríveis e fáceis de fazer!",
      rating: 5,
    },
    {
      name: "Pedro Almeida",
      role: "Ganho de massa muscular",
      text: "Finalmente consegui seguir o plano alimentar direito. O lembrete de refeições fez toda diferença.",
      rating: 5,
    },
    {
      name: "Juliana Costa",
      role: "Reeducação alimentar",
      text: "Adoro poder tirar dúvidas rápidas com minha nutri. Me sinto acompanhada o tempo todo!",
      rating: 5,
    },
  ];

  const stats = [
    { value: "50K+", label: "Pacientes Ativos" },
    { value: "95%", label: "Taxa de Adesão" },
    { value: "4.9★", label: "Avaliação Média" },
    { value: "3x", label: "Mais Resultados" },
  ];

  const howItWorks = [
    {
      step: 1,
      icon: <Users className="w-8 h-8" />,
      title: "Encontre Seu Nutricionista",
      description:
        "Escolha entre profissionais qualificados ou use seu nutricionista de confiança.",
    },
    {
      step: 2,
      icon: <Target className="w-8 h-8" />,
      title: "Receba Seu Plano Personalizado",
      description:
        "Após a consulta, receba seu plano alimentar completo no app com todas as orientações.",
    },
    {
      step: 3,
      icon: <Heart className="w-8 h-8" />,
      title: "Siga e Acompanhe",
      description:
        "Execute seu plano, registre refeições e veja sua evolução dia após dia.",
    },
    {
      step: 4,
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Alcance Seus Objetivos",
      description:
        "Com acompanhamento contínuo, alcance resultados que duram para sempre.",
    },
  ];

  const faqs = [
    {
      question: "Preciso pagar pelo app?",
      answer:
        "Não! O app é gratuito para pacientes. Você só precisa ter um nutricionista que use o Sauvia.",
    },
    {
      question: "Meus dados estão seguros?",
      answer:
        "Sim! Usamos criptografia de ponta a ponta. Apenas você e seu nutricionista têm acesso aos seus dados.",
    },
    {
      question: "Posso trocar de nutricionista?",
      answer:
        "Sim, você pode trocar de profissional quando quiser. Seus dados permanecem com você.",
    },
    {
      question: "O app funciona offline?",
      answer:
        "Sim! Você pode consultar seu plano alimentar e receitas mesmo sem internet.",
    },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-primary to-primary-dark py-20 lg:py-32">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
            animate={{ scale: [1.3, 1, 1.3], rotate: [0, -90, 0] }}
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
                <Heart className="w-4 h-4" />
                <span>O app de nutrição mais amado do Brasil</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-display leading-tight">
                Sua Jornada Para Uma Vida Mais Saudável
                <span className="block text-secondary mt-2">Começa Aqui</span>
              </h1>

              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Receba planos alimentares personalizados, acompanhe sua evolução
                e tenha suporte direto do seu nutricionista. Tudo em um app
                lindo e fácil de usar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="secondary" size="lg" className="group">
                  Baixar App Grátis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/20"
                >
                  Ver Como Funciona
                </Button>
              </div>

              <p className="mt-6 text-white/80 text-sm">
                ✓ 100% Gratuito ✓ iOS & Android ✓ Seguro e Privado
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
              Tudo Que Você Precisa Para Alcançar Seus Objetivos
            </h2>
            <p className="text-xl text-on-surface-variant max-w-3xl mx-auto">
              Ferramentas inteligentes que tornam sua jornada alimentar mais
              fácil, divertida e eficaz
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
                Resultados Que Você Vai Sentir
              </h2>
              <p className="text-xl text-on-surface-variant mb-8">
                Pacientes que usam o Sauvia têm 3x mais chances de alcançar seus
                objetivos de saúde.
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
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                <Heart className="w-32 h-32 text-white" />
              </div>
              {/* Floating Stats Cards */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-on-surface-variant">
                  Adesão ao plano
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-2xl font-bold text-primary">4.9★</div>
                <div className="text-sm text-on-surface-variant">
                  Avaliação dos usuários
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-surface-container to-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-4 font-display">
              Como Funciona
            </h2>
            <p className="text-xl text-on-surface-variant">
              Em 4 passos simples, você está no caminho certo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white rounded-2xl p-8 shadow-md"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div className="w-16 h-16 rounded-xl bg-surface flex items-center justify-center text-primary mb-6 mt-2">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3 font-display">
                  {item.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-4 font-display">
              Histórias de Sucesso Reais
            </h2>
            <p className="text-xl text-on-surface-variant">
              Milhares de pessoas já transformaram suas vidas
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
                className="bg-gradient-to-br from-surface to-surface-container rounded-2xl p-8 shadow-md"
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
      <section className="py-20 lg:py-32 bg-gradient-to-br from-secondary via-primary to-primary-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-display">
              Comece Sua Transformação Hoje
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Baixe o app gratuito e dê o primeiro passo para uma vida mais
              saudável
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="secondary" size="lg" className="group">
                <Smartphone className="mr-2 w-5 h-5" />
                Baixar para iOS
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" size="lg" className="group">
                <Smartphone className="mr-2 w-5 h-5" />
                Baixar para Android
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <p className="mt-6 text-white/80 text-sm">
              100% Gratuito • Seguro e Privado • iOS & Android
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-on-surface text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-bold font-display mb-4">Sauvia</div>
          <p className="text-white/70 mb-4">
            Sua jornada para uma vida mais saudável
          </p>
          <p className="text-white/50 text-sm">
            © 2024 Sauvia. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
