// Sauvia UI Library - Main Export

// Buttons
export { Button } from "./buttons";
export type { ButtonProps } from "./buttons";

// Inputs
export { Input } from "./inputs";
export type { InputProps } from "./inputs";

// Cards
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./cards";
export type { CardProps } from "./cards";

// Navigation
export { Sidebar, BottomTabs } from "./navigation";
export type {
  SidebarProps,
  NavItem,
  BottomTabsProps,
  TabItem,
} from "./navigation";

// Feedback
export { Alert, Badge, Skeleton, CardSkeleton } from "./feedback";
export type { AlertProps, BadgeProps, SkeletonProps } from "./feedback";

// Layout
export { Container, Header, PageLayout, PageHeader, StatsGrid } from "./layout";
export type {
  ContainerProps,
  HeaderProps,
  PageLayoutProps,
  PageHeaderProps,
  StatsGridProps,
} from "./layout";

/**
 * NEW Design System Components (2026-04-10)
 *
 * Os novos componentes estão disponíveis diretamente em:
 * import { Button } from '@sauvia/ui/web/primitives/Button';
 *
 * ou importe diretamente dos componentes:
 * import { Button } from './apps/web/src/components/primitives/Button';
 *
 * Nota: Estos exports serão configurados quando o workspace estiver 100% configurado.
 */
