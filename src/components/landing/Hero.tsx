'use client'

import { Button, Typography } from '@/components/primitives'
import { Fade } from '@/components/primitives/Animation'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#e4fff9] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-[#89f5e7]/20 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-[#00873a]/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <Fade direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6">
              <span className="w-2 h-2 bg-[#006b2c] rounded-full animate-pulse" />
              <Typography variant="label-md">Agora com IA para nutritionistas</Typography>
            </div>
          </Fade>

          <Fade direction="up" delay={0.1}>
            <Typography variant="display-lg" className="leading-tight">
              Gestão completa para{' '}
              <span className="text-[#006b2c]">nutricionistas</span>
            </Typography>
          </Fade>

          <Fade direction="up" delay={0.2}>
            <Typography variant="body-lg" className="mt-6 text-[#6b7280] max-w-xl">
              Organize sua agenda, gerencie pacientes, envie planos alimentares e automatize 
              comunicações pelo WhatsApp. Tudo em um só lugar.
            </Typography>
          </Fade>

          <Fade direction="up" delay={0.3}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg">Começar Grátis</Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg">
                  Ver Demonstração
                </Button>
              </Link>
            </div>
          </Fade>

          <Fade direction="up" delay={0.4}>
            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-[#c5fff5] border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-sm">👤</span>
                  </div>
                ))}
              </div>
              <div>
                <Typography variant="label-md">+500 nutricionistas</Typography>
                <Typography variant="body-sm" className="text-[#6b7280]">
                  Já utilizam o Sauvia
                </Typography>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  )
}