import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      icon,
      iconPosition = "left",
      className = "",
      ...props
    },
    ref,
  ) => {
    const hasError = Boolean(error);

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-on-surface mb-1.5">
            {label}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full px-4 py-3 rounded-xl
              bg-surface text-on-surface
              border-2 border-transparent
              placeholder:text-on-surface-variant/50
              transition-all duration-200
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
              disabled:opacity-50 disabled:cursor-not-allowed
              ${icon && iconPosition === "left" ? "pl-10" : ""}
              ${icon && iconPosition === "right" ? "pr-10" : ""}
              ${hasError ? "border-error focus:border-error focus:ring-error/20" : ""}
              ${className}
            `}
            {...props}
          />

          {icon && iconPosition === "right" && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              {icon}
            </div>
          )}
        </div>

        {error && <p className="mt-1.5 text-sm text-error">{error}</p>}
        {helper && !error && (
          <p className="mt-1.5 text-sm text-on-surface-variant">{helper}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
