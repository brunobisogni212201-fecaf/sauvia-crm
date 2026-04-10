import React, { useState } from "react";
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
} from "react-native";
import { useRouter } from "expo-router";
import { Leaf, Eye, EyeOff } from "lucide-react-native";
import { signIn } from "../../lib/cognito";

/* ─── Design Tokens ─── */
const T = {
  primary: "#7C3AED",
  primaryDark: "#5B21B6",
  surface: "hsl(40, 20%, 98%)",
  surfaceContainer: "hsl(40, 15%, 94%)",
  onSurface: "hsl(210, 20%, 12%)",
  onSurfaceVariant: "hsl(210, 10%, 40%)",
  white: "#FFFFFF",
  error: "#ba1a1a",
  errorBg: "rgba(186, 26, 26, 0.08)",
  shadowColor: "rgba(124, 58, 237, 0.12)",
};

/* ─── Cognito error → PT-BR ─── */
function friendlyError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes("Incorrect username or password"))
    return "E-mail ou senha incorretos.";
  if (msg.includes("User does not exist"))
    return "Nenhuma conta encontrada com este e-mail.";
  if (msg.includes("User is not confirmed"))
    return "Conta não confirmada. Verifique seu e-mail.";
  if (msg.includes("Password attempts exceeded"))
    return "Muitas tentativas. Tente novamente em alguns minutos.";
  return "Ocorreu um erro. Tente novamente.";
}

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* Validation */
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 8;
  const canSubmit = emailValid && passwordValid && !loading;

  async function handleLogin() {
    if (!canSubmit) return;
    setError("");
    setLoading(true);
    Keyboard.dismiss();

    try {
      await signIn(email.trim(), password);
      router.replace("/(tabs)/dashboard" as never);
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={s.safe}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={s.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* Logo */}
          <View style={s.logoSection}>
            <View style={s.logoRow}>
              <Leaf size={28} color={T.primary} strokeWidth={2.2} />
              <Text style={s.logoText}>Sauvia</Text>
            </View>
            <Text style={s.tagline}>Health & Lifestyle</Text>
          </View>

          {/* Heading */}
          <View style={s.headingSection}>
            <Text style={s.heading}>Welcome Back</Text>
            <Text style={s.subheading}>
              Entre na sua conta para continuar.
            </Text>
          </View>

          {/* Error */}
          {error !== "" && (
            <View style={s.errorBox}>
              <Text style={s.errorText}>{error}</Text>
            </View>
          )}

          {/* Email */}
          <View style={s.inputGroup}>
            <Text style={s.label}>E-mail</Text>
            <TextInput
              style={[s.input, email.length > 0 && !emailValid && s.inputError]}
              placeholder="seu@email.com"
              placeholderTextColor="rgba(102,102,102,0.4)"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password */}
          <View style={s.inputGroup}>
            <View style={s.labelRow}>
              <Text style={s.label}>Senha</Text>
              <TouchableOpacity>
                <Text style={s.forgotLink}>Esqueceu?</Text>
              </TouchableOpacity>
            </View>
            <View style={s.passwordWrap}>
              <TextInput
                style={[s.input, s.passwordInput, password.length > 0 && !passwordValid && s.inputError]}
                placeholder="••••••••"
                placeholderTextColor="rgba(102,102,102,0.4)"
                secureTextEntry={!showPassword}
                autoComplete="current-password"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={handleLogin}
                returnKeyType="go"
              />
              <TouchableOpacity
                style={s.eyeBtn}
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                {showPassword ? (
                  <EyeOff size={20} color={T.onSurfaceVariant} />
                ) : (
                  <Eye size={20} color={T.onSurfaceVariant} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={[s.submitBtn, !canSubmit && s.submitBtnDisabled]}
            activeOpacity={0.85}
            onPress={handleLogin}
            disabled={!canSubmit}
          >
            {loading ? (
              <ActivityIndicator color={T.white} size="small" />
            ) : (
              <Text style={s.submitBtnText}>Entrar</Text>
            )}
          </TouchableOpacity>

          {/* Register link */}
          <View style={s.registerRow}>
            <Text style={s.registerText}>Não tem uma conta? </Text>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/register" as never)}
            >
              <Text style={s.registerLink}>Crie agora</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

/* ─── Styles ─── */
const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: T.surface,
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "center",
  },

  /* Logo */
  logoSection: {
    alignItems: "center",
    marginBottom: 36,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  logoText: {
    fontSize: 28,
    color: T.primary,
    fontWeight: "300",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 12,
    color: "rgba(91, 33, 182, 0.5)",
    fontWeight: "500",
    letterSpacing: 3,
    textTransform: "uppercase",
  },

  /* Heading */
  headingSection: {
    marginBottom: 28,
  },
  heading: {
    fontSize: 32,
    fontWeight: "300",
    color: T.onSurface,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginBottom: 6,
  },
  subheading: {
    fontSize: 15,
    color: T.onSurfaceVariant,
    lineHeight: 22,
  },

  /* Error */
  errorBox: {
    backgroundColor: T.errorBg,
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  errorText: {
    color: T.error,
    fontSize: 14,
  },

  /* Inputs */
  inputGroup: {
    marginBottom: 18,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: T.onSurface,
    marginBottom: 6,
  },
  forgotLink: {
    fontSize: 13,
    color: T.primary,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: T.white,
    borderWidth: 2,
    borderColor: T.surfaceContainer,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    fontSize: 16,
    color: T.onSurface,
  },
  inputError: {
    borderColor: T.error,
  },
  passwordWrap: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeBtn: {
    position: "absolute",
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },

  /* Submit */
  submitBtn: {
    backgroundColor: T.primary,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    ...(Platform.OS === "ios"
      ? {
          shadowColor: T.primary,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.3,
          shadowRadius: 14,
        }
      : { elevation: 6 }),
  },
  submitBtnDisabled: {
    opacity: 0.5,
  },
  submitBtnText: {
    color: T.white,
    fontSize: 17,
    fontWeight: "700",
  },

  /* Register */
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
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
});
