'use client'

import { useState } from 'react'
import { Button, Input, Card, Typography } from '@/components/primitives'
import { Fade } from '@/components/primitives/Animation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate login - replace with actual NextAuth signIn
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#e4fff9] p-4">
      <Fade direction="up">
        <Card className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-3xl">🌿</span>
              <Typography variant="title-lg">Sauvia</Typography>
            </Link>
            <Typography variant="title-xl">Entrar</Typography>
            <Typography variant="body-md" className="text-[#6b7280] mt-2">
              Acesse sua conta para continuar
            </Typography>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded border-[#006b2c] text-[#006b2c] focus:ring-[#006b2c]"
                />
                <Typography variant="body-sm">Lembrar-me</Typography>
              </label>
              <Link href="/forgot-password" className="text-sm text-[#006b2c] hover:underline">
                Esqueci minha senha
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Typography variant="body-sm" className="text-[#6b7280]">
              Não tem conta?{' '}
              <Link href="/register" className="text-[#006b2c] hover:underline">
                Criar conta
              </Link>
            </Typography>
          </div>

          <div className="mt-6 p-4 bg-[#c5fff5]/50 rounded-lg">
            <Typography variant="label-sm" className="text-[#6b7280]">
              Ao entrar, você concorda com nossos{' '}
              <Link href="/terms" className="text-[#006b2c]">Termos de Uso</Link>
              {' '}e{' '}
              <Link href="/privacy" className="text-[#006b2c]">Política de Privacidade</Link>.
            </Typography>
          </div>
        </Card>
      </Fade>
    </main>
  )
}