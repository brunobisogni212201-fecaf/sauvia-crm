'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/patients', label: 'Pacientes', icon: '👥' },
  { href: '/appointments', label: 'Agenda', icon: '📅' },
  { href: '/nutrition-plans', label: 'Planos', icon: '🥗' },
  { href: '/messages', label: 'Mensagens', icon: '💬' },
  { href: '/support', label: 'Suporte', icon: '🎫' },
  { href: '/settings', label: 'Configurações', icon: '⚙️' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-[rgba(0,32,29,0.08)] flex flex-col z-40">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[rgba(0,32,29,0.08)]">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="text-xl font-bold text-[#00201d]">Sauvia</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-[#e4fff9] text-[#006b2c]'
                      : 'text-[#6b7280] hover:bg-[#c5fff5]/50 hover:text-[#00201d]'
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-[#006b2c]"
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User */}
      <div className="p-4 border-t border-[rgba(0,32,29,0.08)]">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#c5fff5]/30">
          <div className="w-10 h-10 rounded-full bg-[#006b2c] flex items-center justify-center text-white font-medium">
            N
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#00201d] truncate">Nutricionista</p>
            <p className="text-xs text-[#6b7280] truncate">prof@email.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}