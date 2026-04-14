"use client";

import { SignUp } from "@clerk/nextjs";
import { Leaf } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex bg-surface">
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-12">
            <Leaf className="w-7 h-7 text-primary" strokeWidth={2.2} />
            <span className="font-[family-name:var(--font-display)] text-2xl text-primary tracking-wide">
              Sauvia
            </span>
          </div>

          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border border-surface-container rounded-2xl",
                formButtonPrimary:
                  "bg-primary hover:bg-primary-dark rounded-full",
                footerActionLink: "text-primary hover:text-primary-dark",
              },
            }}
            redirectUrl="/"
          />

          <p className="mt-8 text-center text-sm text-on-surface-variant">
            Já tem uma conta?{" "}
            <a
              href="/login"
              className="text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              Entre agora
            </a>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#3b0764]">
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
