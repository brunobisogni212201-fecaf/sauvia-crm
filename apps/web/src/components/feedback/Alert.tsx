import React from "react";
import { AlertCircle, CheckCircle, Info, XCircle, X } from "lucide-react";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantStyles: Record<AlertVariant, string> = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  success: "bg-green-50 border-green-200 text-green-800",
  warning: "bg-orange-50 border-orange-200 text-orange-800",
  error: "bg-red-50 border-red-200 text-red-800",
};

const icons: Record<AlertVariant, React.ReactNode> = {
  info: <Info className="w-5 h-5" />,
  success: <CheckCircle className="w-5 h-5" />,
  warning: <AlertCircle className="w-5 h-5" />,
  error: <XCircle className="w-5 h-5" />,
};

export function Alert({
  variant = "info",
  title,
  description,
  dismissible = false,
  onDismiss,
  className = "",
  children,
  ...props
}: AlertProps) {
  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-xl border-2
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      <span className="flex-shrink-0 mt-0.5">{icons[variant]}</span>

      <div className="flex-1">
        {title && <h4 className="font-semibold text-sm">{title}</h4>}
        {(description || children) && (
          <div className={`text-sm ${title ? "mt-1" : ""}`}>
            {description || children}
          </div>
        )}
      </div>

      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default Alert;
