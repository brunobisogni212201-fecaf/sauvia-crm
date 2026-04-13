"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserButton, SignIn, useSignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  Stethoscope,
  User,
  Building2,
  ArrowRight,
  Route,
  Leaf,
} from "lucide-react";

type UserType = "nutricionista" | "paciente" | "empresa" | null;

export default function SignInPage() {
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const [step, setStep] = useState<"select" | "signin">("select");

  const handleSelect = (type: UserType) => {
    setSelectedType(type);
    setStep("signin");
  };

  const handleBack = () => {
    setSelectedType(null);
    setStep("select");
  };

  const handleSignUpClick = () => {
    router.push("/sign-up");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-surface">
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute -left-40 top-1/2 w-[520px] h-[520px] rounded-full bg-mint/30 blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -right-40 -top-20 w-[620px] h-[620px] rounded-full bg-secondary/30 blur-[100px]"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-extrabold text-primary-dark"
        >
          Sauvia
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleSignUpClick}
          className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary-dark bg-white rounded-full border border-secondary/30 hover:border-primary/50 transition-colors"
        >
          Novo cadastro
        </motion.button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4">
        {step === "select" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl text-center"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-white rounded-full border border-secondary/30"
            >
              <Leaf className="w-4 h-4" />
              Acesso Personalizado
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-on-surface mb-6 leading-tight"
            >
              Como você quer entrar <br />
              na plataforma?
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-12"
            >
              Escolha o perfil correto para abrir o cadastro adequado e manter
              os dados separados por jornada.
            </motion.p>

            {/* Profile Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              {/* Nutricionista Card */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect("nutricionista")}
                className="group flex flex-col items-start p-7 text-left bg-white rounded-3xl border border-secondary/20 shadow-lg hover:shadow-xl transition-all"
                style={{ boxShadow: "0 18px 42px rgba(91, 33, 182, 0.12)" }}
              >
                <div className="flex items-center justify-center w-14 h-14 mb-5 bg-primary rounded-2xl text-white">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-3">
                  Nutricionista
                </h3>
                <p className="text-sm text-on-surface-variant mb-5 leading-relaxed">
                  Cadastro profissional com CRN, especialidade, bio, agenda e
                  dados de atendimento.
                </p>
                <div className="flex items-center justify-center w-full py-3 mt-auto text-sm font-semibold text-white bg-primary rounded-full group-hover:bg-primary-dark transition-colors">
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.button>

              {/* Paciente Card */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect("paciente")}
                className="group flex flex-col items-start p-7 text-left bg-white rounded-3xl border border-secondary/20 shadow-lg hover:shadow-xl transition-all"
                style={{ boxShadow: "0 18px 42px rgba(20, 184, 166, 0.1)" }}
              >
                <div className="flex items-center justify-center w-14 h-14 mb-5 bg-teal-500 rounded-2xl text-white">
                  <User className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-3">
                  Paciente
                </h3>
                <p className="text-sm text-on-surface-variant mb-5 leading-relaxed">
                  Cadastro pessoal com objetivo, restrições, histórico e
                  informações de acompanhamento.
                </p>
                <div className="flex items-center justify-center w-full py-3 mt-auto text-sm font-semibold text-teal-600 bg-teal-50 rounded-full border border-teal-200 group-hover:bg-teal-100 transition-colors">
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.button>

              {/* Empresa Card */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect("empresa")}
                className="group flex flex-col items-start p-7 text-left bg-dark rounded-3xl shadow-lg hover:shadow-xl transition-all"
                style={{ boxShadow: "0 18px 42px rgba(23, 18, 47, 0.15)" }}
              >
                <div className="flex items-center justify-center w-14 h-14 mb-5 bg-white/10 rounded-2xl text-white">
                  <Building2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Empresa</h3>
                <p className="text-sm text-secondary-light mb-5 leading-relaxed">
                  Cadastro corporativo para benefícios, equipes, responsável e
                  gestão de colaboradores.
                </p>
                <div className="flex items-center justify-center w-full py-3 mt-auto text-sm font-semibold text-dark bg-white rounded-full group-hover:bg-secondary-light transition-colors">
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.button>
            </motion.div>

            {/* Flow Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-3 px-5 py-3 bg-white/60 backdrop-blur rounded-full text-sm font-semibold text-primary-dark"
            >
              <Route className="w-5 h-5" />
              Cada escolha leva para uma tela de cadastro dedicada
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            {/* Back button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 mb-6 text-sm font-semibold text-primary-dark hover:text-primary transition-colors"
            >
              ← Voltar
            </button>

            {/* Clerk SignIn component */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-secondary/20">
              <SignIn
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-0",
                    headerTitle: "text-2xl font-bold text-on-surface mb-2",
                    headerSubtitle: "text-on-surface-variant text-sm mb-6",
                    formButtonPrimary:
                      "bg-primary hover:bg-primary-dark text-white rounded-full py-3 font-semibold",
                    formButtonSecondary: "text-primary font-semibold",
                    footerActionLink:
                      "text-primary hover:text-primary-dark font-semibold",
                    dividerLine: "bg-secondary/30",
                    dividerText: "text-on-surface-variant text-xs",
                    input:
                      "border border-secondary/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary",
                    inputLabel: "text-sm font-medium text-on-surface",
                    inputError: "text-error text-xs mt-1",
                    identityPreviewText: "text-sm text-on-surface",
                    identityPreviewEditButton: "text-primary text-sm",
                    formFieldInputShowPasswordButton: "text-on-surface-variant",
                  },
                }}
                routing="hash"
                signUpUrl="/sign-up"
                redirectUrl="/"
                afterSignInUrl="/"
              />
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
