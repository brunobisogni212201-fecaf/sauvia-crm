'use client'

import { Hero, Features, Footer, Navbar } from '@/components/landing'
import { Card, Typography } from '@/components/primitives'
import { Fade } from '@/components/primitives/Animation'
import Link from 'next/link'

const plans = [
  {
    name: 'Início',
    price: 'R$ 97',
    period: '/mês',
    description: 'Para nutricionistas que estão começando',
    features: [
      'Até 50 pacientes',
      'Agenda online',
      'Planos alimentares',
      'WhatsApp básico',
      'Suporte por email',
    ],
    cta: 'Começar Grátis',
    popular: false,
  },
  {
    name: 'Profissional',
    price: 'R$ 197',
    period: '/mês',
    description: 'Para consultórios em crescimento',
    features: [
      'Pacientes ilimitados',
      'Automações n8n',
      'Relatórios avançados',
      'WhatsApp completo',
      'Suporte prioritário',
      'White-label',
    ],
    cta: 'Escolher Profissional',
    popular: true,
  },
  {
    name: 'Clínica',
    price: 'R$ 397',
    period: '/mês',
    description: 'Para equipes e clínicas',
    features: [
      'Tudo do Profissional',
      'Múltiplos nutricionistas',
      'API completa',
      'Integrações customizadas',
      'Gerente de contas',
      'SLA garantido',
    ],
    cta: 'Falar com Consultor',
    popular: false,
  },
]

const faqs = [
  {
    question: 'Como funciona o período de teste?',
    answer: 'Oferecemos 14 dias gratuitos sem necessidade de cartão de crédito. Você tem acesso a todas as funcionalidades do plano chosen.',
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer: 'Sim! Não temos contrato de fidelidade. Você pode cancelar quando quiser, com acesso até o final do período pago.',
  },
  {
    question: 'O WhatsApp já está incluso?',
    answer: 'Sim! A integração com WhatsApp via Evolute API está inclusa. Você só precisa criar sua conta na Evolute (tem plano gratuito).',
  },
  {
    question: 'Meus dados estão seguros?',
    answer: 'Absolutamente. Somos LGPD compliant, usamos criptografia e seus dados ficam em servidores seguros na AWS.',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <Hero />
      
      <Features />
      
      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <Fade direction="up">
            <div className="text-center mb-16">
              <Typography variant="title-xl" as="h2">
                Planos flexíveis para cada fase
              </Typography>
              <Typography variant="body-lg" className="mt-2 text-[#6b7280]">
                Escolha o plano que melhor se adapta ao seu negócio
              </Typography>
            </div>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Fade key={plan.name} direction="up" delay={index * 0.1}>
                <Card 
                  className={`relative h-full ${plan.popular ? 'ring-2 ring-[#006b2c] ring-offset-4' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-[#006b2c] text-white px-4 py-1 rounded-full text-sm font-medium">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <Typography variant="title-md">{plan.name}</Typography>
                    <div className="mt-4 flex items-baseline justify-center gap-1">
                      <Typography variant="display-lg" className="text-[#006b2c]">
                        {plan.price}
                      </Typography>
                      <Typography variant="body-md" className="text-[#6b7280]">
                        {plan.period}
                      </Typography>
                    </div>
                    <Typography variant="body-sm" className="mt-2 text-[#6b7280]">
                      {plan.description}
                    </Typography>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="text-[#006b2c]">✓</span>
                        <Typography variant="body-sm">{feature}</Typography>
                      </li>
                    ))}
                  </ul>

                  <Link href="/register">
                    <button className={`w-full py-3 rounded-full font-medium transition-colors ${
                      plan.popular 
                        ? 'bg-[#006b2c] text-white hover:bg-[#005524]' 
                        : 'bg-[#c5fff5] text-[#006b2c] hover:bg-[#89f5e7]'
                    }`}>
                      {plan.cta}
                    </button>
                  </Link>
                </Card>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#c5fff5]/30">
        <div className="container mx-auto px-4">
          <Fade direction="up">
            <div className="text-center mb-16">
              <Typography variant="title-xl" as="h2">
                Perguntas Frequentes
              </Typography>
            </div>
          </Fade>

          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Fade key={index} direction="up" delay={index * 0.1}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                      <span>{faq.question}</span>
                      <span className="transition-transform group-open:rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="mt-4 text-[#6b7280]">
                      {faq.answer}
                    </div>
                  </details>
                </Card>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#006b2c]">
        <div className="container mx-auto px-4 text-center">
          <Fade direction="up">
            <Typography variant="title-xl" className="text-white">
              Pronto para transformar sua rotina?
            </Typography>
            <Typography variant="body-lg" className="mt-4 text-white/80 max-w-xl mx-auto">
              Junte-se a +500 nutricionistas que já simplificaram sua gestão com o Sauvia.
            </Typography>
            <div className="mt-8">
              <Link href="/register">
                <button className="bg-white text-[#006b2c] px-8 py-4 rounded-full font-medium hover:bg-[#f0f9f4] transition-colors">
                  Começar Grátis Agora
                </button>
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      <Footer />
    </main>
  )
}