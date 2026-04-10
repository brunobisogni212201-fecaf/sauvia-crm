import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { AppIcons, DESIGN_TOKENS } from '@sauvia/ui-icons';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function MobileLanding() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <AppIcons.Dashboard size={32} color="#006b2c" strokeWidth={2.5} />
          <Text style={styles.logoText}>SAUVIA</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.badge}>
            <AppIcons.Security size={16} color="#006b2c" />
            <Text style={styles.badgeText}>Sua saúde em segurança</Text>
          </View>
          
          <Text style={styles.heroTitle}>Sua saúde conectada no seu bolso</Text>
          <Text style={styles.heroSubtitle}>
            Agendamentos simples, histórico médico e acompanhamento completo direto no seu celular.
          </Text>

          <TouchableOpacity 
            style={styles.mainButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.buttonText}>Instalar Aplicativo</Text>
          </TouchableOpacity>
        </View>

        {/* Features Row */}
        <View style={styles.features}>
          <FeatureItem 
            icon={<AppIcons.Appointments size={28} color="#006b2c" />}
            title="Agendamentos"
            desc="Marque consultas em segundos."
          />
          <FeatureItem 
            icon={<AppIcons.Time size={28} color="#006b2c" />}
            title="Lembretes"
            desc="Nunca perca um horário."
          />
          <FeatureItem 
            icon={<AppIcons.Treatments size={28} color="#006b2c" />}
            title="Tratamentos"
            desc="Siga seu plano de saúde."
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4fff9',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    gap: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#006b2c',
    letterSpacing: -0.5,
  },
  hero: {
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  badge: {
    flexDirection: 'row',
    backgroundColor: '#c5fff5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  badgeText: {
    color: '#006b2c',
    fontWeight: '700',
    fontSize: 14,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#00201d',
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#3f6b62',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
  },
  mainButton: {
    backgroundColor: '#006b2c',
    width: '100%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#006b2c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
  features: {
    padding: 24,
    gap: 16,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#c5fff5',
  },
  iconContainer: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#00201d',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 14,
    color: '#3f6b62',
    lineHeight: 20,
  },
});
