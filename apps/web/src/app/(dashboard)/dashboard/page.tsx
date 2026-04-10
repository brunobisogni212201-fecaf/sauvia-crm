import { PageHeader, StatsGrid, Card, CardHeader, CardTitle, CardContent, Button } from '@sauvia/ui';
import { Users, CalendarDays, FileText, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const statsData = [
    {
      label: 'Total de Pacientes',
      value: 124,
      icon: <Users className="w-6 h-6" />,
      trend: { value: 12, isPositive: true },
    },
    {
      label: 'Consultas Hoje',
      value: 8,
      icon: <CalendarDays className="w-6 h-6" />,
      trend: { value: 5, isPositive: true },
    },
    {
      label: 'Planos Ativos',
      value: 89,
      icon: <FileText className="w-6 h-6" />,
      trend: { value: 3, isPositive: false },
    },
    {
      label: 'Taxa de Retenção',
      value: '94%',
      icon: <TrendingUp className="w-6 h-6" />,
      trend: { value: 8, isPositive: true },
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Bem-vindo de volta! Aqui está um resumo das suas atividades."
        actions={
          <Button variant="primary" size="sm">
            Nova Consulta
          </Button>
        }
      />

      <StatsGrid items={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Maria Silva', time: '09:00', type: 'Retorno' },
                { name: 'João Santos', time: '10:30', type: 'Primeira Consulta' },
                { name: 'Ana Oliveira', time: '14:00', type: 'Acompanhamento' },
              ].map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-surface"
                >
                  <div>
                    <p className="font-semibold text-on-surface">{appointment.name}</p>
                    <p className="text-sm text-on-surface-variant">{appointment.type}</p>
                  </div>
                  <span className="text-primary font-semibold">{appointment.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Planos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Plano Alimentar - Q1', patient: 'Carlos Lima' },
                { name: 'Dieta Low Carb', patient: 'Fernanda Costa' },
                { name: 'Plano de Emagrecimento', patient: 'Roberto Alves' },
              ].map((plan, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-surface"
                >
                  <div>
                    <p className="font-semibold text-on-surface">{plan.name}</p>
                    <p className="text-sm text-on-surface-variant">{plan.patient}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Ver
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
