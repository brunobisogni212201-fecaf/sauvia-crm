import React from "react";

type DividerOrientation = "horizontal" | "vertical";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  spacing?: "none" | "sm" | "md" | "lg";
}

export function Divider({
  orientation = "horizontal",
  spacing = "md",
  className = "",
  ...props
}: DividerProps) {
  const spacingStyles: Record<string, string> = {
    none: "",
    sm: "my-2",
    md: "my-4",
    lg: "my-6",
  };

  if (orientation === "vertical") {
    return (
      <div
        className={`w-px h-full bg-surface-container ${spacing !== "none" ? "mx-2" : ""} ${className}`}
        {...props}
      />
    );
  }

  return (
    <hr
      className={`border-0 h-px bg-surface-container ${spacingStyles[spacing]} ${className}`}
      {...props}
    />
  );
}

interface SpacerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export function Spacer({ size = "md" }: SpacerProps) {
  const sizeStyles: Record<string, string> = {
    xs: "h-2",
    sm: "h-4",
    md: "h-6",
    lg: "h-8",
    xl: "h-12",
    "2xl": "h-16",
  };

  return <div className={sizeStyles[size]} />;
}

export default Divider;
