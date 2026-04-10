import { PageHeader, Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@sauvia/ui';
import { Calendar, Clock, Plus, Video, MapPin } from 'lucide-react';

export default function AppointmentsPage() {
  const todayAppointments = [
    {
      id: 1,
      patient: 'Maria Silva',
      time: '09:00',
      duration: '60 min',
      type: 'Retorno',
      mode: 'online',
      status: 'confirmed',
    },
    {
      id: 2,
      patient: 'João Santos',
      time: '10:30',
      duration: '60 min',
      type: 'Primeira Consulta',
      mode: 'presencial',
      status: 'pending',
    },
    {
      id: 3,
      patient: 'Ana Oliveira',
      time: '14:00',
      duration: '45 min',
      type: 'Acompanhamento',
      mode: 'online',
      status: 'confirmed',
    },
    {
      id: 4,
      patient: 'Carlos Lima',
      time: '15:30',
      duration: '60 min',
      type: 'Retorno',
      mode: 'presencial',
      status: 'confirmed',
    },
  ];

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      confirmed: 'Confirmado',
      pending: 'Pendente',
      cancelled: 'Cancelado',
    };
    return labels[status] || status;
  };

  const getStatusVariant = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'error'> = {
      confirmed: 'success',
      pending: 'warning',
      cancelled: 'error',
    };
    return variants[status] || 'warning';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Consultas"
        description="Gerencie sua agenda e acompanhe suas consultas do dia."
        actions={
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nova Consulta
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Março 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                <div key={i} className="text-on-surface-variant font-semibold py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  className={`
                    py-2 rounded-lg text-sm transition-colors
                    ${day === 15
                      ? 'bg-primary text-white'
                      : 'hover:bg-surface-container text-on-surface'
                    }
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Consultas do Dia - 15 de Março</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 rounded-xl bg-surface hover:bg-surface-container transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                        {appointment.patient.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-on-surface">{appointment.patient}</h4>
                        <p className="text-sm text-on-surface-variant">{appointment.type}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(appointment.status)}>
                      {getStatusLabel(appointment.status)}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-on-surface-variant mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {appointment.time} ({appointment.duration})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {appointment.mode === 'online' ? (
                        <>
                          <Video className="w-4 h-4" />
                          <span>Online</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4" />
                          <span>Presencial</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="primary" size="sm">
                      {appointment.mode === 'online' ? (
                        <>
                          <Video className="w-4 h-4 mr-2" />
                          Iniciar
                        </>
                      ) : (
                        'Ver Detalhes'
                      )}
                    </Button>
                    <Button variant="secondary" size="sm">
                      Reagendar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
