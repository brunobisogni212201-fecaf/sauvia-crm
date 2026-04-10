import React from "react";

type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  rounded?: boolean;
  label?: string;
}

const variantStyles: Record<IconButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-light active:bg-primary-dark",
  secondary:
    "bg-white text-primary border-2 border-primary hover:bg-surface-container active:bg-surface",
  ghost:
    "bg-transparent text-on-surface-variant hover:bg-surface-container active:bg-surface",
  danger: "bg-error text-white hover:bg-red-700 active:bg-red-800",
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export function IconButton({
  icon,
  variant = "primary",
  size = "md",
  rounded = true,
  label,
  className = "",
  ...props
}: IconButtonProps) {
  const IconWrapper = (
    <span
      className={`flex items-center justify-center ${variantStyles[variant]} ${sizeStyles[size]} ${rounded ? "rounded-full" : "rounded-lg"} transition-colors duration-200 ${className}`}
    >
      {icon}
    </span>
  );

  if (label) {
    return (
      <button
        className="inline-flex items-center gap-2"
        title={label}
        {...props}
      >
        {IconWrapper}
      </button>
    );
  }

  return (
    <button
      className="inline-flex items-center justify-center"
      title={label}
      {...props}
    >
      {IconWrapper}
    </button>
  );
}

export default IconButton;
