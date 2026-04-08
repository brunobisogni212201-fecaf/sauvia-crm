'use client'

import { Card, CardHeader, CardTitle, CardContent, Badge, Typography } from '@/components/primitives'
import { Header } from '@/components/dashboard/Header'
import { Fade } from '@/components/primitives/Animation'
import { LineChart, BarChart } from '@/components/primitives'
import Link from 'next/link'

const stats = [
  { label: 'Total Pacientes', value: '127', change: '+12%', icon: '👥', color: 'primary' },
  { label: 'Consultas Hoje', value: '8', change: '2x hoje', icon: '📅', color: 'secondary' },
  { label: 'Planos Ativos', value: '45', change: '+5%', icon: '🥗', color: 'primary' },
  { label: 'Mensagens', value: '23', change: 'novas', icon: '💬', color: 'secondary' },
]

const appointmentsToday = [
  { id: 1, time: '09:00', patient: 'Maria Santos', type: 'Retorno', status: 'confirmed' },
  { id: 2, time: '10:30', patient: 'João Silva', type: 'Avaliação', status: 'confirmed' },
  { id: 3, time: '14:00', patient: 'Ana Costa', type: 'Retorno', status: 'pending' },
  { id: 4, time: '15:30', patient: 'Pedro Alves', type: 'Emergencial', status: 'pending' },
]

const recentPatients = [
  { id: 1, name: 'Maria Santos', lastVisit: '2 dias atrás', status: 'active' },
  { id: 2, name: 'João Silva', lastVisit: '5 dias atrás', status: 'active' },
  { id: 3, name: 'Ana Costa', lastVisit: '1 semana atrás', status: 'pending' },
  { id: 4, name: 'Pedro Alves', lastVisit: '2 semanas atrás', status: 'inactive' },
]

export default function DashboardPage() {
  return (
    <>
      <Header 
        title="Dashboard" 
        subtitle="Bem-vindo de volta!"
      />
      
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Fade key={stat.label} direction="up" delay={index * 0.1}>
              <Card className="hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                  <Badge variant={stat.color === 'primary' ? 'default' : 'warning'}>
                    {stat.change}
                  </Badge>
                </div>
                <Typography variant="title-lg">{stat.value}</Typography>
                <Typography variant="body-sm" className="text-[#6b7280]">
                  {stat.label}
                </Typography>
              </Card>
            </Fade>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Fade direction="up" delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle>Consultas por Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart 
                  data={[12, 19, 15, 25, 22, 30, 28]}
                  labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul']}
                  height={250}
                />
              </CardContent>
            </Card>
          </Fade>

          <Fade direction="up" delay={0.3}>
            <Card>
              <CardHeader>
                <CardTitle>Pacientes por Plano</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart 
                  data={[45, 32, 28, 15]}
                  labels={['Emagrecimento', 'Hipertrofia', 'Gestacional', 'Esportivo']}
                  height={250}
                  color="primary"
                />
              </CardContent>
            </Card>
          </Fade>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Fade direction="up" delay={0.4}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Agenda de Hoje</CardTitle>
                <Link href="/appointments" className="text-sm text-[#006b2c] hover:underline">
                  Ver todos →
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointmentsToday.map((apt) => (
                    <div 
                      key={apt.id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-[#c5fff5]/30 hover:bg-[#c5fff5]/50 transition-colors"
                    >
                      <div className="w-16 text-center">
                        <Typography variant="title-md" className="text-[#006b2c]">
                          {apt.time}
                        </Typography>
                      </div>
                      <div className="flex-1">
                        <Typography variant="body-md" className="font-medium">
                          {apt.patient}
                        </Typography>
                        <Typography variant="body-sm" className="text-[#6b7280]">
                          {apt.type}
                        </Typography>
                      </div>
                      <Badge variant={apt.status === 'confirmed' ? 'success' : 'warning'}>
                        {apt.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Fade>

          {/* Recent Patients */}
          <Fade direction="up" delay={0.5}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Pacientes Recentes</CardTitle>
                <Link href="/patients" className="text-sm text-[#006b2c] hover:underline">
                  Ver todos →
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPatients.map((patient) => (
                    <Link 
                      key={patient.id}
                      href={`/patients/${patient.id}`}
                      className="flex items-center gap-4 p-3 rounded-xl bg-[#c5fff5]/30 hover:bg-[#c5fff5]/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#006b2c] flex items-center justify-center text-white font-medium">
                        {patient.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <Typography variant="body-md" className="font-medium">
                          {patient.name}
                        </Typography>
                        <Typography variant="body-sm" className="text-[#6b7280]">
                          {patient.lastVisit}
                        </Typography>
                      </div>
                      <Badge variant={patient.status === 'active' ? 'success' : patient.status === 'pending' ? 'warning' : 'default'}>
                        {patient.status === 'active' ? 'Ativo' : patient.status === 'pending' ? 'Pendente' : 'Inativo'}
                      </Badge>
                    </Link>
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