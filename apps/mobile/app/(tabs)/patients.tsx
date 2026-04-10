import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Search, Plus, Filter } from "lucide-react-native";
import { useState } from "react";

export default function PatientsScreen() {
  const [search, setSearch] = useState('');

  const patients = [
    { id: 1, name: 'Maria Silva', email: 'maria@email.com', status: 'active', lastVisit: '15/03/2024' },
    { id: 2, name: 'João Santos', email: 'joao@email.com', status: 'active', lastVisit: '14/03/2024' },
    { id: 3, name: 'Ana Oliveira', email: 'ana@email.com', status: 'inactive', lastVisit: '20/02/2024' },
    { id: 4, name: 'Carlos Lima', email: 'carlos@email.com', status: 'active', lastVisit: '13/03/2024' },
    { id: 5, name: 'Fernanda Costa', email: 'fernanda@email.com', status: 'active', lastVisit: '12/03/2024' },
  ];

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Pacientes</Text>
        <Text style={styles.subtitle}>Gerencie seus pacientes</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search color="#3f6b62" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar pacientes..."
            placeholderTextColor="#3f6b62"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color="#006b2c" size={20} />
        </TouchableOpacity>
      </View>

      {/* Patients List */}
      <View style={styles.list}>
        {filteredPatients.map((patient) => (
          <TouchableOpacity key={patient.id} style={styles.patientCard}>
            <View style={styles.patientAvatar}>
              <Text style={styles.patientAvatarText}>{patient.name.charAt(0)}</Text>
            </View>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{patient.name}</Text>
              <Text style={styles.patientEmail}>{patient.email}</Text>
            </View>
            <View style={[styles.statusBadge, patient.status === 'active' ? styles.statusActive : styles.statusInactive]}>
              <Text style={styles.statusText}>
                {patient.status === 'active' ? 'Ativo' : 'Inativo'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Plus color="#fff" size={24} />
      </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#003732',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 12,
    fontSize: 16,
    color: '#00201d',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#003732',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  list: {
    paddingHorizontal: 16,
  },
  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#003732',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  patientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#006b2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientAvatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  patientInfo: {
    flex: 1,
    marginLeft: 12,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00201d',
  },
  patientEmail: {
    fontSize: 12,
    color: '#3f6b62',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: '#a8f5e5',
  },
  statusInactive: {
    backgroundColor: '#e5e7eb',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00201d',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#006b2c',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#003732',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});
