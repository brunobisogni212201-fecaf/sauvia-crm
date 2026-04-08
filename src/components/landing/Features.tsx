'use client'

import { Button, Card, Typography } from '@/components/primitives'
import { Fade } from '@/components/primitives/Animation'
import Link from 'next/link'

const features = [
  {
    icon: '📅',
    title: 'Agenda Inteligente',
    description: 'Agendamento online com lembretes automáticos e gestão de consultas.',
  },
  {
    icon: '👥',
    title: 'Gestão de Pacientes',
    description: 'Cadastro completo com histórico médico, planos alimentares e evolução.',
  },
  {
    icon: '💬',
    title: 'WhatsApp Integrado',
    description: 'Comunicação direta com pacientes via WhatsApp API e automações n8n.',
  },
  {
    icon: '📊',
    title: 'Relatórios e Métricas',
    description: 'Dashboards visuais com Chart.js para acompanhar seu negócio.',
  },
  {
    icon: '🔒',
    title: 'LGPD Compliant',
    description: 'Segurança de dados com consentimento e criptografia.',
  },
  {
    icon: '🎫',
    title: 'Suporte Integrado',
    description: 'Sistema de tickets e base de conhecimento para seus pacientes.',
  },
]

export function Features() {
  return (
    <section className="py-24 bg-[#c5fff5]/30">
      <div className="container mx-auto px-4">
        <Fade direction="up">
          <div className="text-center mb-16">
            <Typography variant="title-xl" as="h2">
              Tudo que você precisa
            </Typography>
            <Typography variant="body-lg" className="mt-2 text-[#6b7280]">
              Um CRM completo para nuticionaristas focados em resultados
            </Typography>
          </div>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Fade key={index} direction="up" delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <Typography variant="title-md" as="h3">
                  {feature.title}
                </Typography>
                <Typography variant="body-md" className="mt-2 text-[#6b7280]">
                  {feature.description}
                </Typography>
              </Card>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  )
}