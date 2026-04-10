"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";
import { signIn } from "@/lib/cognito";

/* ─── Schema ─── */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail obrigatório")
    .email("E-mail inválido"),
  password: z
    .string()
    .min(1, "Senha obrigatória")
    .min(8, "Mínimo 8 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

/* ─── Cognito error messages → PT-BR ─── */
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

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setServerError("");
    try {
      await signIn(data.email, data.password);
      router.push("/");
    } catch (err) {
      setServerError(friendlyError(err));
    }
  }

  return (
    <main className="min-h-screen flex bg-surface">
      {/* ── Left: Form ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12">
            <Leaf className="w-7 h-7 text-primary" strokeWidth={2.2} />
            <span className="font-[family-name:var(--font-display)] text-2xl text-primary tracking-wide">
              Sauvia
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-on-surface mb-2">
            Welcome Back
          </h1>
          <p className="text-on-surface-variant mb-10">
            Entre na sua conta para continuar gerenciando seus pacientes.
          </p>

          {/* Server error */}
          {serverError && (
            <div className="mb-6 p-4 rounded-xl bg-error/10 text-error text-sm">
              {serverError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  {...register("email")}
                  className={`
                    w-full pl-11 pr-4 py-3.5 rounded-xl
                    bg-white text-on-surface
                    border-2 transition-all duration-200
                    placeholder:text-on-surface-variant/40
                    focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                    ${errors.email ? "border-error" : "border-surface-container"}
                  `}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-error">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-on-surface">
                  Senha
                </label>
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary-dark transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={`
                    w-full pl-11 pr-12 py-3.5 rounded-xl
                    bg-white text-on-surface
                    border-2 transition-all duration-200
                    placeholder:text-on-surface-variant/40
                    focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                    ${errors.password ? "border-error" : "border-surface-container"}
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-surface-variant transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-error">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full flex items-center justify-center gap-2
                py-3.5 rounded-full
                bg-primary text-white font-semibold text-base
                hover:bg-primary-dark active:scale-[0.98]
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                shadow-md hover:shadow-lg
              "
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Register link */}
          <p className="mt-8 text-center text-sm text-on-surface-variant">
            Não tem uma conta?{" "}
            <a
              href="/register"
              className="text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              Crie agora
            </a>
          </p>
        </div>
      </div>

      {/* ── Right: Brand panel (hidden on mobile) ── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#3b0764]">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute bottom-12 -left-16 w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-white/5 rounded-full" />

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-16">
          <Leaf className="w-16 h-16 text-white/20 mb-8" strokeWidth={1.5} />
          <h2 className="font-[family-name:var(--font-display)] text-5xl text-white text-center leading-tight mb-4">
            A Arte de Ser
            <br />
            Relevante.
          </h2>
          <p className="text-white/60 text-center text-lg max-w-sm">
            O CRM que não gerencia apenas dados, orquestra relacionamentos.
          </p>
        </div>
      </div>
    </main>
  );
}
