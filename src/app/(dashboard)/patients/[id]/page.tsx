'use client'

import { use } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge, Typography, Button, Input } from '@/components/primitives'
import { Header } from '@/components/dashboard/Header'
import { Fade } from '@/components/primitives/Animation'
import Link from 'next/link'

const mockPatient = {
  id: '1',
  name: 'Maria Santos',
  email: 'maria@email.com',
  phone: '(11) 99999-0001',
  cpf: '123.456.789-00',
  birthDate: '1990-05-15',
  gender: 'FEMALE',
  height: 165,
  weight: 70,
  goal: 'Emagrecimento saudável',
  address: 'Rua Example, 123 - São Paulo, SP',
  emergencyContact: 'João Santos - (11) 99999-9999',
  medicalNotes: 'Alergia a lactose. Histórico de hipertensão na família.',
  plan: 'Emagrecimento',
  status: 'active',
  createdAt: '2023-06-15',
}

const appointments = [
  { id: '1', date: '2024-01-15', time: '14:00', type: 'Retorno', status: 'completed' },
  { id: '2', date: '2024-01-08', time: '14:00', type: 'Retorno', status: 'completed' },
  { id: '3', date: '2023-12-18', time: '10:00', type: 'Avaliação', status: 'completed' },
]

const nutritionPlans = [
  { id: '1', name: 'Plano Janeiro 2024', startDate: '2024-01-01', status: 'ACTIVE' },
  { id: '2', name: 'Plano Dezembro 2023', startDate: '2023-12-01', status: 'COMPLETED' },
]

export default function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <>
      <Header 
        title="Detalhes do Paciente"
        actions={
          <div className="flex gap-2">
            <Button variant="outline">✏️ Editar</Button>
            <Button>💬 Enviar Mensagem</Button>
          </div>
        }
      />
      
      <div className="p-6 space-y-6">
        {/* Patient Info Card */}
        <Fade direction="up">
          <Card>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-[#006b2c] flex items-center justify-center text-white text-4xl font-bold">
                  {mockPatient.name.charAt(0)}
                </div>
                <Badge variant="success" className="mt-3">Ativo</Badge>
              </div>

              {/* Info */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Typography variant="label-md" className="text-[#6b7280]">Nome</Typography>
                  <Typography variant="body-lg">{mockPatient.name}</Typography>
                </div>
                <div>
                  <Typography variant="label-md" className="text-[#6b7280]">Email</Typography>
                  <Typography variant="body-md">{mockPatient.email}</Typography>
                </div>
                <div>
                  <Typography variant="label-md" className="text-[#6b7280]">Telefone</Typography>
                  <Typography variant="body-md">{mockPatient.phone}</Typography>
                </div>
                <div>
                  <Typography variant="label-md" className="text-[#6b7280]">CPF</Typography>
                  <Typography variant="body-md">{mockPatient.cpf}</Typography>
                </div>
                <div>
                  <Typography variant="label-md" className="text-[#6b7280]">Data de Nascimento</Typography>
                  <Typography variant="body-md">{new Date(mockPatient.birthDate).toLocaleDateString('pt-BR')}</Typography>
                </div>
                <div>
                  <Typography variant="label-md" className="text-[#6b7280]">Objetivo</Typography>
                  <Typography variant="body-md">{mockPatient.goal}</Typography>
                </div>
              </div>
            </div>
          </Card>
        </Fade>

        {/* Metrics & Medical Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Measurements */}
          <Fade direction="up" delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle>Medidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#c5fff5]/30 rounded-xl text-center">
                    <Typography variant="display-lg" className="text-[#006b2c]">{mockPatient.height}</Typography>
                    <Typography variant="label-sm" className="text-[#6b7280]">Altura (cm)</Typography>
                  </div>
                  <div className="p-4 bg-[#c5fff5]/30 rounded-xl text-center">
                    <Typography variant="display-lg" className="text-[#006b2c]">{mockPatient.weight}</Typography>
                    <Typography variant="label-sm" className="text-[#6b7280]">Peso (kg)</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Fade>

          {/* Medical Notes */}
          <Fade direction="up" delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle>Observações Médicas</CardTitle>
              </CardHeader>
              <CardContent>
                <Typography variant="body-md" className="text-[#6b7280]">
                  {mockPatient.medicalNotes}
                </Typography>
                <div className="mt-4 pt-4 border-t border-[rgba(0,32,29,0.08)]">
                  <Typography variant="label-md" className="text-[#6b7280]">Contato de Emergência</Typography>
                  <Typography variant="body-md">{mockPatient.emergencyContact}</Typography>
                </div>
              </CardContent>
            </Card>
          </Fade>
        </div>

        {/* Appointments & Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Appointments */}
          <Fade direction="up" delay={0.3}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Consultas</CardTitle>
                <Link href={`/appointments/new?patient=${id}`}>
                  <Button size="sm">+ Nova</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between p-3 bg-[#c5fff5]/30 rounded-xl">
                      <div>
                        <Typography variant="body-md" className="font-medium">
                          {new Date(apt.date).toLocaleDateString('pt-BR')} às {apt.time}
                        </Typography>
                        <Typography variant="body-sm" className="text-[#6b7280]">{apt.type}</Typography>
                      </div>
                      <Badge variant="success">Concluída</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Fade>

          {/* Nutrition Plans */}
          <Fade direction="up" delay={0.4}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Planos Alimentares</CardTitle>
                <Link href={`/nutrition-plans/new?patient=${id}`}>
                  <Button size="sm">+ Novo</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nutritionPlans.map((plan) => (
                    <div key={plan.id} className="flex items-center justify-between p-3 bg-[#c5fff5]/30 rounded-xl">
                      <div>
                        <Typography variant="body-md" className="font-medium">{plan.name}</Typography>
                        <Typography variant="body-sm" className="text-[#6b7280]">
                          Início: {new Date(plan.startDate).toLocaleDateString('pt-BR')}
                        </Typography>
                      </div>
                      <Badge variant={plan.status === 'ACTIVE' ? 'success' : 'default'}>
                        {plan.status === 'ACTIVE' ? 'Ativo' : 'Concluído'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Fade>
        </div>
      </div>
    </>
  )
}