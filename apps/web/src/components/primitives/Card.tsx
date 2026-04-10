import React from "react";

type CardVariant = "default" | "elevated" | "glass";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-white shadow-md",
  elevated: "bg-white shadow-lg",
  glass: "glass bg-white/70",
};

const paddingStyles: Record<string, string> = {
  none: "",
  sm: "p-3",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  variant = "default",
  padding = "md",
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hoverable ? "transition-transform duration-200 hover:-translate-y-1 cursor-pointer" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({
  children,
  className = "",
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-xl font-semibold text-on-surface font-display ${className}`}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className = "",
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`mt-1 text-sm text-on-surface-variant ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className = "",
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({
  children,
  className = "",
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mt-4 pt-4 border-t border-surface-container ${className}`}>
      {children}
    </div>
  );
}

export default Card;
