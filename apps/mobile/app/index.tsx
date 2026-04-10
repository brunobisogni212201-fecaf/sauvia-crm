import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/* ─── Design Tokens ─── */
const T = {
  primary: "#7C3AED",
  primaryDark: "#5B21B6",
  primaryLight: "#8B5CF6",
  secondary: "#A78BFA",
  surface: "hsl(40, 20%, 98%)",
  surfaceContainer: "hsl(40, 15%, 94%)",
  onSurface: "hsl(210, 20%, 12%)",
  onSurfaceVariant: "hsl(210, 10%, 40%)",
  white: "#FFFFFF",
  glass: "rgba(255,255,255,0.7)",
  glassCard: "rgba(255,255,255,0.12)",
  shadowColor: "rgba(124, 58, 237, 0.12)",
  radius: 16,
  radiusFull: 999,
};

/* ─── Fade-in wrapper ─── */
function FadeIn({
  delay = 0,
  children,
}: {
  delay?: number;
  children: React.ReactNode;
}) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 600,
      delay,
      useNativeDriver: true,
    }).start();
  }, [anim, delay]);
  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [24, 0],
            }),
          },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
}

/* ─── Main Screen ─── */
export default function MobileLanding() {
  const router = useRouter();

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={s.header}>
          <View style={s.headerInner}>
            <Text style={s.logo}>✦ SAUVIA</Text>
            <TouchableOpacity
              style={s.headerBtn}
              onPress={() => router.push("/(auth)/login" as never)}
            >
              <Text style={s.headerBtnText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Hero ── */}
        <View style={s.hero}>
          <FadeIn>
            <View style={s.badge}>
              <Text style={s.badgeText}>♛ O CRM #1 para Nutricionistas</Text>
            </View>
          </FadeIn>

          <FadeIn delay={100}>
            <Text style={s.heroTitle}>
              A Ciência de Fazer Mais.{"\n"}
              <Text style={s.heroTitleAccent}>A Arte de Ser Relevante.</Text>
            </Text>
          </FadeIn>

          <FadeIn delay={200}>
            <Text style={s.heroSub}>
              O CRM que não gerencia apenas dados, orquestra relacionamentos.
              Simplifique sua prática clínica e foque no que importa.
            </Text>
          </FadeIn>

          <FadeIn delay={300}>
            <TouchableOpacity
              style={s.ctaPrimary}
              activeOpacity={0.85}
              onPress={() => router.push("/(auth)/register" as never)}
            >
              <Text style={s.ctaPrimaryText}>
                Comece sua Avaliação Gratuita →
              </Text>
            </TouchableOpacity>
          </FadeIn>

          <FadeIn delay={350}>
            <Text style={s.ctaNote}>
              Sem cartão · 5 min setup · Cancele quando quiser
            </Text>
          </FadeIn>
        </View>

        {/* ── Peggy Olson: Eficiência ── */}
        <View style={s.sectionWhite}>
          <FadeIn>
            <Text style={s.sectionTitle}>O Controle Que Você Merece.</Text>
          </FadeIn>
          <FadeIn delay={100}>
            <Text style={s.sectionDesc}>
              Você não estudou nutrição para ser uma secretária. A Sauvia
              centraliza sua agenda, automatiza lembretes e organiza planos
              nutricionais.
            </Text>
          </FadeIn>

          {[
            {
              icon: "📅",
              title: "Agenda Inteligente",
              desc: "Confirmação e lembretes automáticos via WhatsApp. Reduza faltas em até 60%.",
            },
            {
              icon: "📋",
              title: "Planos Nutricionais",
              desc: "Templates reutilizáveis com cálculo de macros. Economize horas toda semana.",
            },
            {
              icon: "🔔",
              title: "Automações Completas",
              desc: "Follow-ups, lembretes e cobranças. Tudo automático, nada despercebido.",
            },
            {
              icon: "👥",
              title: "Gestão de Pacientes",
              desc: "Histórico completo, evolução clínica e dados organizados em timeline.",
            },
            {
              icon: "📊",
              title: "Dashboards Visuais",
              desc: "Métricas de adesão e progresso dos pacientes em tempo real.",
            },
            {
              icon: "🛡️",
              title: "LGPD Compliant",
              desc: "Criptografia, consentimento granular e residência de dados em SP.",
            },
          ].map((f, i) => (
            <FadeIn key={f.title} delay={150 + i * 80}>
              <View style={s.featureCard}>
                <View style={s.featureIconWrap}>
                  <Text style={s.featureIcon}>{f.icon}</Text>
                </View>
                <View style={s.featureContent}>
                  <Text style={s.featureTitle}>{f.title}</Text>
                  <Text style={s.featureDesc}>{f.desc}</Text>
                </View>
              </View>
            </FadeIn>
          ))}
        </View>

        {/* ── Don Draper: Marca ── */}
        <View style={s.sectionDraper}>
          <FadeIn>
            <Text style={s.draperTitle}>
              O Que o Seu CRM Diz Sobre Você?
            </Text>
          </FadeIn>
          <FadeIn delay={100}>
            <Text style={s.draperDesc}>
              Eles não compram apenas um plano alimentar, compram a sua
              confiança. A Sauvia é o palco onde a sua marca brilha.
            </Text>
          </FadeIn>

          {[
            {
              icon: "💬",
              title: "Comunicação Premium",
              desc: "Mensagens com a cara da sua marca. Cada interação reforça sua autoridade.",
            },
            {
              icon: "👑",
              title: "Experiência de Alto Padrão",
              desc: "Portal do paciente com design elegante que transmite excelência.",
            },
            {
              icon: "✨",
              title: "Posicionamento de Mercado",
              desc: "Relatórios visuais e acompanhamento sofisticado. Justifique seu valor premium.",
            },
          ].map((c, i) => (
            <FadeIn key={c.title} delay={150 + i * 100}>
              <View style={s.draperCard}>
                <Text style={s.draperCardIcon}>{c.icon}</Text>
                <Text style={s.draperCardTitle}>{c.title}</Text>
                <Text style={s.draperCardDesc}>{c.desc}</Text>
              </View>
            </FadeIn>
          ))}
        </View>

        {/* ── Stats ── */}
        <View style={s.statsSection}>
          <View style={s.statsGrid}>
            {[
              { value: "2.500+", label: "Nutricionistas" },
              { value: "150K+", label: "Pacientes" },
              { value: "94%", label: "Satisfação" },
              { value: "3x", label: "Produtividade" },
            ].map((st) => (
              <View key={st.label} style={s.statItem}>
                <Text style={s.statValue}>{st.value}</Text>
                <Text style={s.statLabel}>{st.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── CTA Final ── */}
        <View style={s.ctaFinal}>
          <FadeIn>
            <Text style={s.ctaFinalTitle}>
              Deixe o seu legado,{"\n"}não apenas o seu plano.
            </Text>
          </FadeIn>
          <FadeIn delay={100}>
            <Text style={s.ctaFinalDesc}>
              Junte-se a milhares de nutricionistas que já transformaram sua
              prática.
            </Text>
          </FadeIn>

          <FadeIn delay={200}>
            <View style={s.ctaForm}>
              <TextInput
                style={s.ctaInput}
                placeholder="Seu melhor e-mail"
                placeholderTextColor="rgba(255,255,255,0.5)"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity style={s.ctaSubmit} activeOpacity={0.85}>
                <Text style={s.ctaSubmitText}>Começar Grátis</Text>
              </TouchableOpacity>
            </View>
          </FadeIn>

          <FadeIn delay={250}>
            <Text style={s.ctaFinalNote}>
              14 dias grátis · Sem cartão · Cancele quando quiser
            </Text>
          </FadeIn>
        </View>

        {/* ── Footer ── */}
        <View style={s.footer}>
          <Text style={s.footerLogo}>✦ SAUVIA</Text>
          <Text style={s.footerTag}>
            O CRM que orquestra relacionamentos.
          </Text>
          <Text style={s.footerCopy}>
            © 2026 Sauvia. Todos os direitos reservados.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ─── Styles ─── */
const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: T.surface,
  },
  scroll: {
    paddingBottom: 0,
  },

  /* Header */
  header: {
    backgroundColor: T.glass,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: T.surfaceContainer,
    ...(Platform.OS === "ios"
      ? { shadowColor: T.shadowColor, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8 }
      : { elevation: 3 }),
  },
  headerInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  logo: {
    fontSize: 20,
    fontWeight: "900",
    color: T.primary,
    letterSpacing: 0.5,
  },
  headerBtn: {
    backgroundColor: T.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: T.radiusFull,
  },
  headerBtnText: {
    color: T.white,
    fontWeight: "700",
    fontSize: 14,
  },

  /* Hero */
  hero: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 48,
    alignItems: "center",
  },
  badge: {
    backgroundColor: "rgba(124, 58, 237, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: T.radiusFull,
    marginBottom: 24,
  },
  badgeText: {
    color: T.primary,
    fontWeight: "700",
    fontSize: 13,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: "300",
    color: T.onSurface,
    textAlign: "center",
    lineHeight: 42,
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  heroTitleAccent: {
    color: T.primary,
  },
  heroSub: {
    fontSize: 16,
    color: T.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  ctaPrimary: {
    backgroundColor: T.primary,
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: T.radiusFull,
    width: "100%",
    alignItems: "center",
    ...(Platform.OS === "ios"
      ? { shadowColor: T.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 16 }
      : { elevation: 8 }),
  },
  ctaPrimaryText: {
    color: T.white,
    fontWeight: "800",
    fontSize: 17,
  },
  ctaNote: {
    marginTop: 14,
    fontSize: 13,
    color: T.onSurfaceVariant,
    textAlign: "center",
  },

  /* Peggy Olson Section */
  sectionWhite: {
    backgroundColor: T.white,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "300",
    color: T.onSurface,
    marginBottom: 12,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  sectionDesc: {
    fontSize: 16,
    color: T.onSurfaceVariant,
    lineHeight: 24,
    marginBottom: 28,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: T.surface,
    padding: 16,
    borderRadius: T.radius,
    marginBottom: 12,
    gap: 14,
  },
  featureIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(124, 58, 237, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  featureIcon: {
    fontSize: 22,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: T.onSurface,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 14,
    color: T.onSurfaceVariant,
    lineHeight: 20,
  },

  /* Don Draper Section */
  sectionDraper: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: T.primaryDark,
  },
  draperTitle: {
    fontSize: 30,
    fontWeight: "300",
    color: T.white,
    marginBottom: 12,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  draperDesc: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 24,
    marginBottom: 28,
  },
  draperCard: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: T.radius,
    padding: 20,
    marginBottom: 12,
  },
  draperCardIcon: {
    fontSize: 24,
    marginBottom: 10,
  },
  draperCardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: T.white,
    marginBottom: 6,
  },
  draperCardDesc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 20,
  },

  /* Stats */
  statsSection: {
    backgroundColor: T.white,
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  statItem: {
    width: "50%",
    alignItems: "center",
    paddingVertical: 16,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "300",
    color: T.primary,
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  statLabel: {
    fontSize: 13,
    color: T.onSurfaceVariant,
    fontWeight: "600",
  },

  /* CTA Final */
  ctaFinal: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    alignItems: "center",
    backgroundColor: T.primary,
  },
  ctaFinalTitle: {
    fontSize: 28,
    fontWeight: "300",
    color: T.white,
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 12,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  ctaFinalDesc: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 28,
  },
  ctaForm: {
    width: "100%",
    gap: 12,
  },
  ctaInput: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: T.radiusFull,
    paddingHorizontal: 20,
    paddingVertical: 16,
    color: T.white,
    fontSize: 16,
  },
  ctaSubmit: {
    backgroundColor: T.white,
    borderRadius: T.radiusFull,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaSubmitText: {
    color: T.primary,
    fontWeight: "800",
    fontSize: 16,
  },
  ctaFinalNote: {
    marginTop: 16,
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
  },

  /* Footer */
  footer: {
    backgroundColor: T.onSurface,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  footerLogo: {
    fontSize: 18,
    fontWeight: "900",
    color: T.primaryLight,
    marginBottom: 6,
  },
  footerTag: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    marginBottom: 4,
  },
  footerCopy: {
    fontSize: 11,
    color: "rgba(255,255,255,0.3)",
  },
});
