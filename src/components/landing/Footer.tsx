'use client'

import { Typography } from '@/components/primitives'
import Link from 'next/link'

const footerLinks = {
  produto: [
    { label: 'Funcionalidades', href: '#features' },
    { label: 'Preços', href: '#pricing' },
    { label: 'Blog', href: '/blog' },
  ],
  empresa: [
    { label: 'Sobre nós', href: '/about' },
    { label: 'Carreiras', href: '/careers' },
    { label: 'Contato', href: '/contact' },
  ],
  legal: [
    { label: 'Termos de Uso', href: '/terms' },
    { label: 'Política de Privacidade', href: '/privacy' },
    { label: 'LGPD', href: '/lgpd' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#00201d] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <Typography variant="title-lg" className="text-white">
                Sauvia
              </Typography>
            </Link>
            <Typography variant="body-sm" className="mt-4 text-white/70">
              CRM completo para nutricionistas.
              <br />
              Simplifique sua rotina.
            </Typography>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <Typography variant="label-md" className="text-white/50 mb-4 uppercase tracking-wider">
                {title}
              </Typography>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <Typography variant="body-sm" className="text-white/50">
            © 2024 Sauvia. Todos os direitos reservados.
          </Typography>
          <Typography variant="body-sm" className="text-white/50">
            Feito com ❤️ para nutricionistas
          </Typography>
        </div>
      </div>
    </footer>
  )
}