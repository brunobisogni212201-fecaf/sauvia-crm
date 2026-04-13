import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Users, CalendarDays, FileText, TrendingUp } from "lucide-react-native";

export default function DashboardScreen() {
  const stats = [
    { label: 'Pacientes', value: '124', icon: Users },
    { label: 'Consultas Hoje', value: '8', icon: CalendarDays },
    { label: 'Planos Ativos', value: '89', icon: FileText },
    { label: 'Retenção', value: '94%', icon: TrendingUp },
  ];

  const appointments = [
    { name: 'Maria Silva', time: '09:00', type: 'Retorno' },
    { name: 'João Santos', time: '10:30', type: 'Primeira Consulta' },
    { name: 'Ana Oliveira', time: '14:00', type: 'Acompanhamento' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Bem-vindo de volta!</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Icon color="#7C3AED" size={24} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          );
        })}
      </View>

      {/* Upcoming Appointments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximas Consultas</Text>
        {appointments.map((apt, index) => (
          <View key={index} style={styles.appointmentCard}>
            <View style={styles.appointmentAvatar}>
              <Text style={styles.appointmentAvatarText}>{apt.name.charAt(0)}</Text>
            </View>
            <View style={styles.appointmentInfo}>
              <Text style={styles.appointmentName}>{apt.name}</Text>
              <Text style={styles.appointmentType}>{apt.type}</Text>
            </View>
            <Text style={styles.appointmentTime}>{apt.time}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hsl(40, 20%, 98%)",
  },
  header: {
    padding: 24,
    paddingTop: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "hsl(210, 20%, 12%)",
    fontFamily: "Manrope_700Bold",
  },
  subtitle: {
    fontSize: 14,
    color: "hsl(210, 10%, 40%)",
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'hsl(40, 20%, 98%)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'hsl(210, 20%, 12%)',
  },
  statLabel: {
    fontSize: 12,
    color: 'hsl(210, 10%, 40%)',
    marginTop: 4,
  },
  section: {
    padding: 24,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'hsl(210, 20%, 12%)',
    marginBottom: 16,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'hsl(40, 15%, 94%)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  appointmentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7C3AED',
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
    color: 'hsl(210, 20%, 12%)',
  },
  appointmentType: {
    fontSize: 12,
    color: 'hsl(210, 10%, 40%)',
    marginTop: 2,
  },
  appointmentTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7C3AED',
  },
});
