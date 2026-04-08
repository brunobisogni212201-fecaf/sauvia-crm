'use client'

import { useState } from 'react'
import { Card, Badge, Typography, Button, Input } from '@/components/primitives'
import { Header } from '@/components/dashboard/Header'
import { Fade } from '@/components/primitives/Animation'

const mockTickets = [
  { id: '1', subject: 'Dúvida sobre plano alimentar', patient: 'Maria Santos', status: 'OPEN', priority: 'MEDIUM', createdAt: '2024-01-15', messages: 3 },
  { id: '2', subject: 'Erro no app - não consigo acessar', patient: 'João Silva', status: 'IN_PROGRESS', priority: 'HIGH', createdAt: '2024-01-14', messages: 5 },
  { id: '3', subject: 'Solicitação de cancelamento', patient: 'Ana Costa', status: 'WAITING', priority: 'MEDIUM', createdAt: '2024-01-13', messages: 2 },
  { id: '4', subject: 'Problema com pagamento', patient: 'Pedro Alves', status: 'RESOLVED', priority: 'LOW', createdAt: '2024-01-10', messages: 8 },
]

const statusColors: Record<string, 'warning' | 'success' | 'default' | 'error'> = {
  OPEN: 'warning',
  IN_PROGRESS: 'success',
  WAITING: 'default',
  RESOLVED: 'success',
}

const priorityColors: Record<string, 'error' | 'warning' | 'default'> = {
  HIGH: 'error',
  MEDIUM: 'warning',
  LOW: 'default',
}

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'>('all')

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.patient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || ticket.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <>
      <Header 
        title="Suporte" 
        subtitle="Tickets e ajuda"
        actions={
          <Button>+ Novo Ticket</Button>
        }
      />
      
      <div className="p-6">
        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'OPEN', 'IN_PROGRESS', 'RESOLVED'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filter === f 
                      ? 'bg-[#006b2c] text-white' 
                      : 'bg-[#c5fff5] text-[#006b2c] hover:bg-[#89f5e7]'
                  }`}
                >
                  {f === 'all' ? 'Todos' : f === 'OPEN' ? 'Abertos' : f === 'IN_PROGRESS' ? 'Em Andamento' : 'Resolvidos'}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.map((ticket, index) => (
            <Fade key={ticket.id} direction="up" delay={index * 0.05}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Typography variant="title-md">{ticket.subject}</Typography>
                      <Badge variant={statusColors[ticket.status]}>
                        {ticket.status === 'OPEN' ? 'Aberto' : ticket.status === 'IN_PROGRESS' ? 'Em Andamento' : ticket.status === 'WAITING' ? 'Aguardando' : 'Resolvido'}
                      </Badge>
                      <Badge variant={priorityColors[ticket.priority]}>
                        {ticket.priority === 'HIGH' ? 'Alta' : ticket.priority === 'MEDIUM' ? 'Média' : 'Baixa'}
                      </Badge>
                    </div>
                    <Typography variant="body-sm" className="text-[#6b7280]">
                      Paciente: {ticket.patient} • {ticket.messages} mensagens • {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
                    </Typography>
                  </div>
                  <Button variant="outline">Ver Detalhes</Button>
                </div>
              </Card>
            </Fade>
          ))}
        </div>

        {filteredTickets.length === 0 && (
          <Card className="text-center py-12">
            <Typography variant="title-md" className="text-[#6b7280]">
              Nenhum ticket encontrado
            </Typography>
          </Card>
        )}
      </div>
    </>
  )
}