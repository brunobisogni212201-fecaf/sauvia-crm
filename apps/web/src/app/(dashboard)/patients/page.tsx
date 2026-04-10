import { PageHeader, Card, CardContent, Input, Button, Badge } from '@sauvia/ui';
import { Search, Plus, Filter, MoreVertical } from 'lucide-react';

export default function PatientsPage() {
  const patients = [
    { id: 1, name: 'Maria Silva', email: 'maria@email.com', status: 'active', lastVisit: '2024-03-15' },
    { id: 2, name: 'João Santos', email: 'joao@email.com', status: 'active', lastVisit: '2024-03-14' },
    { id: 3, name: 'Ana Oliveira', email: 'ana@email.com', status: 'inactive', lastVisit: '2024-02-20' },
    { id: 4, name: 'Carlos Lima', email: 'carlos@email.com', status: 'active', lastVisit: '2024-03-13' },
    { id: 5, name: 'Fernanda Costa', email: 'fernanda@email.com', status: 'active', lastVisit: '2024-03-12' },
  ];

  const statusLabel = (status: string) => {
    return status === 'active' ? 'Ativo' : 'Inativo';
  };

  const statusVariant = (status: string) => {
    return status === 'active' ? 'success' : 'default';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pacientes"
        description="Gerencie seus pacientes e acompanhe seus progressos."
        actions={
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Novo Paciente
          </Button>
        }
      />

      <Card>
        <CardContent className="p-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Buscar pacientes..."
                leftIcon={<Search className="w-5 h-5" />}
              />
            </div>
            <Button variant="secondary" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Patients Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-container-high">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-on-surface-variant">
                    Nome
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-on-surface-variant">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-on-surface-variant">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-on-surface-variant">
                    Última Visita
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-on-surface-variant">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-surface hover:bg-surface-container transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                          {patient.name.charAt(0)}
                        </div>
                        <span className="font-medium text-on-surface">{patient.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-on-surface-variant">{patient.email}</td>
                    <td className="py-4 px-4">
                      <Badge variant={statusVariant(patient.status)}>
                        {statusLabel(patient.status)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-on-surface-variant">
                      {new Date(patient.lastVisit).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-on-surface-variant">
              Mostrando 1-5 de 124 pacientes
            </p>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="secondary" size="sm">
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
