import React from "react";

type FlexDirection = "row" | "col" | "row-reverse" | "col-reverse";
type FlexJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: FlexDirection;
  justify?: FlexJustify;
  align?: FlexAlign;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  wrap?: boolean;
  shrink?: number;
  grow?: number;
}

const gapStyles: Record<string, string> = {
  none: "",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
  "3xl": "gap-16",
};

const justifyStyles: Record<FlexJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const alignStyles: Record<FlexAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const directionStyles: Record<FlexDirection, string> = {
  row: "flex-row",
  col: "flex-col",
  "row-reverse": "flex-row-reverse",
  "col-reverse": "flex-col-reverse",
};

export function Flex({
  children,
  direction = "row",
  justify = "start",
  align = "start",
  gap = "none",
  wrap = false,
  shrink,
  grow,
  className = "",
  ...props
}: FlexProps) {
  return (
    <div
      className={`
        flex
        ${directionStyles[direction]}
        ${justifyStyles[justify]}
        ${alignStyles[align]}
        ${gapStyles[gap]}
        ${wrap ? "flex-wrap" : ""}
        ${shrink !== undefined ? `shrink-${shrink}` : ""}
        ${grow !== undefined ? `grow-${grow}` : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export default Flex;
