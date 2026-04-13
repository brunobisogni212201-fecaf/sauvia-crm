import React from "react";
import { StyleSheet, Text, View, ViewStyle, TextStyle } from "react-native";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  style?: ViewStyle;
}

const variantStyles: Record<
  BadgeVariant,
  { bg: string; text: string; dot: string }
> = {
  default: { bg: "hsl(40, 15%, 94%)", text: "hsl(210, 20%, 12%)", dot: "hsl(210, 10%, 40%)" },
  success: { bg: "#dcfce7", text: "#166534", dot: "#22c55e" },
  warning: { bg: "#ffedd5", text: "#9a3412", dot: "#f59e0b" },
  error: { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
  info: { bg: "#dbeafe", text: "#1e40af", dot: "#3b82f6" },
};

const sizeStyles: Record<
  BadgeSize,
  { paddingV: number; paddingH: number; fontSize: number }
> = {
  sm: { paddingV: 2, paddingH: 8, fontSize: 10 },
  md: { paddingV: 4, paddingH: 12, fontSize: 12 },
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  style,
}: BadgeProps) {
  const colors = variantStyles[variant];
  const sizes = sizeStyles[size];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          paddingVertical: sizes.paddingV,
          paddingHorizontal: sizes.paddingH,
        },
        style,
      ]}
    >
      {dot && <View style={[styles.dot, { backgroundColor: colors.dot }]} />}
      <Text
        style={[styles.text, { color: colors.text, fontSize: sizes.fontSize }]}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 9999,
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontWeight: "600",
  },
});

export default Badge;
