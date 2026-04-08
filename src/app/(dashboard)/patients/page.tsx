'use client'

import { useState } from 'react'
import { Card, Input, Badge, Typography, Button } from '@/components/primitives'
import { Header } from '@/components/dashboard/Header'
import { Fade } from '@/components/primitives/Animation'
import Link from 'next/link'

const mockPatients = [
  { id: '1', name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 99999-0001', plan: 'Emagrecimento', status: 'active', lastVisit: '2024-01-15' },
  { id: '2', name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-0002', plan: 'Hipertrofia', status: 'active', lastVisit: '2024-01-14' },
  { id: '3', name: 'Ana Costa', email: 'ana@email.com', phone: '(11) 99999-0003', plan: 'Gestacional', status: 'pending', lastVisit: '2024-01-10' },
  { id: '4', name: 'Pedro Alves', email: 'pedro@email.com', phone: '(11) 99999-0004', plan: 'Esportivo', status: 'inactive', lastVisit: '2024-01-05' },
  { id: '5', name: 'Julia Martins', email: 'julia@email.com', phone: '(11) 99999-0005', plan: 'Emagrecimento', status: 'active', lastVisit: '2024-01-18' },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || patient.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <>
      <Header 
        title="Pacientes" 
        subtitle={`${filteredPatients.length} pacientes cadastrados`}
        actions={
          <Link href="/patients/new">
            <Button>+ Novo Paciente</Button>
          </Link>
        }
      />
      
      <div className="p-6">
        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar pacientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'active', 'inactive'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filter === f 
                      ? 'bg-[#006b2c] text-white' 
                      : 'bg-[#c5fff5] text-[#006b2c] hover:bg-[#89f5e7]'
                  }`}
                >
                  {f === 'all' ? 'Todos' : f === 'active' ? 'Ativos' : 'Inativos'}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Patients Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(0,32,29,0.08)]">
                  <th className="text-left p-4 text-sm font-medium text-[#6b7280]">Paciente</th>
                  <th className="text-left p-4 text-sm font-medium text-[#6b7280]">Contato</th>
                  <th className="text-left p-4 text-sm font-medium text-[#6b7280]">Plano</th>
                  <th className="text-left p-4 text-sm font-medium text-[#6b7280]">Última Visita</th>
                  <th className="text-left p-4 text-sm font-medium text-[#6b7280]">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-[#6b7280]">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, index) => (
                  <Fade key={patient.id} direction="up" delay={index * 0.05}>
                    <tr className="border-b border-[rgba(0,32,29,0.05)] hover:bg-[#c5fff5]/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#006b2c] flex items-center justify-center text-white font-medium">
                            {patient.name.charAt(0)}
                          </div>
                          <div>
                            <Typography variant="body-md" className="font-medium">
                              {patient.name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Typography variant="body-sm">{patient.email}</Typography>
                        <Typography variant="body-sm" className="text-[#6b7280]">{patient.phone}</Typography>
                      </td>
                      <td className="p-4">
                        <Badge variant="default">{patient.plan}</Badge>
                      </td>
                      <td className="p-4">
                        <Typography variant="body-sm" className="text-[#6b7280]">
                          {new Date(patient.lastVisit).toLocaleDateString('pt-BR')}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Badge variant={patient.status === 'active' ? 'success' : patient.status === 'pending' ? 'warning' : 'default'}>
                          {patient.status === 'active' ? 'Ativo' : patient.status === 'pending' ? 'Pendente' : 'Inativo'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Link href={`/patients/${patient.id}`}>
                            <button className="px-3 py-1.5 text-sm bg-[#c5fff5] text-[#006b2c] rounded-lg hover:bg-[#89f5e7] transition-colors">
                              Ver
                            </button>
                          </Link>
                          <button className="px-3 py-1.5 text-sm bg-[#006b2c] text-white rounded-lg hover:bg-[#005524] transition-colors">
                            💬
                          </button>
                        </div>
                      </td>
                    </tr>
                  </Fade>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Empty State */}
        {filteredPatients.length === 0 && (
          <Card className="text-center py-12">
            <Typography variant="title-md" className="text-[#6b7280]">
              Nenhum paciente encontrado
            </Typography>
            <Typography variant="body-sm" className="text-[#6b7280] mt-2">
              Tente buscar por outro termo ou adicione um novo paciente
            </Typography>
          </Card>
        )}
      </div>
    </>
  )
}