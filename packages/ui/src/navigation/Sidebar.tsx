// Sidebar Navigation Component
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: number;
}

export interface SidebarProps {
  items: NavItem[];
  logo?: React.ReactNode;
  className?: string;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ items, logo, className = "" }, ref) => {
    const pathname = usePathname();

    return (
      <aside
        ref={ref}
        className={`w-64 glass shadow-sm p-6 flex flex-col h-full ${className}`}
      >
        {/* Logo */}
        <div className="mb-8">
          {logo || (
            <Link
              href="/"
              className="text-2xl font-bold text-primary font-display"
            >
              Sauvia
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {items.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }
                `}
              >
                {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                <span className="flex-1">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span
                    className={`
                      px-2 py-0.5 rounded-full text-xs font-semibold
                      ${isActive ? "bg-white text-primary" : "bg-primary text-white"}
                    `}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    );
  },
);

Sidebar.displayName = "Sidebar";

// Bottom Tab Navigation for Mobile
export interface TabItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
}

export interface BottomTabsProps {
  items: TabItem[];
  className?: string;
}

export const BottomTabs = React.forwardRef<HTMLElement, BottomTabsProps>(
  ({ items, className = "" }, ref) => {
    const pathname = usePathname();

    return (
      <nav
        ref={ref}
        className={`
          fixed bottom-0 left-0 right-0 glass shadow-lg
          border-t border-surface-container-high
          flex justify-around items-center py-2 px-4
          md:hidden z-50
          ${className}
        `}
      >
        {items.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center gap-1 px-3 py-2 rounded-xl
                transition-all duration-200 min-w-[64px]
                ${
                  isActive
                    ? "text-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                }
              `}
            >
              <span className="w-6 h-6">
                {isActive && item.activeIcon ? item.activeIcon : item.icon}
              </span>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>
    );
  },
);

BottomTabs.displayName = "BottomTabs";
