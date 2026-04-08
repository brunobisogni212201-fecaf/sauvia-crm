'use client'

import { useState } from 'react'
import { Card, Badge, Typography, Button, Input } from '@/components/primitives'
import { Header } from '@/components/dashboard/Header'
import { Fade } from '@/components/primitives/Animation'

const mockPlans = [
  { id: '1', name: 'Plano Emagrecimento Janeiro', patient: 'Maria Santos', startDate: '2024-01-01', endDate: '2024-01-31', status: 'ACTIVE', calories: 1800 },
  { id: '2', name: 'Plano Hipertrofia', patient: 'João Silva', startDate: '2024-01-05', endDate: '2024-02-05', status: 'ACTIVE', calories: 2800 },
  { id: '3', name: 'Plano Gestacional', patient: 'Ana Costa', startDate: '2023-12-15', endDate: '2024-03-15', status: 'ACTIVE', calories: 2200 },
  { id: '4', name: 'Plano Esportivo', patient: 'Pedro Alves', startDate: '2023-11-01', endDate: '2023-12-01', status: 'COMPLETED', calories: 2500 },
  { id: '5', name: 'Plano Manutenção', patient: 'Julia Martins', startDate: '2024-01-10', endDate: '2024-02-10', status: 'ACTIVE', calories: 2000 },
]

const statusColors: Record<string, 'success' | 'default' | 'warning'> = {
  ACTIVE: 'success',
  COMPLETED: 'default',
  CANCELLED: 'warning',
}

export default function NutritionPlansPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'ACTIVE' | 'COMPLETED'>('all')

  const filteredPlans = mockPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.patient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || plan.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <>
      <Header 
        title="Planos Alimentares" 
        subtitle={`${filteredPlans.length} planos`}
        actions={
          <Button>+ Novo Plano</Button>
        }
      />
      
      <div className="p-6">
        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar planos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'ACTIVE', 'COMPLETED'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filter === f 
                      ? 'bg-[#006b2c] text-white' 
                      : 'bg-[#c5fff5] text-[#006b2c] hover:bg-[#89f5e7]'
                  }`}
                >
                  {f === 'all' ? 'Todos' : f === 'ACTIVE' ? 'Ativos' : 'Concluídos'}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan, index) => (
            <Fade key={plan.id} direction="up" delay={index * 0.1}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={statusColors[plan.status]}>
                    {plan.status === 'ACTIVE' ? 'Ativo' : 'Concluído'}
                  </Badge>
                  <Typography variant="label-md" className="text-[#6b7280]">
                    {plan.calories} kcal
                  </Typography>
                </div>
                
                <Typography variant="title-md" className="mb-2">{plan.name}</Typography>
                <Typography variant="body-sm" className="text-[#6b7280] mb-4">
                  Paciente: {plan.patient}
                </Typography>
                
                <div className="pt-4 border-t border-[rgba(0,32,29,0.08)]">
                  <div className="flex items-center justify-between text-sm">
                    <Typography variant="body-sm" className="text-[#6b7280]">
                      {new Date(plan.startDate).toLocaleDateString('pt-BR')} - {new Date(plan.endDate).toLocaleDateString('pt-BR')}
                    </Typography>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Ver Detalhes</Button>
                  <Button size="sm" className="flex-1">Editar</Button>
                </div>
              </Card>
            </Fade>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <Card className="text-center py-12">
            <Typography variant="title-md" className="text-[#6b7280]">
              Nenhum plano encontrado
            </Typography>
          </Card>
        )}
      </div>
    </>
  )
}