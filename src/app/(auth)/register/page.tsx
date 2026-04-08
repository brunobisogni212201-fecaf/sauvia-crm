'use client'

import { useState } from 'react'
import { Button, Input, Card, Typography } from '@/components/primitives'
import { Fade } from '@/components/primitives/Animation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptLgpd: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.acceptTerms || !formData.acceptLgpd) {
      alert('Por favor, aceite os termos e a política de privacidade')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não conferem')
      return
    }
    
    setLoading(true)
    
    // Simulate registration - replace with actual Cognito/NextAuth
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14)
  }

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 15)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#e4fff9] p-4 py-12">
      <Fade direction="up">
        <Card className="w-full max-w-lg">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-3xl">🌿</span>
              <Typography variant="title-lg">Sauvia</Typography>
            </Link>
            <Typography variant="title-xl">Criar Conta</Typography>
            <Typography variant="body-md" className="text-[#6b7280] mt-2">
              Comece seu período gratuito de 14 dias
            </Typography>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="CPF"
                type="text"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                maxLength={14}
                required
              />
              
              <Input
                label="Telefone"
                type="text"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                maxLength={15}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              
              <Input
                label="Confirmar Senha"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="mt-1 rounded border-[#006b2c] text-[#006b2c] focus:ring-[#006b2c]"
                  required
                />
                <Typography variant="body-sm" className="text-[#6b7280]">
                  Eu li e aceito os{' '}
                  <Link href="/terms" className="text-[#006b2c] underline">Termos de Uso</Link>
                </Typography>
              </label>
              
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.acceptLgpd}
                  onChange={(e) => setFormData({ ...formData, acceptLgpd: e.target.checked })}
                  className="mt-1 rounded border-[#006b2c] text-[#006b2c] focus:ring-[#006b2c]"
                  required
                />
                <Typography variant="body-sm" className="text-[#6b7280]">
                  Eu concordo com o tratamento dos meus dados conforme a{' '}
                  <Link href="/lgpd" className="text-[#006b2c] underline">Política de Privacidade (LGPD)</Link>
                </Typography>
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Criando conta...' : 'Criar Conta Grátis'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Typography variant="body-sm" className="text-[#6b7280]">
              Já tem conta?{' '}
              <Link href="/login" className="text-[#006b2c] hover:underline">
                Entrar
              </Link>
            </Typography>
          </div>

          <div className="mt-4 p-3 bg-[#c5fff5]/50 rounded-lg text-center">
            <Typography variant="label-sm" className="text-[#6b7280]">
              📧 Verificação por email
            </Typography>
            <Typography variant="body-sm" className="text-[#6b7280] mt-1">
              Enviaremos um código de verificação para confirmar seu email
            </Typography>
          </div>
        </Card>
      </Fade>
    </main>
  )
}