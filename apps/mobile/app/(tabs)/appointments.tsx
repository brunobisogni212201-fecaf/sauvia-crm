import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { CalendarDays, Clock, Video, MapPin } from "lucide-react-native";

export default function AppointmentsScreen() {
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
  ];

  const getStatusColor = (status: string) => {
    return status === 'confirmed' ? '#10b981' : status === 'pending' ? '#f59e0b' : '#ef4444';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      confirmed: 'Confirmado',
      pending: 'Pendente',
      cancelled: 'Cancelado',
    };
    return labels[status] || status;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Consultas</Text>
        <Text style={styles.subtitle}>Gerencie sua agenda</Text>
      </View>

      {/* Calendar Strip */}
      <View style={styles.calendarStrip}>
        {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, index) => {
          const date = 11 + index;
          const isActive = date === 15;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.calendarDay, isActive && styles.calendarDayActive]}
            >
              <Text style={[styles.calendarDayText, isActive && styles.calendarDayTextActive]}>
                {day}
              </Text>
              <Text style={[styles.calendarDateText, isActive && styles.calendarDateTextActive]}>
                {date}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Appointments List */}
      <View style={styles.list}>
        <Text style={styles.sectionTitle}>Consultas do Dia - 15/03</Text>
        {todayAppointments.map((apt) => (
          <TouchableOpacity key={apt.id} style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.appointmentAvatar}>
                <Text style={styles.appointmentAvatarText}>{apt.patient.charAt(0)}</Text>
              </View>
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentName}>{apt.patient}</Text>
                <Text style={styles.appointmentType}>{apt.type}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(apt.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(apt.status) }]}>
                  {getStatusLabel(apt.status)}
                </Text>
              </View>
            </View>

            <View style={styles.appointmentDetails}>
              <View style={styles.appointmentDetail}>
                <Clock color="#3f6b62" size={16} />
                <Text style={styles.appointmentDetailText}>
                  {apt.time} ({apt.duration})
                </Text>
              </View>
              <View style={styles.appointmentDetail}>
                {apt.mode === 'online' ? (
                  <>
                    <Video color="#3f6b62" size={16} />
                    <Text style={styles.appointmentDetailText}>Online</Text>
                  </>
                ) : (
                  <>
                    <MapPin color="#3f6b62" size={16} />
                    <Text style={styles.appointmentDetailText}>Presencial</Text>
                  </>
                )}
              </View>
            </View>

            <View style={styles.appointmentActions}>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>
                  {apt.mode === 'online' ? 'Iniciar' : 'Ver Detalhes'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Reagendar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4fff9",
  },
  header: {
    padding: 24,
    paddingTop: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00201d",
  },
  subtitle: {
    fontSize: 14,
    color: "#3f6b62",
    marginTop: 4,
  },
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  calendarDay: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  calendarDayActive: {
    backgroundColor: '#006b2c',
  },
  calendarDayText: {
    fontSize: 12,
    color: '#3f6b62',
    fontWeight: '600',
  },
  calendarDayTextActive: {
    color: '#fff',
  },
  calendarDateText: {
    fontSize: 16,
    color: '#00201d',
    marginTop: 4,
  },
  calendarDateTextActive: {
    color: '#fff',
  },
  list: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00201d',
    marginBottom: 16,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#003732',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  appointmentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#006b2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentAvatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  appointmentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  appointmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00201d',
  },
  appointmentType: {
    fontSize: 12,
    color: '#3f6b62',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  appointmentDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  appointmentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  appointmentDetailText: {
    fontSize: 14,
    color: '#3f6b62',
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#006b2c',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#e4fff9',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#006b2c',
  },
  secondaryButtonText: {
    color: '#006b2c',
    fontSize: 14,
    fontWeight: '600',
  },
});
