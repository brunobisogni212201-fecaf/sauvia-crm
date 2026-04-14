import { Sidebar, NavItem } from "@/components/navigation/Sidebar";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  LifeBuoy,
  Settings,
  Palette,
} from "lucide-react";

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
  { label: "Pacientes", href: "/patients", icon: <Users /> },
  { label: "Consultas", href: "/appointments", icon: <Calendar /> },
  { label: "Planos", href: "/nutrition-plans", icon: <FileText /> },
  { label: "Mensagens", href: "/messages", icon: <MessageSquare />, badge: 3 },
  { label: "Suporte", href: "/support", icon: <LifeBuoy /> },
  { label: "Configurações", href: "/settings", icon: <Settings /> },
  { label: "Design System", href: "/design-system", icon: <Palette /> },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar items={navItems} className="hidden lg:flex" />
      <main className="flex-1 p-6 lg:p-8">{children}</main>
    </div>
  );
}
