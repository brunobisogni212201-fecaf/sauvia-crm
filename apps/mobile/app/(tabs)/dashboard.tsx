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
                <Icon color="#006b2c" size={24} />
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
    fontFamily: "Manrope_700Bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#3f6b62",
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
    shadowColor: '#003732',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#e4fff9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00201d',
  },
  statLabel: {
    fontSize: 12,
    color: '#3f6b62',
    marginTop: 4,
  },
  section: {
    padding: 24,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00201d',
    marginBottom: 16,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c5fff5',
    borderRadius: 16,
    padding: 12,
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
  appointmentTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#006b2c',
  },
});
