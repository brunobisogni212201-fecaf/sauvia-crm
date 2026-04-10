import { 
  Home, 
  Users, 
  Calendar, 
  UserCircle, 
  Settings, 
  Search, 
  Bell, 
  LogOut,
  Plus,
  ChevronRight,
  ChevronLeft,
  Clock,
  ShieldCheck,
  ClipboardList
} from 'lucide-react';

/**
 * CONFIGURAÇÃO GLOBAL DE DESIGN
 * Se o designer mudar o strokeWidth (espessura da linha), mudamos aqui
 * e reflete em TODO o sistema automaticamente.
 */
export const DESIGN_TOKENS = {
  iconSize: 24,
  strokeWidth: 2,
  color: 'currentColor'
};

/**
 * NOMES SEMÂNTICOS DE ÍCONES
 * Aqui é onde a autonomia acontece: o dev usa 'PatientIcon'
 * e não precisa saber qual arquivo ou biblioteca está por trás.
 */
export const AppIcons = {
  Dashboard: Home,
  Patients: Users,
  Appointments: Calendar,
  Profile: UserCircle,
  Settings: Settings,
  Search: Search,
  Notifications: Bell,
  Logout: LogOut,
  Add: Plus,
  ArrowRight: ChevronRight,
  ArrowLeft: ChevronLeft,
  Time: Clock,
  Security: ShieldCheck,
  Treatments: ClipboardList
};

export type IconName = keyof typeof AppIcons;
