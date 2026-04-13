import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type CardVariant = "default" | "elevated" | "glass";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
  style?: ViewStyle;
}

const variantStyles: Record<CardVariant, ViewStyle> = {
  default: {
    backgroundColor: "#fff",
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  elevated: {
    backgroundColor: "#fff",
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 5,
  },
  glass: { backgroundColor: "rgba(255, 255, 255, 0.7)" },
};

const paddingStyles: Record<string, number> = {
  none: 0,
  sm: 12,
  md: 24,
  lg: 32,
};

export function Card({
  children,
  variant = "default",
  padding = "md",
  style,
}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        variantStyles[variant],
        { padding: paddingStyles[padding] },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
  },
});

export default Card;
