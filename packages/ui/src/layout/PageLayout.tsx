// Container Component
import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'lg', children, className = '', ...props }, ref) => {
    const sizeStyles = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-[1440px]',
      full: 'max-w-full',
    };

    return (
      <div
        ref={ref}
        className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

// Header Component
export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  sticky?: boolean;
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ children, sticky = false, className = '', ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={`
          glass shadow-sm px-6 py-4
          ${sticky ? 'sticky top-0 z-40' : ''}
          ${className}
        `}
        {...props}
      >
        <div className="flex items-center justify-between">
          {children}
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';

// Page Layout Component
export interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  showBottomTabs?: boolean;
}

export const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ header, sidebar, children, showBottomTabs = true, className = '', ...props }, ref) => {
    return (
      <div className="flex min-h-screen bg-surface" ref={ref} {...props}>
        {/* Desktop Sidebar */}
        {sidebar && <div className="hidden lg:block">{sidebar}</div>}
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {header && <Header sticky>{header}</Header>}
          <main className={`flex-1 p-6 ${showBottomTabs ? 'pb-20 md:pb-6' : ''} ${className}`}>
            {children}
          </main>
        </div>
      </div>
    );
  }
);

PageLayout.displayName = 'PageLayout';

// Page Header Component
export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, actions, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${className}`}
        {...props}
      >
        <div>
          <h1 className="text-3xl font-bold text-on-surface font-display">{title}</h1>
          {description && (
            <p className="mt-1 text-on-surface-variant">{description}</p>
          )}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';

// Stats Grid Component
export interface StatsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: {
      value: number;
      isPositive: boolean;
    };
  }>;
}

export const StatsGrid = React.forwardRef<HTMLDivElement, StatsGridProps>(
  ({ items, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
        {...props}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4"
          >
            {item.icon && (
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-primary">
                {item.icon}
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm text-on-surface-variant">{item.label}</p>
              <p className="text-2xl font-bold text-on-surface mt-1">{item.value}</p>
              {item.trend && (
                <p
                  className={`text-sm mt-1 ${
                    item.trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.trend.isPositive ? '↑' : '↓'} {Math.abs(item.trend.value)}%
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

StatsGrid.displayName = 'StatsGrid';
