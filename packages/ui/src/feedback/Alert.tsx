// Alert Component
import React from "react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
}

const variantStyles = {
  info: "bg-blue-50 text-blue-900 border-blue-200",
  success: "bg-green-50 text-green-900 border-green-200",
  warning: "bg-yellow-50 text-yellow-900 border-yellow-200",
  error: "bg-red-50 text-red-900 border-red-200",
};

const iconMap = {
  info: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "info", title, children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-xl border p-4 ${variantStyles[variant]} ${className}`}
        role="alert"
        {...props}
      >
        <div className="flex gap-3">
          <span className="flex-shrink-0">{iconMap[variant]}</span>
          <div className="flex-1">
            {title && <h5 className="font-semibold mb-1">{title}</h5>}
            <div className="text-sm">{children}</div>
          </div>
        </div>
      </div>
    );
  },
);

Alert.displayName = "Alert";

// Badge Component
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = "default", size = "md", children, className = "", ...props },
    ref,
  ) => {
    const variantStyles = {
      default: "bg-primary text-white",
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
      info: "bg-blue-100 text-blue-800",
    };

    const sizeStyles = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center font-semibold rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";

// Skeleton Loader Component
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | false;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "text",
      width,
      height,
      animation = "pulse",
      className = "",
      ...props
    },
    ref,
  ) => {
    const variantStyles = {
      text: "rounded-none",
      circular: "rounded-full",
      rectangular: "rounded-none",
      rounded: "rounded-xl",
    };

    const animationStyles: Record<string, string> = {
      pulse: "animate-pulse",
      wave: "animate-pulse",
    };

    const animationClass = animation ? animationStyles[animation] : "";

    const style = {
      width: width
        ? typeof width === "number"
          ? `${width}px`
          : width
        : undefined,
      height: height
        ? typeof height === "number"
          ? `${height}px`
          : height
        : undefined,
      backgroundColor: "var(--color-surface-container-high)",
    };

    return (
      <div
        ref={ref}
        className={`${variantStyles[variant]} ${animationClass} ${className}`}
        style={style}
        {...props}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";

// Loading Skeleton for Cards
export const CardSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`bg-white rounded-2xl shadow-md p-6 space-y-4 ${className}`}
    {...props}
  >
    <Skeleton variant="rounded" height={24} className="w-3/4" />
    <Skeleton variant="text" height={16} />
    <Skeleton variant="text" height={16} className="w-5/6" />
    <div className="flex gap-2 pt-2">
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
    </div>
  </div>
));

CardSkeleton.displayName = "CardSkeleton";
