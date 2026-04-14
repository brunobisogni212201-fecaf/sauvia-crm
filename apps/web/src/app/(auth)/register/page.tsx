"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Leaf,
  ArrowLeft,
  User,
  Users,
  Briefcase,
  Check,
} from "lucide-react";

/* ─── Types ─── */
type ProfileType = "nutritionist" | "patient" | "company";

interface ProfileOption {
  id: ProfileType;
  title: string;
  description: string;
  icon: typeof User;
  badge: string;
  color: string;
  bgColor: string;
}

/* ─── Profiles config ─── */
const profiles: ProfileOption[] = [
  {
    id: "nutritionist",
    title: "Nutricionista",
    description: "Agenda e pacientes",
    icon: User,
    badge: "Profissional",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "patient",
    title: "Paciente",
    description: "Plano e acompanhamento",
    icon: Users,
    badge: "Pessoal",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: "company",
    title: "Empresa",
    description: "Gestão corporativa",
    icon: Briefcase,
    badge: "Corporativo",
    color: "text-[#17122F]",
    bgColor: "bg-[#17122F]/10",
  },
];

/* ─── Schemas per profile ─── */
const nutritionistSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Nome completo obrigatório")
      .min(3, "Mínimo 3 caracteres"),
    crn: z.string().min(1, "CRN obrigatório"),
    email: z.string().min(1, "E-mail obrigatório").email("E-mail inválido"),
    phone: z.string().min(1, "Telefone obrigatório"),
    password: z
      .string()
      .min(1, "Senha obrigatória")
      .min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirme a senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const patientSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Nome completo obrigatório")
      .min(3, "Mínimo 3 caracteres"),
    cpf: z.string().min(1, "CPF obrigatório").length(11, "CPF inválido"),
    email: z.string().min(1, "E-mail obrigatório").email("E-mail inválido"),
    phone: z.string().min(1, "Telefone obrigatório"),
    objetivo: z.string().min(1, "Objetivo obrigatório"),
    password: z
      .string()
      .min(1, "Senha obrigatória")
      .min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirme a senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const companySchema = z
  .object({
    companyName: z.string().min(1, "Razão social obrigatória"),
    cnpj: z.string().min(1, "CNPJ obrigatório"),
    responsibleName: z.string().min(1, "Nome do responsável obrigatório"),
    corporateEmail: z
      .string()
      .min(1, "E-mail corporativo obrigatório")
      .email("E-mail inválido"),
    phone: z.string().min(1, "Telefone obrigatório"),
    employees: z.string().min(1, "Número de colaboradores obrigatório"),
    password: z
      .string()
      .min(1, "Senha obrigatória")
      .min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirme a senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type NutritionistFormData = z.infer<typeof nutritionistSchema>;
type PatientFormData = z.infer<typeof patientSchema>;
type CompanyFormData = z.infer<typeof companySchema>;

/* ─── Component ─── */
export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"profile" | "form">("profile");
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(
    null,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(
      selectedProfile === "nutritionist"
        ? nutritionistSchema
        : selectedProfile === "patient"
          ? patientSchema
          : companySchema,
    ),
  });

  function selectProfile(profile: ProfileType) {
    setSelectedProfile(profile);
    setStep("form");
  }

  function goBack() {
    setStep("profile");
    setSelectedProfile(null);
  }

  async function onSubmit(data: Record<string, unknown>) {
    setServerError("");
    try {
      console.log("Register data:", { profile: selectedProfile, ...data });
      // TODO: Call API to create account based on profile
      router.push("/login");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Erro ao criar conta",
      );
    }
  }

  const profile = profiles.find((p) => p.id === selectedProfile);

  return (
    <main className="min-h-screen flex bg-surface">
      {/* ── Left: Form ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <Leaf className="w-7 h-7 text-primary" strokeWidth={2.2} />
            <span className="font-[family-name:var(--font-display)] text-2xl text-primary tracking-wide">
              Sauvia
            </span>
          </div>

          {/* Step indicator */}
          {step === "form" && (
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar aos perfis
            </button>
          )}

          {step === "profile" ? (
            /* ═══ Profile Selection ═══ */
            <>
              <div className="text-sm font-medium text-on-surface-variant mb-2">
                CADASTRO
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-4xl text-on-surface mb-3">
                Como você quer entrar na plataforma?
              </h1>
              <p className="text-on-surface-variant mb-8">
                Escolha o perfil correto para abrir o cadastro adequado e manter
                os dados separados por jornada.
              </p>

              <div className="space-y-4">
                {profiles.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => selectProfile(p.id)}
                    className={`
                      w-full flex items-center gap-4 p-5 rounded-2xl
                      border-2 transition-all duration-200
                      hover:shadow-lg hover:scale-[1.02]
                      ${p.bgColor}
                      border-transparent hover:border-current
                      ${p.color.replace("text-", "border-")}
                    `}
                  >
                    <div
                      className={`
                        w-12 h-12 flex items-center justify-center rounded-xl
                        bg-white ${p.color}
                      `}
                    >
                      <p.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-on-surface-variant">
                        {p.badge}
                      </div>
                      <div className={`font-semibold text-lg ${p.color}`}>
                        {p.title}
                      </div>
                      <div className="text-sm text-on-surface-variant">
                        {p.description}
                      </div>
                    </div>
                    <ArrowRight className={`w-5 h-5 ${p.color}`} />
                  </button>
                ))}
              </div>

              <p className="mt-8 text-center text-sm text-on-surface-variant">
                Já tem uma conta?{" "}
                <a
                  href="/login"
                  className="text-primary font-semibold hover:text-primary-dark"
                >
                  Entre agora
                </a>
              </p>
            </>
          ) : (
            /* ═══ Registration Form ═══ */
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-on-surface">
                  Cadastro {profile?.title}
                </h2>
                <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
                  Passo 1/2
                </span>
              </div>

              {serverError && (
                <div className="mb-6 p-4 rounded-xl bg-error/10 text-error text-sm">
                  {serverError}
                </div>
              )}

              {/* Form Fields */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {selectedProfile === "nutritionist" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1.5">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        placeholder="Dr. Ana Silva"
                        {...register("fullName")}
                        className={`
                          w-full px-4 py-3.5 rounded-xl
                          bg-white text-on-surface
                          border-2 transition-all duration-200
                          placeholder:text-on-surface-variant/40
                          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                          ${errors.fullName ? "border-error" : "border-surface-container"}
                        `}
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 text-sm text-error">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-on-surface mb-1.5">
                          CRN
                        </label>
                        <input
                          type="text"
                          placeholder="12345-SP"
                          {...register("crn")}
                          className={`
                            w-full px-4 py-3.5 rounded-xl
                            bg-white text-on-surface
                            border-2 transition-all duration-200
                            placeholder:text-on-surface-variant/40
                            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                            ${errors.crn ? "border-error" : "border-surface-container"}
                          `}
                        />
                        {errors.crn && (
                          <p className="mt-1.5 text-sm text-error">
                            {errors.crn.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-on-surface mb-1.5">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          placeholder="(11) 99999-9999"
                          {...register("phone")}
                          className={`
                            w-full px-4 py-3.5 rounded-xl
                            bg-white text-on-surface
                            border-2 transition-all duration-200
                            placeholder:text-on-surface-variant/40
                            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                            ${errors.phone ? "border-error" : "border-surface-container"}
                          `}
                        />
                        {errors.phone && (
                          <p className="mt-1.5 text-sm text-error">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1.5">
                        E-mail
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
                        <input
                          type="email"
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
                        <p className="mt-1.5 text-sm text-error">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {selectedProfile === "patient" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1.5">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        placeholder="João Silva"
                        {...register("fullName")}
                        className={`
                          w-full px-4 py-3.5 rounded-xl
                          bg-white text-on-surface
                          border-2 transition-all duration-200
                          placeholder:text-on-surface-variant/40
                          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                          ${errors.fullName ? "border-error" : "border-surface-container"}
                        `}
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 text-sm text-error">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-on-surface mb-1.5">
                          CPF
                        </label>
                        <input
                          type="text"
                          placeholder="00000000000"
                          {...register("cpf")}
                          className={`
                            w-full px-4 py-3.5 rounded-xl
                            bg-white text-on-surface
                            border-2 transition-all duration-200
                            placeholder:text-on-surface-variant/40
                            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                            ${errors.cpf ? "border-error" : "border-surface-container"}
                          `}
                        />
                        {errors.cpf && (
                          <p className="mt-1.5 text-sm text-error">
                            {errors.cpf.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-on-surface mb-1.5">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          placeholder="(11) 99999-9999"
                          {...register("phone")}
                          className={`
                            w-full px-4 py-3.5 rounded-xl
                            bg-white text-on-surface
                            border-2 transition-all duration-200
                            placeholder:text-on-surface-variant/40
                            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                            ${errors.phone ? "border-error" : "border-surface-container"}
                          `}
                        />
                        {errors.phone && (
                          <p className="mt-1.5 text-sm text-error">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1.5">
                        E-mail
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
                        <input
                          type="email"
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
                        <p className="mt-1.5 text-sm text-error">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1.5">
                        Objetivo principal
                      </label>
                      <select
                        {...register("objetivo")}
                        className={`
                          w-full px-4 py-3.5 rounded-xl
                          bg-white text-on-surface
                          border-2 transition-all duration-200
                          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                          ${errors.objetivo ? "border-error" : "border-surface-container"}
                        `}
                      >
                        <option value="">Selecione...</option>
                        <option value="emagrecer">Emagrecer</option>
                        <option value="ganhar_massa">Ganhar massa</option>
                        <option value="manter">Manter peso</option>
                        <option value="saude">Melhorar saúde</option>
                        <option value="esporte">Performance esportiva</option>
                      </select>
                      {errors.objetivo && (
                        <p className="mt-1.5 text-sm text-error">
                          {errors.objetivo.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {selectedProfile === "company" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-on-surface mb-1.5">
                          Razão social
                        </label>
                        <input
                          type="text"
                          placeholder="Empresa Ltda"
                          {...register("companyName")}
                          className={`
                            w-full px-4 py-3.5 rounded-xl
                            bg-white text-on-surface
                            border-2 transition-all duration-200
                            placeholder:text-on-surface-variant/40
                            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                            ${errors.companyName ? "border-error" : "border-surface-container"}
                          `}
                        />
                        {errors.companyName && (
                          <p className="mt-1.5 text-sm text-error">
                            {errors.companyName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-on-surface mb-1.5">
                          CNPJ
                        </label>
                        <input
                          type="text"
                          placeholder="00.000.000/0001-00"
                          {...register("cnpj")}
                          className={`
                            w-full px-4 py-3.5 rounded-xl
                            bg-white text-on-surface
                            border-2 transition-all duration-200
                            placeholder:text-on-surface-variant/40
                            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                            ${errors.cnpj ? "border-error" : "border-surface-container"}
                          `}
                        />
                        {errors.cnpj && (
                          <p className="mt-1.5 text-sm text-error">
                            {errors.cnpj.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-on-surface mb-1.5">
                          Colaboradores
                        </label>
                        <input
                          type="number"
                          placeholder="120"
                          {...register("employees")}
                          className={`
                            w-full px-4 py-3.5 rounded-xl
                            bg-white text-on-surface
                            border-2 transition-all duration-200
                            placeholder:text-on-surface-variant/40
                            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                            ${errors.employees ? "border-error" : "border-surface-container"}
                          `}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-on-surface mb-1.5">
                          Responsável
                        </label>
                        <input
                          type="text"
                          placeholder="Maria Santos"
                          {...register("responsibleName")}
                          className={`
                            w-full px-4 py-3.5 rounded-xl
                            bg-white text-on-surface
                            border-2 transition-all duration-200
                            placeholder:text-on-surface-variant/40
                            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                            ${errors.responsibleName ? "border-error" : "border-surface-container"}
                          `}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-on-surface mb-1.5">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          placeholder="(11) 99999-9999"
                          {...register("phone")}
                          className={`
                            w-full px-4 py-3.5 rounded-xl
                            bg-white text-on-surface
                            border-2 transition-all duration-200
                            placeholder:text-on-surface-variant/40
                            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                            ${errors.phone ? "border-error" : "border-surface-container"}
                          `}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1.5">
                        E-mail corporativo
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
                        <input
                          type="email"
                          placeholder="seu@empresa.com"
                          {...register("corporateEmail")}
                          className={`
                            w-full pl-11 pr-4 py-3.5 rounded-xl
                            bg-white text-on-surface
                            border-2 transition-all duration-200
                            placeholder:text-on-surface-variant/40
                            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                            ${errors.corporateEmail ? "border-error" : "border-surface-container"}
                          `}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Password fields - common */}
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1.5">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
                    <input
                      type={showPassword ? "text" : "password"}
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
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-sm text-error">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1.5">
                    Confirmar senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("confirmPassword")}
                      className={`
                        w-full pl-11 pr-4 py-3.5 rounded-xl
                        bg-white text-on-surface
                        border-2 transition-all duration-200
                        placeholder:text-on-surface-variant/40
                        focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                        ${errors.confirmPassword ? "border-error" : "border-surface-container"}
                      `}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1.5 text-sm text-error">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* LGPD Notice */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-container">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-on-surface-variant">
                    Dados protegidos pela LGPD. Consentimento para tratamento de
                    dados conforme nossa{" "}
                    <a
                      href="/privacy"
                      className="text-primary underline hover:text-primary-dark"
                    >
                      Política de Privacidade
                    </a>
                    .
                  </p>
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
                      Criar conta
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-on-surface-variant">
                Já tem uma conta?{" "}
                <a
                  href="/login"
                  className="text-primary font-semibold hover:text-primary-dark"
                >
                  Entre agora
                </a>
              </p>
            </>
          )}
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
