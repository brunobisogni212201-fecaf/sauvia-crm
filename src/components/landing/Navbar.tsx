'use client'

import { Button } from '@/components/primitives'
import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[rgba(0,32,29,0.08)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="text-xl font-bold text-[#00201d]">Sauvia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-[#6b7280] hover:text-[#00201d] transition-colors">
              Funcionalidades
            </Link>
            <Link href="#pricing" className="text-[#6b7280] hover:text-[#00201d] transition-colors">
              Preços
            </Link>
            <Link href="#about" className="text-[#6b7280] hover:text-[#00201d] transition-colors">
              Sobre
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Começar Grátis</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[rgba(0,32,29,0.08)]">
            <div className="flex flex-col gap-4">
              <Link href="#features" className="text-[#6b7280] py-2">
                Funcionalidades
              </Link>
              <Link href="#pricing" className="text-[#6b7280] py-2">
                Preços
              </Link>
              <Link href="#about" className="text-[#6b7280] py-2">
                Sobre
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full">Entrar</Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full">Começar Grátis</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}