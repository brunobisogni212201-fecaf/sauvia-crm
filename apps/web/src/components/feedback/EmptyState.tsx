import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
    >
      {icon && (
        <div className="mb-4 p-4 rounded-full bg-surface-container">{icon}</div>
      )}
      <h3 className="text-lg font-semibold text-on-surface mb-2">{title}</h3>
      {description && (
        <p className="text-on-surface-variant max-w-sm mb-6">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

export default EmptyState;
