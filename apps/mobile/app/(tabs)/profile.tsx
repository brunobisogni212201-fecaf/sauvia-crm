import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { User, Mail, Phone, Settings, Bell, Shield, HelpCircle, LogOut } from "lucide-react-native";

export default function ProfileScreen() {
  const menuItems = [
    { icon: Settings, label: 'Configurações', onPress: () => { } },
    { icon: Bell, label: 'Notificações', onPress: () => { } },
    { icon: Shield, label: 'Privacidade e Segurança', onPress: () => { } },
    { icon: HelpCircle, label: 'Ajuda e Suporte', onPress: () => { } },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>DR</Text>
        </View>
        <Text style={styles.profileName}>Dra. Regina Silva</Text>
        <Text style={styles.profileEmail}>regina@sauvia.com</Text>
        <Text style={styles.profileRole}>Nutricionista CRN-3 12345</Text>
      </View>

      {/* Stats */}
      <View style={styles.profileStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>124</Text>
          <Text style={styles.statLabel}>Pacientes</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Hoje</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4.9</Text>
          <Text style={styles.statLabel}>Avaliação</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Icon color="#00201d" size={20} />
                <Text style={styles.menuItemLabel}>{item.label}</Text>
              </View>
              <Text style={styles.menuItemChevron}>›</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Logout */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut color="#ef4444" size={20} />
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Sauvia v1.0.0</Text>
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
  profileCard: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#003732',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#006b2c',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00201d',
  },
  profileEmail: {
    fontSize: 14,
    color: '#3f6b62',
    marginTop: 4,
  },
  profileRole: {
    fontSize: 12,
    color: '#3f6b62',
    marginTop: 2,
  },
  profileStats: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#003732',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006b2c',
  },
  statLabel: {
    fontSize: 12,
    color: '#3f6b62',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e4fff9',
  },
  menuSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 16,
    shadowColor: '#003732',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e4fff9',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemLabel: {
    fontSize: 16,
    color: '#00201d',
  },
  menuItemChevron: {
    fontSize: 24,
    color: '#3f6b62',
  },
  logoutSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#003732',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  footer: {
    alignItems: 'center',
    padding: 24,
  },
  footerText: {
    fontSize: 12,
    color: '#3f6b62',
  },
});
