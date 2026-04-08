'use client'

import { useState } from 'react'
import { Input, Badge } from '@/components/primitives'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface HeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="h-16 bg-white border-b border-[rgba(0,32,29,0.08)] flex items-center justify-between px-6">
      {/* Left - Title */}
      <div>
        <h1 className="text-lg font-semibold text-[#00201d]">{title}</h1>
        {subtitle && <p className="text-sm text-[#6b7280]">{subtitle}</p>}
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className={cn('transition-all duration-300', searchOpen ? 'w-64' : 'w-10')}>
          {searchOpen ? (
            <Input
              placeholder="Buscar..."
              className="h-10"
              autoFocus
              onBlur={() => !document.activeElement?.closest('[data-search]') && setSearchOpen(false)}
            />
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#c5fff5]/50 transition-colors"
            >
              <span className="text-lg">🔍</span>
            </button>
          )}
        </div>

        {/* Notifications */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#c5fff5]/50 transition-colors">
          <span className="text-lg">🔔</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#F97316] rounded-full" />
        </button>

        {/* Quick Add */}
        <button className="flex items-center gap-2 px-4 py-2 bg-[#006b2c] text-white rounded-xl font-medium hover:bg-[#005524] transition-colors">
          <span>+</span>
          <span className="hidden sm:inline">Novo</span>
        </button>

        {/* Custom Actions */}
        {actions}
      </div>
    </header>
  )
}