import React from "react";

type ProgressVariant = "linear" | "circular";
type ProgressSize = "sm" | "md" | "lg";

interface ProgressProps {
  value: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  label?: string;
  showValue?: boolean;
  color?: "primary" | "success" | "warning" | "error";
  className?: string;
}

const sizeStyles: Record<ProgressSize, string> = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

const colorStyles: Record<string, string> = {
  primary: "bg-primary",
  success: "bg-green-500",
  warning: "bg-orange-500",
  error: "bg-red-500",
};

const circularSizes: Record<ProgressSize, number> = {
  sm: 24,
  md: 40,
  lg: 56,
};

export function Progress({
  value,
  variant = "linear",
  size = "md",
  label,
  showValue = false,
  color = "primary",
  className = "",
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, value));

  if (variant === "circular") {
    const circumference = 2 * Math.PI * (circularSizes[size] / 2 - 4);
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className={`relative inline-flex ${className}`}>
        <svg
          width={circularSizes[size]}
          height={circularSizes[size]}
          className="transform -rotate-90"
        >
          <circle
            cx={circularSizes[size] / 2}
            cy={circularSizes[size] / 2}
            r={circularSizes[size] / 2 - 4}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-surface-container"
          />
          <circle
            cx={circularSizes[size] / 2}
            cy={circularSizes[size] / 2}
            r={circularSizes[size] / 2 - 4}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colorStyles[color]} transition-all duration-300`}
          />
        </svg>
        {showValue && (
          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-on-surface">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex justify-between mb-1 text-sm">
          {label && <span className="text-on-surface-variant">{label}</span>}
          {showValue && (
            <span className="font-medium text-on-surface">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full bg-surface-container rounded-full overflow-hidden ${sizeStyles[size]}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${colorStyles[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default Progress;
