'use client'

import { useState } from 'react'
import { Card, Badge, Typography, Button } from '@/components/primitives'
import { Header } from '@/components/dashboard/Header'
import { Fade } from '@/components/primitives/Animation'

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00']

const mockAppointments = {
  '2024-01-15': [
    { id: '1', time: '09:00', patient: 'Maria Santos', type: 'RETORNO', status: 'CONFIRMED' },
    { id: '2', time: '10:30', patient: 'João Silva', type: 'INITIAL', status: 'SCHEDULED' },
    { id: '3', time: '14:00', patient: 'Ana Costa', type: 'RETURN', status: 'CONFIRMED' },
    { id: '4', time: '15:30', patient: 'Pedro Alves', type: 'EMERGENCY', status: 'SCHEDULED' },
  ],
  '2024-01-16': [
    { id: '5', time: '09:00', patient: 'Julia Martins', type: 'FOLLOWUP', status: 'CONFIRMED' },
    { id: '6', time: '11:00', patient: 'Carlos Souza', type: 'RETURN', status: 'SCHEDULED' },
  ],
  '2024-01-17': [
    { id: '7', time: '10:00', patient: 'Fernanda Lima', type: 'INITIAL', status: 'SCHEDULED' },
  ],
}

const typeColors: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
  INITIAL: 'default',
  FOLLOWUP: 'success',
  RETURN: 'warning',
  EMERGENCY: 'error',
}

export default function AppointmentsPage() {
  const [currentDate, setCurrentDate] = useState(new Date('2024-01-15'))
  const [view, setView] = useState<'week' | 'day'>('week')

  const getDaysOfWeek = (date: Date) => {
    const start = new Date(date)
    start.setDate(start.getDate() - start.getDay())
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      return d
    })
  }

  const days = getDaysOfWeek(currentDate)

  const getAppointmentsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return mockAppointments[dateStr as keyof typeof mockAppointments] || []
  }

  const navigateWeek = (direction: number) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + direction * 7)
    setCurrentDate(newDate)
  }

  return (
    <>
      <Header 
        title="Agenda" 
        subtitle="Gerencie seus agendamentos"
        actions={
          <Button>+ Nova Consulta</Button>
        }
      />
      
      <div className="p-6">
        {/* Calendar Header */}
        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigateWeek(-1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#c5fff5]/50"
              >
                ←
              </button>
              <Typography variant="title-lg">
                {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </Typography>
              <button 
                onClick={() => navigateWeek(1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#c5fff5]/50"
              >
                →
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 text-sm bg-[#c5fff5] text-[#006b2c] rounded-xl hover:bg-[#89f5e7]"
              >
                Hoje
              </button>
              <div className="flex bg-[#c5fff5]/50 rounded-xl p-1">
                <button
                  onClick={() => setView('week')}
                  className={`px-3 py-1 rounded-lg text-sm ${view === 'week' ? 'bg-white text-[#006b2c]' : 'text-[#6b7280]'}`}
                >
                  Semana
                </button>
                <button
                  onClick={() => setView('day')}
                  className={`px-3 py-1 rounded-lg text-sm ${view === 'day' ? 'bg-white text-[#006b2c]' : 'text-[#6b7280]'}`}
                >
                  Dia
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Calendar Grid */}
        <Card className="overflow-hidden">
          <div className="grid grid-cols-7 border-b border-[rgba(0,32,29,0.08)]">
            {weekDays.map((day, index) => {
              const date = days[index]
              const isToday = date.toDateString() === new Date().toDateString()
              return (
                <div 
                  key={day} 
                  className={`p-4 text-center border-r border-[rgba(0,32,29,0.05)] last:border-r-0 ${isToday ? 'bg-[#c5fff5]/50' : ''}`}
                >
                  <Typography variant="label-md" className="text-[#6b7280]">{day}</Typography>
                  <Typography 
                    variant="title-md" 
                    className={isToday ? 'text-[#006b2c] font-bold' : ''}
                  >
                    {date.getDate()}
                  </Typography>
                </div>
              )
            })}
          </div>

          {/* Time Slots */}
          <div className="grid grid-cols-7 min-h-[600px]">
            {days.map((day, dayIndex) => {
              const appointments = getAppointmentsForDay(day)
              const isToday = day.toDateString() === new Date().toDateString()
              
              return (
                <div 
                  key={dayIndex}
                  className={`border-r border-[rgba(0,32,29,0.05)] last:border-r-0 p-2 ${isToday ? 'bg-[#e4fff9]/30' : ''}`}
                >
                  {appointments.map((apt) => (
                    <Fade key={apt.id} direction="up">
                      <div 
                        className={`p-2 rounded-lg mb-2 cursor-pointer hover:shadow-md transition-shadow ${
                          apt.type === 'EMERGENCY' 
                            ? 'bg-[#fee2e2]' 
                            : apt.type === 'INITIAL'
                            ? 'bg-[#c5fff5]'
                            : 'bg-[#c5fff5]/70'
                        }`}
                      >
                        <Typography variant="label-sm" className="font-medium">
                          {apt.time}
                        </Typography>
                        <Typography variant="body-sm" className="truncate">
                          {apt.patient}
                        </Typography>
                        <Badge variant={typeColors[apt.type]} className="text-[10px] mt-1">
                          {apt.type}
                        </Badge>
                      </div>
                    </Fade>
                  ))}
                </div>
              )
            })}
          </div>
        </Card>

        {/* Upcoming Appointments */}
        <div className="mt-6">
          <Typography variant="title-md" className="mb-4">Próximas Consultas</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(mockAppointments).flatMap(([date, appts]) => 
              appts.map((apt) => (
                <Fade key={apt.id} direction="up">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant={apt.status === 'CONFIRMED' ? 'success' : 'warning'}>
                        {apt.status === 'CONFIRMED' ? 'Confirmado' : 'Pendente'}
                      </Badge>
                      <Typography variant="label-md" className="text-[#6b7280]">
                        {date} às {apt.time}
                      </Typography>
                    </div>
                    <Typography variant="title-md">{apt.patient}</Typography>
                    <Typography variant="body-sm" className="text-[#6b7280]">{apt.type}</Typography>
                  </Card>
                </Fade>
              ))
            ).slice(0, 6)}
          </div>
        </div>
      </div>
    </>
  )
}