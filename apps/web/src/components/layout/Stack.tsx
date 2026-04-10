import React from "react";

type StackSpacing = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "row" | "col";
  spacing?: StackSpacing;
  divider?: boolean;
  align?: "start" | "center" | "end" | "stretch";
}

const spacingStyles: Record<StackSpacing, string> = {
  none: "",
  xs: "space-y-1",
  sm: "space-y-2",
  md: "space-y-4",
  lg: "space-y-6",
  xl: "space-y-8",
  "2xl": "space-y-12",
  "3xl": "space-y-16",
};

const spacingRowStyles: Record<StackSpacing, string> = {
  none: "",
  xs: "space-x-1",
  sm: "space-x-2",
  md: "space-x-4",
  lg: "space-x-6",
  xl: "space-x-8",
  "2xl": "space-x-12",
  "3xl": "space-x-16",
};

const alignStyles: Record<string, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export function Stack({
  children,
  direction = "col",
  spacing = "md",
  divider = false,
  align = "start",
  className = "",
  ...props
}: StackProps) {
  const spacingClass =
    direction === "col" ? spacingStyles[spacing] : spacingRowStyles[spacing];

  const childArray = React.Children.toArray(children);

  return (
    <div
      className={`
        flex
        ${direction === "col" ? "flex-col" : "flex-row"}
        ${spacingClass}
        ${alignStyles[align]}
        ${className}
      `}
      {...props}
    >
      {divider
        ? childArray.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < childArray.length - 1 && (
                <div
                  className={
                    direction === "col"
                      ? "w-full h-px bg-surface-container"
                      : "h-full w-px bg-surface-container"
                  }
                />
              )}
            </React.Fragment>
          ))
        : children}
    </div>
  );
}

export default Stack;
