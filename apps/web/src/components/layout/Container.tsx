import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  centered?: boolean;
  padding?: boolean;
}

const maxWidthStyles: Record<string, string> = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  full: "100%",
};

export function Container({
  children,
  maxWidth = "xl",
  centered = true,
  padding = true,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div
      className={`
        ${centered ? "mx-auto" : ""}
        ${padding ? "px-4 sm:px-6 lg:px-8" : ""}
        ${className}
      `}
      style={{ maxWidth: maxWidthStyles[maxWidth] }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;
