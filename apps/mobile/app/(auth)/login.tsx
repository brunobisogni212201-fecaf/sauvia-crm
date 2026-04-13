import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSignIn, useClerk } from "@clerk/clerk-expo";
import {
  HeartPulse,
  ArrowLeft,
  Wifi,
  Battery,
  ChevronRight,
  Check,
} from "lucide-react-native";

/* ─── Design Tokens ─── */
const T = {
  primary: "#7C3AED",
  primaryDark: "#5B21B6",
  surface: "#F5F4FF",
  surfaceContainer: "#FFFFFF",
  onSurface: "#1A1A2E",
  onSurfaceVariant: "#6B7280",
  white: "#FFFFFF",
  error: "#DC2626",
  errorBg: "rgba(220, 38, 38, 0.08)",
  divider: "#E5E7EB",
  google: "#EA4335",
  success: "#10B981",
  mint: "#14B8A6",
};

type UserType = "nutricionista" | "paciente" | "empresa";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();
  const { openSignIn } = useClerk();
  const [step, setStep] = useState<"splash" | "select" | "login" | "register">(
    "splash",
  );
  const [selectedType, setSelectedType] = useState<UserType | null>(null);

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Register form state
  const [regStep, setRegStep] = useState(1);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  useEffect(() => {
    // Show splash for 2 seconds
    const timer = setTimeout(() => setStep("select"), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectType = (type: UserType) => {
    setSelectedType(type);
    setStep("login");
  };

  const handleSignUpClick = () => {
    setStep("register");
    setRegStep(1);
  };

  const handleLogin = async () => {
    if (!email || !password) return;
    setError("");
    setLoading(true);
    Keyboard.dismiss();

    try {
      if (isLoaded && signIn) {
        const result = await signIn.create({
          identifier: email,
          password,
        });

        if (result.status === "complete") {
          router.replace("/(tabs)/dashboard" as never);
        }
      } else {
        // Fallback: open Clerk hosted sign-in
        await openSignIn({
          routing: "hash",
          redirectUrl: "/(tabs)/dashboard",
        });
      }
    } catch (err: any) {
      setError(err.message || "Falha ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await openSignIn({
        identifier: "google",
        redirectUrl: "/(tabs)/dashboard",
      });
    } catch (err: any) {
      setError("Erro com login Google");
    }
  };

  const handleContinueRegister = () => {
    if (regStep < 3) {
      setRegStep(regStep + 1);
    } else {
      // Complete registration
      router.replace("/(tabs)/dashboard" as never);
    }
  };

  const handleBack = () => {
    if (step === "login" && selectedType) {
      setSelectedType(null);
      setStep("select");
    } else if (step === "register") {
      if (regStep > 1) {
        setRegStep(regStep - 1);
      } else {
        setStep("select");
      }
    } else {
      setStep("select");
    }
  };

  // ========== SPLASH SCREEN ==========
  if (step === "splash") {
    return (
      <View style={s.splashContainer}>
        <View style={s.splashContent}>
          <HeartPulse size={48} color={T.white} />
          <Text style={s.splashTitle}>Saúde+</Text>
          <Text style={s.splashTagline}>Sua saúde, seu controle</Text>
        </View>
        <View style={s.splashDots}>
          <View style={s.splashDot} />
          <View style={s.splashDot} />
          <View style={s.splashDot} />
        </View>
      </View>
    );
  }

  // ========== TYPE SELECT ==========
  if (step === "select") {
    return (
      <SafeAreaView style={s.selectContainer}>
        <View style={s.selectHeader}>
          <Text style={s.selectTitle}>O que você é?</Text>
          <Text style={s.selectSubtitle}>
            Escolha seu perfil para continuar
          </Text>
        </View>

        <View style={s.typeCards}>
          {/* Nutricionista */}
          <TouchableOpacity
            style={s.typeCard}
            onPress={() => handleSelectType("nutricionista")}
          >
            <View style={[s.typeIcon, { backgroundColor: T.primary }]}>
              <HeartPulse size={24} color={T.white} />
            </View>
            <View style={s.typeInfo}>
              <Text style={s.typeTitle}>Nutricionista</Text>
              <Text style={s.typeDesc}>Profissional da saúde</Text>
            </View>
            <ChevronRight size={20} color={T.onSurfaceVariant} />
          </TouchableOpacity>

          {/* Paciente */}
          <TouchableOpacity
            style={s.typeCard}
            onPress={() => handleSelectType("paciente")}
          >
            <View style={[s.typeIcon, { backgroundColor: T.mint }]}>
              <Text style={s.typeIconText}>P</Text>
            </View>
            <View style={s.typeInfo}>
              <Text style={s.typeTitle}>Paciente</Text>
              <Text style={s.typeDesc}>Cliente em acompanhamento</Text>
            </View>
            <ChevronRight size={20} color={T.onSurfaceVariant} />
          </TouchableOpacity>

          {/* Empresa */}
          <TouchableOpacity
            style={s.typeCard}
            onPress={() => handleSelectType("empresa")}
          >
            <View style={[s.typeIcon, { backgroundColor: T.onSurface }]}>
              <Text style={s.typeIconText}>E</Text>
            </View>
            <View style={s.typeInfo}>
              <Text style={s.typeTitle}>Empresa</Text>
              <Text style={s.typeDesc}>Corporate / Benefícios</Text>
            </View>
            <ChevronRight size={20} color={T.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={s.loginLinkBtn}
          onPress={() => setStep("login")}
        >
          <Text style={s.loginLinkText}>Já tenho conta</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ========== REGISTER ==========
  if (step === "register") {
    return (
      <SafeAreaView style={s.container}>
        {/* Status Bar */}
        <View style={s.statusBar}>
          <Text style={s.statusTime}>9:41</Text>
          <View style={s.statusIcons}>
            <Wifi size={16} color={T.onSurface} />
            <Battery size={20} color={T.onSurface} />
          </View>
        </View>

        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={handleBack} style={s.backBtn}>
            <ArrowLeft size={24} color={T.onSurface} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Criar conta</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Progress */}
        <View style={s.progressBar}>
          <View style={s.progressStep}>
            <View style={[s.stepCircle, regStep >= 1 && s.stepCircleActive]}>
              {regStep > 1 ? (
                <Check size={14} color={T.white} />
              ) : (
                <Text style={s.stepNum}>1</Text>
              )}
            </View>
            <Text style={[s.stepLabel, regStep >= 1 && s.stepLabelActive]}>
              Dados
            </Text>
          </View>
          <View style={[s.stepLine, regStep >= 2 && s.stepLineActive]} />
          <View style={s.progressStep}>
            <View style={[s.stepCircle, regStep >= 2 && s.stepCircleActive]}>
              {regStep > 2 ? (
                <Check size={14} color={T.white} />
              ) : (
                <Text style={s.stepNum}>2</Text>
              )}
            </View>
            <Text style={[s.stepLabel, regStep >= 2 && s.stepLabelActive]}>
              Perfil
            </Text>
          </View>
          <View style={[s.stepLine, regStep >= 3 && s.stepLineActive]} />
          <View style={s.progressStep}>
            <View style={[s.stepCircle, regStep >= 3 && s.stepCircleActive]}>
              <Text style={s.stepNum}>3</Text>
            </View>
            <Text style={[s.stepLabel, regStep >= 3 && s.stepLabelActive]}>
              Confirma
            </Text>
          </View>
        </View>

        {/* Form Content */}
        <KeyboardAvoidingView
          style={s.formContent}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={s.formCard}>
            {regStep === 1 && (
              <>
                <Text style={s.inputLabel}>Nome completo</Text>
                <TextInput
                  style={s.input}
                  placeholder="Seu nome"
                  placeholderTextColor={T.onSurfaceVariant}
                  value={regName}
                  onChangeText={setRegName}
                />
                <Text style={s.inputLabel}>E-mail</Text>
                <TextInput
                  style={s.input}
                  placeholder="seu@email.com"
                  placeholderTextColor={T.onSurfaceVariant}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={regEmail}
                  onChangeText={setRegEmail}
                />
                <Text style={s.inputLabel}>Telefone</Text>
                <TextInput
                  style={s.input}
                  placeholder="(11) 99999-9999"
                  placeholderTextColor={T.onSurfaceVariant}
                  keyboardType="phone-pad"
                  value={regPhone}
                  onChangeText={setRegPhone}
                />
              </>
            )}

            {regStep === 2 && (
              <>
                <Text style={s.inputLabel}>CRP / Registro profissional</Text>
                <TextInput
                  style={s.input}
                  placeholder="Número do registro"
                  placeholderTextColor={T.onSurfaceVariant}
                  value={regName}
                  onChangeText={setRegName}
                />
                <Text style={s.inputLabel}>Especialidade</Text>
                <TextInput
                  style={s.input}
                  placeholder="Sua área de atuação"
                  placeholderTextColor={T.onSurfaceVariant}
                  value={regEmail}
                  onChangeText={setRegEmail}
                />
              </>
            )}

            {regStep === 3 && (
              <>
                <Text style={s.inputLabel}>Crie uma senha</Text>
                <TextInput
                  style={s.input}
                  placeholder="Mínimo 8 caracteres"
                  placeholderTextColor={T.onSurfaceVariant}
                  secureTextEntry
                  value={regPassword}
                  onChangeText={setRegPassword}
                />
                <Text style={s.inputLabel}>Confirme a senha</Text>
                <TextInput
                  style={s.input}
                  placeholder="Repita a senha"
                  placeholderTextColor={T.onSurfaceVariant}
                  secureTextEntry
                  value={regPassword}
                  onChangeText={setRegPassword}
                />
              </>
            )}
          </View>

          <TouchableOpacity
            style={s.submitBtn}
            onPress={handleContinueRegister}
          >
            <Text style={s.submitBtnText}>
              {regStep === 3 ? "Criar conta" : "Continuar"}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // ========== LOGIN ==========
  return (
    <SafeAreaView style={s.container}>
      {/* Status Bar */}
      <View style={s.statusBar}>
        <Text style={s.statusTime}>9:41</Text>
        <View style={s.statusIcons}>
          <Wifi size={16} color={T.onSurface} />
          <Battery size={20} color={T.onSurface} />
        </View>
      </View>

      {/* Back button if type selected */}
      {selectedType && (
        <View style={s.header}>
          <TouchableOpacity onPress={handleBack} style={s.backBtn}>
            <ArrowLeft size={24} color={T.onSurface} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>
            {selectedType === "nutricionista" && "Nutricionista"}
            {selectedType === "paciente" && "Paciente"}
            {selectedType === "empresa" && "Empresa"}
          </Text>
          <View style={{ width: 40 }} />
        </View>
      )}

      {/* Login Content */}
      <KeyboardAvoidingView
        style={s.loginContent}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={s.loginForm}>
            {/* Top Banner */}
            <View style={s.topBanner}>
              <Text style={s.bannerLogo}>Sauvia</Text>
            </View>

            {/* Heading */}
            <View style={s.headingSection}>
              <Text style={s.heading}>Bem-vindo de volta</Text>
              <Text style={s.subheading}>Faça login para continuar</Text>
            </View>

            {/* Error */}
            {error !== "" && (
              <View style={s.errorBox}>
                <Text style={s.errorText}>{error}</Text>
              </View>
            )}

            {/* Email */}
            <View style={s.inputGroup}>
              <Text style={s.inputLabel}>E-mail</Text>
              <TextInput
                style={s.input}
                placeholder="seu@email.com"
                placeholderTextColor={T.onSurfaceVariant}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password */}
            <View style={s.inputGroup}>
              <View style={s.labelRow}>
                <Text style={s.inputLabel}>Senha</Text>
                <TouchableOpacity>
                  <Text style={s.forgotLink}>Esqueci minha senha</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={s.input}
                placeholder="••••••••"
                placeholderTextColor={T.onSurfaceVariant}
                secureTextEntry={!showPassword}
                autoComplete="current-password"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Submit */}
            <TouchableOpacity
              style={[
                s.submitBtn,
                (!email || !password || loading) && s.submitBtnDisabled,
              ]}
              activeOpacity={0.85}
              onPress={handleLogin}
              disabled={!email || !password || loading}
            >
              {loading ? (
                <ActivityIndicator color={T.white} size="small" />
              ) : (
                <Text style={s.submitBtnText}>Entrar</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={s.divider}>
              <View style={s.dividerLine} />
              <Text style={s.dividerText}>ou continue com</Text>
              <View style={s.dividerLine} />
            </View>

            {/* Google */}
            <TouchableOpacity style={s.googleBtn} onPress={handleGoogleLogin}>
              <Text style={s.googleG}>G</Text>
              <Text style={s.googleText}>Entrar com Google</Text>
            </TouchableOpacity>

            {/* Register */}
            <View style={s.registerRow}>
              <Text style={s.registerText}>Não tem conta? </Text>
              <TouchableOpacity onPress={handleSignUpClick}>
                <Text style={s.registerLink}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ─── Styles ─── */
const s = StyleSheet.create({
  // Splash
  splashContainer: {
    flex: 1,
    backgroundColor: T.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  splashContent: {
    alignItems: "center",
    gap: 12,
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: T.white,
  },
  splashTagline: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
  },
  splashDots: {
    position: "absolute",
    bottom: 60,
    flexDirection: "row",
    gap: 8,
  },
  splashDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },

  // Select
  selectContainer: {
    flex: 1,
    backgroundColor: T.surface,
    padding: 20,
  },
  selectHeader: {
    marginTop: 40,
    marginBottom: 32,
  },
  selectTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: T.onSurface,
    marginBottom: 8,
  },
  selectSubtitle: {
    fontSize: 15,
    color: T.onSurfaceVariant,
  },
  typeCards: {
    gap: 12,
  },
  typeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: T.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: T.divider,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  typeIconText: {
    fontSize: 20,
    fontWeight: "700",
    color: T.white,
  },
  typeInfo: {
    flex: 1,
    marginLeft: 14,
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: T.onSurface,
  },
  typeDesc: {
    fontSize: 13,
    color: T.onSurfaceVariant,
    marginTop: 2,
  },
  loginLinkBtn: {
    marginTop: "auto",
    alignSelf: "center",
    paddingVertical: 12,
  },
  loginLinkText: {
    fontSize: 14,
    fontWeight: "600",
    color: T.primary,
  },

  // Login
  container: {
    flex: 1,
    backgroundColor: T.surface,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: T.surface,
  },
  statusTime: {
    fontSize: 15,
    fontWeight: "600",
    color: T.onSurface,
  },
  statusIcons: {
    flexDirection: "row",
    gap: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: T.onSurface,
  },
  loginContent: {
    flex: 1,
  },
  loginForm: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  topBanner: {
    backgroundColor: "#EEE9FE",
    borderRadius: 24,
    paddingVertical: 40,
    alignItems: "center",
    marginBottom: 24,
  },
  bannerLogo: {
    fontSize: 32,
    fontWeight: "700",
    color: T.primary,
  },
  headingSection: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: T.onSurface,
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    color: T.onSurfaceVariant,
  },
  errorBox: {
    backgroundColor: T.errorBg,
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    color: T.error,
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 12,
    color: T.onSurfaceVariant,
    marginBottom: 6,
  },
  input: {
    backgroundColor: T.white,
    borderWidth: 1,
    borderColor: T.divider,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    fontSize: 16,
    color: T.onSurface,
  },
  forgotLink: {
    fontSize: 13,
    color: T.primary,
    fontWeight: "500",
  },
  submitBtn: {
    backgroundColor: T.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  submitBtnDisabled: {
    opacity: 0.5,
  },
  submitBtnText: {
    color: T.white,
    fontSize: 16,
    fontWeight: "700",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: T.divider,
  },
  dividerText: {
    fontSize: 12,
    color: T.onSurfaceVariant,
  },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: T.white,
    borderRadius: 14,
    paddingVertical: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: T.divider,
  },
  googleG: {
    fontSize: 18,
    fontWeight: "700",
    color: T.google,
  },
  googleText: {
    fontSize: 14,
    color: T.onSurface,
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  registerText: {
    fontSize: 14,
    color: T.onSurfaceVariant,
  },
  registerLink: {
    fontSize: 14,
    color: T.primary,
    fontWeight: "700",
  },

  // Register
  formContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  formCard: {
    backgroundColor: T.white,
    borderRadius: 20,
    padding: 20,
    gap: 12,
    marginBottom: 16,
  },
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  progressStep: {
    alignItems: "center",
    gap: 4,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: T.divider,
    justifyContent: "center",
    alignItems: "center",
  },
  stepCircleActive: {
    backgroundColor: T.primary,
  },
  stepNum: {
    fontSize: 12,
    fontWeight: "600",
    color: T.onSurfaceVariant,
  },
  stepLabel: {
    fontSize: 11,
    color: T.onSurfaceVariant,
  },
  stepLabelActive: {
    color: T.primary,
    fontWeight: "600",
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: T.divider,
  },
  stepLineActive: {
    backgroundColor: T.primary,
  },
});
