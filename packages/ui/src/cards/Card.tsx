// Card Component
import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', children, className = '', ...props }, ref) => {
    const baseStyles = 'rounded-2xl transition-all duration-200';

    const variantStyles = {
      default: 'bg-white shadow-md',
      elevated: 'bg-white shadow-lg',
      glass: 'glass shadow-md',
    };

    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Header Component
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

// Card Title Component
export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = '', children, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-xl font-bold text-on-surface font-display ${className}`}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

// Card Description Component
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = '', children, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-on-surface-variant mt-1 ${className}`}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

// Card Content Component
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

// Card Footer Component
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={`mt-6 pt-4 flex items-center justify-between ${className}`}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';
