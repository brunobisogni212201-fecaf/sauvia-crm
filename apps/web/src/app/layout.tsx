import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sauvia - CRM para Nutricionistas",
  description:
    "O CRM que não gerencia apenas dados, orquestra relacionamentos. Simplifique sua prática clínica.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${instrumentSerif.variable} ${plusJakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
